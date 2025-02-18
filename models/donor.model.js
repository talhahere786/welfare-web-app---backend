import mongoose from "mongoose";

// Define the Donor schema
const donorSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["paid", "unpaid", "Failed"],
    default: "Pending",
  },
});

// Assuming donorSchema is defined elsewhere
export const Donor = mongoose.model("Donor", donorSchema);
