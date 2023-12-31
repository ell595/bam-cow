const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(cors({
    origin: true
}));
const stripe = require('stripe')(process.env.REACT_APP_STRIPE_PRIVATE_KEY);


// Middleware
app.use(
    bodyParser.json({
        verify: function(req, res, buf) {
            req.rawBody = buf;
        }
    })
);
app.use('/checkout/webhook', express.raw({ type: 'application/json' }));
app.use(express.json({
    limit: '5mb',
    verify: (req, res, buf) => {
      req.rawBody = buf.toString();
    }
})); //req.body
app.use((req, res, next) => {
    if (req.originalUrl.includes("/checkout/webhook")) {
      next();
    } else {
      express.json({ limit: "1mb" })(req, res, next);
    }
  });


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