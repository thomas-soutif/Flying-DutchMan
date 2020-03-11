function loadDefaultDatabaseInLocalStorageIfNotExist(variable_name) // Private
{
    if(localStorage.getItem(variable_name) == null)
    {
        resetDatabase(variable_name);
    }
}
function  getDatabase(variable_name)
{
    loadDefaultDatabaseInLocalStorageIfNotExist(variable_name);
    return JSON.parse(localStorage.getItem(variable_name));
}

function  updateDatabase(variable_name,new_data)
{
    loadDefaultDatabaseInLocalStorageIfNotExist(variable_name);
    localStorage.setItem(variable_name,JSON.stringify(new_data));
}

function resetDatabase(variable_name) {
    let content = eval(variable_name);
    localStorage.setItem(variable_name,JSON.stringify(content));
}
