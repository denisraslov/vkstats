<?php

class ProjectInsertController extends Controller 
{
	function ProjectInsertController($params) 
	{
		parent::Controller($params); 
	}
	
	public function run()
	{
		if (!$this->connect())
		{
			return false;
		}
		
		$result = $this->db->insert('projects', 'title', '"' . $this->params->title . '"');

		if ($result !== FALSE)
		{
			$result = Array(
				'id' => $result
			);
		}
		
		return $result;
	}
}

?>
