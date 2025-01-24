import { Donor } from "../models/donor.model.js";
import validator from "validator"; // Import validator for input validation

// Get all donors
export const getDonors = async () => {
  const donors = await Donor.find();
  if (!donors || donors.length === 0) {
    throw new error("No donors found");
  }
  return donors;
};
// Add a new donor
export const addDonor = async (donorData, userId) => {
  const { name, date, amount, paymentMethod, status } = donorData;
  // Input validation
  if (!name || !validator.isAlpha(name.replace(" ", ""))) {
    throw new Error("Invalid name. Only alphabets and spaces allowed.");
  }
  //Check for valid date
  if (!date || !validator.isDate(date)) {
    throw new Error("Invalid date format.");
  }
  if (!amount || !validator.isNumeric(amount.toString())) {
    throw new Error("Amount must be a valid number.");
  }
  if (!paymentMethod || paymentMethod !== "Credit Card") {
    throw new Error("Payment method must be 'Credit Card'.");
  }
  if (!status || !["Completed", "Pending", "Failed"].includes(status)) {
    throw new Error(
      "Invalid status. Must be 'Completed', 'Pending', or 'Failed'."
    );
  }
  // Create donor record
  const newDonor = new Donor({
    userId,
    name,
    date,
    amount,
    paymentMethod,
    status,
  });
  await newDonor.save();
  return newDonor;
};

// Function to get donor history for logged-in user
export const getUserDonations = async (userId) => {
  const donations = await Donor.find({ userId });
  if (!donations || donations.length === 0) {
    throw new Error("No donations found for this user");
  }
  return donations;
};
