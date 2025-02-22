const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Stripe = require('stripe');
const bodyParser = require('body-parser');

const stripe = Stripe('sk_test_51QvE5VQ8viKcy6z5bfSXoH8p9nryyyjKqqGW1Iz2qBjhr3ot7GZjcrvS5XFbKU1WKK8kU6TbgbwdikiffIiq2irQ00RMYTPbMO');
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/payments', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Payment Schema
const PaymentSchema = new mongoose.Schema({
  email: { type: String, required: true },
  status: { type: String, required: true },
  sessionId: { type: String, required: true },
});

const Payment = mongoose.model('Payment', PaymentSchema);

// Create Checkout Session
app.post('/create-checkout-session', async (req, res) => {
  const { email, product } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: { name: product.title },
          unit_amount: product.price * 100,
        },
        quantity: 1,
      }],
      mode: 'payment',
      customer_email: email,
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    });

    await new Payment({ email, status: 'pending', sessionId: session.id }).save();

    res.json({ url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: error.message });
  }
});

// Stripe Webhook
app.post('/webhook', bodyParser.raw({ type: 'application/json' }), (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, 'YOUR_STRIPE_WEBHOOK_SECRET');
  } catch (err) {
    console.error('Webhook Error:', err);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  const session = event.data.object;

  if (event.type === 'checkout.session.completed') {
    Payment.findOneAndUpdate(
      { sessionId: session.id },
      { status: 'success' },
      { new: true },
      (err) => {
        if (err) console.error('Error updating payment status:', err);
      }
    );
  } else if (event.type === 'checkout.session.expired') {
    Payment.findOneAndUpdate(
      { sessionId: session.id },
      { status: 'failed' },
      { new: true },
      (err) => {
        if (err) console.error('Error updating payment status:', err);
      }
    );
  }

  res.json({ received: true });
});

// Start Server
app.listen(5000, () => console.log('Server running on port 5000'));
