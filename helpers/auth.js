// const bcrypt = require("bcrypt");

// const hashPassword = (password) => {
//     return new Promise((resolve, reject) => {
//         bcrypt.genSalt(12, (err, salt) => {
//             if (err) {
//                 reject(err);
//             }
//             bcrypt.hash(password, salt, (err, hash) => {
//                 if (err) {
//                     reject(err);
//                 }
//                 resolve(hash);
//             });
//         });
//     });
// };

// const comparePassword = (password, hashed) => {
//     return new Promise((resolve, reject) => {
//         bcrypt.compare(password, hashed, (err, result) => {
//             if (err) {
//                 reject(err);
//             }
//             resolve(result);
//         });
//     });
// };

// module.exports = {
//     hashPassword,
//     comparePassword,
// };

const bcrypt = require('bcrypt');

const hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(12, (err, salt) => {
            if (err) {
                reject(err);
            }
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) {
                    reject(err);
                }
                resolve(hash);
            });
        });
    });
};

const comparePassword = (password, hashed) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hashed, (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    });
};

const plainPassword = 'userEnteredPassword';
const hashedPasswordFromDatabase = 'hashRetrievedFromDatabase';

comparePassword(plainPassword, hashedPasswordFromDatabase)
    .then((result) => {
        if (result) {
            // Passwords match
            console.log('Password is correct');
        } else {
            // Passwords do not match
            console.log('Password is incorrect');
        }
    })
    .catch((error) => {
        // Handle error
        console.error('Error comparing passwords:', error);
    });

hashPassword('userEnteredPassword')
    .then((hashedPassword) => {
        // Store hashedPassword in the database
        console.log('Hashed password:', hashedPassword);
    })
    .catch((error) => {
        // Handle error
        console.error('Error hashing password:', error);
    });
