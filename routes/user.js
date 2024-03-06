var express = require("express");
const router = express.Router();
const UserModel = require("../models/user");
const { hashPassword, comparePassword } = require("../helpers/auth");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



const test = (req, res) => {
    res.json("Test working");
};

// Signup Endpoint
const signupUser = async (req, res) => {
    try {
        const { username, password, confirmPassword } = req.body;

        // validate username
        if (!username) {
            return res.json({
                error: "Username should not be empty",
            });
        }
        if (!/^.{3,}$/.test(username)) {
            return res.json({ error: "Username should be at least 3 characters" });
        }

  
        const exist = await UserModel.getUserByUsername(username);
        if (exist) {
            return res.json({
                error: 'Username is taken',
            });
        }
        // validate password
        if (!password) {
            return res.json({
                error: "Password should not be empty",
            });
        }

        if (!/(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(password)) {
            return res.json({
                error:
                    "Password should contain at least 6 characters, including uppercase and lowercase",
            });
        }

        if (password !== confirmPassword) {
            return res.json({ error: "Passwords do not match" });
        }

        const hashedPassword = await hashPassword(password);

        let role = 'user';

        const user = await UserModel.create({
            username,
            password: hashedPassword,
            // role,
            role: 'user',
        });

        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
    }
};


// Login endpoint
const loginUser = async (req, res) => {

    try {
        const { username, password } = req.body;

        // Retrieve user from the SQLite database
        const user = await UserModel.getUserByUsername(username);

        // Check if the user exists
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Compare hashed passwords securely
        const passwordMatch = await bcrypt.comparePassword(password, user.password);

        if (passwordMatch) {
            // Generate a JWT token (optional)
            const token = jwt.sign({ userId: user.id, username: user.username }, 'your-secret-key', { expiresIn: '1h' });

            // Send the token to the client (optional)
            res.json({ token });

            // You can also send other user information if needed
            // res.json({ userId: user.id, username: user.username, isAdmin: user.isAdmin });

        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



// Logout Endpoint
const logoutUser = async (req, res) => {
    try {
        // You can clear any session-related information or perform necessary actions here
        return res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



router.get("/", test);
router.post("/signup", signupUser);
router.post("/login", loginUser);
router.delete("/logout", logoutUser);


module.exports = router;