const JWT = require("jsonwebtoken");
require('dotenv').config()
const JWT_secret = process.env.JWT_SECRET;

const validateToken = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    
    if (!token) return res.status(401).json({ error: "Token required ❌" });

    try {
        const decoded = JWT.verify(token, JWT_secret);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid or expired token - authMiddleware ❌' });
    }
};

module.exports = {
    validateToken,
};
