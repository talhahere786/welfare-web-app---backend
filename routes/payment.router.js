import { Payment,handlePaymentStatus } from "../controllers/payment.controller.js";
import express from "express";
const router = express.Router();

router.post("/payment", Payment);
router.get("/payment/status", handlePaymentStatus);
console.log("In payment router")
export default router;