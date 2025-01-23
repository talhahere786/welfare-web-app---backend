import express from "express";
import { signup, login } from "../controllers/user.controller.js";
import { predictDonation } from "../controllers/predict.controller.js";
import { Form } from "../controllers/form.controller.js";
import { Payment } from "../controllers/payment.controller.js";
import {
  getDonors,
  addDonor,
  getDonorHistory,
} from "../controllers/donor.controller.js";
import { authenticate } from "../middlewares/authMiddleware.js"; // You can extract this middleware if needed

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
// Route for donation prediction
router.post("/predict", predictDonation);
router.post("/form", Form);
router.post("/payment", Payment);

// Get all donors (admin route or public route)
router.get("/donors", getDonors);

// Add a donation (logged-in users only)
router.post("/donate", authenticate, addDonor);

// Get donation history (logged-in users only)
router.get("/donor-history", authenticate, getDonorHistory);

export default router;
