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

    test_action(){
        console.log("I'm an action from Home controller");
    }
}