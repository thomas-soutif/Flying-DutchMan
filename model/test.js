function getUsersByName(userName) {

    let masterController = Master_Controller;
    let Users_data = masterController.getDatabase(test_data_base);
    for (let i = 0; i < Users_data.users.length; i++) {
        if (Users_data.users[i].username == userName) {
            return Users_data.users[i];
        };
    };
}

function changeUsersPhoneByName(userName,newPhone)
{
    let masterController = Master_Controller;
    let Users_data = masterController.getDatabase(test_data_base);
    for (let i = 0; i < Users_data.users.length; i++) {
        if (Users_data.users[i].username == userName) {
            Users_data.users[i].phone = newPhone;
            masterController.updateDatabase(test_data_base,Users_data);
            return Users_data.users[i];

        }

        };
}

