const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = async(req, res, next) => {
    try {
        // Check if user has JWT Token
        const jwtToken = req.header('token');
        if (!jwtToken) {
            return res.status(403).json('Not Authorized!');
        }

        // Verify Token
        const payload = jwt.verify(jwtToken, process.env.jwtSecret);
        req.user = payload.user;
        
    } catch (err) {
        console.error(err.message);
        return res.status(403).json('Not Authorized!');
    }

    next();
}