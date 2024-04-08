const express = require('express');
const mysql = require('mysql2/promise');
const configViewEngine = require('./config/viewEngine');

const app = express();

const port = 3030;




configViewEngine(app);

app.get('/', async (req, res) => {
    try {
        const [rows, fields] = await pool.execute(`
        SELECT 
            no, website, adsPosition, dimensions, platform, demo, linkDemo, buyingMethod, unitPrice, crossSite, averageCTR, estTraffic
        FROM
            sheets where idSheet = 1
        ORDER BY 
            no, platform, linkDemo, adsPosition`);

        const [rows2, fields2] = await pool.execute(`
        SELECT 
            no, website, adsPosition, dimensions, platform, demo, linkDemo, buyingMethod, unitPrice, averageCTR, estImpression, note
        FROM
            sheets where idSheet = 2
        ORDER BY 
            no, platform, linkDemo, adsPosition`);

        const [rows3, fields3] = await pool.execute(`
        SELECT 
            no, website, adsPosition, dimensions, platform, demo, linkDemo, buyingMethod, unitPrice, crossSite, categories, estTraffic
        FROM
            sheets where idSheet = 3
        ORDER BY 
            no, platform, linkDemo, adsPosition`);
        
        // Xử lý dữ liệu rows ở đây
        return res.status(200).render('index', { sheet1: rows, sheet2: rows2, sheet3: rows3 });
    } catch (error) {
        console.error(error);
        return res.status(404).json('Server error');
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});