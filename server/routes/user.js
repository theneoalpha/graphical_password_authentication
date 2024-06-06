const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register
router.post('/register', async (req, res) => {
    const { username, email, passwordPattern } = req.body;
    try {
        const user = new User({ username, email, passwordPattern });
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { username, passwordPattern } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const isMatch = JSON.stringify(user.passwordPattern) === JSON.stringify(passwordPattern);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        res.json({ msg: 'Login successful', user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
