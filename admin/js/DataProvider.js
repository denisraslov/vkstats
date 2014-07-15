
VKStatsAdminApp.factory('dataProvider', function($http, $q)
{
	return {
		API_URL: '../../php/http_query_handler.php',
		Query: function(params)
		{
			var deferred = $q.defer();

			$http({
				method: 'GET',
				url: this.API_URL,
				params: params
			})
			.success(function(response)
			{
				if (response.result)
				{
					deferred.resolve(response.data);
				}
				else
				{
					deferred.reject(response.error);
				}
			})
			.error(function()
			{
				alert('Ошибка: Сервер не отвечает!');
				deferred.reject('Сервер не отвечает');
			});
				
		  return deferred.promise;
		},
		
		GetProject: function(id, filters)
		{
			return this.Query({
				controller: 'project',
				params: 
				{
					id: id,
					filters: filters
				}
			});
		},
		GetProjects: function(filters)
		{
			return this.Query({
				controller: 'projects',
				params: 
				{
					filters: filters,
					full: true
				}
			});
		},
		AddProject: function(title)
		{
			return this.Query({
				controller: 'project_insert',
				params:
				{
					title: title
				}
			});
		},
		AddAction: function(params)
		{
			return this.Query({
				controller: 'action_insert',
				params: params
			});
		}
	};
});

/*
 $scope.projects =
 [
 {
 title: 'Project 1',
 id: 1,
 actions:
 [
 {
 title: 'Все действия',
 id: 0
 },
 {
 title: 'TEST_ACTION',
 id: 1
 }
 ],
 statistics:
 {
 days:
 [
 ['01.06.2014', 100],
 ['01.06.2014', 16],
 ['01.06.2014', 14],
 ['01.06.2014', 14],
 ['01.06.2014', 12],
 ['01.06.2014', 12],
 ['01.06.2014', 11],
 ['01.06.2014', 11],
 ['01.06.2014', 11],
 ['01.06.2014', 11],
 ['01.06.2014', 10],
 ['01.06.2014', 10],
 ['01.06.2014', 10],
 ['01.06.2014', 9]
 ],
 total:
 [
 { title: 'TEST_ACTION1', count: 33 },
 { title: 'TEST_ACTION2', count: 35 },
 { title: 'TEST_ACTION3', count: 1 },
 { title: 'Итого', count: 120 }
 ]
 }
 }
 ];
 */
