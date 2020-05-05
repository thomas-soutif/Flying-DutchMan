/**
 * File: menu.js
 *
 * This file contains the javascript necessary to provide functionality on the management of the menu page.
 *
 * Version 1.5
 * Author: Thomas Soutif, Jonathan Stahl
 */




var obj_ListMenu;
// Function called when view was loaded
$(document).ready(function(){

    //When we click on the Beers tab, we show the right content
    $("#openBeers").click(function (event) {
        openArea(event, 'Beers');
    });
    //When we click on the Vip tab, we show the right content
    $("#openVIP").click(function (event) {
        openArea(event, 'VIPs');
    });
    //When the scroll arrive to the end, we load more beers. So we don't have to load all the beers from the database from the beginning
    $(".tabcontentScroll").scroll( () => {
        if($(".tabcontentScroll").scrollTop() + $(".tabcontentScroll").innerHeight() + 1 >= $(".tabcontentScroll").prop('scrollHeight')) {
            loadAndShowBeverages();
        }
    });
    //When we click on the undo button
    $(".buttUndo").click(function (event) {
        obj_ListMenu.undo();
       translateElementInDOM("#menuList"); // translate the content of the menu in the current language
    });
    //When we click on the redo button
    $(".buttRedo").click(function (event) {
        obj_ListMenu.redo();
        translateElementInDOM("#menuList");
    });
    //When we click on update the menu, we save it in the database
    $("#updateMenuList").click(function (){
        updateMenuOnDatabase(obj_ListMenu.getList());
    });
    //When the page load, we load and show the menu, then add the listener relate to it
    loadAndShowMenu();
    addListenerForMenuList();
    //Same but for the beverage list
    loadAndShowBeverages();
    $("#menu-menu").addClass("active");
    openArea(null, 'Beers'); // By default we open the list of beer (so we don't have to click on the tab)
});

