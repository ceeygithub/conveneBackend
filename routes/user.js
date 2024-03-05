var express = require("express");
const router = express.Router();
const UserModel = require("../models/user");
const { hashPassword, comparePassword } = require("../helpers/auth");



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

        let role = "Regular";

        const user = await UserModel.create({
            username,
            password: hashedPassword,
            // role,
            role: 'Regular',
        });

        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
    }
};

// Login Endpoint
const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        // const user = await UserModel.findOne({ username });
        const user = await UserModel.getUserByUsername(username);

        if (!user) {
            return res.json({
                error: "User not found",
            });
        }

        // check password
        const matchPassword = await comparePassword(password, user.password);

        // Determine the redirect URL based on user role
        if (!matchPassword) {
            return res.json({
                error: "Incorrect Password",
            });
        }

        let redirectUrl = "/dashboard";
     
        if (user.role === "Admin") {
            redirectUrl = "/admindashboard";
        } else if (user.role === "Regular") {
            redirectUrl = "/profile";
        }
        return res.json({ redirectUrl });
    } catch (error) {
        res.status(500).json({ error: error.message });
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