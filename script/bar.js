$(document).ready(function () {


    $("#openAllOrder").click(function (event) {
        console.log("hey");
        openArea(event, 'All');
    });

    $("#openUnpaidOrder").click(function (event) {
        console.log("hey");
        openArea(event, 'Unpaid');
    });

    $("#openPaidOrder").click(function (event) {
        console.log("hey");
        openArea(event, 'Paid');
    });

    $("#openUpdateOrder").click(function (event) {
        console.log("hey");
        openArea(event, 'Update');
    });
    $("#menu-bar").addClass("active");
});

function openArea(evt, areaName) {
    var i, tabContent, tabLinks;

    tabContent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
    }

    tabLinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tabLinks.length; i++) {
        tabLinks[i].className = tabLinks[i].className.replace(" active", "");
    }

    document.getElementById(areaName).style.display = "block";
    evt.currentTarget.className += " active";
}