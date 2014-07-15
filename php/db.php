<?php

class DataBase
{
	function DataBase()
	{
		try 
		{
			$this->pdo = new PDO('mysql:host=localhost;dbname=vkstats','root','');
			$this->pdo->exec('SET NAMES utf8');
			$this->error = false;
		}
		catch (PDOException $e)
		{
			$this->error = true;
		}
	}
	
	public function isError()
	{
		return $this->error;
	}
	
	public function select($table, $columns, $where, $sort = '')
	{
		$sql = 'SELECT ' . $columns . ' FROM ' . $table;		
		if ($where)
		{
			$sql .= ' WHERE ' . $where;
		}
		if ($sort)
		{
			$sql .= ' ORDER BY ' . $sort;
		}

		$query = $this->pdo->prepare($sql);
		$query->execute();
		$rows = $query->fetchAll(PDO::FETCH_ASSOC);

		return $rows;
	}
	
	public function select_count($table, $column, $where, $distinct)
	{
		return $this->select($table, 'COUNT(' . ($distinct ? 'DISTINCT ' : '') . $column . ') AS count', $where);
	}
	
	public function insert($table, $columns, $values)
	{
		$sql = 'INSERT INTO '  . $table . ' (' . $columns . ') VALUES(' . $values . ')';		
		$query = $this->pdo->prepare($sql);
		
		if ($query->execute() !== FALSE)
		{
			$result = $this->pdo->lastInsertId();
		}
		else
		{
			$result = FALSE;
		}
		
		return $result;
	}
}

?>
