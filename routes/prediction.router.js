import { predictDonation } from "../controllers/predict.controller.js";
import express from "express";
const router = express.Router();
// Route for donation prediction
router.post("/predict", predictDonation);


export default router;