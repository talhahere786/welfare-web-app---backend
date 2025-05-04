import {
  createFamily,
  getFamilyWithChildren,
  updateFamilyWithChildren,
} from "../controllers/family.controller.js";
import express from "express";
const router = express.Router();

// Route to store Family and Children
router.post("/family", createFamily);

// Route to get Family with Children details
router.get("/families", getFamilyWithChildren);

// Route to update family details including children
router.patch("/families/:id", updateFamilyWithChildren);
export default router;
