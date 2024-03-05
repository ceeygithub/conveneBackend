

// let users = [ ];

// const addUser = (username, email, password) => {
//     const user = { username, email, password, isAdmin: false }; // Default isAdmin to false
//     users.push(user);
//     return user;
// };

// const getAllUsers = () => {
//     return users;
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
//     getAllUsers,
//     users, // Export the users array for testing purposes or other use cases
// };

const db = require('../db'); // Assuming this file exports your SQLite database connection

const UserModel = {
    createUser: async ({ username, password, role }) => {
        const hashedPassword = await hashPassword(password);

        const query = 'INSERT INTO users (username, password, role) VALUES (?, ?, ?)';
        return new Promise((resolve, reject) => {
            db.run(query, [username, hashedPassword, role], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ id: this.lastID, username, role });
                }
            });
        });
    },

    getUserByUsername: async (username) => {
        const query = 'SELECT * FROM users WHERE username = ?';
        return new Promise((resolve, reject) => {
            db.get(query, [username], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    },
};

module.exports = UserModel;
