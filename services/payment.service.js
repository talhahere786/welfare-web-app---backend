// Load environment variables
import dotenv from "dotenv";
dotenv.config();
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Function to create a payment session
export const createPaymentSession = async (fullname, payment) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: fullname,
            },
            unit_amount: payment * 100, // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",

      success_url:
        "http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url:
        "http://localhost:5173/failed?session_id={CHECKOUT_SESSION_ID}",
    });
    return session.id;
  } catch (error) {
    console.error("Error creating payment session:", error);
   alert("An error occurred while processing your payment. Please try again.");
  }
};

// Function to retrieve session details and store the result in the database
export const retrieveSession = async (sessionId) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // Store session details in the database (you can store payment status, order ID, etc.)
    // Example:
    const paymentStatus = session.payment_status; // This will be 'paid' if payment is successful
    console.log(paymentStatus);
    // Retrieve the total amount paid (Stripe stores it in cents)
    const donationAmount = session.amount_total / 100; // Convert to dollars

    console.log("Donation Amount:", donationAmount);
    return { status: paymentStatus,amount: donationAmount, session };
  } catch (error) {
    console.error("Error retrieving session:", error);
    throw new Error("Error retrieving payment session");
  }
  
};
