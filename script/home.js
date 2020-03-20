$(document).ready(function () {


    translateAllDOM();
    $("#menu-home").addClass("active");
    loadAndShowMenu();


});


function  loadAndShowMenu()
{
    let response = ajaxCall("ajax_getAllMenu", null);
    if(!response.error)
    {

        let menu = response.data.menu;
        for (let i = 0; i < menu.length; i++) {
            let menuListHTML =
                $("<div/>").attr("data-beverageId", menu[i].article_id).attr("class","itemMenuList").append($("<span>").attr("class", "menuListNameItem").append(menu[i].allInfo.name)).append("<br/>").
                append($("<span>").attr("class", "menuListPriceItem").append(menu[i].price +" SEK"));

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
