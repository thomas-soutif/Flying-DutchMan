# Flying-DutchMan

## Requirement and Goal
This project is an application that allow you to order stuff on a table in bar.
There is different roles :
- The user can see the daily menu and order a table and some stuff. 
- A barman can update the dailymenu and see the table of client,and mark the table as paid

This project is intend to be construct with only javascript (no framework and external database needeed), with a model architecture base on controllers, that help multi-developping, and extension.
The database is store in the browser storage, I created a library in the project to manage it (model_api.js)

The interfaces have been think to have a good interaction for the user. We did not take time to make the interface beautiful, but fonctional. We were also limited in time.

The application can be switch between English and Swedish. The translation is fully dynamic and have been think to be able to add new language easily.

## Run it
Be sure to execute a HTTP server in local. With Python for example : python3 -m http.server

Structure of the page : To access a page you just have to change the controller parameter (who is url) and the action if there is one.

Example : 

http://localhost:8000/index.html?url=Home to access to the main page (controll by the Home controller)

http://localhost:8000/index.html?url=Home&action=tryToLogin to access to the tryToLogin() function of the Home controller
          

## Translation module
Translation : To translate a sentence , call the function translate(str, lang) who take 2 parameters : the string to translate, and the destination language. This function is in the script/index.js file, and will be always load with the index.html page.

Add or remove some translation : To add a new string, go to lang/ repertory and add your string and the translation (don't forgot to add it for all current language).

## Controllers 
A controller is like a brain who have access only to his page : The Home controller can only manage the Home.HTML page, the Login controller can only manage the Login.HTML page ect..
         
         
## Undo / Redo pattern

I implemetend the undo / redo pattern, as method of the class `ListAjax` (script/generate_class.js).
