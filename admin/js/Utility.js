
VKStatsAdminApp.factory('utility', function()
{
	return {

		//--------------------------------- chart ---------------------------------

		InitChart: function(container, data)
		{
			container.highcharts({
				chart: {
					type: 'column'
				},
				title: {
					text: ''
				},
				xAxis: {
					type: 'category',
					labels: {
						rotation: -45,
						style: {
							fontSize: '13px',
							fontFamily: 'Verdana, sans-serif'
						}
					}
				},
				yAxis: {
					min: 0,
					title: {
						text: 'Количество действий'
					}
				},
				legend: {
					enabled: false
				},
				tooltip: {
					pointFormat: '<b>{point.y}</b> действий',
				},
				series: [
					{
						name: 'statistics',
						data: data,
						dataLabels: {
							enabled: true,
							rotation: -90,
							color: '#FFFFFF',
							align: 'right',
							x: 4,
							y: 10,
							style: {
								fontSize: '13px',
								fontFamily: 'Verdana, sans-serif',
								textShadow: '0 0 3px black'
							}
						}
					}
				]
			});
		},

		//------------------------- time -----------------------------

		FormatTimePart: function(number)
		{
			if (number < 10)
			{
				number = '0' + number;
			}

			return number;
		},

		FormatTime: function(seconds, showTime)
		{
			var date = new Date(seconds * 1000);

			return this.FormatTimePart(date.getDate()) + '.' +
				this.FormatTimePart((date.getMonth() + 1)) + '.' +
				this.FormatTimePart(date.getFullYear()) +
				(showTime ? ', ' +
					this.FormatTimePart(date.getHours()) + ':' +
					this.FormatTimePart(date.getMinutes()) + ':' +
					this.FormatTimePart(date.getSeconds())
					: '');
		}
	};
});