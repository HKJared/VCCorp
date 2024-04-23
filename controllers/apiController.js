const express = require('express');
const pool = require('../config/connectDB');

const createRow = async (req, res) => {
    try {
        const newRow = req.body;
        var idWebsite;

        if (!newRow.website || !newRow.adsPosition || !newRow.dimensions || !newRow.platform || !newRow.demo) {
            return res.status(400).json({ message: 'New data was not sent from the client side.' })
        }

        const [rows, fields] = await pool.execute(`
                                                    SELECT s.idStyle, s.idWebsite
                                                    FROM sheets as s, website as w
                                                    WHERE w.name = ? AND w.idWebsite = s.idWebsite
                                                    `, [newRow.website]);
        if (rows.length && rows[0].idStyle != newRow.idStyle) {
            return res.status(400).json({ message: 'Website ' + newRow.website + ' is already in another table.' })
        }

        if (rows.length) {
            idWebsite = rows[0].idWebsite;
        } else {
            const [newWebsite, none2] = await pool.execute(`
                                                            INSERT INTO website (name, url)
                                                            values (?, ?)
                                                            `, [ newRow.website, newRow.url ]);
            idWebsite = newWebsite.insertId;
        }

        const [rows2, fields2] = await pool.execute(`
                                                        SELECT col1, col2, col3, col4, col5
                                                        FROM style
                                                        WHERE idStyle = ?
                                                        `, [ newRow.idStyle ]);
        const [result, none] = await pool.execute(`
                                                    INSERT INTO sheets (idWebsite, adsPosition, dimensions, platform, demo, linkDemo,
                                                        ${ rows2[0].col1 }, ${ rows2[0].col2 }, ${ rows2[0].col3 }, ${ rows2[0].col4 }, ${ rows2[0].col5 }, idStyle)
                                                    values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                                                    `, [ idWebsite, newRow.adsPosition, newRow.dimensions, newRow.platform, newRow.demo, newRow.linkDemo,
                                                        newRow.col1 || null, newRow.col2 || null, newRow.col3 || null, newRow.col4 || null, newRow.col5 || null, newRow.idStyle ]);
        const idNewRow = result.insertId;
        return res.status(200).json({ message: "Added successfully.", idNewRow: result.insertId })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred' });
    }
}

const getRow = async (req, res) => {
    try {
        const idRow = req.query.idRow;

        if (!idRow) {
            return res.status(400).json({ message: 'Data about the row (idRow) was not sent from the client side.'});
        }

        const [row, field] = await pool.execute(`
                                            SELECT * 
                                            FROM sheets
                                            WHERE idRow = ?
                                            `, [idRow]);
        if (!row.length) {
            return res.status(404).json({ message: 'Data was not exit.' });
        }                       

        return res.status(200).json({   data: row[0]    })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
}

const getRowsStyle = async (req, res) => {
    try {
        const idStyle = req.query.idStyle;
        const key = req.query.key;
        const page = parseInt(req.query.page);

        const [count] = await pool.execute(`
            SELECT COUNT(*) as cnt
            FROM sheets
            WHERE idStyle = ${ idStyle }
        `);

        var quantityPage = count[0].cnt % 25 ? Math.floor(count[0].cnt / 25) + 1 : Math.floor(count[0].cnt / 25);

        const [rows, fields] = await pool.execute(`
            SELECT s.*, w.name as website, w.url as url
            FROM sheets as s, website as w
            WHERE s.idStyle = ${ idStyle } AND s.idWebsite = w.idWebsite AND w.name LIKE '%${ key || "" }%'
            ORDER BY s.idWebsite, s.platform, s.demo, s.adsPosition, s.created_at
            LIMIT 20
            OFFSET ${ (page - 1) * 20 || 0 }
        `);
        return res.status(200).json({ data: rows, quantityPage: quantityPage });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred' });
    }
}

const updateRow = async (req, res) => {
    try {
        const updateRow = req.body;
        
        if (!updateRow.idRow || !updateRow.website || !updateRow.adsPosition || !updateRow.dimensions || !updateRow.platform  || !updateRow.demo || !updateRow.linkDemo) {
            return res.status(400).json({   message: 'Data about the row was not sent from the client side.' })
        }

        const [row, field] = await pool.execute(`
                                            SELECT idRow
                                            FROM sheets
                                            WHERE idRow = ?
                                            `, [updateRow.idRow]);

        if (!row.length) {
            return res.status(404).json({   message: 'Data was not exit.' })
        }

        const [rows2, fields2] = await pool.execute(`
                                                    SELECT *
                                                    FROM style
                                                    WHERE idStyle = ?
                                                    `, [updateRow.idStyle]);

        const style = rows2[0]

        await pool.execute(`
                            UPDATE sheets 
                            SET website = ?, adsPosition = ?, dimensions = ?, platform = ?, demo = ?, linkDemo = ?,
                                ${ style.col1 } = ?, ${ style.col2 } = ?, ${ style.col3 } = ?, ${ style.col4 } = ?, ${ style.col5 } = ?
                            WHERE idRow = ?
                            `, [
                                updateRow.website, updateRow.adsPosition, updateRow.dimensions, updateRow.platform, updateRow.demo, updateRow.linkDemo,
                                updateRow.col1 || null, updateRow.col2 || null, updateRow.col3 || null, updateRow.col4 || null, updateRow.col5 || null,
                                updateRow.idRow
                            ]);

        return res.status(200).json({   message: 'Updated.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred' });
    }
}

const deleteRow = async (req, res) => {
    try {
        const idRow = req.body.idRow;

        if (!idRow) {
            return res.status(400).json({ message: 'Data about the row to be deleted was not sent from the client side.'});
        }


        const [row, field] = await pool.execute(`
                                                    SELECT idRow
                                                    FROM sheets
                                                    WHERE idRow = ?
                                                    `, [idRow]);
        if (!row.length) {
            return res.status(404).json({ message: 'Data was not exit.' });
        }  
        await pool.execute(`
                            DELETE
                            FROM sheets
                            WHERE idRow = ?
                            `, [idRow]);

        return res.status(200).json({ message: 'Deleted.'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
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
        return res.status(500).json({ error: 'An error occurred' });
    }
}

module.exports = {
    createRow, getRow, updateRow, deleteRow,
    getStyle, getRowsStyle
}