<?php

include('/db.php');

include('project.php');
include('project_access.php');
include('actions.php');
include('action_completeness.php');
include('projects.php');
include('project_insert.php');
include('action_insert.php');
include('track_action.php');

abstract class Controller 
{
	public static function create($type, $params) 
	{
		switch($type) 
		{
			case 'projects':
				$instance = new ProjectsController($params);
				break;
			case 'project':
				$instance = new ProjectController($params);
				break;
			case 'project_access':
				$instance = new ProjectAccessController($params);
				break;
			case 'actions':
				$instance = new ActionsController($params);
				break;
			case 'action_completeness':
				$instance = new ActionCompletenessController($params);
				break;
			case 'project_insert':
				$instance = new ProjectInsertController($params);
				break;
			case 'action_insert':
				$instance = new ActionInsertController($params);
				break;
			case 'track_action':
				$instance = new ActionTrackController($params);
				break;
		}
		
		return $instance;
	}
	
	function Controller($params) 
	{
		$this->params = $params;
	}
	
	abstract public function run();
	
	public function getError()
	{
		return 'Ошибка в контроллере';
	}
	
	protected function connect()
	{
		if (!isset($this->db))
		{
			$this->db = new DataBase();
		}
		
		return !$this->db->isError();
	}
}

?>
