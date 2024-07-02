import { User } from "../models/user.model.js";

async function checkEmail(request, response) {
  try {
    const { email } = request.body;
    const checkEmail = await User.findOne({ email }).select("-password");

    if (!checkEmail) {
      return response.status(400).json({
        message: "User not found...",
        error: true,
      });
    }

    // const x =  await User.find({email});
    // const arr = Object.values(x)
    // console.log(arr);
    // console.log(arr[0].name);

    return response.status(200).json({
      message: "Email Verified",
      success: true,
      data: checkEmail,
    });
  } catch (error) {
    response.status(500).json({
      message: "Error accrued checkEmail.js " + error.message || error,
      error: true,
    });
  }
}

export default checkEmail;
