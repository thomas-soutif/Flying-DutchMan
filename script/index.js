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

function ajaxCall(action){

    return eval("controller_obj" + "." + action + "()");

}