const express = require('express');
const pool = require('../config/connectDB');

const getHomepage = async (req, res) => {
    try {
        const [rows, fields] = await pool.execute(`
        SELECT 
            *
        FROM
            sheets
        ORDER BY 
            no, platform, linkDemo, adsPosition`);
        
        return res.status(200).render('index', { sheets: rows   });
        
    } catch (error) {
        console.error(error);
        return res.status(404).json('Server error');
    }
}

const getAdminPage = async (req, res) => {
    try {
        return res.status(200).render('admin');
    } catch (error) {
        console.error(error);
        return res.status(404).json('Server error');
    }
}

module.exports = {
    getHomepage, getAdminPage
}