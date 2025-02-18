import {
  createFamily,
  getFamilyWithChildren,
} from "../controllers/family.controller.js";
import express from "express";
const router = express.Router();

// Route to store Family and Children
router.post("/family", createFamily);

// Route to get Family with Children details
router.get("/families", getFamilyWithChildren);

export default router;
