/**
 * File: table.js
 *
 * This file contains the javascript necessary to provide functionality on the table ordering page.
 *
 * Author: Jonathan Stahl, Thomas Soutif
 */

// Function called when view was loaded
$(document).ready(function () {
    // Click handler for booking button
    $(".buttonTableBook").click(function () {
        // Retrieve table number and try to book table
        let tableNumber = $(this).data("table-number");
        let parameter = {"tableNum" : tableNumber,"userId" : 1};
        let response = ajaxCall("ajax_book_table",parameter);
        console.log(response);
        // If table exists and was available update all tables and open ordering page
        if(!response.error) // Return no error
        {
            console.log("no error");
            updateStatusOfAllTable(response.data);
            $(".pagecontainer").empty();
            let parameter = {"destination" : ".pagecontainer"};
            let response2 = ajaxCall("ajax_load_table_order_html",parameter);
            if(!response2.error)
            {
                actual_table = tableNumber;
                // Timeout needed in order the be sure all elements are loaded before adding listeners for ordering page
                setTimeout(() => {
                    addListenerForOrderTable();
                    loadBeverages(); // Load initial beverages
                    //resetTab();
                    updateTab();
                    openArea(null,"openBeverages");
                }, 150);
            }

        } else
        {
            // print the error
            alert(response.errorMessage);
        }

    });

    // Click handler for button view table
    $(".buttonViewTable").click(function () {

        // Check if user has permission to view a table
        let response = ajaxCall("ajax_have_permission_to_view_table",null);
        if(response.error)
        {
            alert(response.errorMessage);
            return
        }

        // Open ordering page if user has permission
        let tableNumber = $(this).data("table-number");
        $(".pagecontainer").empty();
        let parameter = {"destination" : ".pagecontainer"};
        let response2 = ajaxCall("ajax_load_table_order_html",parameter);
        if(!response2.error)
        {
            actual_table = tableNumber;
            setTimeout(() => {
                addListenerForOrderTable();
                loadBeverages(); // Load initial beverages
                //resetTab();
                updateTab();
            }, 150);
        }

    });

    // Translate texts
    translateAllDOM();
    checkAndUpdateStatusOfTables();
    $("#menu-table").addClass("active");
});
var actual_table;

/**
 * Fetch table information from database and update all the occupation states of the table.
 */
function checkAndUpdateStatusOfTables()
{
    // Get information from database
    let response = ajaxCall("ajax_get_TablesInformation",null);
    console.log(response);
    if(!response.error) // Return no error
    {
        updateStatusOfAllTable(response.data);

    } else
    {
        // print the error
        alert(response.errorMessage);
    }
}

/**
 * Update the table states in the view. Set availabe or busy.
 */
function updateStatusOfAllTable(tablesInfo)
{
    console.log(tablesInfo);
    for (let i = 0; i < tablesInfo.tables.length; i++) {
        let idStatusTable = "#tableStatus_" + tablesInfo.tables[i].table_num;
        if(tablesInfo.tables[i].available)
        {
            //let text = translate("string_Status") + " : " + translate("string_Available");
            let html ='<span class="translate" data-translate-key="string_Status"></span> : <span class="translate" data-translate-key="string_Available"></span> ';
            $(idStatusTable).html(html);
        }
        else
        {
            //let text = translate("string_Status") + " : " + translate("string_Busy");
            let html ='<span class="translate" data-translate-key="string_Status"></span> : <span class="translate" data-translate-key="string_Busy"></span> ';
            $(idStatusTable).html(html);
        }
        translateAllDOM();

    }
}

// Variables used for dynamically loading beverages while scrolling
var currentBeverageStart = 0;
var currentBeverageEnd = 10;

/**
 * Load beverages on menu from database and display them in the ordering section
 */
function loadBeverages() {
    let idBeveregesList = "#beveragesList";
    // Load from database
    let response = ajaxCall("ajax_get_all_beveragesFromMenu", null);
    if(!response.error)
    {
        let beverages = response.data;
        // Load only certain amount of beverages
        for (let i = currentBeverageStart; i < currentBeverageEnd; ++i) {
            let beverage = beverages[i];
            // Create dom element containing the beverage data
            let beverageHtml =
                "<li draggable=\"true\" ondragstart=\"drag(event)\" id=\"" + beverage.id + "\">" +
                "<div>" +
                "<b>" + beverage.name + "</b>" +
                "<p>" + "Description: " + beverage.name2 + "</p>" +
                "<p>" + "Category: " + beverage.category + "</p>" +
                "<p>" + "Alcohol: " + beverage.alcoholStrength + "</p>" +
                "<p>Price: " + beverage.price + " " + "kr" + "</p>" +
                "</div>" +
                "</li>";

            $(idBeveregesList).append(beverageHtml);
        }

        // Increase counters to load new beverages, if user scrolls down
        currentBeverageStart += 10;
        currentBeverageEnd += 10;
    }
    else
    {
        console.log(response.errorMessage);
    }


}

