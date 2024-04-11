const express = require('express');
const pool = require('../config/connectDB');

const createRow = async (req, res) => {
    try {
        const newRow = req.body;

        console.log(newRow);

        var noNewRow;

        if (!newRow || !newRow.website || !newRow.adsPosition || !newRow.dimensions || !newRow.platform || !newRow.demo || !newRow.buyingMethod) {
            return res.status(400).json({ message: 'New data was not sent from the client side.' })
        }

        const [rows, fields] = await pool.execute(`
                                                    SELECT idRow, no
                                                    FROM sheets
                                                    WHERE website = ?
                                                    `, [newRow.website]);
        if (rows.length) {
            const [rows2, fields2] = await pool.execute(`
                                                    SELECT idRow, no
                                                    FROM sheets
                                                    WHERE website = ? AND adsPosition = ? AND buyingMethod = ?
                                                    `, [newRow.website, newRow.adsPosition, newRow.buyingMethod]);
            if (rows2.length) {
                return res.status(409).json({ message: 'Data had exit.' });
            }
            noNewRow = rows[0].no;
        } else {
            const [rows3, fields3] = await pool.execute(`
                                                        SELECT MAX(no) as no
                                                        FROM sheets`);
            noNewRow = parseInt(rows3[0].no) + 1;
        }
        await pool.execute(`
                            INSERT INTO sheets(no, website, adsPosition, dimensions, platform, demo, linkDemo, buyingMethod,
                                homepage, crossSite, detailCrossSite, categories, averageCTR, estCTR, estTraffic, estImpression, note)
                            values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                            `, [ noNewRow, newRow.website, newRow.adsPosition, newRow.dimensions, newRow.platform, newRow.demo, newRow.linkDemo, newRow.buyingMethod,
                                newRow.homepage, newRow.crossSite, newRow.detailCrossSite, newRow.categories, newRow.averageCTR, newRow.estCTR, newRow.estTraffic, newRow.estImpression, newRow.note ]);

        return res.status(200).json({ message: "Added successfully."})
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
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

const getRows = async (req, res) => {
    try {
        const key = req.query.key;

        if (!key) {
            return res.status(400).json({ message: 'Data about the row (website) was not sent from the client side.'});
        }

        const [rows, fields] = await pool.execute(`
                                            SELECT idRow, no, website, adsPosition, dimensions, platform, demo, linkDemo, buyingMethod
                                            FROM sheets
                                            WHERE website LIKE '%${key}%'
                                            ORDER BY no, platform, linkDemo, adsPosition`);

        return res.status(200).json({   data: rows  });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
}

const getRowsStyle = async (req, res) => {
    try {
        const idStyle = req.query.idStyle;

        const [rows, fields] = await pool.execute(`
                                                    SELECT *
                                                    FROM sheets
                                                    WHERE idStyle = ${ idStyle }
                                                    `);
        return res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
}

const updateRow = async (req, res) => {
    try {
        const updateRow = req.body;

        console.log(updateRow);
        
        if (!updateRow.idRow || !updateRow.no || !updateRow.website || !updateRow.adsPosition || !updateRow.dimensions || !updateRow.platform || !updateRow.demo || !updateRow.buyingMethod) {
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

        await pool.execute(`
                            UPDATE sheets 
                            SET no = ?, website = ?, adsPosition = ?, dimensions = ?, platform = ?, demo = ?, linkDemo = ?, buyingMethod = ?,
                                homepage = ?, crossSite = ?, detailCrossSite = ?, categories = ?, averageCTR = ?, estCTR = ?, estTraffic = ?, estImpression = ?, note = ?
                            WHERE idRow = ?
                            `, [
                                updateRow.no, updateRow.website, updateRow.adsPosition, updateRow.dimensions, updateRow.platform, updateRow.demo, updateRow.linkDemo || null, updateRow.buyingMethod,
                                updateRow.homepage || null, updateRow.crossSite || null, updateRow.detailCrossSite || null, updateRow.categories || null, updateRow.averageCTR || null,
                                updateRow.estCTR || null, updateRow.estTraffic || null, updateRow.estImpression || null, updateRow.note || null, updateRow.idRow
                            ]);

        return res.status(200).json({   message: 'Updated.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
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
        res.status(500).json({ error: 'An error occurred' });
    }
}

module.exports = {
    createRow, getRow, getRows, updateRow, deleteRow,
    getStyle, getRowsStyle
}