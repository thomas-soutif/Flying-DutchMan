$(document).ready(function () {




    $("#book_2").click(function () {
        let parameter = {"tableNum" : "2","userId" : 1}
        let response = ajaxCall("ajax_book_table",parameter);
        console.log(response);
        if(!response.error) // Return no error
        {
            console.log("no error");
            //$(".pagecontainer").remove();

        } else
        {
            // print the error
            alert(response.errorMessage);
        }
    });








});