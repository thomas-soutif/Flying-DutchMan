$(document).ready(function(){

    $("a.open-modal").on("click",function(e){
        e.preventDefault();

        $("body").addClass("modal-showing");
    })

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

    $("#openBeers").click(function (event) {
        console.log("hey");
        openArea(event, 'Beers');
    });

    $("#openVIP").click(function (event) {
        openArea(event, 'VIPs');
    });

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