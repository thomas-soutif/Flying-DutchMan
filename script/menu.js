var listMenu;
$(document).ready(function(){

    $("#openBeers").click(function (event) {
        console.log("hey");
        openArea(event, 'Beers');
    });

    $("#openVIP").click(function (event) {
        openArea(event, 'VIPs');
    });

    $(".tabcontentScroll").scroll( () => {
        if($(".tabcontentScroll").scrollTop() + $(".tabcontentScroll").innerHeight() + 1 >= $(".tabcontentScroll").prop('scrollHeight')) {
            loadAndShowBeverages();
        }
    });



    loadAndShowMenu();
    addListenerForMenuList();
    loadAndShowBeverages();
});

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


function  loadAndShowMenu()
{
    let response = ajaxCall("ajax_getAllMenu", null);
    if(!response.error)
    {
        console.log(response);
        let menu = response.data.menu;
        listMenu = menu;
        console.log(menu);

        for (let i = 0; i < menu.length; i++) {
            let menuListHTML =
                $("<div/>").attr("data-beverageId", menu[i].article_id).attr("class","itemMenuList").append($("<span>").attr("class", "menuListNameItem").append(menu[i].allInfo.name)).append("<br/>").
                append($("<span>").attr("class", "menuListPriceItem").append(menu[i].price +" SEK")).
                append($("<span/>").attr("class", "menuListButton").append($("<button class='deleteItemMenuList'>").append("&times;")));

            $("#menuList").append(menuListHTML);
        }
    }
}


var currentBeverageStart = 0;
var currentBeverageEnd = 100;
function loadAndShowBeverages() {
    let response = ajaxCall("ajax_get_all_beverages", null);
    let beverages = response.data;

    for (let i =currentBeverageStart; i < currentBeverageEnd ; ++i) {
        let beverage = beverages[i];

        let beverageHtml =
            "<li draggable=\"true\" ondragstart=\"drag(event)\" id=\"" + beverage.id + "\">" +
            "<div>" +
            "<a href='#' class='open-modal click'><h1>"+beverage.name+"</h1></a>" +
            "<p>Price:"+ beverage.price +"kr</p>"+
            "<p>Alchool strength:" + beverage.alcoholStrength + "</p>" +
            "<p>Category :" + beverage.category +" </p>" +
            "</div>" +
            "</li>";

        $("#allBeveragesList").append(beverageHtml);
    }

    currentBeverageStart += 100;
    currentBeverageEnd += 100;

    addListenerForModal();
}

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

function addListenerForMenuList() {
    $('.deleteItemMenuList').on("click",function (e) {
        e.preventDefault();
        console.log("tr");
       deleteItemFromMenuList($(this).parent().parent().data("beverageid"));
    });

}



function addBeverageInfoToModal(beverage_id)
{
    let response = ajaxCall("ajax_get_beverage_byId", {beverageId : beverage_id});
    if(!response.error)
    {
        let beverage = response.data;
        let beverageInfoHtml =
            "<h1>"+beverage.name+"</h1>" +
            "<p><span class='modalInfoTitle'>Price:</span>"+ beverage.price +"kr</p>"+
            "<p><span class='modalInfoTitle'>Category:</span>"+beverage.category +"</p>"+
            "<p><span class='modalInfoTitle'>Alchool strength:</span>" + beverage.alcoholStrength + "</p>" +
            "<p><span class='modalInfoTitle'>Country:</span>"+beverage.country +"</p>"+
            "<p><span class='modalInfoTitle'>Region:</span>"+beverage.region +"</p>"+
            "<p><span class='modalInfoTitle'>Producer:</span>"+beverage.producer +"</p>"+
            "<p><span class='modalInfoTitle'>Provider:</span>"+beverage.provider +"</p>"+
            "<p><span class='modalInfoTitle'>Production Year:</span>"+beverage.productionYear +"</p>"+
            "<p><span class='modalInfoTitle'>Packaging:</span>"+beverage. packaging +"</p>"+
            "<p><span class='modalInfoTitle'>CAP type:</span>"+beverage.capType +"</p>"+
            "<p><span class='modalInfoTitle'>Is Organic:</span>"+beverage.isOrganic +"</p>"+
            "<p><span class='modalInfoTitle'>isKosher:</span>"+beverage.isKosher +"</p>";

        $(".infos").empty().append(beverageInfoHtml);

    }
    else
    {
        console.log(response.errorMessage);
    }

}

function drag(event) {
    let beverageId = event.target.id;
    event.dataTransfer.setData("text", beverageId);
}

function drop(event) {
    let beverageId = event.dataTransfer.getData("text");
    addBeverageToMenuTab(beverageId);
}

function allowDrop(event) {
    event.preventDefault();
}


function  addBeverageToMenuTab(beverageId) {
    let response = ajaxCall("ajax_get_beverage_byId", {beverageId : beverageId});
    let alreadyInMenu = false;
    if(!response.error) {
        let beverage = response.data;
        for (let i =0; i < listMenu.length ; ++i) {
            if(beverage.id === listMenu[i].allInfo.id)
            {
                alreadyInMenu = true;
            }
        }
        if(!alreadyInMenu)
        {
            let json = {};
            json.article_id = beverage.id;
            json.price = beverage.price;
            json.stock = "";
            json.last_modification_date = "";
            json.last_modification_userId = checkUserLogin();
            json.temporary_remove = false;
            json.allInfo = beverage;
            listMenu.push(json);
            let menuListHTML =
                $("<div/>").attr("data-beverageId", json.article_id).attr("class","itemMenuList").append($("<span>").attr("class", "menuListNameItem").append(json.allInfo.name)).append("<br/>").
                append($("<span>").attr("class", "menuListPriceItem").append(json.price +" SEK")).
                append($("<span/>").attr("class", "menuListButton").append($("<button>").attr("class", "deleteItemMenuList").append("&times;")));

            $("#menuList").append(menuListHTML);


            setTimeout(() => {
                addListenerForMenuList();
            }, 100);
        }

    }
    else{
        console.log(response);
    }


}


function deleteItemFromMenuList(beverageId){

    let inMenu = false;
    let index;
    for (let i =0; i < listMenu.length ; ++i) {
        if(String(beverageId) === listMenu[i].allInfo.id)
        {
            inMenu = true;
            index = i;
        }
    }
    if(inMenu){
        listMenu.splice(index,1);
        $('*[data-beverageId='+ beverageId + ']').remove();
    }
    console.log(listMenu);
}