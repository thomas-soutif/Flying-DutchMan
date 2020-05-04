/**
 * File: model_tab.js
 *
 * This file contains all the functions responsible for the tab model. With those functions you can retrieve tab data from the database, and also modify it.
 *
 * Author: Jonathan Stahl
 */

/**
 * Fetches the tab for a certain table from the database
 *
 * @param {number} table_num
 *
 * @return {Object} A tab object
 */
function getTab(table_num) {
    // Load tab table from database
    const tab_data = getDatabase("Tab_data");
    return tab_data.tab[table_num - 1];
}

/**
 * Adds a new beverage to the tab
 *
 * @param {Object} newBeverage
 * @param {number} table_num
 *
 */
function addToTab(newBeverage, table_num) {
    // Load tab table from database
    const tab_data = getDatabase("Tab_data");

    // Search for item if already exits
    const beverageIdx = tab_data.tab[table_num -1].items.findIndex(
        beverage => beverage.id === newBeverage.id
    );


    // If beverage did not exist on tab, set amount to one and add it
    // Otherwise increment amount on existing beverage.
    if (beverageIdx < 0) {
        newBeverage.amount = 1;
        tab_data.tab[table_num -1].items.push(newBeverage);
    } else {
        tab_data.tab[table_num -1].items[beverageIdx].amount += 1;
    }

    // Adjust total price
    tab_data.tab[table_num -1].totalPrice += parseFloat(newBeverage.price);

    // Update database with modfied tab
    updateDatabase("Tab_data", tab_data);
}

/**
 * Remove beverage with a certain id from tab
 *
 * @param {number} beverageId
 * @param {number} table_num
 *
 */
function removeFromTabById(beverageId,table_num) {
    // Load tab table from database
    const tab_data = getDatabase("Tab_data");

    // Search for beverage
    const beverageIdx = tab_data.tab[table_num -1].items.findIndex(
        beverage => beverage.id === beverageId
    );

    // Reduce total price
    let beverageToRemove = tab_data.tab[table_num -1].items[beverageIdx];
    console.log(beverageId);
    console.log(beverageToRemove);
    tab_data.tab[table_num -1].totalPrice -= parseFloat(beverageToRemove.price) * beverageToRemove.amount;

    // Remove beverage from tab
    let tab_items_updated = tab_data.tab[table_num -1].items.filter(beverage => beverage.id !== beverageId);
    tab_data.tab[table_num -1].items = tab_items_updated;

    // Update database with modified tab
    updateDatabase("Tab_data", tab_data);
}

/**
 * Increase beverage amount
 *
 * @param {number} beverageId
 * @param {number} table_num
 *
 */
function increaseBeverageAmountOnTab(beverageId,table_num) {
    // Load tab table from database
    const tab_data = getDatabase("Tab_data");

    // Find beverage
    const beverageIdx = tab_data.tab[table_num -1].items.findIndex(
        beverage => beverage.id === beverageId
    );

    // Increase amount and update total price
    if (beverageIdx >= 0) {
        tab_data.tab[table_num -1].items[beverageIdx].amount += 1;
        tab_data.tab[table_num -1].totalPrice += parseFloat(tab_data.tab[table_num -1].items[beverageIdx].price);
    }

    // Update database with modified tab
    updateDatabase("Tab_data", tab_data);
}

/**
 * Decrease beverage amount
 *
 * @param {number} beverageId
 * @param {number} table_num
 *
 */
function decreaseBeverageAmountOnTab(beverageId,table_num) {
    // Load tab table from database
    const tab_data = getDatabase("Tab_data");

    // Find beverage
    const beverageIdx = tab_data.tab[table_num -1].items.findIndex(
        beverage => beverage.id === beverageId
    );

    // Reduce amount and adjust total price
    // Or remove from tab if amount was 1
    if (beverageIdx >= 0) {
        if (tab_data.tab[table_num -1].items[beverageIdx].amount > 1) {
            tab_data.tab[table_num -1].items[beverageIdx].amount -= 1;
            tab_data.tab[table_num -1].totalPrice -= parseFloat(tab_data.tab[table_num -1].items[beverageIdx].price);
        } else {
            removeFromTabById(beverageId);
            return;
        }
    }

    // Update database with modified tab
    updateDatabase("Tab_data", tab_data);
}

/**
 * Reset database
 */
function resetTabDatabase() {
    resetDatabase("Tab_data");
}
