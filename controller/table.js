class Table_Controller extends Master_Controller {

    constructor() {
        super();
    }

    index() { // The default function call if there is no action on the page (usually call only to load the page once
        console.log("i'm in Table controller");
        this.start_page( "table");
        this.addHTMLFileToDOM("./views/table/table_selection.html", "body");
        this.end_page();
    }

    test_action() {
        console.log("I'm an action from Table controller");
    }

    ajax_book_table(parameter) {

        console.log("do something on the server side for booking...");
        console.log("Need to store on the database that this table is now busy");
        console.log(parameter);
        let error = bookTableByNum(String(parameter.tableNum),String(parameter.userId));
        let errorMessage ="";
        if(error){ // If there is an error
            switch (error) {
                case 1:
                    errorMessage = "The table is already booked.";
                    break;
                case 2 :
                    errorMessage = "The table doesn't exist.";
                    break;
                default:
                    break;

            }
            return this.createAjaxResponse(null,error,errorMessage);
        }
        // no error, we can return the new tables information for example
        return this.createAjaxResponse(getAllTablesInformations(),0,null);


    }

    ajax_get_TablesInformation() {

        return this.createAjaxResponse(getAllTablesInformations(), 0, null);

    }

    ajax_get_all_beverages() {
        const beverages = getAllBeverages();
        return this.createAjaxResponse(beverages, 0, "");
    }

    ajax_get_beverages_by_strength(strength) {
        const beverages = getBeveragesByStrength(strength);
        return this.createAjaxResponse(beverages, 0, "");
    }

    ajax_load_table_order_html(parameter)
    {
        this.addHTMLFileToDOM("./views/table/table_order.html",parameter.destination);
        return this.createAjaxResponse(null,0,"");
    }

    ajax_load_tab(table_num) {
        const tab = getTab(table_num);
        return this.createAjaxResponse(tab, 0, "");
    }

    ajax_add_beverage_to_tab_by_id(parameter) {

        const beverage = getBeverageById(parameter.beverageId);
        if (!beverage) {
            return this.createAjaxResponse(null, 1, "Beverage not found!");
        }

        addToTab(beverage,parameter.table_num);
        return this.createAjaxResponse(null, 0, "");
    }

    ajax_remove_beverage_from_tab_by_id(parameter) {
        removeFromTabById(parameter.beverageId,parameter.table_num);
        return this.createAjaxResponse(null, 0, "");
    }

    ajax_reset_tab() {
        resetTabDatabase();
        return this.createAjaxResponse(null, 0, "");
    }

    ajax_increase_beverage_amount_on_tab(parameter) {
        increaseBeverageAmountOnTab(parameter.beverageId,parameter.table_num);
        return this.createAjaxResponse(null, 0, "");
    }

    ajax_decrease_beverage_amount_on_tab(parameter) {
        decreaseBeverageAmountOnTab(parameter.beverageId,parameter.table_num);
        return this.createAjaxResponse(null, 0, "");
    }

    ajax_get_all_beveragesFromMenu(){
        let menu = getAllMenu();
        if(menu.menu.length > 0)
        {
            let final_json = [];
            for(let i=0; i < menu.menu.length; i++)
            {
                final_json.push(getBeverageById(menu.menu[i].article_id));
            }

            return this.createAjaxResponse(final_json, 0, "");
        }
        else
        {
            return this.createAjaxResponse(null,1,"Menu list is empty");
        }

    }
    ajax_have_permission_to_view_table(){
        let username =  checkUserLogin();
        if(username == null)
        {
            return this.createAjaxResponse(null,1,"You must be login with a bartender account to do that.")
        }
        let user = getUserDetails(username);
        console.log(user);
        if(user.user.role === "bartender" || user.user.role === "manager"){
            return this.createAjaxResponse(null,0,"");
        }
        else
        {
            return this.createAjaxResponse(null,2,"You don't have the permission to do that (bartender role needed)");
        }

    }

}
