$(document).ready(function () {

    let mapElementFromDOMToTranslationKey = {
        map: [
            { "element" : "#title-tableManagement",
                "key" : "sentence_ChooseYourTable"
            },
            { "element": ".title-TableNumber",
                "key": "sentence_TableNumber"
            },
            { "element": ".buttonTableBook",
                "key": "string_book"
            }

        ]
    };




    $("#book_2").click(function () {

    });


    function updateStatusOfAllTable(tablesInfo)
    {
        console.log(tablesInfo);
        for (let i = 0; i < tablesInfo.tables.length; i++) {
            console.log(tablesInfo.tables[i].table_num);
            if(tablesInfo.tables[i].available)
            {
                let idStatusTable = "#tableStatus_" + tablesInfo.tables[i].table_num;
                $(idStatusTable).text(translate("string_Status",))
            }

        }
    }

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

    translateAllDOM(mapElementFromDOMToTranslationKey);

});

