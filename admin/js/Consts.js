
VKStatsAdminApp.factory('consts', function()
{
	return {
		Prepare: function(scope)
		{
			scope.newProjectTitle = '';

			//------------------ target type ----------------------

			scope.targetSettingIDs =
			{
				TARGET: 1,
				ALL: 0
			};

			scope.targetSettings =
			[
				{
					title: 'По целевым действиям',
					id: scope.targetSettingIDs.TARGET
				},
				{
					title: 'Суммарная',
					id: scope.targetSettingIDs.ALL
				}
			];

			//------------------ daily statistic type ----------------------

			scope.dailyViewIDs =
			{
				TABLE: 0,
				CHART: 1
			};

			scope.dailyViews =
				[
					{
						title: 'Таблица',
						id: scope.dailyViewIDs.TABLE
					},
					{
						title: 'График',
						id: scope.dailyViewIDs.CHART
					}
				];

			//-------------------------- target type ----------------------------

			scope.targetTypeIDs =
			{
				NO: 0,
				YES: 1
			};

			scope.targetTypes =
			[
				{
					title: 'Нет',
					id: scope.targetTypeIDs.NO
				},
				{
					title: 'Да',
					id: scope.targetTypeIDs.YES
				}
			];

			//------------------------- action type ----------------------------

			scope.actionTypeIDs =
			{
				ACTION: 0,
				REDIRECT: 1
			};

			scope.actionTypes =
			[
				{
					title: 'action',
					id: scope.actionTypeIDs.ACTION
				},
				{
					title: 'redirect',
					id: scope.actionTypeIDs.REDIRECT
				}
			];

			//-------------------- unic type --------------------------

			scope.unicSettings =
			[
				{
					title: 'Неуникальные',
					id: 0
				},
				{
					title: 'Уникальные',
					id: 1
				}
			];

			//------------------------ view type ---------------------------------

			scope.viewTypes =
			{
				TARGET: 0,
				TABLE: 1,
				DAILY_TABLE: 2,
				DAILY_CHART: 3
			};
		}
	};
});