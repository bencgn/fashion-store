const express = require('express');
const router = express.Router();

// Checkout page
router.get('/', (req, res) => {
    // Ensure user has items in cart
    if (!req.session.cart || req.session.cart.items.length === 0) {
        return res.redirect('/cart');
    }
    
    res.render('checkout/index', {
        title: 'Checkout',
        cart: req.session.cart
    });
});

// Process payment
router.post('/process', (req, res) => {
    try {
        const { name, email, address, city, postalCode, country, paymentMethod } = req.body;
        
        // Validation
        if (!name || !email || !address || !city || !postalCode || !country || !paymentMethod) {
            return res.render('checkout/index', {
                title: 'Checkout',
                cart: req.session.cart,
                error: 'All fields are required',
                formData: req.body
            });
        }
        
        // In a real application, you would:
        // 1. Create an order in the database
        // 2. Process payment through a payment gateway
        // 3. Update inventory
        // 4. Send confirmation email
        
        // For now, just clear the cart and show success
        req.session.cart = { items: [], total: 0 };
        
        res.render('checkout/success', {
            title: 'Order Confirmed',
            orderDetails: {
                name,
                email,
                address,
                city,
                postalCode,
                country,
                paymentMethod,
                orderDate: new Date(),
                orderNumber: 'ORD' + Date.now()
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).render('error', { message: 'Server error' });
    }
});

// Order confirmation page
router.get('/success', (req, res) => {
    res.render('checkout/success', {
        title: 'Order Confirmed'
    });
});

module.exports = router;
