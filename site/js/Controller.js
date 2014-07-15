var VKStatsSiteApp = angular.module('VKStatsSiteApp', []);

VKStatsSiteApp.controller('VKStatsSiteCtrl', function($scope, $q)
{
	//--------------- init ----------------------

	$scope.NOT_SELECTED_PROJECT_ID = 0;

	$scope.projects =
	[
		{
			title: '---Проект не выбран---',
			id: $scope.NOT_SELECTED_PROJECT_ID,
			actions: []
		}
	];
	$scope.activeProject = $scope.projects[0];

	VKStats.init();
	$scope.session = VKStats.session;

	//--------------------- utility ----------------------------

	VKStats.getProjects(function(data)
	{
		$scope.projects = $scope.projects.concat(data);
		$scope.$apply();
	},
	function(error)
	{
		$scope.AlertError(error);
	});

	$scope.RefreshSession = function()
	{
		$scope.activeProject = [0];
		VKStats.createSession();
		$scope.session = VKStats.session;
	};

	$scope.LoadActions = function()
	{
		VKStats.getActions($scope.activeProject.id,
			function(data)
			{
				$scope.SetActions(data);

			},
			function(error)
			{
				$scope.AlertError(error);
			});
	};

	$scope.SetActions = function(data)
	{
		var action;
		var defer;
		var promises = [];

		for (var i = 0; i < data.length; i++)
		{
			action = data[i];

			if (Number(action.target_action))
			{
				defer = $q.defer();
				promises.push(defer.promise);

				(function(defer, action)
				{
					VKStats.isCompleted({
							action_id: action.id,
							uid: $scope.session
						},
						function(data)
						{
							action.is_completed = data.is_completed;
							defer.resolve(data);
						},
						function(error)
						{
							$scope.AlertError(error);
							defer.reject(error);
						});
				})(defer, action);
			}
		}

		$q.all(promises).then(function()
		{
			$scope.activeProject.actions = data;
		});
	};

	$scope.OnProjectChange = function()
	{
		if ($scope.activeProject.id != 0)
		{
			$scope.activeProject.actions = [];

			VKStats.isAllowed({
				pid: $scope.activeProject.id,
				uid: $scope.session
			},
				function(data)
				{
					if (data.access)
					{
						$scope.LoadActions();
					}
					else
					{
						alert('У пользователя нет доступа к этому проекту!');
					}
				},
				function(error)
				{
					$scope.AlertError(error);
				});
		}
	};

	$scope.OnActionClick = function(action)
	{
		VKStats.trackAction({
			action_id: action.id,
			uid: $scope.session
		},
		function(data)
		{
			if (action.type == 'redirect' && !action.is_completed)
			{
				location.href = location.href + action.value;
			}

			if (Number(action.target_action))
			{
				action.is_completed = true;
				$scope.$apply();
			}
		},
		function(error)
		{
			$scope.AlertError(error);
		});
	};

	$scope.AlertError = function(error)
	{
		alert('Ошибка запроса: ' + error);
	};
});
