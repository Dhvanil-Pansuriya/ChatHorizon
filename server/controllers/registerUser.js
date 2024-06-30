import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";

async function registerUser(request, response) {
  try {
    const { name, email, password, profile_pic } = request.body;
    const checkEmail = await User.findOne({ email });
    if (checkEmail) {
      return response.status(400).json({
        message: "User already exist..",
        error: true,
      });
    }

    // Password into Hash
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Create Database User
    const payload = {
      name,
      email,
      password: hashPassword,
      profile_pic,
    };
    const user = new User(payload);
    const saveUser = await user.save();

    return response.status(201).json({
      message: "User created successfully...",
      data: saveUser,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
}

export default registerUser;
