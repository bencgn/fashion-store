const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// View cart
router.get('/', (req, res) => {
    // In a real app, cart would be stored in session or database
    // For simplicity, we'll use a dummy cart in this example
    const cart = req.session?.cart || { items: [], total: 0 };
    
    res.render('cart/index', {
        title: 'Shopping Cart',
        cart
    });
});

// Add item to cart
router.post('/add', async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const product = await Product.findById(productId);
        
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        
        // Initialize cart if it doesn't exist
        if (!req.session.cart) {
            req.session.cart = {
                items: [],
                total: 0
            };
        }
        
        // Check if product already in cart
        const existingItemIndex = req.session.cart.items.findIndex(
            item => item.product._id.toString() === productId
        );
        
        if (existingItemIndex > -1) {
            // Update quantity if product already in cart
            req.session.cart.items[existingItemIndex].quantity += parseInt(quantity);
        } else {
            // Add new item to cart
            req.session.cart.items.push({
                product,
                quantity: parseInt(quantity)
            });
        }
        
        // Recalculate cart total
        req.session.cart.total = req.session.cart.items.reduce(
            (total, item) => total + (item.product.price * item.quantity),
            0
        );
        
        res.json({
            success: true,
            cart: req.session.cart
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Update cart item quantity
router.put('/update', (req, res) => {
    try {
        const { productId, quantity } = req.body;
        
        if (!req.session.cart) {
            return res.status(400).json({ success: false, message: 'Cart not found' });
        }
        
        const itemIndex = req.session.cart.items.findIndex(
            item => item.product._id.toString() === productId
        );
        
        if (itemIndex === -1) {
            return res.status(404).json({ success: false, message: 'Item not found in cart' });
        }
        
        // Update quantity or remove if quantity is 0
        if (parseInt(quantity) > 0) {
            req.session.cart.items[itemIndex].quantity = parseInt(quantity);
        } else {
            req.session.cart.items.splice(itemIndex, 1);
        }
        
        // Recalculate cart total
        req.session.cart.total = req.session.cart.items.reduce(
            (total, item) => total + (item.product.price * item.quantity),
            0
        );
        
        res.json({
            success: true,
            cart: req.session.cart
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Remove item from cart
router.delete('/remove/:productId', (req, res) => {
    try {
        const { productId } = req.params;
        
        if (!req.session.cart) {
            return res.status(400).json({ success: false, message: 'Cart not found' });
        }
        
        const itemIndex = req.session.cart.items.findIndex(
            item => item.product._id.toString() === productId
        );
        
        if (itemIndex === -1) {
            return res.status(404).json({ success: false, message: 'Item not found in cart' });
        }
        
        // Remove item from cart
        req.session.cart.items.splice(itemIndex, 1);
        
        // Recalculate cart total
        req.session.cart.total = req.session.cart.items.reduce(
            (total, item) => total + (item.product.price * item.quantity),
            0
        );
        
        res.json({
            success: true,
            cart: req.session.cart
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Clear cart
router.delete('/clear', (req, res) => {
    try {
        req.session.cart = {
            items: [],
            total: 0
        };
        
        res.json({
            success: true,
            cart: req.session.cart
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
