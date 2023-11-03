const router = require('express').Router();
const express = require('express');
const pool = require('../db');
require('dotenv').config();
const Stripe = require('stripe');
const stripe = Stripe('sk_test_51O88fRJxnY6Bfoc7mfmZAZf1IMfoiO36MfunneavmmWRbJH9KAwYub2w0R9jKQoDNvV52r8TTddHL8eVs5IdJbo700lSQz1LXg');
let id = 7008802;

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
        console.log(req.body);
        const order = await pool.query(
            'INSERT INTO orders (customer_id) VALUES ($1) RETURNING *', [req.body.id]
        );

        id = req.body.id;
        
        for (i in req.body.items) {
            const orderItems = await pool.query(
                'INSERT INTO order_items (product_id, quantity, order_id) VALUES ($1, $2, $3)',
                [req.body.items[i].product_id, req.body.items[i].quantity, order.rows[0].id]
            )
        }

        res.json({ url: session.url })

    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server Error!');
    }
})

const endpointSecret = "whsec_54e6f8e92f25399b12fc401d36bf3065a107175361d932cb77cd0e87b48c9943";

router.post('/webhook', express.raw({type: 'application/json'}), async (request, response) => {
    const sig = request.headers['stripe-signature'];
  
    let event;
  
    try {
      event = stripe.webhooks.constructEvent(request.rawBody, sig, endpointSecret);
    } catch (err) {
      response.status(403).send(`Webhook Error: ${err.message}`);
      return;
    }
  
    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
          const checkoutSessionCompleted = event.data.object;
          // Then define and call a function to handle the event checkout.session.completed
          const customer_name = checkoutSessionCompleted.customer_details.name;
          const customer_address = checkoutSessionCompleted.customer_details.address.line1 + ", " + checkoutSessionCompleted.customer_details.address.city + ", " + checkoutSessionCompleted.customer_details.address.postal_code + ", " + checkoutSessionCompleted.customer_details.address.country;
          console.log(customer_name);
          console.log(checkoutSessionCompleted.customer_details);
          console.log(id);
          const updateOrder = await pool.query(
            'UPDATE orders SET customer_name = $1, customer_address = $2, paid = $3 WHERE customer_id = $4',
            [customer_name, customer_address, true, id]
            );
          break;
        // ... handle other event types
        default:
          console.log(`Unhandled event type ${event.type}`);
      }

      switch (event.type) {
        case 'payment_intent.succeeded':
          const paymentIntentSucceeded = event.data.object;
          console.log('payment intent created');
          // Then define and call a function to handle the event payment_intent.succeeded       
          break;
        // ... handle other event types
        default:
          console.log(`Unhandled event type ${event.type}`);
      }
  
    // Return a 200 response to acknowledge receipt of the event
    response.send();
  });

module.exports = router;