const pool = require('../config/connectDB');
const { decodeToken } = require('./jwt');
const { isTokenInCache } = require('./tokenCache');

const authenticate = async (req, res, next) => {
    try {
        // Lấy token từ header của request
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: "Truy cập bị từ chối. Không có token được cung cấp." });
        }
        // Giải mã token
        const decoded = decodeToken(token);
        if (!decoded) {
            return res.status(401).json({ message: "Token không hợp lệ." });
        }

        const id_account = decoded.id_account;

        const [row, field] = await pool.execute(`SELECT id_account
                                                FROM accounts
                                                WHERE id_account = ?
                                                `, [id_account]);

        if (!row.length) {
            return res.status(401).json({ message: "Người dùng không tồn tại." });
        }

        // kiểm tra xem tài khoản đã đăng xuất chưa
        // if (!isTokenInCache(token)) {
        //     return res.status(401).json({ message: "Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại" });
        // }

        req.id_account = id_account;
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Lỗi từ phía server.' });
    }
};

module.exports = authenticate;
