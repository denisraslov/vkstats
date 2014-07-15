<?php

include('query_handler.php');

$queryHandler = new QueryHandler($_GET);

echo $queryHandler->handle();

?>
