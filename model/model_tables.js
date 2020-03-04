function bookTableByNum(tableNum,userId)
{
    let masterController = Master_Controller;
    let tables_data = masterController.getDatabase(Table_informations_data);
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

            masterController.updateDatabase(Table_informations_data,tables_data);
            return 0;
        };

    };
    return 2;
}

function getAllTablesInformations()
{
    let masterController = Master_Controller;
    return masterController.getDatabase(Table_informations_data);

}