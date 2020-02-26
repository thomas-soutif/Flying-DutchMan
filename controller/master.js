class Master_Controller
{

    start_page(title) {

        this.addHTMLFileToDOM("./views/head.html","head");
       //$("head").load('./views/head.html'); // Another wait to load html data (but replace all the content of head)
        console.log(title);

        $(document).ready(function () { // To change dynamically content of something in the DOM, need to wait all is load
            $("title").text(title);
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

}