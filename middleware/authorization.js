const pool = require('../config/connectDB');
const { decodeToken } = require('./jwt');
const { isTokenInCache } = require('./tokenCache');


// Phân quyền
const roles = {
    super_admin: ['create_account_data_admin', 'create', 'read', 'update', 'delete'],
    data_admin: ['create', 'read', 'update'],
    user: ['read']
};
  
// Middleware xác thực quyền
const authorize = async (req, res, permission, next) => {
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

        let userRole;
        const [row, field] = await pool.execute(`SELECT role
                                                FROM accounts
                                                WHERE id_account = ?
                                                `, [id_account]);

        if (!row.length) {
            return res.status(401).json({ message: "Người dùng không tồn tại." });
        }
        userRole = row[0].role

        // kiểm tra xem tài khoản đã đăng xuất chưa
        // if (!isTokenInCache(token)) {
        //     return res.status(401).json({ message: "Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại" });
        // }

        if (roles[userRole] && roles[userRole].includes(permission)) {
            req.role = userRole;
            req.id_account = id_account;
            next(); // Người dùng có quyền
        } else {
            res.status(403).json({ message: 'Từ chối truy cập' }); // Người dùng không có quyền
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Lỗi từ phía server.' });
    }
};

module.exports = authorize;
