<?php

class ProjectsController extends Controller 
{
	function ProjectsController($params) 
	{
		parent::Controller($params); 
	}

	public function run()
	{
		if (!$this->connect())
		{
			return false;
		}
		
		$projects = $this->db->select('projects', '*', '');
		
		if ($projects !== FALSE)
		{
			if (isset($this->params->full) && $this->params->full)
			{
				$result = Array();
				foreach($projects as $project)
				{
					$projectController = new ProjectController((object)Array(
							'id' => $project['id'],
							'filters' => $this->params->filters
						)
					);
					
					if (($project = $projectController->run()) !== FALSE)
					{
						array_push($result, $project);
					}
					else
					{
						$result = FALSE;
						break;
					}
				}
			}
			else
			{
				$result = $projects;
			}
		}
		else
		{
			$result = FALSE;
			$this->setDBQueryError();
		}
		
		return $result;
	}
}

?>
