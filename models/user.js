

let users = [ ];

const addUser = (username, email, password) => {
    const user = { username, email, password, isAdmin: false }; // Default isAdmin to false
    users.push(user);
    return user;
};

const getAllUsers = () => {
    return users;
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
    getAllUsers,
    users, // Export the users array for testing purposes or other use cases
};
