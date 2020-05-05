/**
 * File: model_tables.js
 *
 * This file contain all the function use to manipulate the databases relate to the table functionality
 *
 * Version 1.5
 * Author: Thomas SOUTIF
 */



// Book a table to ensure that no one can book it after
function bookTableByNum(tableNum,userId)
{

    let tables_data = getDatabase("Table_informations_data");
    for (let i = 0; i < tables_data.tables.length; i++) {
        if (tables_data.tables[i].table_num === tableNum) {
            if(tables_data.tables[i].available === false)
            {
                return 1;
            }
            tables_data.tables[i].available = false;
            tables_data.tables[i].booking_userId = userId;
            var today = new Date();
            var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            tables_data.tables[i].booking_time = date+' '+time;

            updateDatabase("Table_informations_data",tables_data);
            return 0;
        };

    };
    return 2;
}

//Return the database of the table informations.
function getAllTablesInformations()
{

    return getDatabase("Table_informations_data");

}

//************
// END of file model_tables.js
//************