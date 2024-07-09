const express = require('express');
const Auth = require("../../models/Auths");
const router = express.Router();
const bcrypt = require('bcryptjs');

router.post('/signin', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const existingUser = await Auth.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10); // Hashing the password
        const user = await Auth.create({ firstName, lastName, email, password: hashedPassword });
        console.log('User created:', user);
        res.status(201).json(user);
    } catch (error) {
        console.error('Error creating user:', error.message);
        res.status(500).json({ error: 'Internal server error', message: error.message });
    }
});

module.exports = router;
