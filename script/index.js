$(document).ready(function () {

    $(".resetLocalStorage").click(function () {
        resetLocalStorage();
        alert("Databse reset to default");
    })




});
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

function translate(str,lang){

    let str_lang_to_translate = "translate_to_" + lang;
    return eval(str_lang_to_translate + "." + str);

}

function ajaxCall(action,parameter){

    return eval("controller_obj" + "." + action + "(" + JSON.stringify(parameter) + ")" + ";" );

}


function setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
  var user=getCookie("username");
  if (user != "") {
    alert("Welcome again " + user);
  } else {
     user = $("#fname").val();
     setCookie("username", user, 30);
  }
}

function resetLocalStorage() {
    localStorage.clear();
}