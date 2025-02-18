import {
  createFamilyWithChildren,
  getAllFamiliesWithChildren,
} from "../services/family.service.js";

// Create Family with Children
export const createFamily = async (req, res) => {
  try {
    const {
      formNumber,
      date,
      guardian,
      cnic,
      fatherOrHusband,
      contactNumber,
      address,
      city,
      houseArea,
      houseType,
      houseRent,
      medicineExpense,
      electricityBill,
      transport,
      num_of_members,
      totalIncome,
      sourceOfIncome,
      familyDetails,
      verifiedBy,
      children, // Expecting children array from frontend
    } = req.body;

    // Prepare family data
    const familyData = {
      formNumber,
      date,
      guardian,
      cnic,
      fatherOrHusband,
      contactNumber,
      address,
      city,
      houseArea,
      houseType,
      houseRent,
      medicineExpense,
      electricityBill,
      transport,
      num_of_members,
      totalIncome,
      sourceOfIncome,
      familyDetails,
      verifiedBy,
    };

    // Call service to save family and children
    const savedFamily = await createFamilyWithChildren(familyData, children);

    res.status(201).json({
      message: "Family and Children stored successfully",
      family: savedFamily,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Get Family Details with Children
export const getFamilyWithChildren = async (req, res) => {
  try {
    const families = await getAllFamiliesWithChildren();
    res.status(200).json(families);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
