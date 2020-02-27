class Table_Controller extends Master_Controller {

    constructor() {
        super();
    }

    index() { // The default function call if there is no action on the page (usually call only to load the page once
        console.log("i'm in Table controller");
        this.start_page(translate("sentence_ChooseYourTable", "sw"), "table");
        this.addHTMLFileToDOM("./views/table/table_selection.html", "body");
        this.end_page();
    }

    test_action() {
        console.log("I'm an action from Table controller");
    }

    ajax_book_table() {

        console.log("do something for booking...")
        return 1;

    }

}