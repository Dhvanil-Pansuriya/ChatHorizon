import { Mongoose } from "mongoose";
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

async function checkPassword(request, response) {
  try {
    const { password, userId } = request.body;
    const user = await User.findById(userId);
    const verifiedPassword = await bcrypt.compare(password, user.password);

    if (!verifiedPassword) {
      return response.status(400).json({
        message: "Password doesn't match....",
        error: true,
      });
    }

    const tokenData = {
      id: user._id,
      email: user.email,
    };

    const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    const cookiesOptions = {
      http: true,
      secure: true,
    };

    return response.cookie("token", token, cookiesOptions).status(200).json({
      message: "Login Successfully",
      token: token,
      success: true,
    });
  } catch (error) {
    response.status(400).json({
      message: "Error accrued at Check Password" + error,
    });
  }
}

export default checkPassword;