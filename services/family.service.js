import { Family } from "../models/family.model.js";
import { Children } from "../models/children.model.js";

// Helper function to validate formNumber
const isValidFormNumber = (formNumber) => /^[A-Z0-9]+$/.test(formNumber);

// Helper function to validate CNIC
const isValidCnic = (cnic) => /^\d{13}$/.test(cnic);

// Helper function to validate contactNumber
const isValidContactNumber = (contactNumber) => /^03\d{9}$/.test(contactNumber);

// Helper function to validate houseArea
const isValidHouseArea = (houseArea) => parseFloat(houseArea) > 0;

// Helper function to validate houseType
const isValidHouseType = (houseType) => ["owned", "rented"].includes(houseType);

// Helper function to validate transport
const isValidTransport = (transport) => ["car", "bus"].includes(transport);

// Helper function to validate totalIncome
const isValidIncome = (totalIncome) => totalIncome >= 0;

// Save Family and Children
export const createFamilyWithChildren = async (familyData, childrenData) => {
  try {
     console.log("Service members:", familyData.num_of_members);
    // Set the date to the current date automatically
    familyData.date = new Date(); // Add this line
familyData.status = "pending";
    // Validate formNumber
    if (!isValidFormNumber(familyData.formNumber)) {
      throw new Error("Form Number must be alphanumeric.");
    }
 
    // Check if the formNumber already exists in the database
    const existingFamilyByFormNumber = await Family.findOne({
      formNumber: familyData.formNumber,
    });
    if (existingFamilyByFormNumber) {
      throw new Error("A family with this Form Number already exists.");
    }

    

    // Validate guardian
    if (
      typeof familyData.guardian !== "string" ||
      familyData.guardian.length < 3
    ) {
      throw new Error(
        "Guardian must be a string and at least 3 characters long."
      );
    }

    // Validate CNIC
    if (!isValidCnic(familyData.cnic)) {
      throw new Error("CNIC must be a unique 13-digit number.");
    }

    // Check if the CNIC already exists in the database
    const existingFamilyByCnic = await Family.findOne({
      cnic: familyData.cnic,
    });
    if (existingFamilyByCnic) {
      throw new Error("A family with this CNIC already exists.");
    }

    // Validate fatherOrHusband
    if (
      typeof familyData.fatherOrHusband !== "string" ||
      familyData.fatherOrHusband.length < 3
    ) {
      throw new Error(
        "Father or Husband name must be a string and at least 3 characters long."
      );
    }

    // Validate contactNumber
    if (!isValidContactNumber(familyData.contactNumber)) {
      throw new Error("Contact Number must be a valid Pakistani phone number.");
    }

    // Validate address
    if (
      typeof familyData.address !== "string" ||
      familyData.address.length < 10
    ) {
      throw new Error("Address must be at least 10 characters long.");
    }

    // Validate city (you can add predefined city names if needed)
    if (typeof familyData.city !== "string" || familyData.city.length < 3) {
      throw new Error("City must be a valid string.");
    }

    // Validate houseArea
    if (!isValidHouseArea(familyData.houseArea)) {
      throw new Error("House Area must be a positive number in marlas.");
    }

    // Validate houseType
    if (!isValidHouseType(familyData.houseType)) {
      throw new Error("House Type must be either 'owned' or 'rented'.");
    }

    // Validate houseRent (only required if houseType is 'rented')
    if (
      familyData.houseType === "rented" &&
      (isNaN(familyData.houseRent) || familyData.houseRent <= 0)
    ) {
      throw new Error(
        "House Rent must be a positive number if house type is 'rented'."
      );
    }

    // Validate medicineExpense
    if (familyData.medicineExpense < 0) {
      throw new Error("Medicine Expense must be a non-negative number.");
    }

    // Validate electricityBill
    if (familyData.electricityBill < 0) {
      throw new Error("Electricity Bill must be a non-negative number.");
    }

    // Validate transport
    if (!isValidTransport(familyData.transport)) {
      throw new Error("Transport must be a valid type (e.g., 'car', 'bus').");
    }

    // // Validate num_of_members
    // if (
    //   Number.isInteger(familyData.num_of_members) &&
    //   familyData.num_of_members > 0
    // ) {
    //   // Valid
    // } else {
    //   throw new Error("Number of members must be a positive integer.");
    // }

    // Validate totalIncome
    if (!isValidIncome(familyData.totalIncome)) {
      throw new Error("Total Income must be a non-negative number.");
    }

    // Validate sourceOfIncome
    if (
      typeof familyData.sourceOfIncome !== "string" ||
      familyData.sourceOfIncome.length < 3
    ) {
      throw new Error(
        "Source of Income must be a string and at least 3 characters long."
      );
    }

    // Validate familyDetails
    if (
      typeof familyData.familyDetails !== "string" ||
      familyData.familyDetails.length < 10
    ) {
      throw new Error("Family Details must be at least 10 characters long.");
    }

    // Validate verifiedBy
    if (
      typeof familyData.verifiedBy !== "string" ||
      familyData.verifiedBy.length < 3
    ) {
      throw new Error(
        "Verified By must be a string and at least 3 characters long."
      );
    }

    // Save Family
    const newFamily = new Family(familyData);
    const savedFamily = await newFamily.save();

    // Save Children and Link to Family
    if (childrenData && childrenData.length > 0) {
      const childrenWithFamily = childrenData.map((child) => {
        // Validate that when the child is not earning, income is not provided
        if (child.earning === false && (child.income || child.sourceOfIncome)) {
          throw new Error(
            "Income and source of income should not be provided if the child is not earning."
          );
        }

        // Validate that when the child is not studying, instituteName, fees, and className are not provided
        if (
          child.studying === false &&
          (child.instituteName || child.fees || child.className)
        ) {
          throw new Error(
            "Institute name, fees, and class name should not be provided if the child is not studying."
          );
        }

        // Link child to family
        return {
          ...child,
          family: savedFamily._id,
        };
      });

      // Validate Children (e.g., make sure required fields are filled)
      childrenWithFamily.forEach((child) => {
        if (!child.name || !child.age) {
          throw new Error("Each child must have a name and age.");
        }
      });

      const savedChildren = await Children.insertMany(childrenWithFamily);

      // Update Family Document with Children IDs
      savedFamily.children = savedChildren.map((child) => child._id);
      await savedFamily.save();
    }

    return savedFamily;
  } catch (error) {
    console.error("Error saving family and children:", error.message);
    throw new Error("Error saving family and children: " + error.message);
  }
};

// Get Family Details with Children
export const getAllFamiliesWithChildren = async () => {
  try {
    // Fetch all families and populate the children field
    const families = await Family.find().populate("children");

    // If no families are found, throw an error
    if (families.length === 0) {
      throw new Error("No families found.");
    }

    return families;
  } catch (error) {
    console.error("Error fetching families:", error.message);
    throw new Error("Error fetching families: " + error.message);
  }
};

// Service function to update specific fields
export const updateFamilyFields = async (familyId, updatedFields) => {
  return await Family.findByIdAndUpdate(
    familyId,
    { $set: updatedFields }, // Only update provided fields
    { new: true } // Return updated document
  );
};
