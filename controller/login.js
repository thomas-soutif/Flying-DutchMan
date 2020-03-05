class Login_Controller extends Master_Controller {

    constructor() {
        super();
    }

    index(){ // The default function call if there is no action on the page (usually call only to load the page once
        console.log("i'm in login controller")
        this.start_page(translate("string_SignIn"),"login");
        if(sessionStorage.getItem("user") == null)
        {
            this.addHTMLFileToDOM("./views/login/login_form.html","body");
        }
        else
        {
            this.addHTMLFileToDOM('./views/login/already_login.html',"body");
        }


        this.end_page();
    }

    ajax_try_login(parameter){
        console.log(parameter);
        let bool = loginVerification(String(parameter.userName),String(parameter.password));
        if(bool)
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