import express from 'express'
import stripe from 'stripe';
const router=express.Router()
import dotenv from 'dotenv';
dotenv.config();
const stripeInstance = stripe(process.env.STRIPE_PRIVATE_KEY);
router.post('/create-checkout-session', async (req, res) => {
  try {
    const { amount } = req.body;

    const session = await stripeInstance.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'pay with stripe securely',
            },
            unit_amount: amount * 100, // Convert amount to cents
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.SERVER_URL}/success.html`,
      cancel_url: `${process.env.SERVER_URL}/cancel.html`,
    });

    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
export default router;