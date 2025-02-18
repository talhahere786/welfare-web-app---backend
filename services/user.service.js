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

class UserService {
  // Signup
  static async signup(userData) {
    const { fullName, email, phoneNumber, password, confirmPassword } =
      userData;
    // Validate Full Name
    if (!fullName || !/^[A-Za-z\s]{1,50}$/.test(fullName)) {
      throw new Error(
          "Invalid full name. Only alphabets and spaces allowed, max length 50.",
      );
    }
    // Validate Email
    if (!email || !validator.isEmail(email)) {
      throw new Error("Invalid email format." );
    }

    // Check Password
    if (!password || !isValidPassword(password)) {
      throw new Error(
          "Invalid password. Must include at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.",
      );
    }

    // Check Confirm Password
    if (password !== confirmPassword) {
      throw new Error( "Passwords do not match at backend." );
    }

    // Validate Phone Number
    if (phoneNumber && !/^\d{11}$/.test(phoneNumber)) {
      throw new Error( "Invalid phone number. Must be exactly 11 digits long.",
      );
    }
    // Check if the phone number already exists in the database
    const existingPhoneNumber = await User.findOne({ phoneNumber });
    if (existingPhoneNumber) {
      throw new Error( "Phone number already exists. Please use a different number.",
      );
    }

    // Normalize the email to lowercase
    const normalizedEmail = email.toLowerCase();
    // Check if email or already exists
    const emailExists = await User.findOne({
      email: normalizedEmail,
    }).collation({ locale: "en", strength: 2 });
    if (emailExists) {
      throw new Error( "Email already exists." );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      fullName,
      email: normalizedEmail,
      phoneNumber,
      password: hashedPassword,
    });
    await newUser.save();

    return { message: "User registered successfully." };
  }
  static async login(credentials) {
    const { email, password } = credentials;
    // Validate Email
    if (!email) {
      throw new Error("Email  is required.");
    }
    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() }).collation({
      locale: "en",
      strength: 2,
    });

    if (!user) {
      throw new Error("User not found");
    }
    // Validate Password
    const isMatch = await bcrypt.compare(password.trim(), user.password.trim());
    if (!isMatch) {
      throw new Error(`Invalid password`);
    }
    // Generate JWT Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d", // The token will expire in 1 day
    });
    return { message: "Login successful", token };
  } 
}

export default UserService;
