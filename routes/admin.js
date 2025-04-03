const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Admin authentication middleware (simplified)
const isAdmin = (req, res, next) => {
    // In a real app, you would check for admin authentication
    // For now, we'll just proceed for demo purposes
    next();
};

// Admin dashboard
router.get('/', isAdmin, async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        res.render('admin/dashboard', {
            title: 'Admin Dashboard',
            products
        });
    } catch (err) {
        console.error(err);
        res.status(500).render('error', { message: 'Server error' });
    }
});

// Show add product form
router.get('/products/add', isAdmin, (req, res) => {
    res.render('admin/add-product', {
        title: 'Add Product'
    });
});

// Add new product
router.post('/products', isAdmin, async (req, res) => {
    try {
        const { name, price, category, description, sizes, colors, inStock, featured, imageUrl } = req.body;
        
        // Simple validation
        if (!name || !price || !category || !description) {
            return res.render('admin/add-product', {
                title: 'Add Product',
                error: 'Required fields missing',
                formData: req.body
            });
        }
        
        // Create new product
        const newProduct = new Product({
            name,
            price: parseFloat(price),
            category,
            description,
            sizes: sizes ? sizes.split(',').map(size => size.trim()) : [],
            colors: colors ? colors.split(',').map(color => color.trim()) : [],
            inStock: inStock === 'on' ? true : false,
            featured: featured === 'on' ? true : false,
            imageUrl: imageUrl || '/images/placeholder.jpg'
        });
        
        await newProduct.save();
        
        res.redirect('/admin');
    } catch (err) {
        console.error(err);
        res.status(500).render('error', { message: 'Server error' });
    }
});

// Show edit product form
router.get('/products/edit/:id', isAdmin, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        
        if (!product) {
            return res.status(404).render('error', { message: 'Product not found' });
        }
        
        res.render('admin/edit-product', {
            title: 'Edit Product',
            product
        });
    } catch (err) {
        console.error(err);
        res.status(500).render('error', { message: 'Server error' });
    }
});

// Update product
router.put('/products/:id', isAdmin, async (req, res) => {
    try {
        const { name, price, category, description, sizes, colors, inStock, featured, imageUrl } = req.body;
        
        // Simple validation
        if (!name || !price || !category || !description) {
            return res.render('admin/edit-product', {
                title: 'Edit Product',
                error: 'Required fields missing',
                product: { ...req.body, _id: req.params.id }
            });
        }
        
        // Update product
        const updatedProduct = {
            name,
            price: parseFloat(price),
            category,
            description,
            sizes: sizes ? sizes.split(',').map(size => size.trim()) : [],
            colors: colors ? colors.split(',').map(color => color.trim()) : [],
            inStock: inStock === 'on' ? true : false,
            featured: featured === 'on' ? true : false,
            imageUrl: imageUrl || '/images/placeholder.jpg'
        };
        
        await Product.findByIdAndUpdate(req.params.id, updatedProduct);
        
        res.redirect('/admin');
    } catch (err) {
        console.error(err);
        res.status(500).render('error', { message: 'Server error' });
    }
});

// Delete product
router.delete('/products/:id', isAdmin, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.redirect('/admin');
    } catch (err) {
        console.error(err);
        res.status(500).render('error', { message: 'Server error' });
    }
});

module.exports = router;
