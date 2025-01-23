// Family Verification Schema
import mongoose from "mongoose";

const familySchema = new mongoose.Schema({
  formNumber: { type: String, required: true },
  date: { type: Date, required: true },
  guardian: { type: String, required: true },
  cnic: { type: String, required: true },
  fatherOrHusband: { type: String, required: true },
  contactNumber: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  houseType: { type: String, required: true },
  houseRent: { type: Number },
  transport: { type: String },
  debt: { type: String },
  fundamentals: { type: String },
  electricityBill: { type: Number },
  medicineExpense: { type: Number },
  otherIncome: { type: String },
  totalIncome: { type: Number },
});

export const Family = mongoose.model("Family", familySchema);
