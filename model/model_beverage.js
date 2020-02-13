
function allBeverages() {

    // Using a local variable to collect the items.
    var collector = [];

    // The DB is stored in the variable DB2, with "spirits" as key element. If you need to select only certain
    // items, you may introduce filter functions in the loop... see the template within comments.
    //
    for (i = 0; i < Beverage_en_data.spirits.length; i++) {
        collector.push([Beverage_en_data.spirits[i].namn, Beverage_en_data.spirits[i].varugrupp]);
    };
    //
    return collector;
}

function allStrongBeverages(strength) {

    // Using a local variable to collect the items.
    //
    var collector = [];

    // The DB is stored in the variable DB2, with "spirits" as key element. If you need to select only certain
    // items, you may introduce filter functions in the loop... see the template within comments.
    //
    for (i = 0; i < Beverage_en_data.spirits.length; i++) {

        // We check if the percentage alcohol strength stored in the data base is lower than the
        // given limit strength. If the limit is set to 14, also liqueuers are listed.
        //
        if (percentToNumber(Beverage_en_data.spirits[i].alkoholhalt) > strength) {

            // The key for the beverage name is "namn", and beverage type is "varugrupp".
            //
            collector.push([Beverage_en_data.spirits[i].namn, Beverage_en_data.spirits[i].varugrupp]);
        };
    };

    // Don't forget to return the result.
    //
    return collector;
}

function beverageTypes() {
    var types = [];
    for (i = 0; i < Beverage_en_data.spirits.length; i++) {
        addToSet(types, Beverage_en_data.spirits[i].varugrupp);
    };
    return types;
}