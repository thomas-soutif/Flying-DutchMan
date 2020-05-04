/**
 * File: home.js
 *
 * Show our menu on the home page.
 *
 * Author: Yu-Lun Chang, Thomas Soutif
 */


$(document).ready(function () {
    translateAllDOM();
    $("#menu-home").addClass("active");
    loadAndShowMenu();  // Load our menu.
});


function  loadAndShowMenu()
{
    let response = ajaxCall("ajax_getAllMenu", null);
    if(!response.error)  // Show menu if menu exist.
    {
        let menu = response.data.menu;
        for (let i = 0; i < menu.length; i++) {
            let menuListHTML =
                $("<div/>").attr("data-beverageId", menu[i].article_id).attr("class","itemMenuList").append($("<span>").attr("class", "menuListNameItem").append(menu[i].allInfo.name)).append("<br/>").
                append($("<span>").attr("class", "menuListPriceItem").append(menu[i].price +" SEK"));
            $("#menuList").append(menuListHTML);
        }
    }
    else  // Deal with error.
    {
        console.log(response.errorMessage);
        if(response.error === 1)  // Empty list.
        {
            obj_ListMenu = new ListMenuAjax(); // The list should be create.
        }
    }
    translateElementInDOM("#menuList");  // Deal with multi-language.
}

//************
// END of file home.js
//************
