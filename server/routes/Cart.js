const router = require('express').Router();
const pool = require('../db');
const authorization = require('../middleware/authorization');

router.get("/", async (req, res) => {
    try {
        const {id} = req.query;

        const cart = await pool.query(
            'SELECT * FROM carts WHERE owner = $1',
            [id]
        );

        const cartItems = await pool.query(
            'SELECT * FROM cart_items LEFT JOIN products ON products.id = cart_items.product_id WHERE cart_id = $1',
            [cart.rows[0].id]
        );

        console.log(cartItems);

        res.json(cartItems.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server Error!');
    }
})

router.post('/', async (req, res) => {
    try {
        
        // Gather product info by destructuring request body
        const { id, product_id } = req.body;
        const quantity = 1;
        console.log(id);
            const cart = await pool.query(
                'SELECT * FROM carts WHERE owner = $1',
                [id]
            );
            console.log(cart);
        
            if (cart.rows.length === 0) {
                const newCart = await pool.query(
                    'INSERT INTO carts (owner) VALUES ($1) RETURNING *',
                    [id]
                );
                const cartId = newCart.rows[0].id;
                console.log(cartId);
                console.log('new cart');
                const newCartItem = await pool.query(
                    'INSERT INTO cart_items (cart_id, product_id,quantity) VALUES ($1, $2, $3) RETURNING *',
                    [cartId, product_id, quantity]
                );
                console.log('new cart item');
            }

        const cartId = cart.rows[0].id;
        console.log(cartId);

        const qtyCheck = await pool.query(
            'SELECT * FROM cart_items WHERE product_id = $1 AND cart_id = $2', [product_id, cartId]
            );

            if (qtyCheck.rows.length === 0) {
                const newCartItem = await pool.query(
                    'INSERT INTO cart_items (cart_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *',
                    [cartId, product_id, quantity]
                );
            } else {
                const updateQty = await pool.query(
                    'UPDATE cart_items SET quantity = quantity + $1 WHERE product_id = $2',
                    [1, product_id]
                );
            }
        

        // Add product to database


        res.status(201).json('Item added to cart!');
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server Error!');
    }
})

module.exports = router;