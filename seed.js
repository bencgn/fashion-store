require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

// Sample product data
const productData = [
    {
        name: 'Classic Cotton T-Shirt',
        price: 24.99,
        category: 'men',
        description: 'A comfortable classic cotton t-shirt that is perfect for everyday wear. Made from high-quality cotton fabric for durability and comfort.',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['White', 'Black', 'Navy', 'Gray'],
        imageUrl: '/images/product1.jpg',
        inStock: true,
        featured: true
    },
    {
        name: 'Slim Fit Jeans',
        price: 59.99,
        category: 'men',
        description: 'Modern slim fit jeans that offer both style and comfort. These versatile jeans can be dressed up or down for any occasion.',
        sizes: ['30', '32', '34', '36'],
        colors: ['Blue', 'Black', 'Gray'],
        imageUrl: '/images/product2.jpg',
        inStock: true,
        featured: false
    },
    {
        name: 'Summer Floral Dress',
        price: 49.99,
        category: 'women',
        description: 'A beautiful floral summer dress with a flowy design. Perfect for warm weather and casual outings.',
        sizes: ['XS', 'S', 'M', 'L'],
        colors: ['Floral Print', 'Blue Floral', 'Pink Floral'],
        imageUrl: '/images/product3.jpg',
        inStock: true,
        featured: true
    },
    {
        name: 'Women\'s Casual Blouse',
        price: 34.99,
        category: 'women',
        description: 'A lightweight and comfortable blouse suitable for office or casual wear. Features a flattering cut and elegant design.',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['White', 'Black', 'Pink', 'Blue'],
        imageUrl: '/images/product4.jpg',
        inStock: true,
        featured: false
    },
    {
        name: 'Leather Watch',
        price: 89.99,
        category: 'accessories',
        description: 'A classic leather watch that adds a touch of elegance to any outfit. Features a quality quartz movement and genuine leather strap.',
        sizes: ['One Size'],
        colors: ['Brown', 'Black'],
        imageUrl: '/images/product5.jpg',
        inStock: true,
        featured: true
    },
    {
        name: 'Canvas Backpack',
        price: 45.99,
        category: 'accessories',
        description: 'A durable canvas backpack perfect for daily use. Features multiple compartments for organization and padded straps for comfort.',
        sizes: ['One Size'],
        colors: ['Navy', 'Olive', 'Black'],
        imageUrl: '/images/product6.jpg',
        inStock: true,
        featured: false
    },
    {
        name: 'Hooded Sweatshirt',
        price: 39.99,
        category: 'men',
        description: 'Warm and comfortable hooded sweatshirt perfect for cool days. Made from a soft cotton blend material.',
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: ['Gray', 'Black', 'Navy', 'Red'],
        imageUrl: '/images/product7.jpg',
        inStock: true,
        featured: false
    },
    {
        name: 'Pleated Skirt',
        price: 42.99,
        category: 'women',
        description: 'A stylish pleated skirt that can be dressed up or down. Features a comfortable elastic waistband.',
        sizes: ['XS', 'S', 'M', 'L'],
        colors: ['Black', 'Navy', 'Beige'],
        imageUrl: '/images/product8.jpg',
        inStock: true,
        featured: false
    }
];

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/clothing-shop', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(async () => {
    console.log('MongoDB connected for seeding...');
    
    try {
        // Delete existing products
        await Product.deleteMany({});
        console.log('Deleted existing products');
        
        // Insert new products
        await Product.insertMany(productData);
        console.log('Sample products inserted successfully');
        
        mongoose.disconnect();
        console.log('MongoDB disconnected');
    } catch (err) {
        console.error('Error seeding database:', err);
        mongoose.disconnect();
    }
})
.catch(err => {
    console.error('Error connecting to MongoDB:', err);
});
