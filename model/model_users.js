function allUserNames() {
    var nameCollect = [];
    for (i = 0; i < Users_data.users.length; i++) {
        nameCollect.push(Users_data.users[i].username);
    }
    return nameCollect;
}

function getUserDetails(userName) {
    let finalJson = {user :{}};
    let userId;

    let users_data = getDatabase("Users_data");

    for (let i = 0; i < users_data.users.length; i++) {
        if (users_data.users[i].username === userName) {
            userId = users_data.users[i].user_id;
            finalJson.user.userName = users_data.users[i].username;
            finalJson.user.firstName = users_data.users[i].first_name;
            finalJson.user.lastName = users_data.users[i].last_name;
            finalJson.user.email = users_data.users[i].email;
            finalJson.user.phone = users_data.users[i].phone;
        }
    }
    let account_data = Account_data;
    for (let i = 0; i < account_data.account.length; i++) {
        if (account_data.account[i].user_id === userId) {
            finalJson.user.creditSEK = account_data.account[i].creditSEK;
        };
    };

    return finalJson;
}

function getAccountDetail(userId)
{
    let finalJson = {};
    let account_data = getDatabase("Account_data");

    for (let i = 0; i < account_data.account.length; i++) {
        if (account_data.account[i].user_id === userId) {
            finalJson.creditSEK = account_data.account[i].creditSEK;
        };
    };
    return finalJson;
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

function loginVerification(username,password)
{


    let users_data =getDatabase("Users_data");

    for (let i = 0; i < users_data.users.length; i++) {
        if (users_data.users[i].username === username && users_data.users[i].password === password) {
            return true;
        }
    }
    return false; // No users find with the parameter given
}