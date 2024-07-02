async function userDerail(request, response) {
  try {
    const cookies = request.cookies.token || "";
  } catch (error) {
    response.status(500).json({
      message: "Error at userDetail.js",
    });
  }
}
