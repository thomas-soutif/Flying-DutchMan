# Flying-DutchMan

How tun run it : Be sure to execute a HTTP server in local. With Python for example : python3 -m http.server

Structure of the page : To access a page you just have to change the controller parameter (who is url) and the action if there is one. 
Example : http://localhost:8000/index.html?url=Home to access to the main page (controll by the Home controller)
          http://localhost:8000/index.html?url=Home&action=tryToLogin to access to the tryToLogin() function of the Home controller
          
Translation : To translate a sentence , call the function translate(str, lang) who take 2 parameters : the string to translate, and the destination language. This function is in the script/index.js file, and will be always load with the index.html page.

Add or remove some translation : To add a new string, go to lang/ repertory and add your string and the translation (don't forgot to add it for all current language).

A controller is like a brain who have access only to his page : The Home controller can only manage the Home.HTML page, the Login controller can only manage the Login.HTML page ect.. Normally it's one controller per big page, but here we will have I think just few controller :

-Home controller : Access to the main page and have controll on the login functions
-Table controller : Access to all the thing who have a relation with the Table interface
-Bar controller : Access to all the thing who have a relation with the Bar interface

For the moment, let concentrate on theses. 
         
  
