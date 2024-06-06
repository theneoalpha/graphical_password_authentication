const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const Recaptcha = require('recaptcha2');
const User = require('../models/User');

const recaptcha = new Recaptcha({
    siteKey: '6Ld9RvIpAAAAAGTOkNq2Aofr9VjrjDFso9V1H-sY', // Replace with your reCAPTCHA site key
    secretKey: '6Ld9RvIpAAAAAFrjGSBr9Y0PycvdZa0f07krt7GP' // Replace with your reCAPTCHA secret key
});

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 login attempts per `window`
    message: 'Too many login attempts from this IP, please try again later.'
});

// Register
router.post('/register', async (req, res) => {
    const { username, email, passwordPattern } = req.body;

    if (passwordPattern.length < 6) {
        return res.status(400).json({ error: 'Password pattern must be at least 6 images.' });
    }

    try {
        const user = new User({ username, email, passwordPattern });
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Login
router.post('/login', loginLimiter, async (req, res) => {
    const { username, passwordPattern, recaptchaToken } = req.body;

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Verify reCAPTCHA
        await recaptcha.validate(recaptchaToken);

        if (user.isLocked()) {
            return res.status(403).json({ error: 'Account is locked due to multiple failed login attempts. Try again later.' });
        }

        const isMatch = user.comparePassword(passwordPattern);

        if (!isMatch) {
            user.failedLoginAttempts += 1;
            if (user.failedLoginAttempts >= 5) {
                user.lockUntil = Date.now() + 2 * 60 * 60 * 1000; // Lock for 2 hours
            }
            await user.save();
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Reset failed login attempts on successful login
        user.failedLoginAttempts = 0;
        user.lockUntil = undefined;
        await user.save();

        res.json({ msg: 'Login successful', user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
