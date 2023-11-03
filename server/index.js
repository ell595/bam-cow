const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();
app.use(cors({
    origin: true
}));
const stripe = require('stripe')(process.env.REACT_APP_STRIPE_PRIVATE_KEY);


// Middleware

app.use(express.json()); //req.body


// Routes

// Auth Routes
app.use('/auth', require('./routes/Auth'));

// Dashboard Routes
app.use('/dashboard', require('./routes/Dashboard'));

app.use('/products', require('./routes/Products'));

app.use('/cart', require('./routes/Cart'));

app.use('/checkout', require('./routes/Checkout'));

app.listen(3000, () => {
    console.log('Server is running on Port 3000');
});