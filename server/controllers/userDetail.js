import getUserDetailFromToken from "../helper/getUserDetailFromToken.js";

async function userDetail(request, response) {
  try {
    const tokens = request.cookies.token || "";
    console.log(tokens);
    const user = await getUserDetailFromToken(tokens);

    return response.status(200).json({
      message: "Users Detail..",
      data: user,
    });
  } catch (error) {
    response.status(500).json({
      message: "Error at userDetail.js" + error.message,
    });
  }
}

export default userDetail;
