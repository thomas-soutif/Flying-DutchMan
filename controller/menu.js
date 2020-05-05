/**
 * File: menu.js
 *
 * This file contain all the function use for the menu functionality
 *
 * Version 1.5
 * Author: Thomas SOUTIF
 */


class Menu_Controller extends Master_Controller {

    constructor() {
        super();
    }
    // The default function call if there is no action on the page (usually call only to load the page once)
    index(){
        this.start_page("menu");
        this.addHTMLFileToDOM("./views/menu/menu_gestion.html","body");
        this.end_page();
    }

    //Get the data's of the actual menu
    ajax_getAllMenu(){
        let menu = getAllMenu();
        if(menu.menu.length > 0)
        {
            return this.createAjaxResponse(menu, 0, "");
        }
        else
        {
            return this.createAjaxResponse(null,1,"Menu list is empty");
        }

    }

    // Get all the beverage
    ajax_get_all_beverages() {
        const beverages = getAllBeverages();
        return this.createAjaxResponse(beverages, 0, "");
    }

    // Get a specific beverage with his ID
    ajax_get_beverage_byId(parameter){
        let beverage = getBeverageById(parameter.beverageId);
        if (!beverage) {
            return this.createAjaxResponse(null, 1, "Beverage not found!");
        }
        return this.createAjaxResponse(beverage, 0, "");
    }

    // Update the menu in the database with the new menu list
    ajax_updateMenu(menuList) {

        if(!updateAllMenu(menuList)){
            return this.createAjaxResponse(null,0,"");
        }
        return this.createAjaxResponse(null,1,"Cannot update the menu.")

    }
}

//************
// END of file menu.js
//************