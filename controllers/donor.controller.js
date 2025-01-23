import * as donorService from "../services/donor.service.js";

// Get all donors
export const getDonors = async (req, res) => {
  try {
    const donors = await donorService.getDonors();
    res.status(200).json(donors);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Add a new donor
export const addDonor = async (req, res) => {
  try {
    const newDonor = await donorService.addDonor(req.body, req.userId);
    res.status(201).json(newDonor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get donation history for the logged-in user
export const getDonorHistory = async (req, res) => {
  try {
    // Fetch donations only for the logged-in user (userId is taken from the token)
    const donations = await donorService.getUserDonations(req.userId);

    res.status(200).json(donations);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
