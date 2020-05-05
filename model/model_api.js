/**
 * File: model_api.js
 *
 * This file contain all the function need to manipulate the database. Because the database use the web browser storage, it's important to
 * give to the developers some function to use to be sure that no error will occur and everyone do what they want.
 *
 * The database works by variable : A variable represent all the content of the database (in JSON)
 *
 * Version 2.0
 * Author: Thomas SOUTIF
 */



//This function will be be check every time we want to manipulate the database to be sure that the database already exist.
//If it do not exist we create it and reset it in same time to avoid problems.
function loadDefaultDatabaseInLocalStorageIfNotExist(variable_name)
{
    if(localStorage.getItem(variable_name) == null)
    {
        resetDatabase(variable_name);
    }
}

// Get the database for a certain variable
function  getDatabase(variable_name)
{
    loadDefaultDatabaseInLocalStorageIfNotExist(variable_name);
    return JSON.parse(localStorage.getItem(variable_name));
}

//Update the database for a certain variable with the new content data to replace (replace all the database)
function  updateDatabase(variable_name,new_data)
{
    loadDefaultDatabaseInLocalStorageIfNotExist(variable_name);
    localStorage.setItem(variable_name,JSON.stringify(new_data));
}

//Reset and create a database in same time if needed.
function resetDatabase(variable_name) {
    let content = eval(variable_name);
    localStorage.setItem(variable_name,JSON.stringify(content));
}

//************
// END of file model_api.js
//************