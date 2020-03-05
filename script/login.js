$(document).ready(function () {

    $("#button-login").click(function (e) {
        e.preventDefault();
        let user= sessionStorage.getItem("user");
        if (user != null) {
            alert("Welcome again " + user);
        } else {

            let parameter = {"userName" : $("#fname").val() ,"password" : $("#psword").val()}
            let response = ajaxCall("ajax_try_login",parameter);
            console.log(response);
            if(!response.error) // Return no error
            {
                console.log("no error");
                alert("login success");
                window.location.replace("/index.html?url=Home");
            } else
            {
                // print the error
                alert(response.errorMessage);
            }
        }
    });

    $('#a-logout').click(function () {
        sessionStorage.removeItem("user");

    });

    tryAddUserNameText();

});

function tryAddUserNameText() {
    let user = checkUserLogin();
    if(checkUserLogin() != null)
    {
        $('#userNameInfo').text(user);
    }
}
