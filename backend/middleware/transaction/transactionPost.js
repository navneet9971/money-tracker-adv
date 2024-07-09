const express = require('express');
const Transaction = require('../../models/Transaction');
const secretKey = process.env.SECRET_KEY;
const jwt = require("jsonwebtoken");
const router = express.Router();
const verifyToken = require('../verifyToken/verifyToken');

router.post('/transaction', verifyToken, async (req, res) => {
    jwt.verify(req.token, secretKey, async (err, authData) => {
        if (err) {
            return res.status(403).json({ error: 'Access denied' });
        }try{
            const { title, description, datetime, debit, credit } = req.body;
            const newtransaction = await Transaction.create({
                userId: authData.id,
                title,
                description,
                datetime,
                debit,
                credit
            });
            res.json(newtransaction);
        } catch (error) {
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
});

module.exports = router;