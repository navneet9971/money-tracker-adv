const express = require('express');
const Transaction = require('../../models/Transaction');
const secretKey = process.env.SECRET_KEY;
const jwt = require("jsonwebtoken");
const Auth = require('../../models/Auths');

const router = express.Router();
const verifyToken = require('../verifyToken/verifyToken');

router.get('/transaction', verifyToken, async (req, res) => {
    jwt.verify(req.token, secretKey, async ( err, authData) => {
        if (err) {
            return res.status(403).json({ error: 'Access denied' });
        }
        try {
            const transactions = await Transaction.find({ userId: authData.id });
            const user = await Auth.findById(authData.id).select('firstName lastName email')
           
            if(!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            res.json({
                message: 'Transactions and user data retrieved successfully',
                user,
                transactions
            });
        } catch (error) {
            console.error('Error fetching transactions:', error.message);
            res.status(500).json({ error: 'Internal server error' });
        }
    })
})

module.exports = router;