// Open the tab content give by name
function openArea(evt, areaName) {
    var i, tabContent, tabLinks;

    tabContent = document.getElementsByClassName("tabcontentScroll");
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

// Take the menu from the database and show it
function  loadAndShowMenu()
{
    let response = ajaxCall("ajax_getAllMenu", null);
    if(!response.error)
    {
        let menu = response.data.menu;
        obj_ListMenu = new ListMenuAjax(menu);

        for (let i = 0; i < menu.length; i++) {
            let menuListHTML =
                $("<div/>").attr("data-beverageId", menu[i].article_id).attr("class","itemMenuList").append($("<span>").attr("class", "menuListNameItem").append(menu[i].allInfo.name)).append("<br/>").
                append($("<span>").attr("class", "menuListPriceItem").append(menu[i].price +" SEK")).
                append($("<span/>").attr("class", "menuListButton").append($("<button class='deleteItemMenuList translate' data-translate-key='string_Delete'>").append("Delete")));

            $("#menuList").append(menuListHTML);
        }
    }
    else
    {
        console.log(response.errorMessage);
        if(response.error === 1) // empty list
        {
            obj_ListMenu = new ListMenuAjax(); // the list should be create
        }
    }
    translateElementInDOM("#menuList");

}


var currentBeverageStart = 0;
var currentBeverageEnd = 100; // Maximum beverage show in one time

//Take the beverage from database and show it
function loadAndShowBeverages() {
    let response = ajaxCall("ajax_get_all_beverages", null);
    let beverages = response.data;

    for (let i =currentBeverageStart; i < currentBeverageEnd ; ++i) {
        let beverage = beverages[i];

        let beverageHtml =
            "<li draggable=\"true\" ondragstart=\"drag(event)\" id=\"" + beverage.id + "\">" +
            "<div>" +
            "<a href='#' class='open-modal click'><h2>"+beverage.name+"</h2></a>" +
            "<p><span class='translate' data-translate-key='string_Price'>Price</span> :"+ beverage.price +"kr</p>"+
            "<p><span class='translate' data-translate-key='string_AlchoolStrength'>Alchool strength</span> :" + beverage.alcoholStrength + "</p>" +
            "<p><span class='translate' data-translate-key='string_Category'>Category</span> :" + beverage.category +" </p>" +
            "</div>" +
            "</li>";

        $("#allBeveragesList").append(beverageHtml);
    }

    currentBeverageStart += 100;
    currentBeverageEnd += 100;

    addListenerForModal();
    translateElementInDOM("#Beers");

}

/**
 * Add some event handlers to html elements
 */
function addListenerForModal() {
    $("a.open-modal").on("click",function(e){
        e.preventDefault();
        addBeverageInfoToModal($(this).parent().parent().attr("id"));
        $("body").addClass("modal-showing");
    });

    $(".info-container").on("click", function(e){
        e.preventDefault();

        $("body").addClass("closing");
        $("body").removeClass("modal-showing closing");
        var transEnd = "transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd";

        $("info-container.info").one(transEnd, function(){


            $(this).off(transEnd);
        });
    });

    $(".infos").on("click", function(e) {
        e.stopPropagation();
        return true;
    });
}

/**
 * Add some event handlers to html elements
 */
function addListenerForMenuList() {
    $('.deleteItemMenuList').on("click",function (e) {
        e.preventDefault();
       deleteItemFromMenuList($(this).parent().parent().data("beverageid"));
    });

}


//When we click on a beverage to have more information's, load from the database and show the details about the beer in the modal
function addBeverageInfoToModal(beverage_id)
{
    let response = ajaxCall("ajax_get_beverage_byId", {beverageId : beverage_id});
    if(!response.error)
    {
        let beverage = response.data;
        let beverageInfoHtml =
            "<h1>"+beverage.name+"</h1>" +
            "<p><span class='modalInfoTitle translate' data-translate-key='string_Price'>Price</span> : "+ beverage.price +"kr</p>"+
            "<p><span class='modalInfoTitle translate' data-translate-key='string_Category'>Category</span> : "+beverage.category +"</p>"+
            "<p><span class='modalInfoTitle translate' data-translate-key='string_AlchoolStrength'>Alchool strength</span> : " + beverage.alcoholStrength + "</p>" +
            "<p><span class='modalInfoTitle translate' data-translate-key='string_Country'>Country</span> : "+beverage.country +"</p>"+
            "<p><span class='modalInfoTitle translate' data-translate-key='string_Region'>Region</span> : "+beverage.region +"</p>"+
            "<p><span class='modalInfoTitle translate' data-translate-key='string_Producer'>Producer</span> : "+beverage.producer +"</p>"+
            "<p><span class='modalInfoTitle translate' data-translate-key='string_Provider'>Provider</span> : "+beverage.provider +"</p>"+
            "<p><span class='modalInfoTitle translate' data-translate-key='string_ProductionYear'>Production Year</span> : "+beverage.productionYear +"</p>"+
            "<p><span class='modalInfoTitle translate' data-translate-key='string_Packaging'>Packaging</span> : "+beverage. packaging +"</p>"+
            "<p><span class='modalInfoTitle translate' data-translate-key='string_CAPType'>CAP type</span> : "+beverage.capType +"</p>"+
            "<p><span class='modalInfoTitle translate' data-translate-key='string_IsOrganic'>Is Organic</span> : "+beverage.isOrganic +"</p>"+
            "<p><span class='modalInfoTitle translate' data-translate-key='string_IsKosher'>isKosher</span> : "+beverage.isKosher +"</p>";

        $(".infos").empty().append(beverageInfoHtml);
        translateElementInDOM(".infos");

    }
    else
    {
        console.log(response.errorMessage);
    }

}
//When we drag a beer from the beer list
function drag(event) {
    let beverageId = event.target.id;
    event.dataTransfer.setData("text", beverageId);
}

//When we drop a beer, store it to the actual menu list and add it in the right div
function drop(event) {
    let beverageId = event.dataTransfer.getData("text");
    addBeverageToMenuTab(beverageId);

}

function allowDrop(event) {
    event.preventDefault();
}

//Add a beverage to the menu tab (only in local, no update in the database)
function addBeverageToMenuTab(beverageId) {
            obj_ListMenu.add(beverageId);
    translateElementInDOM("#menuList");
}

// Delete a beverage from the menu tab (only local).
function deleteItemFromMenuList(beverageId){
    obj_ListMenu.remove(beverageId);
}

//Update the list menu to the database
function updateMenuOnDatabase(listMenu) {

    let response = ajaxCall(" ajax_updateMenu",listMenu);
    if(!response.error)
    {
        alert("Menu updating successfully");
    }
    else{
        alert(response.errorMessage);
    }
}


//************
// END of file menu.js
//********