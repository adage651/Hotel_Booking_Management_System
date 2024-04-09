import express from 'express'
import Stripe from 'stripe';
import dotenv from 'dotenv';

const router=express.Router()
dotenv.config();
const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);

router.post('/create-checkout-session', async (req, res) => {

    const { amount,userId } = req.body;
    console.log('userID'+userId)

try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Pay with Stripe Securely',
            },
            unit_amount: amount * 100, // Convert amount to cents
          },
          quantity: 1,
        },
      ],
      success_url: 'http://localhost:3000/',
      cancel_url: 'http://localhost:3000/',
      client_reference_id: userId, // Generate a unique reference ID
    });

    res.json({ sessionId: session.id });
    
  } catch (error) {
    res.status(500).json({ error: 'Error creating payment session' });
  }
});


router.post('/status', async (req, res) => {
 const { sessionId } = req.body;
//  const { sessionId } = req.query;
  console.log('request accepted '+sessionId)
  try {
    const payment = await stripe.checkout.sessions.retrieve(sessionId);
    // console.log('Payment object:', payment);
    const paymentStatus = payment.payment_status || 'unknown';
console.log('the payment status for this is ',paymentStatus)
    res.json({ paymentStatus });
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving payment status' });
  }
});
export default router;