import { Donor } from "../models/donor.model.js";
import jwt from "jsonwebtoken";

// Middleware to authenticate the user using JWT
export const authenticate = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace 'secretkey' with your secret key
    req.userId = decoded.id;
    //  res.status(401).json({ message: req.userId });
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

// Get all donors
export const getDonors = async (req, res) => {
  try {
    const donors = await Donor.find();
    res.status(200).json(donors);
  } catch (error) {
    res.status(500).json({ message: "Error fetching donors", error });
  }
};

// Add a new donor
export const addDonor = async (req, res) => {
  try {
    const newDonor = new Donor({
      userId: req.userId,
      name: req.body.name,
      date: req.body.date,
      amount: req.body.amount,
      paymentMethod: req.body.paymentMethod,
      status: req.body.status,
    });

    await newDonor.save();
    res.status(201).json(newDonor);
  } catch (error) {
    res.status(500).json({ message: "Error adding donor", error });
  }
};

// Get donation history for the logged-in user
export const getDonorHistory = async (req, res) => {
  try {
    // Fetch donations only for the logged-in user (userId is taken from the token)
    const donations = await Donor.find({ userId: req.userId });

    if (!donations || donations.length === 0) {
      return res
        .status(404)
        .json({ message: "No donations found for this user" });
    }

    res.status(200).json(donations);
  } catch (error) {
    res.status(500).json({ message: "Error fetching donation history", error });
  }
};
