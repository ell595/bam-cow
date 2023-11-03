const jwt = require('jsonwebtoken');
require('dotenv').config();


function jwtGenerator(user_id) {
    const payload = {
        user: user_id
    };
    return jwt.sign(payload, `${process.env.REACT_APP_jwtSecret}`, {expiresIn: '1h'});
}

module.exports = jwtGenerator;