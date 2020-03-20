class Master_Controller
{

    start_page(controller) {
        this.addHTMLFileToDOM("./views/menu.html","body");
        eval('this.addHTMLFileToDOM("./views/'+controller+'/'+'head_content.html","head");');

    }


    end_page() {
        this.addHTMLFileToDOM("./views/footer.html","html");
    }


     addHTMLFileToDOM(source_html_code,destination){ // Function to add to the DOM from a file.

        /*$.get(source_html_code, function( html_code ) {
            $(destination).append(html_code);

        });*/
        $.ajax({
            url: source_html_code,// mandatory
            method:'GET',
            dataType: "html",
        }).done(function (html) {
            $(destination).append(html);
        });
    }

    createAjaxResponse(data,error,errorMessage)
    {
        return {
            "data" : data,
            "error" : error,
            "errorMessage" : errorMessage
        };
    }

    loadScript(sourceFile) // for the moment not use because of conflict
    {
       /* $.getScript( sourceFile )
            .done(function( script, textStatus ) {
            })
            .fail(function( jqxhr, settings, exception ) {
               console.log("Fail to load the script from " + sourceFile);
            });*/
        $.ajax({
            async: false,
            url: sourceFile,
            dataType: "script"
        });
    }

}