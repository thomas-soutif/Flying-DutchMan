$(document).ready(function () {

   addListenerForIndex();

    setDefaultLanguageIfNotExist("en");
    setBackgroundColorForLanguageLink("yellow");
    translateAllDOM();
    setUsernameInMenu();
    setTimeout(addListenerForIndex,200);

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

});

function resetLocalStorage() {
    localStorage.clear();
}


function setBackgroundColorForLanguageLink(color) {

    let id = "#language_" + getCurrentLanguage();
    $('.languageSelection').each(function (index) {
        $(this).css("background-color","");
    })

    $(id).css("background-color",color);
}

function addListenerForIndex() {

    $(".resetLocalStorage").click(function () {
        resetLocalStorage();
    });

    $(".languageSelection").click(function (e) {
        e.preventDefault();
        let lang = $(this).data("lang");
        setLanguage(lang);
        translateAllDOM();
        setBackgroundColorForLanguageLink("yellow");

    });

}

function getUrlVars() {
    let vars = {};
    let parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

function translateAllDOM(){

    $('.translate').each(function (index) {
        $(this).text(translate($(this).data("translate-key")));
    })

}

function translateElementInDOM(jQueryElement)
{
    $(jQueryElement).find(".translate").each(function (index) {
        $(this).text(translate($(this).data("translate-key")));
    })
}

function translate(str){
    let lang = getCurrentLanguage();
    let str_lang_to_translate = "translate_to_" + lang;
    return eval(str_lang_to_translate + "." + str);

}

function getCurrentLanguage()
{
    setDefaultLanguageIfNotExist("en");
    return sessionStorage.getItem("current_lang");
}

function setLanguage(lang)
{
    sessionStorage.setItem("current_lang",lang);
}

function setDefaultLanguageIfNotExist(str_lang) {
    if(sessionStorage.getItem("current_lang") == null)
    {
        sessionStorage.setItem("current_lang",str_lang);
    }

}

function ajaxCall(action,parameter){

    return eval("controller_obj" + "." + action + "(" + JSON.stringify(parameter) + ")" + ";" );

}
function checkUserLogin() {
    if(sessionStorage.getItem("user") == null)
    {
        return null;
    }
    return sessionStorage.getItem("user");
}

function setUsernameInMenu() {
    if(checkUserLogin() != null)
    {
        console.log("hey")
        $("#menu-login").removeClass("translate").empty().append(checkUserLogin());
    }
}

