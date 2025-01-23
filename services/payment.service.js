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
      success_url: "https://your-website.com/success",
      cancel_url: "https://your-website.com/cancel",
    });
    return session.id;
  } catch (error) {
    throw new Error("Error creating checkout session: " + error.message);
  }
};
