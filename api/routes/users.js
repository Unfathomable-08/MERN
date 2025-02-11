const express = require('express');
const router = express.Router();
const User = require('../models/users');

router.post("/register", async (req, res) => {
    try {
        const { name, email, role, job } = req.body;
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        // Create new user
        const newUser = new User({ name, email, role, job, is_active: true });
        await newUser.save();

        res.json({ message: "User created successfully", user: newUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router