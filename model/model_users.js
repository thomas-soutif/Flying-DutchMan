function allUserNames() {
    var nameCollect = [];
    for (i = 0; i < Users_data.users.length; i++) {
        nameCollect.push(Users_data.users[i].username);
    }
    return nameCollect;
}

function userDetails(userName) {
    var userCollect = [];
    var userID;
    var userIndex;
    var account;

    // First we find the user ID of the selected user. We also save the index number for the record in the JSON
    // structure.
    //
    for (i = 0; i < Users_data.users.length; i++) {
        if (Users_data.users[i].username == userName) {
            userID = Users_data.users[i].user_id;
            userIndex = i;
        };
    };

    // We get the current account status from another table in the database, account. We store this in
    // a variable here for convenience.
    //
    for (i = 0; i < Users_data.account.length; i++) {
        if (Users_data.account[i].user_id == userID) {
            account = Users_data.account[i].creditSEK;
        }
    };

    // This is the way to add the details you want from the db into your own data structure.
    // If you want to change the details, then just add or remove items accordingly below.
    userCollect.push(
        Users_data.users[userIndex].user_id,
        Users_data.users[userIndex].username,
        Users_data.users[userIndex].first_name,
        Users_data.users[userIndex].last_name,
        Users_data.users[userIndex].email,

        account
    );

    return userCollect;
}



function changeBalance(userName, newAmount) {

    // We use this variable to store the userID, since that is the link between the two data bases.
    var userID;

    // First we find the userID in the user data base.
    //
    for (i = 0; i < Users_data.users.length; i++) {
        if (Users_data.users[i].username == userName) {
            userID = Users_data.users[i].user_id;
        };
    };

    // Then we match the userID with the account list.
    // and change the account balance.
    //
    for (i = 0; i < DB.account.length; i++) {
        if (Users_account_data.account[i].user_id == userID) {
            Users_account_data.account[i].creditSEK = newAmount;   // This changes the value in the JSON object.
        };
    };
}