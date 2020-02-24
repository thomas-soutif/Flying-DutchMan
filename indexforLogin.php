<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <title>OOAD's Advanture</title>
    <style type="text/css">
        body {
            margin: 0;
        }
    </style>
    <link rel="stylesheet" href="css/style.css">
</head>

<body background="assets/test.png">
<div id="input-box" style="display: block"> 
        <form id="formLogin" name="formLogin" method="post" action="login.php">
            <input type="text" id="userID" name="userID" placeholder="ID" ><br />
            <input type="password" name="userPassword" placeholder="Password"><br />
            <button >Login</button><p>
        </form>
        <form id="formRegister" name="formRegister" action= "register.php">
            <button>Register</button><br />
        </form>
</div>
</body>
</html>