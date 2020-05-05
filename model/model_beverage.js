/**
 * File: model_beverage.js
 *
 * This file contains all the functions responsible for the beverage model. With those functions you can retrieve beverage data from the database, and also modify it.
 *
 * Author: Jonathan Stahl
 */


/**
 * Fetches all beverages from the database and construct clean beverages objects
 *
 * @return {Object[]} An array with all the beverages as objects
 */
function getAllBeverages() {
    // Load beverage table
    let beverages_db = getDatabase("Beverage_en_data");

    let allBeverages = [];

    // Loop through all beverages and construct clean beverage object
    for (let i = 0; i < beverages_db.spirits.length; i++) {
        //********
        // OBJECT: Beverage
        //********
        const beverage = {
            id: beverages_db.spirits[i].articleid,
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

/**
 * Fetches all beverages with a certain strength or more from the database
 *
 * @param {number} strength
 *
 * @return {Object[]} An array with all the beverages as objects
 */
function getBeveragesByStrength(strength) {
    // Load all cleaned beverages objects
    const allBeverages = getAllBeverages();
    let beveragesByStrength = [];

    // Loop through all beverages and check for strength
    for (let i = 0; i < allBeverages.length; i++) {
        let beverageStrength = parseFloat(allBeverages[i].alcoholStrength);
        if (beverageStrength >= strength) {
            // Add beverage with the strength same or higher to array
            beveragesByStrength.push(allBeverages[i]);
        }
    }

    return beveragesByStrength;
}

/**
 * Fetches a beverage with a certain id from the database
 *
 * @param {number} beverageId
 *
 * @return {Object} Beverage
 */
function getBeverageById(beverageId) {
    // Load all cleaned beverages objects
    const allBeverages = getAllBeverages();

    // Loop through all beverages and find the one with the correct id
    const beverageById = allBeverages.find(
        beverage => beverage.id === beverageId
    );

    return beverageById;
}

//************
// END of file model_beverage.js
//************
