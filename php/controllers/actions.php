<?php

class ActionsController extends Controller 
{
	function ActionsController($params) 
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
		
		return $this->db->select('actions', '*', 'project_id = ' . $this->params->project_id);
	}
}

?>
