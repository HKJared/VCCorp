const express = require('express');
const pool = require('../config/connectDB');
const { generateToken, decodeToken } = require('../middleware/authentication');
const style = [];

async function checkAccount (account) {
    const [row, field] = await pool.execute(`SELECT id_account, role
                                            FROM account
                                            WHERE user_name = ? AND password = ?
                                            `, [account.user_name, account.password]);

    if (!row.length) {
        return { ok: false }
    }

    return { ok: true, data: { id_account: row[0].id_account, role: row[0].role } }
}

const authentication = async (req, res) => {
    try {
        const token = req.query.token;
        
        if (!token) {
            return res.status(400).json({ message: 'Không thể xác thực danh tính' })
        }

        const account = decodeToken(token);

        const [row, field] = await pool.execute(`SELECT *
                                                FROM account
                                                WHERE user_name = ? AND password = ?`, [account.user_name, account.password]);

        if (!row.length) {
            return res.status(404).json({ message: 'Tài khoản không tồn tại' })
        }

        return res.status(200).json({ role: account.role });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Lỗi từ phía server.' });
    }
}

const login = async (req, res) => {
    try {
        const account = req.body;

        if (!account.user_name || !account.password) {
            return res.status(400).json({ message: 'Account không nhận được ở phía Server' })
        }

        const [row, field] = await pool.execute(`SELECT *
                                                FROM account
                                                WHERE user_name = ? AND password = ?`, [account.user_name, account.password]);

        if (!row.length) {
            return res.status(404).json({ message: 'Tài khoản không tồn tại' })
        }

        const token = generateToken(row[0]);
        return res.status(200).json({ message: 'Đăng nhập thành công', token: token });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Lỗi từ phía server.' });
    }
}

