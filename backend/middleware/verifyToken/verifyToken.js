const express = require('express');
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        
        if (bearer[0] !== 'Bearer') {
            return res.status(403).json({ error: 'Invalid token scheme' });
        }
        
        const token = bearer[1];
        
        jwt.verify(token, secretKey, (err, authData) => {
            if (err) {
                return res.status(403).json({ error: 'Invalid token' });
            }
            req.authData = authData;
            next();
        });
    } else {
        res.status(403).json({ error: 'No token provided' });
    }
}

module.exports = verifyToken;
