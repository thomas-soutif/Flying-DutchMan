/**
 * File: login.js
 *
 * This file contains the javaScript to store or delete cookie.
 * Users don't need to login again if they stored cookie.
 *
 * Author: Yu-Lun Chang, Thomas Soutif
 */


/* If users log out, we delete their cookie information. */
$(document).ready(function () {
    $('#a-logout').click(function () {
        sessionStorage.removeItem("user");
    });
    translateAllDOM();
    tryAddUserNameText();  // Call "addListener" function
    $("#menu-login").addClass("active");  // User status change to"active" which means already login. 
    setTimeout(addListener,200);  // Call "addListener" function after 200 millisecond.
});

/* If users already login, get their data. */
function tryAddUserNameText() {
    let user = checkUserLogin();
    if(checkUserLogin() != null)
    {
        $('#userNameInfo').text(user);
    }
}

/* After users login, add their information in to Cookie. */
function addListener(){
    $("#button-login").click(function (e) {
        let user= sessionStorage.getItem("user");
        if (user != null) {  // If user already exist.
            alert("Welcome again " + user);
        } 
        else {  // If user is not exist, add them in the cookie.
            let parameter = {"userName" : $("#fname").val() ,"password" : $("#psword").val()}
            let response = ajaxCall("ajax_try_login",parameter);
            console.log(response);
            if(!response.error)  // Return no error
            {
                console.log("no error");
                alert("login success");
                window.location.replace("/index.html?url=Home");
            } else
            {                
                alert(response.errorMessage);  //Print the error
            }
        }
    });
}
