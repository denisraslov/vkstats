<?php

class ActionTrackController extends Controller 
{
	function ActionTrackController($params) 
	{
		parent::Controller($params); 
	}
	
	public function run()
	{
		if (!$this->connect())
		{
			return false;
		}

		return $this->db->insert('tracked_actions', 'time, action_id, user_id', 
			'"' . time() . '","' . $this->params->action_id . '",' .
			'"' . $this->params->user_id . '"'
			);
	}
}

?>
