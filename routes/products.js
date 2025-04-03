const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Get all products
router.get('/', async (req, res) => {
    try {
        const { category, sort, search } = req.query;
        let query = {};
        
        // Apply category filter
        if (category && category !== 'all') {
            query.category = category;
        }
        
        // Apply search filter
        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }
        
        // Apply sorting
        let sortOption = { createdAt: -1 }; // Default: newest first
        if (sort === 'price-low') {
            sortOption = { price: 1 };
        } else if (sort === 'price-high') {
            sortOption = { price: -1 };
        } else if (sort === 'name-asc') {
            sortOption = { name: 1 };
        }
        
        const products = await Product.find(query).sort(sortOption);
        const categories = await Product.distinct('category');
        
        res.render('products/index', {
            title: 'All Products',
            products,
            categories,
            currentCategory: category || 'all',
            currentSort: sort || 'newest',
            searchTerm: search || ''
        });
    } catch (err) {
        console.error(err);
        res.status(500).render('error', { message: 'Server error' });
    }
});

// Get single product details
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        
        if (!product) {
            return res.status(404).render('error', { message: 'Product not found' });
        }
        
        // Get related products (same category)
        const relatedProducts = await Product.find({
            category: product.category,
            _id: { $ne: product._id }
        }).limit(4);
        
        res.render('products/details', {
            title: product.name,
            product,
            relatedProducts
        });
    } catch (err) {
        console.error(err);
        res.status(500).render('error', { message: 'Server error' });
    }
});

module.exports = router;
