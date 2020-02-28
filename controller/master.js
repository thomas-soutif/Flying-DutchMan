class Master_Controller
{

    start_page(title,controller) {
        this.addHTMLFileToDOM("./views/menu.html","body");
       //$("head").load('./views/head.html'); // Another wait to load html data (but replace all the content of head)
        console.log(title);
        eval('this.addHTMLFileToDOM("./views/'+controller+'/'+'head_content.html","head");');

        $(document).ready(function () { // To change dynamically content of something in the DOM, need to wait all is load
            $("title").append(title);
        });

    }


    end_page() {
        this.addHTMLFileToDOM("./views/footer.html","html");
    }


    addHTMLFileToDOM(source_html_code,destination){ // Function to add to the DOM from a file.
        $.get(source_html_code, function( html_code ) {
            $(destination).append(html_code);
        });

    }

    createAjaxResponse(data,error)
    {
        return {
            "data" : data,
            "error" : error
        };
    }

}