const express = require('express');
const Auth = require("../../models/Auths");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const secretKey = 'secretKey';
const router = express.Router();


router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        console.log('Email or password not provided');
        return res.status(400).json({ error: 'Email and password are required' });
    }

    console.log('Login request received:', email, password);
    try {
        const user = await Auth.findOne({ email });
        if (!user) {
            console.log(`User not found for email: ${email}`);
            return res.status(404).json({ error: 'User not found' });
        }
        // Compare the provided password with the hashed password from the database
        const isMatch = await bcrypt.compare(password, user.password);
        console.log(`Password comparison result: ${isMatch}`);

        if (!isMatch) {
            console.log(`Invalid password for user: ${email}`);
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id, email: user.email }, secretKey, { expiresIn: '1h' });
        console.log('Token generated:', token);
        res.json({ token });
    } catch (error) {
        console.error('Error logging in:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;