const register = async (req, res) => {
    try {
        const account = req.body;

        if (!account.fullname || !account.user_name || !account.password) {
            return res.status(400).json({ message: 'Thông tin tài khoản đăng kí không được gửi đầy đủ về phía server' });
        }

        // nếu muốn tạo một tài khoản admin
        if (account.role <= 2) {
            const token = req.header('Authorize');

            if (!token) {
                return res.status(401).json({ message: 'Không xác thực được danh tính' })
            }

            const checkAcc = await checkAccount(decodeToken(token));
            if (!checkAcc.ok || checkAcc.data.role > 1) {
                return res.status(401).json({ message: 'Không đủ thẩm quyền tạo tài khoản' })
            }
        }

        const [result, none1] = await pool.execute(`SELECT id_account
                                          FROM account
                                          WHERE user_name = ? `, [account.user_name]);

        if (result.length) {
            return res.status(409).json({ message: 'Tài khoản đã tồn tại' });
        }

        await pool.execute(`INSERT into account (user_name, fullname, password, role)
                                                          values (?, ?, ?, ?)
                                                         `, [account.user_name, account.fullname, account.password, account.role]);

        const [row2, fields2] = await pool.execute(`SELECT *
                                                    FROM account
                                                    WHERE user_name = ? `, [account.user_name]);
        const token = generateToken(row2[0]);
        return res.status(200).json({ message: 'Đăng kí thành công', token: token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Lỗi từ phía server.' });
    }
}



const createRow = async (req, res) => {
    try {
        const newRow = req.body;
        const token = req.header('Authorize');

        if (!token) {
            return res.status(401).json({ message: 'Không xác thực được danh tính' })
        }

        const checkAcc = await checkAccount(decodeToken(token));
        console.log(checkAcc)
            if (!checkAcc.ok || checkAcc.data.role > 2) {
                return res.status(401).json({ message: 'Không đủ thẩm quyền tạo dữ liệu mới' })
            }

        var idWebsite;

        if (!newRow.website || !newRow.url || !newRow.adsPosition || !newRow.dimensions || !newRow.platform || !newRow.demo) {
            return res.status(400).json({ message: 'Dữ liệu được gửi về Server không đầy đủ.' })
        }

        const [rows3, fields3] = await pool.execute(`
                                                    SELECT idWebsite, url
                                                    FROM website
                                                    WHERE name = ?
                                                    `, [newRow.website]);

        if (rows3.length) {
            if (rows3[0].url != newRow.url) {
                return res.status(400).json({ message: `Website ${newRow.website} đã tồn tại nhưng được gắn với một đường dẫn khác.`})
            }
            idWebsite = rows3[0].idWebsite;
        } else {
            const [newWebsite, none2] = await pool.execute(`
                                                            INSERT INTO website (name, url)
                                                            VALUES (?, ?)
                                                            `, [ newRow.website, newRow.url ]);
            idWebsite = newWebsite.insertId;
        }

        const [rows, fields] = await pool.execute(`
                                                    SELECT idWebsite
                                                    FROM sheets
                                                    WHERE idWebsite = ? AND idStyle = ?
                                                    `, [idWebsite, newRow.idStyle]);
        const [rows4, fields4] = await pool.execute(`
                                                    SELECT idWebsite, idStyle
                                                    FROM sheets
                                                    WHERE idWebsite = ?
                                                    `, [idWebsite]);
        if (rows.length != rows4.length) {
            return res.status(400).json({ message: `Website ${ newRow.website } đã nằm ở bảng ${ rows4[0]. idStyle }.` })
        }

        

        const [rows2, fields2] = await pool.execute(`
                                                        SELECT col1, col2, col3, col4, col5
                                                        FROM style
                                                        WHERE idStyle = ?
                                                        `, [ newRow.idStyle ]);
        const [result, none] = await pool.execute(`
                                                    INSERT INTO sheets (idWebsite, adsPosition, dimensions, platform, demo, linkDemo,
                                                        ${ rows2[0].col1 }, ${ rows2[0].col2 }, ${ rows2[0].col3 }, ${ rows2[0].col4 }, ${ rows2[0].col5 }, idStyle, created_by)
                                                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                                                    `, [ idWebsite, newRow.adsPosition, newRow.dimensions, newRow.platform, newRow.demo, newRow.linkDemo,
                                                        newRow.col1 || null, newRow.col2 || null, newRow.col3 || null, newRow.col4 || null, newRow.col5 || null, newRow.idStyle, checkAcc.data.id_account]);
        const idNewRow = result.insertId;
        return res.status(200).json({ message: "Đã thêm dữ liệu mới.", idNewRow: result.insertId })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Lỗi từ phía server.' });
    }
}

const getRow = async (req, res) => {
    try {
        const idRow = req.query.idRow;

        if (!idRow) {
            return res.status(400).json({ message: 'ID của dữ liệu không được gửi từ phía bạn'});
        }

        const [row, field] = await pool.execute(`
                                            SELECT s.*, w.name as website, w.url as url
                                            FROM sheets as s
                                            INNER JOIN website as w ON s.idWebsite = w.idWebsite
                                            WHERE s.idRow = ?
                                            `, [idRow]);
        if (!row.length) {
            return res.status(404).json({ message: 'Dữ liệu không tồn tại' });
        }                       

        return res.status(200).json({   data: row[0]    })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi từ phía server.' });
    }
}

const getRowsStyle = async (req, res) => {
    try {
        const idStyle = req.query.idStyle;
        const key = req.query.key;
        const minPrice = req.query.minPrice;
        const maxPrice = req.query.maxPrice;
        const page = parseInt(req.query.page);

        const [count] = await pool.execute(`
            SELECT COUNT(*) as cnt
            FROM sheets as s
            INNER JOIN website as w ON s.idWebsite = w.idWebsite
            WHERE s.idStyle = ${ idStyle } AND (
                w.name LIKE '%${key || ""}%' OR 
                s.adsPosition LIKE '%${key || ""}%' OR 
                s.dimensions LIKE '%${key || ""}%' OR 
                s.platform LIKE '%${key || ""}%' OR 
                s.buyingMethod LIKE '%${key || ""}%' OR
                s.price1 LIKE '%${key || ""}%' OR
                s.price2 LIKE '%${key || ""}%' OR
                s.price3 LIKE '%${key || ""}%' OR
                s.performance1 LIKE '%${key || ""}%' OR 
                s.performance2 LIKE '%${key || ""}%' OR 
                s.note LIKE '%${key || ""}%'
            ) AND (
                s.price1 BETWEEN ${minPrice} AND ${maxPrice} OR 
                s.price2 BETWEEN ${minPrice} AND ${maxPrice} OR 
                s.price3 BETWEEN ${minPrice} AND ${maxPrice}
            )
        `);

        var quantityPage = count[0].cnt % 20 ? Math.floor(count[0].cnt / 20) + 1 : Math.floor(count[0].cnt / 20);

        const [rows, fields] = await pool.execute(`
            SELECT s.*, w.name as website, w.url as url
            FROM sheets as s
            INNER JOIN website as w ON s.idWebsite = w.idWebsite
            WHERE s.idStyle = ${idStyle} AND (
                w.name LIKE '%${key || ""}%' OR 
                s.adsPosition LIKE '%${key || ""}%' OR 
                s.dimensions LIKE '%${key || ""}%' OR 
                s.platform LIKE '%${key || ""}%' OR 
                s.buyingMethod LIKE '%${key || ""}%' OR
                s.price1 LIKE '%${key || ""}%' OR
                s.price2 LIKE '%${key || ""}%' OR
                s.price3 LIKE '%${key || ""}%' OR
                s.performance1 LIKE '%${key || ""}%' OR 
                s.performance2 LIKE '%${key || ""}%' OR 
                s.note LIKE '%${key || ""}%'
            ) AND (
                s.price1 BETWEEN ${minPrice} AND ${maxPrice} OR 
                s.price2 BETWEEN ${minPrice} AND ${maxPrice} OR 
                s.price3 BETWEEN ${minPrice} AND ${maxPrice}
            )
            ORDER BY s.idWebsite, s.platform, s.demo, s.adsPosition, s.created_at
            LIMIT 20
            OFFSET ${(page - 1) * 20 || 0}
        `);
        return res.status(200).json({ data: rows, quantityPage: quantityPage });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Lỗi từ phía server.' });
    }
}

const updateRow = async (req, res) => {
    try {
        const updateRow = req.body;
        
        if (!updateRow.idRow || !updateRow.adsPosition || !updateRow.dimensions || !updateRow.platform  || !updateRow.demo || !updateRow.linkDemo) {
            return res.status(400).json({   message: 'Dữ liệu được gửi về Server không đầy đủ.' })
        }

        const [row, field] = await pool.execute(`
                                            SELECT idRow
                                            FROM sheets
                                            WHERE idRow = ?
                                            `, [updateRow.idRow]);

        if (!row.length) {
            return res.status(404).json({   message: 'Dữ liệu bạn muốn cập nhật không tồn tại.' })
        }

        const [rows2, fields2] = await pool.execute(`
                                                    SELECT *
                                                    FROM style
                                                    WHERE idStyle = ?
                                                    `, [updateRow.idStyle]);

        const style = rows2[0]

        await pool.execute(`
                            UPDATE sheets 
                            SET  adsPosition = ?, dimensions = ?, platform = ?, demo = ?, linkDemo = ?,
                                ${ style.col1 } = ?, ${ style.col2 } = ?, ${ style.col3 } = ?, ${ style.col4 } = ?, ${ style.col5 } = ?
                            WHERE idRow = ?
                            `, [
                                updateRow.adsPosition, updateRow.dimensions, updateRow.platform, updateRow.demo, updateRow.linkDemo,
                                updateRow.col1 || null, updateRow.col2 || null, updateRow.col3 || null, updateRow.col4 || null, updateRow.col5 || null,
                                updateRow.idRow
                            ]);

        return res.status(200).json({   message: 'Cập nhật thành công.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Lỗi từ phía server.' });
    }
}

const deleteRow = async (req, res) => {
    try {
        const idRow = req.body.idRow;

        if (!idRow) {
            return res.status(400).json({ message: 'Thông tin về dữ liệu bạn muốn xóa không được gửi về server.'});
        }


        const [row, field] = await pool.execute(`
                                                    SELECT idRow
                                                    FROM sheets
                                                    WHERE idRow = ?
                                                    `, [idRow]);
        if (!row.length) {
            return res.status(404).json({ message: 'Dữ liệu bạn muốn xóa không tồn tại.' });
        }  
        await pool.execute(`
                            DELETE
                            FROM sheets
                            WHERE idRow = ?
                            `, [idRow]);

        return res.status(200).json({ message: 'Xóa thành công.'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi từ phía server' });
    }
}

const getStyle = async (req, res) => {
    try {
        const [rows, fields] = await pool.execute(`
                                                    SELECT *
                                                    FROM style
                                                    `);
        return res.status(200).json(rows)
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Lỗi từ phía server' });
    }
}

const getWebsites = async (req, res) => {
    try {
        const key = req.query.key;
        const [rows, fields] = await pool.execute(`
                                                    SELECT *
                                                    FROM website
                                                    WHERE name like '%${ key || "" }%' OR idWebsite like '%${ key || "" }%'
                                                    `);
        return res.status(200).json(rows)
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Lỗi từ phía server' });
    }
}

module.exports = {
    login, register, authentication,
    createRow, getRow, updateRow, deleteRow,
    getStyle, getRowsStyle, getWebsites
}