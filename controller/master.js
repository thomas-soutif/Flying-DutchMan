class Master_Controller
{

    start_page(title) {

        $.get("./views/head.html", function( my_var ) { // Function to add to the DOM from a file. Add in the head and not replace eveyrthing
            console.log(my_var)
        $("head").append(my_var)
        });

       //$("head").load('./views/head.html'); // Another wait to load html data (but replace all the content of head)
        console.log(title);

        $(document).ready(function () { // To change dynamically content of something in the DOM, need to wait all is load
            $("title").text(title);
        });

        }




    end_page() {

        $.get("./views/footer.html", function( my_var ) { // Function to add to the DOM from a file. Add in the head and not replace eveyrthing
            console.log(my_var)
            $("html").append(my_var)
        });

    }

}