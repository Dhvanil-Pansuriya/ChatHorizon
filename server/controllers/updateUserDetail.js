import getUserDetailFromToken from "../helper/getUserDetailFromToken.js";
import { User } from "../models/user.model.js";

async function updateUserDetail(request, response) {
  try {
    const token = request.cookies.token || " ";
    const user = await getUserDetailFromToken(token);
    const { name, profile_pic } = request.body;

    const updateUser = await User.updateOne(
      { _id: user._id },
      {
        name,
        profile_pic,
      }
    );

    const userInformation = await User.findById(user._id).select("-password");

    return response.status(200).json({
      message: "User Updated Successfully...",
      user: userInformation,
      success: true,
    });
  } catch (error) {
    response.status(500).json({
      message: "Error at updateUserDetail.js ( Or Login First ) : " + error,
      error: true,
    });
  }
}

export default updateUserDetail;
