<?php

include('controllers/base.php');

class QueryHandler 
{
	function QueryHandler($params) 
	{
		$this->params = $params;
	}

	public function validateParams()
	{
		return isset($this->params['controller']);
	}
	
	public function handle()
	{
		if ($this->validateParams())
		{
			$controllerName = $this->params['controller'];
			
			if (isset($this->params['params']))
			{
				$controllerParams = json_decode($this->params['params']);
			}
			else
			{
				$controllerParams = Array();
			}		
			
			$controller = Controller::create($controllerName, $controllerParams);
			$data = $controller->run();
			
			if ($data !== FALSE)
			{
				$response = json_encode(array(
						'result' => 1,
						'data' => $data
					)
				);
			}
			else
			{
				$response = $this->getErrorResponse($controller->getError());
			}
		}
		else
		{
			$response = $this->getErrorResponse('Неверные параметры запроса');
		}
		
		return $response;
	}
	
	private function getErrorResponse($error)
	{
		return json_encode(array(
				'result' => 0,
				'error' => $error
			)
		);
	}
}

?>
