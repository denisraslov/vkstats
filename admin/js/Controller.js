
var VKStatsAdminApp = angular.module('VKStatsAdminApp', []);

VKStatsAdminApp.controller('VKStatsAdminCtrl', function($scope, consts, dataProvider, utility)
{
	consts.Prepare($scope);

	$scope.GetDefaultFilters = function(project)
	{
		return {
			target: $scope.targetSettings[0],
			action: project && project.actions[0],
			unic: $scope.unicSettings[0],
			dailyView: $scope.dailyViews[0]
		};
	};

	$scope.FormatTime = function(seconds, showTime)
	{
		return utility.FormatTime(seconds, showTime);
	};

	//-------------------------- data ------------------------------------

	$scope.LoadProject = function(project, callback)
	{
		dataProvider.GetProject(project.id, {
			target: project.filters.target.id,
			action_id: project.filters.action.id,
			unic: project.filters.unic.id
		})
			.then(function(data)
			{
				var project;
				var projects = $scope.projects;

				project = data;

				for (var i = 0; i < projects.length; i++)
				{
					if (projects[i].id == project.id)
					{
						project.viewType = projects[i].viewType;
						project.filters = projects[i].filters;
						project.actions.splice(0, 0, { id: 0, title: 'Все действия' });

						for (var j = 0; j < project.actions.length; j++)
						{
							if (project.filters.action.id == project.actions[j].id)
							{
								project.filters.action = project.actions[j];
							}
						}

						$scope.PrepareStatistic(project);

						projects[i] = project;

						break;
					}
				}

				if (callback)
				{
					callback(project);
				}
			},
			function(error)
			{
				alert('Ошибка запроса:' + error);
			});
	};

	$scope.PrepareStatistic = function(project)
	{
		var statistic;

		//форматирование дат
		if (project.filters.target.id == $scope.targetTypeIDs.NO && project.filters.action_id != 0)
		{
			statistic = project.statistic;
			for (var i = 0; i < statistic.length; i++)
			{
				statistic[i][0] = utility.FormatTime(statistic[i][0], false);
			}
		}
	};

	$scope.LoadProjects = function(callback)
	{
		var defaultFilters = $scope.GetDefaultFilters();

		dataProvider.GetProjects({
			action_id: 0,
			unic: defaultFilters.unic.id,
			target: defaultFilters.target.id
		})
			.then(function(data)
			{
				var project;
				var statistic;

				for (var i = 0; i < data.length; i++)
				{
					project = data[i];

					project.actions.splice(0, 0, { id: 0, title: 'Все действия' });

					project.filters = $scope.GetDefaultFilters(project);
					project.viewType = $scope.viewTypes.TARGET;


					$scope.PrepareStatistic(project);
				}

				$scope.projects = data;

				if (callback)
				{
					callback();
				}
			},
			function(data, status, headers, config)
			{

			});
	};
	$scope.LoadProjects();

	//------------------------- new project --------------------------

	$scope.ShowNewProjectPopup = function()
	{
		$('.vkstat-new_project_popup').modal('show');
	};

	$scope.AddProject = function()
	{
		dataProvider.AddProject($scope.newProjectTitle)
			.then(function(data)
			{
				$scope.LoadProjects(function()
				{
					$('.vkstat-new_project_popup').modal('hide');
					$scope.newProjectTitle = '';
				});
			},
			function(data)
			{

			});
	};

	//------------------------- new action --------------------------

	$scope.ShowNewActionPopup = function(project)
	{
		$scope.activeProject = project;
		$scope.newAction =
		{
			title: '',
			type: $scope.actionTypes[0],
			value: '',
			target: $scope.targetTypes[0]
		};

		$('.vkstat-new_action_popup').modal('show');
	};

	$scope.ValidateNewAction = function()
	{
		var newAction = $scope.newAction;

		return newAction && newAction.title &&
			((newAction.type.id == $scope.actionTypeIDs.ACTION) || newAction.value);
	};

	$scope.AddAction = function()
	{
		dataProvider.AddAction(
			{
				title: $scope.newAction.title,
				type: $scope.newAction.type.title,
				value: $scope.newAction.value,
				target_action: $scope.newAction.target.id,
				project_id: $scope.activeProject.id
			})
			.then(function(data)
			{
				$scope.LoadProject($scope.activeProject, function()
				{
					$('.vkstat-new_action_popup').modal('hide');

					$scope.activeProject = undefined;
					$scope.newAction = undefined;
				});
			},
			function(data)
			{

			});
	};

	//---------------------------- filters popup ---------------------------------------

	$scope.ShowFiltersPopup = function(project)
	{
		$scope.activeProject = project;
		project.storedFilters =
		{
			target: project.filters.target,
			action: project.filters.action,
			unic: project.filters.unic,
			dailyView: project.filters.dailyView
		};

		$('.vkstat-filters_popup').modal('show').on('hide', function()
		{
			if (!$scope.isFilterChanged)
			{
				project.filters = project.storedFilters;
			}
		});
	};

	$scope.ChangeFilters = function()
	{
		$scope.isFilterChanged = true;
		$('.vkstat-filters_popup').modal('hide');
		$scope.isFilterChanged = false;

		$scope.LoadProject($scope.activeProject, function(project)
		{
			$scope.activeProject = undefined;
			$scope.RedrawStatistic(project);
		});
	}

	$scope.RedrawStatistic = function(project)
	{
		var filters = project.filters;

		if (filters.target.id == $scope.targetSettingIDs.TARGET)
		{
			project.viewType = $scope.viewTypes.TARGET;
		}
		if (filters.target.id == $scope.targetSettingIDs.ALL)
		{
			if (filters.action.id == 0)
			{
				project.viewType = $scope.viewTypes.TABLE;
			}
			else
			{
				if (filters.dailyView.id == $scope.dailyViewIDs.TABLE)
				{
					project.viewType = $scope.viewTypes.DAILY_TABLE;
				}
				if (filters.dailyView.id == $scope.dailyViewIDs.CHART)
				{
					project.viewType = $scope.viewTypes.DAILY_CHART;

					setTimeout(function()
					{
						utility.InitChart($('.vkstat-project[project-id=' + project.id + '] .vkstat-project_chart'), project.statistic);
					}, 100);
				}
			}
		}
	};
});