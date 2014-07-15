<?php

class ProjectController extends Controller 
{
	function ProjectController($params) 
	{
		parent::Controller($params); 
	}
	
	//-------------------- const --------------------------
	
	const ALL_ACTIONS_ID = 0;
	
	const SECONDS_PER_DAY = 86400;
	
	//-------------------- methods --------------------------
	
	protected function getProject()
	{
		$rows = $this->db->select('projects', '*', 'id = ' . $this->params->id);
		
		if ($rows && count($rows) == 1)
		{
			$result = $rows[0];
		}
		else
		{
			$result = FALSE;
		}
		
		return $result;
	}
	
	protected function getActions()
	{
		$actionsController = new ActionsController((object)Array(
				'project_id' => $this->params->id
			)
		);
		
		return $actionsController->run();
	}
	
	protected function getTargetStatistic($project)
	{
		$where = '';
		foreach ($project['actions'] as $action)
		{
			if ($action['target_action'])
			{
				$where .= $action['id'] . ',';
			}
		}
		if ($where)
		{
			$where = 'tracked_actions.action_id in (' . substr($where, 0, -1) . ')';
			
			$rows = $this->db->select('tracked_actions JOIN actions ON tracked_actions.action_id = actions.id', 
				'tracked_actions.time, tracked_actions.user_id, actions.title', 
				$where);
		}
		else
		{
			$rows = Array();
		}
		
		return $rows;
	}

	protected function getDailyStatistic()
	{
		$filters = $this->params->filters;
		
		$rows = $this->db->select('tracked_actions', '*', 'action_id=' . $filters->action_id, 'time ASC');
		
		if ($rows !== FALSE)
		{
			$map = Array();
			$lastRowTime = 0;
			
			foreach ($rows as $row)
			{
				$time = $row['time'];	
				$time = strtotime(date('d.m.Y 00:00:00', $time));
				
				if (!isset($map[$time]))
				{		
					if ($lastRowTime != 0 && $time != $lastRowTime)
					{
						for ($i = $lastRowTime + self::SECONDS_PER_DAY; $i < $time; $i += self::SECONDS_PER_DAY)
						{
							$map[$i] = Array(
								'count' => 0
							);
						}
					}
			
					$map[$time] = Array(
						'count' => 1,
						'users' => Array()
					);
					
					array_push($map[$time]['users'], $row['user_id']);
				}
				else
				{
					if (!$filters->unic || !in_array($row['user_id'], $map[$time]['users']))
					{
						$map[$time]['count']++;
						array_push($map[$time]['users'], $row['user_id']);
					}
				}
				
				$lastRowTime = $time;
			}
			
			$result = Array();
			foreach ($map as $key => $row)
			{
				array_push($result, Array(
						0 => $key,
						1 => $row['count']
					)
				);
			}
		}
		else
		{
			$result = FALSE;
		}
		
		return $result;
	}
	
	protected function getTotalStatistic($project)
	{
		$filters = $this->params->filters;
		$result = Array();
		
		foreach ($project['actions'] as $action)
		{
			if (!$this->pushActionCount($action['id'], $action['title'], $result, $filters->unic))
			{
				$result = FALSE;
				break;
			}		
		}

		return $result;
	}
	
	private function pushActionCount($actionId, $actionTitle, &$array, $unic)
	{
		$rows = $this->db->select_count('tracked_actions', 'user_id', 'action_id=' . $actionId, $unic);
		
		if ($rows !== FALSE)
		{
			array_push($array, Array( 
					'title' => $actionTitle,
					'count' => $rows[0]['count']
				)
			);
			
			return TRUE;
		}
		else
		{
			return FALSE;
		}
	}

	public function run()
	{
		if (!$this->connect())
		{
			return false;
		}
		
		$project = $this->getProject();
		$actions = $this->getActions();

		if (($project !== FALSE) && ($actions !== FALSE))
		{
			$project['actions'] = $actions;
			
			if (count($actions) > 0)
			{
				$filters = $this->params->filters;

				if ($filters->target)
				{
					$statistic = $this->getTargetStatistic($project);
				}
				else
				{
					if ($filters->action_id == self::ALL_ACTIONS_ID)
					{
						$statistic = $this->getTotalStatistic($project);
					}
					else
					{
						$statistic = $this->getDailyStatistic();
					}
				}
			}
			else
			{
				$statistic = Array();
			}

			if ($statistic !== FALSE)
			{
				$project['statistic'] = $statistic;
				$result = $project;
			}
			else
			{
				$result = FALSE;
			}
		}
		else
		{
			$result = FALSE;
		}
		
		return $result;
	}	
}

?>
