/**
 * File: model_menu.js
 *
 * This file contain all the function use to manipulate the database relate to the menu functionality
 *
 * Version 1.5
 * Author: Thomas SOUTIF
 */




//Get all the menu
function getAllMenu()
{
    let final_menu = {menu :[]}; // Initialize the variable who will be return (ensure that it's an json form)
    let menu_data = getDatabase("Menu_data");
    for (let i = 0; i < menu_data.menu.length; i++) {
        let beverage = getBeverageById(menu_data.menu[i].article_id);
        final_menu.menu[i] = menu_data.menu[i];
        final_menu.menu[i].allInfo = beverage;

    }
   return final_menu;
}

//Update all the menu with the new data's
function updateAllMenu(menuList)
{
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let final_json = { menu: []};
    let menu_data = getDatabase("Menu_data");
    for(let i = 0; i < menuList.length; i++){

        let beverageIdx = menu_data.menu.findIndex(
            beverage => beverage.article_id === menuList[i].article_id
        );

        if (beverageIdx < 0) { // New beer on the menu
            menuList[i].stock = "10";
            menuList[i].last_modification_date = date + time;
        }
        final_json.menu.push(menuList[i]);

    }
    updateDatabase("Menu_data",final_json);
    return 0;
}

//************
// END of file model_menu.js
//************