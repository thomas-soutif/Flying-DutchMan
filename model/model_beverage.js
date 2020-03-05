function getAllBeverages() {
    let masterController = Master_Controller;
    let beverages_db = masterController.getDatabase(Beverage_en_data);

    var allBeverages = [];

    for (let i = 0; i < beverages_db.spirits.length; i++) {
        let beverage = {
            name: beverages_db.spirits[i].name,
            name2: beverages_db.spirits[i].name2,
            category: beverages_db.spirits[i].catgegory,
            alcoholStrength: beverages_db.spirits[i].alcoholstrength,
            price: beverages_db.spirits[i].priceinclvat,
            country: beverages_db.spirits[i].countryoforiginlandname,
            region: beverages_db.spirits[i].countryoforigin,
            producer: beverages_db.spirits[i].producer,
            provider: beverages_db.spirits[i].provider,
            productionYear: beverages_db.spirits[i].productionyear,
            packaging: beverages_db.spirits[i].packaging,
            capType: beverages_db.spirits[i].captype,
            isOrganic: beverages_db.spirits[i].organic,
            isKosher: beverages_db.spirits[i].kosher
        };
        allBeverages.push(beverage);
    }

    return allBeverages;
}

function getBeveragesByStrength(strength) {
    let allBeverages = getAllBeverages();
    let beveragesByStrength = [];

    for (let i = 0; i < allBeverages.length; i++) {
        let beverageStrength = parseFloat(allBeverages[i].alcoholStrength);
        if (beverageStrength >= strength) {
            beveragesByStrength.push(allBeverages[i]);
        }
    }

    return beveragesByStrength;
}
