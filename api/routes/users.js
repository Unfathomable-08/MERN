const express = require("express");
const router = express.Router();
const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config(); // Load environment variables

// Signup Route

router.post("/register", async (req, res) => {
    try {
        const { name, email, role, job, password } = req.body;

        // Check if user already exists
        const [existingUser] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ error: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Insert new user into MySQL database
        const query = `INSERT INTO users (name, email, role, job, is_active, password) VALUES (?, ?, ?, ?, ?, ?)`;
        const values = [name, email, role, job, true, hashedPassword];

        await db.query(query, values);

        // Retrieve newly created user (excluding password)
        const [user] = await db.query("SELECT id, name, email, role, job, is_active FROM users WHERE email = ?", [email]);

        // Generate JWT token with expiration
        const token = jwt.sign(
            { id: user[0].id, email: user[0].email, role: user[0].role }, 
            process.env.JWT_SECRET, 
            { expiresIn: "1h" }
        );

        res.status(201).json({ message: "User created successfully", user: user[0], token: {access: token} });

    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ error: error.message });
    }
});

// Login Route

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const [existingUser] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
        if (existingUser.length === 0) {
            return res.status(400).json({ error: "User not found" });
        }

        // Match Password
        const isMatch = await bcrypt.compare(password, existingUser[0].password);
        if (!isMatch) {
            return res.status(400).json({ error: "Incorrect Password" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: existingUser[0].id, email: existingUser[0].email, role: existingUser[0].role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({ message: "Login successful", data: {data: existingUser[0], token: { access: token }} });

    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ error: error.message });
    }
});


// Dashboard data

router.get('/all', async (req, res)=>{
    //
})


module.exports = router;