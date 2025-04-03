const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Home page route
router.get('/', async (req, res) => {
    try {
        const featuredProducts = await Product.find({ featured: true }).limit(6);
        const newArrivals = await Product.find().sort({ createdAt: -1 }).limit(8);
        
        res.render('index', {
            title: 'Fashion Store - Home',
            featuredProducts,
            newArrivals
        });
    } catch (err) {
        console.error(err);
        res.status(500).render('error', { message: 'Server error' });
    }
});

// About page
router.get('/about', (req, res) => {
    res.render('about', { title: 'About Us' });
});

// Contact page
router.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contact Us' });
});

module.exports = router;
