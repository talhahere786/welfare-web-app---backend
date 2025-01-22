import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";

// Helper function for validating password
const isValidPassword = (password) => {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  return regex.test(password);
};

// Signup
export const signup = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, password, confirmPassword } =
      req.body;

    // Validate Full Name
    if (!fullName || !/^[A-Za-z\s]{1,50}$/.test(fullName)) {
      return res.status(400).json({
        message:
          "Invalid full name. Only alphabets and spaces allowed, max length 50.",
      });
    }

    // Validate Email
    if (!email || !validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email format." });
    }

    // Check Password
    if (!password || !isValidPassword(password)) {
      return res.status(400).json({
        message:
          "Invalid password. Must include at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.",
      });
    }

    // Check Confirm Password
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "Passwords do not match at backend." });
    }

    // Validate Phone Number
    if (phoneNumber && !/^\d{11}$/.test(phoneNumber)) {
      return res.status(400).json({
        message: "Invalid phone number. Must be exactly 11 digits long.",
      });
    }
    // Check if the phone number already exists in the database
    const existingPhoneNumber = await User.findOne({ phoneNumber });
    if (existingPhoneNumber) {
      return res.status(400).json({
        message: "Phone number already exists. Please use a different number.",
      });
    }

    // Normalize the email to lowercase
    const normalizedEmail = email.toLowerCase();

    // Check if email or already exists
    const emailExists = await User.findOne({
      email: normalizedEmail,
    }).collation({ locale: "en", strength: 2 });
    if (emailExists) {
      return res.status(400).json({ message: "Email already exists." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      fullName,
      email: normalizedEmail,
      phoneNumber,
      password: hashedPassword,
    });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate Email
    if (!email) {
      return res.status(400).json({ message: "Email  is required." });
    }

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() }).collation({
      locale: "en",
      strength: 2,
    });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Validate Password
    const isMatch = await bcrypt.compare(password.trim(), user.password.trim());
    if (!isMatch) {
      return res.status(400).json({ message: `Invalid password` });
    }

    // Generate JWT Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d", // The token will expire in 1 day
    });
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
