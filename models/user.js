// models/user.js
const db = require('../db');
const { hashPassword } = require('../helpers/auth');

const UserModel = {
    createUser: async ({ username, email, password, role }) => {
        const hashedPassword = await hashPassword(password);

        const query = 'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)';
        return new Promise((resolve, reject) => {
            db.run(query, [username, email, hashedPassword, role], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ id: this.lastID, username, email, role });
                }
            });
        });
    },

    getUserByUsername: async (username) => {
        const query = 'SELECT id, username, email, password, role FROM users WHERE username = ?';
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
