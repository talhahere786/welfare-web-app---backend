import { runPredictionModel } from "../services/predict.service.js";

export const predictDonation = async (req, res) => {
  try {
    const { city, year, month } = req.body;

    if (!city || !year || !month) {
      return res.status(400).json({ error: "Missing required parameters." });
    }

    const predictedDonation = await runPredictionModel(city, year, month);
    res.json({ predictedDonation });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};
