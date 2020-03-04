$(document).ready(function () {

    $(".buttonTableBook").click(function () {
        let tableNumber = $(this).data("table-number");
        let parameter = {"tableNum" : tableNumber,"userId" : 1}
        let response = ajaxCall("ajax_book_table",parameter);
        console.log(response);
        if(!response.error) // Return no error
        {
            console.log("no error");
            updateStatusOfAllTable(response.data);

        } else
        {
            // print the error
            alert(response.errorMessage);
        }

    });

    checkAndUpdateStatusOfTables();

});

function checkAndUpdateStatusOfTables()
{
    let response = ajaxCall("ajax_get_TablesInformation",null);
    if(!response.error) // Return no error
    {
        updateStatusOfAllTable(response.data);

    } else
    {
        // print the error
        alert(response.errorMessage);
    }
}

function updateStatusOfAllTable(tablesInfo)
{
    console.log(tablesInfo);
    for (let i = 0; i < tablesInfo.tables.length; i++) {
        let idStatusTable = "#tableStatus_" + tablesInfo.tables[i].table_num;
        if(tablesInfo.tables[i].available)
        {
            //let text = translate("string_Status") + " : " + translate("string_Available");
            let html ='<span class="translate" data-translate-key="string_Status"></span> : <span class="translate" data-translate-key="string_Available"></span> ';
            $(idStatusTable).html(html);
        }
        else
        {
            //let text = translate("string_Status") + " : " + translate("string_Busy");
            let html ='<span class="translate" data-translate-key="string_Status"></span> : <span class="translate" data-translate-key="string_Busy"></span> ';
            $(idStatusTable).html(html);
        }
        translateAllDOM();

    }
}
