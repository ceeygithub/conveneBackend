// // models/user.js
// let users = [];

// const addUser = (username, email,password) => {
//     const user = { username,email, password, isAdmin: false }; // Default isAdmin to false
//     users.push(user);
//     return user;
// };

// const getUserByUsername = (username) => {
//     return users.find((user) => user.username === username);
// };

// const updateUserIsAdmin = (username, isAdmin) => {
//     const user = getUserByUsername(username);
//     if (user) {
//         user.isAdmin = isAdmin;
//         return true; // Successfully updated
//     }
//     return false; // User not found
// };

// module.exports = {
//     addUser,
//     getUserByUsername,
//     updateUserIsAdmin,
// };


let users = [];

const addUser = (username, email, password) => {
    const user = { username, email, password, isAdmin: false }; // Default isAdmin to false
    users.push(user);
    return user;
};

const getUserByUsername = (username) => {
    return users.find((user) => user.username === username);
};

const updateUserIsAdmin = (username, isAdmin) => {
    const user = getUserByUsername(username);
    if (user) {
        user.isAdmin = isAdmin;
        return true; // Successfully updated
    }
    return false; // User not found
};

module.exports = {
    addUser,
    getUserByUsername,
    updateUserIsAdmin,
    users, // Export the users array for testing purposes or other use cases
};
