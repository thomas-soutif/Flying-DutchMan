/**
 * File: index.js
 *
 * This file contain all the script use for the hole website. This is all the functions we're gonna use whatever the page we are
 *
 * Version 1.5
 * Author: Thomas SOUTIF
 */



$(document).ready(function () {

    addListenerForIndex();
    setDefaultLanguageIfNotExist("en");
    setBackgroundColorForLanguageLink("yellow");
    translateAllDOM();
    setUsernameInMenu();
    setTimeout(addListenerForIndex,200); // Add all the listener when we are sure all the html element are load (synchronous)

// Set a new cookie
function setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

//Get a cookie by his name
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

//Reset the database to default
function resetLocalStorage() {
    localStorage.clear();
}

// Set the background color for the language selection
function setBackgroundColorForLanguageLink(color) {

    let id = "#language_" + getCurrentLanguage();
    $('.languageSelection').each(function (index) {
        $(this).css("background-color","");
    })

    $(id).css("background-color",color);
}

// Contain all the listener use by the index script page
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

// Get the value of the URL parameter , use in the index.html to create the correct object controller.
function getUrlVars() {
    let vars = {};
    let parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

// Translate dynamically all the current page we are
function translateAllDOM(){

    $('.translate').each(function (index) {
        $(this).text(translate($(this).data("translate-key")));
    })

}

// Translate a specific element on the page, very useful to improve performance
function translateElementInDOM(jQueryElement)
{
    $(jQueryElement).find(".translate").each(function (index) {
        $(this).text(translate($(this).data("translate-key")));
    })
}

//This function is use by the general translate functions to translate a specific label
function translate(str){
    let lang = getCurrentLanguage();
    let str_lang_to_translate = "translate_to_" + lang;
    return eval(str_lang_to_translate + "." + str);

}

// Return the current language
function getCurrentLanguage()
{
    setDefaultLanguageIfNotExist("en");
    return sessionStorage.getItem("current_lang");
}

//Set a new language in the session , to ensure that the language don't change when we switch of pages
function setLanguage(lang)
{
    sessionStorage.setItem("current_lang",lang);
}

// Set the default language if there is no language yet set on the session
function setDefaultLanguageIfNotExist(str_lang) {
    if(sessionStorage.getItem("current_lang") == null)
    {
        sessionStorage.setItem("current_lang",str_lang);
    }

}

//This functions should be use by every script when make an ajax call. The controller will return the data's
function ajaxCall(action,parameter){

    return eval("controller_obj" + "." + action + "(" + JSON.stringify(parameter) + ")" + ";" );

}

//Verify if there is a user connect
function checkUserLogin() {
    if(sessionStorage.getItem("user") == null)
    {
        return null;
    }
    return sessionStorage.getItem("user");
}

// Add the username in the DOM dynamically
function setUsernameInMenu() {
    if(checkUserLogin() != null)
    {
        console.log("hey")
        $("#menu-login").removeClass("translate").empty().append(checkUserLogin());
    }
}

//************
// END of file index.js
//************