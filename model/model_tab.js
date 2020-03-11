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

function resetTabDatabase() {
    resetDatabase("Tab_data");
}
