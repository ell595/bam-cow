const router = require('express').Router();
require('dotenv').config();
const Stripe = require('stripe');
const stripe = Stripe('sk_test_51O88fRJxnY6Bfoc7mfmZAZf1IMfoiO36MfunneavmmWRbJH9KAwYub2w0R9jKQoDNvV52r8TTddHL8eVs5IdJbo700lSQz1LXg');

router.post('/create-checkout-session', async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            shipping_address_collection: {
                allowed_countries: ['GB', 'US', 'CA'],
                },
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: req.body.items.map(item => {
                return {
                    price_data: {
                        currency: 'gbp',
                        product_data: {
                            name: item.name
                    },
                    unit_amount: 799
                },
                quantity: item.quantity
            }
            }),
            success_url: `http://localhost:3000/checkout/success`,
            cancel_url: `http://localhost:3000/checkout/cancel`,
        });
        res.json({ url: session.url })
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server Error!');
    }
})

router.get('/success', async (req, res) => {
    res.send('checkout completed');
})

module.exports = router;