<?php
	/* This file contain information grabbed from database, and then through json_encode() function to send player data. */
	include('dbConnection.php');

	session_start();
	$tmp = $_SESSION['userID'];
	$a = mysql_query("select* from pet where Account='$tmp' ");
	$a = mysql_fetch_row($a);
	
	echo json_encode(array(
		 'Name'=> $a[1], 
		 'Hunger' => $a[2],
		 'Intimacy' => $a[3],
		 'HealthPoint' => $a[4],
		 'MagicPoing' => $a[5],
		 'Level' => $a[6],
		 'EXP' => $a[7]
	));


?>