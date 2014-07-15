<?php

class ActionCompletenessController extends Controller 
{
	function ActionCompletenessController($params) 
	{
		parent::Controller($params); 
	}
	
	//-------------------- methods --------------------------

	public function run()
	{
		if (!$this->connect())
		{
			return false;
		}
		
		$rows = $this->db->select('tracked_actions', '*', 
			'action_id = ' . $this->params->action_id . ' AND user_id = "' . $this->params->user_id . '"');

		if ($rows !== FALSE)
		{
			$result = Array(
				'is_completed' => count($rows)
			);
		}
		else
		{
			$result = FALSE;
		}
		
		return $result;
	}
}

?>
