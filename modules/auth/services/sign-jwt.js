/**
 * Auth Jwt Sign Service
 * 
 * @by faysal
 * @since 1.0
 */


const jwt = require('jsonwebtoken');

module.exports = (user) =>{

    const payload = {
        id: user._id
    };

    const jwtOption = {
        expiresIn: process.env.JWT_EXPIRY,
        issuer: 'Thobil Server'
    };

    return jwt.sign(payload, process.env.JWT_SECRET, jwtOption);
}