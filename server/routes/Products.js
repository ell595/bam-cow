const router = require('express').Router();
const pool = require('../db');


// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await pool.query(
            'SELECT * FROM products'
        );
        res.status(200).json(products.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server Error!');
    }
})

// Get specific product
router.get('/:id', async (req, res) => {
    console.log(req.query.id);
    const productId = req.query.id;
    try {
        const product = await pool.query(
            'SELECT * FROM products WHERE id = $1',
            [productId]
        );
        res.status(200).json(product.rows[0]);
        console.log(product.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server Error!');
    }
})

// Create new Product
router.post('/', async (req, res) => {
    try {
        // Gather product info by destructuring request body
        const { product_name, price, category, quantity } = req.body;

        const name = product_name;

        // Check if product already exists
        const product = await pool.query(
            'SELECT * FROM products WHERE name = $1',
            [name]
        );
        
        if (product.rows.length !== 0) {
            return res.status(401).json('Product already exists!');
        }

        // Add product to database
        const newProduct = await pool.query(
            'INSERT INTO products (name, price, category, quantity) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, price, category, quantity]
        );

        res.status(201).json(newProduct.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server Error!');
    }
})

router.delete('/', async (req, res) => {
    try {
        // Gather product info by destructuring request body
        const  product_name  = req.query.name;

        // Check if product already exists
        const product = await pool.query(
            'DELETE FROM products WHERE name = $1',
            [product_name]
        );

        const products = await pool.query(
            'SELECT * FROM products'
        );
        res.status(200).json(products.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server Error!');
    }
})

router.put('/', async (req, res) => {
    try {
        // Gather product info by destructuring request body
        const { id, updatedName, updatedPrice, updatedCategory, updatedQuantity } = req.body;
        console.log(req.body);

        // Check if product already exists
        const product = await pool.query(
            'UPDATE products SET name = $1, price = $2, category = $3, quantity = $4 WHERE id = $5',
            [updatedName, updatedPrice, updatedCategory, updatedQuantity, id]
        );

        const products = await pool.query(
            'SELECT * FROM products'
        );
        res.status(200).json(products.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server Error!');
    }
})

module.exports = router;