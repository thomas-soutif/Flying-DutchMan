/**
 * File: login.js
 *
 * This file contains the javaScript to store or delete cookie.
 * Users don't need to login again if they stored cookie.
 *
 * Author: Yu-Lun Chang, Thomas Soutif
 */


class Login_Controller extends Master_Controller {

    constructor() {
        super();
    }

    index(){  // The default function call if there is no action on the page (usually call only to load the page once).
        console.log("i'm in login controller")
        this.start_page("login");  // The page after login.
        if(sessionStorage.getItem("user") == null)
        {
            this.addHTMLFileToDOM("./views/login/login_form.html","body");  // Create this user.
        }
        else  // If this user already exist.
        {
            this.addHTMLFileToDOM('./views/login/already_login.html',"body");
        }


        this.end_page();
    }

    ajax_try_login(parameter){
        console.log(parameter);
        let bool = loginVerification(String(parameter.userName),String(parameter.password));  // Check that this user is exist and password is correct.
        if(bool)  // If the verification pass.
        {
            let user = getUserDetails(String(parameter.userName));
            sessionStorage.setItem("user",user.user.userName);
            return this.createAjaxResponse(user,0,null);
        }
        else
        {
            return this.createAjaxResponse(null,1,"Access denied.");
        }

    }
}

//************
// END of file login.js
//************
