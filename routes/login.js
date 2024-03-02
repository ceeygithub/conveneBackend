// // Import necessary modules and user model
// const express = require('express');
// const router = express.Router();
// const userModel = require('../models/user');

// // Login route
// router.post('/login', (req, res) => {
//     const { username, password } = req.body;

//     // Retrieve user by username
//     const user = userModel.getUserByUsername(username);

//     // Check if the user exists
//     if (!user) {
//         return res.status(404).json({ error: 'User not found' });
//     }

//     // Check if the provided password matches the stored password (this would typically involve password hashing)
//     if (user.password !== password) {
//         return res.status(401).json({ error: 'Invalid password' });
//     }

//     // If all checks pass, the login is successful
//     res.json({ message: 'Login successful', user });
// });

// // Export the router
// module.exports = router;


const express = require('express');
const router = express.Router();
const userModel = require('../models/user');

// Register User
router.post('/signup', (req, res) => {
    const { username, password } = req.body;

    // TODO: Add validation and error handling

    const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.run(query, [username, password], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        return res.status(201).json({ message: 'User registered successfully' });
    });
});

// User Login
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    // TODO: Add validation and error handling

    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
    db.get(query, [username, password], (err, user) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        return res.status(200).json({ message: 'Login successful' });
    });
});

module.exports = router;
