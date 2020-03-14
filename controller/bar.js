class Bar_Controller extends Master_Controller {

    constructor() {
        super();
    }

    index(){ // The default function call if there is no action on the page (usually call only to load the page once
        console.log("i'm in bar controller")
        this.start_page("bar");
        this.addHTMLFileToDOM("./views/bar/bar_gestion.html","body");
        this.end_page();
    }

}