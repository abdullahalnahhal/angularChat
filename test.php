<?php
	echo 'string';
	return header('Content-Type: application/json');
	return header($_SERVER['SERVER_PROTOCOL'].' 400 Bad Request'); 
	// if (isset($_POST['username'] )== "admin" && isset($_POST['password']) == "admin") {
	// 	header('Content-Type: application/json');
	// 	 header($_SERVER['SERVER_PROTOCOL'].' 200 OK'); 
	// }
	// else{
	// 	 header($_SERVER['SERVER_PROTOCOL']."401 Unauthorized"); 

	// }
?>