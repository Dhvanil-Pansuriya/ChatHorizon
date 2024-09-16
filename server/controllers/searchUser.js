import { User } from "../models/user.model.js";

async function searchUser(request, response) {
  try {
    const { search } = request.body;

    const query = new RegExp(search, "i", "g");

    const user = await User.find({
      $or: [{ name: query }, { email: query }],
    }).select("-password");

    return response.json({
      message: "All users",
      data: user,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: false,
    });
  }
}

export default searchUser;
