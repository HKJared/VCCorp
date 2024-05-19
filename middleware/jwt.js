const jwt = require('jsonwebtoken');
const config = require('../config/jwt.js');

// Hàm mã hóa: Tạo token khi người dùng đăng nhập thành công
const generateToken = (account) => {
    return jwt.sign(account, config.jwtSecret, { expiresIn: '24h' });
};

// Hàm mã hóa: Tạo Refresh Token
const generateRefreshToken = (account) => {
    return jwt.sign(account, config.refreshSecret, { expiresIn: '7d' });
};

const decodeToken = (token) => {
    try {
        const decoded = jwt.verify(token, config.jwtSecret);
        
        return decoded;
    } catch (error) {
        console.error('Failed to decode token: ', error);
        return null;
    }
};

module.exports = { generateToken, decodeToken, generateRefreshToken };
