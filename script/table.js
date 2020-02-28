$(document).ready(function () {

    alert("The table.js file is load correctly");


    $("#book_2").click(function () {
        let response = ajaxCall("ajax_book_table");
        console.log(response);
        if(!response.error) // Return no error
        {
            console.log("no error");
            //$(".pagecontainer").remove();

        }
    });








});