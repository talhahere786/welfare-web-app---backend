import { createPaymentSession } from "../services/payment.service.js";

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
