class Table_Controller extends Master_Controller {

    constructor() {
        super();
    }

    index() { // The default function call if there is no action on the page (usually call only to load the page once
        console.log("i'm in Table controller");
        this.start_page(translate("sentence_ChooseYourTable"), "table");
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
}