/**
 * File: master.js
 *
 * This file contain the functions need to manipulate the DOM. The class will be heritate by all the other controller to ensure that
 * everywhere in the program the manipulation of the DOM is the same.
 *
 * Version 2.0
 * Author: Thomas SOUTIF
 */




class Master_Controller
{
    // This function will load in the correct directory the right HTML file need to load all the script relate. The idea is to have
    // a controller for each different main page, to not have to load all the script everytime. We gain speed.
    start_page(controller) {
        this.addHTMLFileToDOM("./views/menu.html","body");
        eval('this.addHTMLFileToDOM("./views/'+controller+'/'+'head_content.html","head");');

    }

    //Load the html footer
    end_page() {
        this.addHTMLFileToDOM("./views/footer.html","html");
    }

    // this function makes it easy to add HTML to the DOM
     addHTMLFileToDOM(source_html_code,destination){

        $.ajax({
            url: source_html_code,// mandatory
            method:'GET',
            dataType: "html",
        }).done(function (html) {
            $(destination).append(html);
        });
    }
    //This function is use to create a generic ajax response for every page, and use to check the error and get the data give by the controller
    createAjaxResponse(data,error,errorMessage)
    {
        return {
            "data" : data,
            "error" : error,
            "errorMessage" : errorMessage
        };
    }

}

//************
// END of file master.js
//************