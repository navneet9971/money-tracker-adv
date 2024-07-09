const express = require('express');
const Auth = require('../../models/Auths');
const jwt = require('jsonwebtoken');
const router = express.Router();
const secretKey = 'secretKey';


router.get('/profile', verifyToken, async (req, res) => {
    try {
        const authData = jwt.verify(req.token, secretKey);
        const user = await Auth.findById(authData.id).select('firstName lastName email');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({
            message: 'Profile access granted',
            user
        });
    } catch (err) {
        console.error('Error fetching user profile:', err.message);
        res.status(403).json({ error: 'Invalid token' });
    }
});

// Token Verification Middleware
function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const token = bearer[1];
        req.token = token;
        next();
    } else {
        res.status(403).json({ error: 'No token provided' });
    }
}

module.exports = router;