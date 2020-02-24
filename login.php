<html>
<head>
<title>Reg</title>
<link rel="stylesheet" href="css/style.css">
</head>
<body background="assets/test.png">
<div id="message-box" style="display: block"> 
<form>
<button>
<?php
	/* Check ID and password in the database */
	include('dbConnection.php');
	$id = $_POST['userID'];
	$pw = $_POST['userPassword'];
	$password = mysql_query("select Password from user where Account='$id' ");
	$password = mysql_fetch_row($password);
	if($password[0] == $pw && $pw!='')
	{
		session_start();
		$_SESSION['userID'] = $id;
		$_SESSION['userPassword'] = $pw;
		header("Location: game.php");
	}
	else
	{
		echo '<a href="index.php">帳號或密碼錯誤，按此回登入頁面';
	}
?>
</button><p>
</form>
</div>
</body>
</html>