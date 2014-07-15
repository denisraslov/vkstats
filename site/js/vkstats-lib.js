var VKStats =
{
	API_URL: '../../php/http_query_handler.php',
	init: function()
	{
		this.session = this.getCookie('vkstats_session');

		if (!this.session)
		{
			this.createSession();
		}
	},
	query: function(controller, params, callback, errback)
	{
		var xmlhttp;
		var queryParams = {};
		var response;

		if (window.XMLHttpRequest)
		{
			xmlhttp = new XMLHttpRequest();
		}
		else
		{
			xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
		}

		xmlhttp.onreadystatechange = function()
		{
			if (xmlhttp.readyState == 4)
			{
				if (xmlhttp.status == 200)
				{
					response = JSON.parse(xmlhttp.responseText);

					if (response.result)
					{
						callback(response.data);
					}
					else
					{
						errback(response.error);
					}
				}
				else
				{
					errback('Сервер не отвечает');
				}
			}
		};

		queryParams.session = this.session;
		queryParams.controller = controller;
		queryParams.params = params;

		xmlhttp.open('GET', this.API_URL + '?' + this.prepareQueryParams(queryParams), true);
		xmlhttp.send(null);
	},
	prepareQueryParams: function(params)
	{
		var value;
		var output = [];

		for (var prop in params)
		{
			value = params[prop];

			if (value != undefined)
			{
				if (typeof value === 'object')
				{
					value = JSON.stringify(value);
				}

				output.push(prop + '=' + encodeURIComponent(value))
			}
		}

		return output.join('&');
	},
	getRandomString: function()
	{
		var text = '';
		var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

		for (var i = 0; i < 9; i++)
		{
			text += possible.charAt(Math.floor(Math.random() * possible.length));
		}

		return text;
	},
	getCookie: function(name)
	{
		return (document.cookie.match('(^|; )' + name + '=([^;]*)') || 0)[2];
	},
	createSession: function()
	{
		var session = this.getRandomString();
		var date = new Date();
		var expires;

		date.setTime(date.getTime() * 2);
		expires = '; expires=' + date.toGMTString();

		document.cookie = 'vkstats_session=' + session + expires + '; path=/'

		this.session = session;
	},

	//-------------------- API ------------------------------

	getProjects: function(callback, errback)
	{
		this.query('projects', { full: false }, callback, errback);
	},
	isAllowed: function(params, callback, errback)
	{
		this.query('project_access', { project_id: params.pid, user_id: params.uid }, callback, errback);
	},
	isCompleted: function(params, callback, errback)
	{
		this.query('action_completeness', { action_id: params.action_id, user_id: params.uid }, callback, errback);
	},
	getActions: function(projectId, callback, errback)
	{
		this.query('actions', { project_id: projectId }, callback, errback);
	},
	trackAction: function(params, callback, errback)
	{
		this.query('track_action', { action_id: params.action_id, user_id: params.uid }, callback, errback);
	}
};
