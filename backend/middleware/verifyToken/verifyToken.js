const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;

        jwt.verify(bearerToken, secretKey, (err, authData) => {
            if (err) {
                return res.status(403).json({ error: 'Access denied' });
            }
            req.authData = authData;
            next();
        });
    } else {
        res.status(403).json({ error: 'Access denied' });
    }
};

module.exports = verifyToken;
