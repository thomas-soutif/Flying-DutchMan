$(document).ready(function () {

    alert("The table.js file is load correctly");


    $("#book_2").click(function () {
        console.log("hey");
        // $.ajax({
        //     url: "/index.html?url=Table&action=ajax_book_table",
        //     method: "GET",
        //     dataType: "json",
        // }).done(function (data) {
        //     console.log(data);
        //
        // }).fail(function () {
        //     alert("error ajax call");
        // });

        let response = ajaxCall("ajax_book_table");
        console.log(response);
    });








});