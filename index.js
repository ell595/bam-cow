const express = require('express');
const app = express();
const cors = require('cors');

// Middleware

app.use(express.json()); //req.body
app.use(cors());

// Routes

// Auth Routes
app.use('/auth', require('./routes/Auth'));

// Dashboard Routes
app.use('/dashboard', require('./routes/Dashboard'));

app.listen(3000, () => {
    console.log('Server is running on Port 3000');
});