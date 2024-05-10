const crypto = require('crypto');

// Hàm để mã hóa mật khẩu sử dụng SHA-256
function hashPassword(password) {
    try {
        const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
        return hashedPassword;
    } catch (error) {
        console.error('Error hashing password:', error);
    }
}

module.exports = { hashPassword };