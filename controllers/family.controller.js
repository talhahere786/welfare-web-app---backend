import {
  createFamilyWithChildren,
  getAllFamiliesWithChildren,
  updateFamilyFields,
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
      fileUrl,
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
      fileUrl,
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

// Controller to update only the provided fields
export const updateFamilyWithChildren = async (req, res) => {
  try {
    const familyId = req.params.id;
    const updatedFields = req.body; // Contains only the changed fields

    const updatedFamily = await updateFamilyFields(
      familyId,
      updatedFields
    );

    if (!updatedFamily) {
      return res.status(404).json({ error: "Family not found" });
    }

    res.json(updatedFamily);
  } catch (error) {
    console.error("Error updating family:", error);
    res.status(500).json({ error: "Failed to update family data" });
  }
};
