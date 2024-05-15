import express from 'express'
import Stripe from 'stripe';
import dotenv from 'dotenv';
import db from '../database/db.js';
const router=express.Router()
dotenv.config();
const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);

router.post('/create-checkout-session-food', async (req, res) => {

    const { amount,userId } = req.body;
    // console.log('userID'+userId)
    console.log(process.env.CLIENTSERVER)
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
      success_url: `${process.env.CLIENTSERVER}/profile`,
      cancel_url: `${process.env.CLIENTSERVER}/profile`,
      client_reference_id: userId, // Generate a unique reference ID
    });

    res.json({ sessionId: session.id });
    
  } catch (error) {
    res.status(500).json({ error: 'Error creating payment session' });
  }
});
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
      success_url: `${process.env.CLIENTSERVER}/`,
      cancel_url: `${process.env.CLIENTSERVER}/`,
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



router.post('/refund',async (req, res) => {
  const { reservationId, price } = req.body; // Include refundAmount in request body

  try {

    const query='select sessionId from reservation where id = ?';
db.query(query,[reservationId],async(error,result)=>{
  if (error){
    console.log('Error while retriving the sessionId')
        return res.status(400).json({ error: 'Missing session ID for refund querying the database faild' });
  }

    // const payment = await stripe.checkout.sessions.retrieve(result[0].sessionId);

    if (canProcessRefund(reservationId)) { // Replace with your logic
      return res.status(403).json({ error: 'Refund not allowed based on conditions' });
    }
     const payment = await stripe.checkout.sessions.retrieve(result[0].sessionId);
const chargeId = payment.object === 'checkout.session' ? payment.payment_intent : null;

if (!chargeId) {
  return res.status(400).json({ error: 'Missing charge ID for refund' });
}

try {
  const actualRefundAmount = price * 0.75;
  const refund = await stripe.refunds.create({
    charge: chargeId,
    amount: actualRefundAmount * 100, // Convert to cents for Stripe API
    testmode: true, // Set to true for test mode refunds (if applicable)
  });

  res.json({
    paymentStatus: 'refunded',
    message: `Refund successfully processed for ${actualRefundAmount}, Mean 75% Of What You Paid`,
  });
} catch (refundError) {
  // Handle specific refund errors (e.g., charge already refunded)
  if (refundError.type === 'StripeInvalidRequestError' && refundError.code === 'resource_missing') {
    console.error('Charge may have already been refunded:', refundError.message);
    return res.status(400).json({ error: 'This charge may have already been refunded.' });
  } else {
    console.error('Error processing refund:', refundError);
    return res.status(500).json({ error: 'Error processing refund' });
  }
}
      

})





  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error processing refund' });
  }
});

// **Example function for checking refund eligibility (replace with your own logic):**
function canProcessRefund(reservationId) {
  // const timeSincePayment = calculateTimeSincePayment(payment.created); // Replace with your logic
  // Disallow refunds if more than X days have passed since payment
  // if (timeSincePayment > MAX_ALLOWED_REFUND_DAYS) {
  //   return false;
  // }
console.log(reservationId)
db.query('SELECT (TIMESTAMPDIFF(DAY, CURDATE(),r.checkinDate) > 3) AS isPastThreeDays FROM reservation r WHERE r.id = ?', [reservationId],(error,results)=>{
const isPastThreeDays = results[0].isPastThreeDays === 1; 

    if (isPastThreeDays) {
      console.log('Reservation check-in date is more than 3 days in the past.');
      return true
    } else {
      console.log('Reservation check-in date is within 3 days.');
      return false
    }
})
 

}


// function calculateTimeSincePayment(paymentTimestamp) {
//   const now = new Date();
//   const paymentDate = new Date(paymentTimestamp * 1000); // Convert milliseconds to Date object
//   const diffInMs = now - paymentDate;
//   const daysSincePayment = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
//   return daysSincePayment;
// }




export default router;