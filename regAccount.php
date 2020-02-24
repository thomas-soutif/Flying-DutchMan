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
      include('dbConnection.php');      
      $a = $_POST['id'];
      $b = $_POST['password'];
      $c = "INSERT INTO user  VALUES ('$a', '$b', 'Normal', 0, 0)"; 
      if (mysql_query($c))
      {
      	echo '註冊成功<br>';
            echo "您的帳號是$a<br>";
            echo "您的密碼是$b <a href=\"index.php\">按此回登入頁面";
      }
      else
      {
      	echo '帳號已存在 請重新註冊 <a href="index.php">按此回登入頁面';
      }
 ?>
</button><p>
</form>
</div>
</body>
</html>