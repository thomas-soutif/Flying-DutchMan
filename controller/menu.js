class Menu_Controller extends Master_Controller {

    constructor() {
        super();
    }

    index(){ // The default function call if there is no action on the page (usually call only to load the page once
        console.log("i'm in menu controller")
        this.start_page("menu");
        this.addHTMLFileToDOM("./views/menu/menu_gestion.html","body");
        this.end_page();
    }

    ajax_getAllMenu(){
        let menu = getAllMenu();
        return this.createAjaxResponse(menu, 0, "");
    }

    ajax_get_all_beverages() {
        const beverages = getAllBeverages();
        return this.createAjaxResponse(beverages, 0, "");
    }

    ajax_get_beverage_byId(parameter){
        let beverage = getBeverageById(parameter.beverageId);
        if (!beverage) {
            return this.createAjaxResponse(null, 1, "Beverage not found!");
        }
        return this.createAjaxResponse(beverage, 0, "");
    }
}