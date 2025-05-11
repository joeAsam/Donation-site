const express = require('express');
const Stripe = require('stripe');
const cors = require('cors');
const app = express();
// const stripe = Stripe('your-secret-key');
const stripe = require('stripe')('sk_test_YOUR_SECRET_KEY');
const path = require('path');


// MIDDLEWARE
// app.use(cors());
app.use(express.static('public'));
app.use(express.json());

app.get('/donate', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/create-checkout-session', async (req, res) => {
    const { amount } = req.body;

    try{
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'Donation',
                    },
                    unit_amount: amount * 100,
                },
                quantity: 1,
            }],
            mode: 'payment',
            success_url: 'http://localhost:5500/success.html',
            cancel_url: 'http://localhost:5500/cancel.html',
        });

        res.json({ id: session.id });
    } catch (err){
        console.error(err.message);
        res.status(500).json({ error: 'Internal server error'})
    }
});

const PORT = 4242;
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
});


// NOW PAYMENTS
const axios = require('axios');

app.post('/create-nowpayments-charge', async(req, res) =>{
    const { amount } = req.body;

    if (!amount || isNaN(amount) || amount <= 0) {
        return res.status(400).json({ error: 'Invalid donation amount' });
    }

    try {
        const response = await axios.post('https://api.nowpayments.io/v1/invoice', {
            price_amount: amount,
            price_currency: 'usd',
            pay_currency: 'btc',
            order_id: 'donation_' + Date.now(),
            order_description: 'Crypto Donation'
        }, {
            headers: {
                'x-api-key': 'XV0JHVJ-30XM1HT-N8NA2DN-KTMCWFT',
                'Content-Type': 'application/json'
            }
        });

        const invoiceUrl = response.data.invoice_url;
        res.json({ invoiceUrl });

    } catch (error) {
        console.error(error.response?.data || error.message);
        res.status(500).json({ 
            error: 'Unable to create crypto invoice',
            details: error.response?.data || error.message
        });
    }
});