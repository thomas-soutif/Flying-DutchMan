$(document).ready(function () {

    $(".buttonTableBook").click(function () {
        let tableNumber = $(this).data("table-number");
        let parameter = {"tableNum" : tableNumber,"userId" : 1};
        let response = ajaxCall("ajax_book_table",parameter);
        console.log(response);
        if(!response.error) // Return no error
        {
            console.log("no error");
            updateStatusOfAllTable(response.data);
            $(".pagecontainer").empty();
            let parameter = {"destination" : ".pagecontainer"};
            let response2 = ajaxCall("ajax_load_table_order_html",parameter);
            if(!response2.error)
            {
                setTimeout(() => {
                    addListenerForOrderTable();
                    loadBeverages();
                }, 100);
            }

        } else
        {
            // print the error
            alert(response.errorMessage);
        }

    });

    translateAllDOM();
    checkAndUpdateStatusOfTables();
    $("#menu-table").addClass("active");
});

function checkAndUpdateStatusOfTables()
{
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

function loadBeverages() {
    let idBeveragesList = "#beveragesList";
    let response = ajaxCall("ajax_get_all_beverages", null);
    let beverages = response.data;

    for (let i = 0; i < beverages.length; ++i) {
        let beverage = beverages[i];
        console.log(beverage);
        let beverageHtml =
            "<li>" +
            "<div>" +
            "<b>" + beverage.name + "</b>" +
            "<p>" + "Description: " + beverage.name2 + "</p>" +
            "<p>" + "Category: " + beverage.category + "</p>" +
            "<p>" + "Alcohol: " + beverage.alcoholStrength + "</p>" +
            "<p>Price: " + beverage.price + " " + "kr" + "</p>" +
            "<button>order</button>" +
            "</div>" +
            "</li>";

        $(idBeveragesList).append(beverageHtml);
    }
}

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

    function increaseValue(){
        document.getElementById("numberPlus").stepUp(1);
    }

    function decreaseValue(){
        document.getElementById("numberPlus").stepUp(-1);
    }

}
