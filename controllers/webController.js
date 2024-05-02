const express = require('express');
const pool = require('../config/connectDB');

const getHomepage = async (req, res) => {
    try {
        return res.status(200).render('index');
    } catch (error) {
        console.error(error);
        return res.status(404).json('Server error');
    }
}

const getAdminPage = async (req, res) => {
    try {
        return res.status(200).render('admin/homepage');
    } catch (error) {
        console.error(error);
        return res.status(404).json('Server error');
    }
}

const getPriceListAdminPage = async (req, res) => {
    try {
        return res.status(200).render('admin/priceList');
    } catch (error) {
        console.error(error);
        return res.status(404).json('Server error');
    }
}

const getWebsiteListAdminPage = async (req, res) => {
    try {
        return res.status(200).render('admin/websiteList');
    } catch (error) {
        console.error(error);
        return res.status(404).json('Server error');
    }
}

module.exports = {
    getHomepage, getAdminPage, getPriceListAdminPage, getWebsiteListAdminPage
}