/**
 * Add some event handlers to html elements
 */
function addListenerForOrderTable()
{


    $("a.open-modal").on("click",function(e){
        e.preventDefault();

        $("body").addClass("modal-showing");
    });

    $(".info-container").on("click", function(e){
        e.preventDefault();

        $("body").addClass("closing");
        $("body").removeClass("modal-showing closing");
        let transEnd = "transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd";

        $("info-container.info").one(transEnd, function(){


            $(this).off(transEnd);
        });
    });

    $(".infos").on("click", function(e) {
        e.stopPropagation();
        return true;
    });

    $("#openBeverages").click(function (event) {
        openArea(event, 'beverages');
    });

    $("#openVIP").click(function (event) {
        openArea(event, 'VIPs');
    });

    $(".tabcontent").scroll( () => {
        if($(".tabcontent").scrollTop() + $(".tabcontent").innerHeight() + 1 >= $(".tabcontent").prop('scrollHeight')) {
            loadBeverages();
        }
    });


}

/**
 * Update tab view
 */
function updateTab() {
    // Load tab from db
    const response = ajaxCall("ajax_load_tab", actual_table);
    console.log(response.data);
    const beverages = response.data.items;
    const totalPrice = response.data.totalPrice;

    let tabHtml = "";

    // Construct tab html with beverages
    for (const beverage of beverages) {
        const beverageHtml =
            "<div class=\"beverage-tab-container\">" +
            "<div class=\"beverage-tab-name\">" + beverage.name + "</div>" +
            "<button class=\"increase-button\">+</button>" +
            "<input type=\"number\" value=\"" + beverage.amount + "\" disabled>" +
            "<button class=\"decrease-button\">-</button>" +
            "<div>" + beverage.price + "</div>" +
            "<div class=\"hidden-beverage-id\">" + beverage.id + "</div>" +
            "<button class=\"delete-button\"> X </button>" +
            "</div>" + "\n";
        tabHtml += beverageHtml;
    }

    // Set tab html
    $("#tab-container").html(tabHtml);
    // Set total price
    $("#total-price").text(totalPrice);

    // Tab button handlers //

    $(".delete-button").click(function (event) {
        let beverageId = $(this).closest(".beverage-tab-container").find(".hidden-beverage-id").html();
        removeBeverageFromTab(beverageId);
    });

    $(".increase-button").click(function (event) {
        let beverageId = $(this).closest(".beverage-tab-container").find(".hidden-beverage-id").html();
        increaseBeverageAmount(beverageId);
    });

    $(".decrease-button").click(function (event) {
        let beverageId = $(this).closest(".beverage-tab-container").find(".hidden-beverage-id").html();
        decreaseBeverageAmount(beverageId);
    });
}

/**
 * Increase beverage amount and update tab.
 *
 * @param {number} beverageId
 */
function increaseBeverageAmount(beverageId) {
    let parameter = {beverageId : beverageId, table_num: actual_table}
    let response = ajaxCall("ajax_increase_beverage_amount_on_tab", parameter);

    if (response.error === 1) {
        alert(response.errorMessage);
    }

    updateTab();
}

/**
 * Decrease beverage amount and update tab.
 *
 * @param {number} beverageId
 */
function decreaseBeverageAmount(beverageId) {
    let parameter = {beverageId : beverageId, table_num: actual_table}
    let response = ajaxCall("ajax_decrease_beverage_amount_on_tab", parameter);

    if (response.error === 1) {
        alert(response.errorMessage);
    }

    updateTab();
}

/**
 * Remove beverage and update tab.
 *
 * @param {number} beverageId
 */
function removeBeverageFromTab(beverageId) {
    let parameter = {beverageId : beverageId, table_num: actual_table}
    let response = ajaxCall("ajax_remove_beverage_from_tab_by_id", parameter);

    if (response.error === 1) {
        alert(response.errorMessage);
    }

    updateTab();
}

/**
 * Add beverage and update tab.
 *
 * @param {number} beverageId
 */
function addBeverageToTab(beverageId) {
    let parameter = {beverageId : beverageId, table_num : actual_table}
    let response = ajaxCall("ajax_add_beverage_to_tab_by_id", parameter);
    if (response.error === 1) {
        alert(response.errorMessage);
    }

    updateTab();
}

/**
 * Reset tab
 */
function resetTab() {
    ajaxCall("ajax_reset_tab", null);
}

// Drag And Drop //

function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    let beverageId = event.target.id;
    event.dataTransfer.setData("text", beverageId);
}

function drop(event) {
    let beverageId = event.dataTransfer.getData("text");
    addBeverageToTab(beverageId);
}

// End Drag and Drop //

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
