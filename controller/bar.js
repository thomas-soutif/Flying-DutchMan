/**
 * File: bar.js
 *
 * This class contains the javascript code for the bar controller. It is responsible to load the html view. Further, you would define ajax functions, which access the models.
 *
 * Author: Thomas Soutif
 */

class Bar_Controller extends Master_Controller {

    constructor() {
        super();
    }

    /**
     * Function to load the view
     */
    index(){ // The default function call if there is no action on the page (usually call only to load the page once
        console.log("i'm in bar controller")

        // Load the header
        this.start_page("bar");

        // Load the body
        this.addHTMLFileToDOM("./views/bar/bar_gestion.html","body");

        // Load the footer
        this.end_page();
    }

}
