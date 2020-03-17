function getTab() {
    return getDatabase("Tab_data");
}

function addToTab(newBeverage) {
    const tab_data = getDatabase("Tab_data");

    // Search for item if already exits
    const beverageIdx = tab_data.tab.items.findIndex(
        beverage => beverage.id === newBeverage.id
    );

    if (beverageIdx < 0) {
        newBeverage.amount = 1;
        tab_data.tab.items.push(newBeverage);
    } else {
        tab_data.tab.items[beverageIdx].amount += 1;
    }

    tab_data.tab.totalPrice += parseFloat(newBeverage.price);

    updateDatabase("Tab_data", tab_data);
}

function removeFromTabById(beverageId) {
    const tab_data = getDatabase("Tab_data");

    const beverageIdx = tab_data.tab.items.findIndex(
        beverage => beverage.id === beverageId
    );

    let beverageToRemove = tab_data.tab.items[beverageIdx];
    console.log(beverageId);
    console.log(beverageToRemove);
    tab_data.tab.totalPrice -= parseFloat(beverageToRemove.price) * beverageToRemove.amount;

    let tab_items_updated = tab_data.tab.items.filter(beverage => beverage.id !== beverageId);
    tab_data.tab.items = tab_items_updated;

    updateDatabase("Tab_data", tab_data);
}

function increaseBeverageAmountOnTab(beverageId) {
    const tab_data = getDatabase("Tab_data");

    const beverageIdx = tab_data.tab.items.findIndex(
        beverage => beverage.id === beverageId
    );

    if (beverageIdx >= 0) {
        tab_data.tab.items[beverageIdx].amount += 1;
        tab_data.tab.totalPrice += parseFloat(tab_data.tab.items[beverageIdx].price);
    }

    updateDatabase("Tab_data", tab_data);
}

function decreaseBeverageAmountOnTab(beverageId) {
    const tab_data = getDatabase("Tab_data");

    const beverageIdx = tab_data.tab.items.findIndex(
        beverage => beverage.id === beverageId
    );

    if (beverageIdx >= 0) {
        if (tab_data.tab.items[beverageIdx].amount > 1) {
            tab_data.tab.items[beverageIdx].amount -= 1;
            tab_data.tab.totalPrice -= parseFloat(tab_data.tab.items[beverageIdx].price);
        } else {
            removeFromTabById(beverageId);
            return;
        }
    }

    updateDatabase("Tab_data", tab_data);
}

function resetTabDatabase() {
    resetDatabase("Tab_data");
}
