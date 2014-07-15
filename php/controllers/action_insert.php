<?php

class ActionInsertController extends Controller 
{
	function ActionInsertController($params) 
	{
		parent::Controller($params); 
	}
	
	public function run()
	{
		if (!$this->connect())
		{
			return false;
		}

		return $this->db->insert('actions', 'title, type, value, target_action, project_id', 
			'"' . $this->params->title . '","' . $this->params->type . '",' .
			'"' . $this->params->value . '","' . $this->params->target_action . '",' .
			'"' . $this->params->project_id . '"'
			);
	}
}

?>
