import {
  createPaymentSession,
  retrieveSession,
} from "../services/payment.service.js";

export const Payment = async (req, res) => {
  const { fullname, payment } = req.body;
  try {
    if (!fullname || !payment) {
      return res
        .status(400)
        .json({ error: "Fullname and payment are required" });
    }
    const sessionId = await createPaymentSession(fullname, payment);
    res.status(200).json({ id: sessionId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Endpoint to handle success or failure redirect from Stripe Checkout
export const handlePaymentStatus = async (req, res) => {
  console.log("In handlepayment status controller");
  const { session_id } = req.query;  // session_id is passed in the query params (success_url/cancel_url)
  try {
    if (!session_id) {
      return res.status(400).json({ error: "Session ID is required" });
    }

    const paymentResult = await retrieveSession(session_id);

    if (paymentResult.status === "paid") {
      // Handle successful payment logic
      res.status(200).json({ message: "Payment Successful", paymentStatus: paymentResult.status,amount:paymentResult.amount });
    } else {
      // Handle failed payment logic
      res
        .status(400)
        .json({
          message: "Payment Failed",
          paymentStatus: paymentResult.status,
          amount: paymentResult.amount,
        });
    }
  } catch (error) {
    console.error("Error in payment status handling:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};