import { Donor } from "../models/donor.model.js";
import { User } from "../models/user.model.js"; // Assuming User model exists
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
  // Fetch user details from the User table
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }
  // Prepare donor data
  const { amount, status } = donorData;
  const name = user.fullName; // Retrieved from the User model
  const date = new Date(); // Current date
  const paymentMethod = "Credit Card"; // Default value
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
  if (!status || !["paid", "unpaid", "Failed"].includes(status)) {
    throw new Error(
      "Invalid status. Must be 'paid', 'unpaid', or 'Failed'."
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
