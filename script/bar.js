/**
 * File: bar.js
 *
 * This file contains the javascript necessary to provide functionality on the bar page.
 *
 * Author: Thomas Soutif
 */

// Function called when view was loaded
$(document).ready(function () {

    // Add click handlers for buttons //

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

/**
 * Open certain area by adjusting css classes
 */
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

//************
// END of file bar.js
//************
