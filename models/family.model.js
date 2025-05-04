import mongoose from "mongoose";

const familySchema = new mongoose.Schema(
  {
    formNumber: {
      type: String,
      required: true,
      unique: true,
      // Unique identifier for the family verification form
    },
    date: {
      type: Date,
      required: true,
      // Date when the verification form was filled
    },
    guardian: {
      type: String,
      required: true,
      // Name of the family guardian
    },
    cnic: {
      type: String,
      required: true,
      unique: true,
      // CNIC (National ID) of the family guardian
    },
    fatherOrHusband: {
      type: String,
      required: true,
      // The name of the father or husband in the family
    },
    contactNumber: {
      type: String,
      required: true,
      // Contact number for the family or guardian
    },
    address: {
      type: String,
      required: true,
      // Full address of the family
    },
    city: {
      type: String,
      required: true,
      // City where the family resides
    },
    houseArea: {
      type: String,
      required: true,
      // Area of the house in marlas
    },
    houseType: {
      type: String,
      required: true,
      enum: ["owned", "rented"], // Only these two values are allowed, apartment, house, etc.)
    },
    houseRent: {
      type: Number,
      required: true,
      // Monthly rent of the house (if applicable)
    },
    medicineExpense: {
      type: Number,
      required: true,
      // Monthly expenditure on medicines or healthcare
    },
    electricityBill: {
      type: Number,
      required: true,
      // Monthly electricity bill of the family
    },
    transport: {
      type: String,
      required: true,
      // Type of transportation used by the family (e.g., car, bus, etc.)
    },
    num_of_members: {
      type: Number,
      required: true,
      // Total number of family members
    },
    totalIncome: {
      type: Number,
      required: true,
      // Total monthly income of the family
    },
    sourceOfIncome: {
      type: String,
      required: true,
      // Main source of income for the family (e.g., job, business)
    },
    familyDetails: {
      type: String,
      required: true,
      // Additional details or description about the family
    },
    verifiedBy: {
      type: String,
      required: true,
      // Name or ID of the person who verified the family details
    },
    children: [{ type: mongoose.Schema.Types.ObjectId, ref: "Children" }], // Reference to children
    fileUrl: { type: String, required: true },
    status: { type: String, required: true },
  },
  { versionKey: false }
);

export const Family = mongoose.model("Family", familySchema);
