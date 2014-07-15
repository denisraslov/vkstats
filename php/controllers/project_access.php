<?php

class ProjectAccessController extends Controller 
{
	function ProjectAccessController($params) 
	{
		parent::Controller($params); 
	}
	
	//-------------------- methods --------------------------
	
	public function run()
	{
		return Array(
			'access' => rand(0, 100) % 2 == 0
		);
	}
}

?>
