class Home_Controller extends Master_Controller {

    constructor() {
        super();
    }

    index(){ // The default function call if there is no action on the page (usually call only to load the page once
        console.log("i'm in home controller")
        this.start_page("home");
        this.addHTMLFileToDOM("/views/home/home_welcome.html","body");
        this.end_page();
    }

    test_action(){
        console.log("I'm an action from Home controller");
    }

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
}