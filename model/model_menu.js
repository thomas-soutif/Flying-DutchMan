function getAllMenu()
{
    let final_menu = {menu :[{}]};
    let menu_data = getDatabase("Menu_data");
    for (let i = 0; i < menu_data.menu.length; i++) {
        let beverage = getBeverageById(menu_data.menu[i].article_id);
        final_menu.menu[i] = menu_data.menu[i];
        final_menu.menu[i].allInfo = beverage;
    }
    return final_menu;
}