import UserService from "../services/user.service.js";

// Signup
export const signup = async (req, res) => {
  try {
    const result = await UserService.signup(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const result = await UserService.login(req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
