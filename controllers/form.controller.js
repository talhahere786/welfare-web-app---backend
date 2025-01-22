import { Family } from "../models/family.model.js";

// Route to handle form submission
export const Form = async (req, res) => {
  try {
    const familyData = new Family(req.body);
    await familyData.save();
    res.status(201).json({ message: "Form data saved successfully." });
  } catch (error) {
    console.error(`Error saving form data: ${error.message}`);
    res.status(500).json({ message: "Error saving form data." });
  }
};
