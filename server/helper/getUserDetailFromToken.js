import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const getUserDetailFromToken = async (token) => {
  if (!token) {
    return {
      message: "Session out...",
      logout: true,
    };
  }

  const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY);
  
  const user = await User.findById(decode.id).select("-password");

  return user;
};

export default getUserDetailFromToken;
