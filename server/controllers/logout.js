async function logout(request, response) {
  try {
    const cookiesOptions = {
      http: true,
      secure: true,
    };
    setTimeout(() => {
      console.log("Logout Succesfully...");
    }, 2000);
    return response.cookie("token", "", cookiesOptions).status(200).json({
      message: "Logout (Session End)",
      success: true,
    });


  } catch (error) {
    return response.status(500).json({
      message: "Error accrued at Logout.js  : " + error.message,
      error: true,
    });
  }
}

export default logout;
