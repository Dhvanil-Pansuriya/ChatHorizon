import express from "express";
import registerUser from "../controllers/registerUser.js";
import checkEmail from "../controllers/checkEmail.js";
import checkPassword from "../controllers/checkPassword.js";
import userDetail from "../controllers/userDetail.js";
import logout from "../controllers/logout.js";
import updateUserDetail from "../controllers/updateUserDetail.js";
import searchUser from "../controllers/searchUser.js";

const router = express.Router();

// Create User API
router.post("/register", registerUser);
router.post("/checkEmail", checkEmail);
router.post("/checkPassword", checkPassword);
router.get("/userDetail", userDetail);
router.get("/logout", logout);
router.post("/update", updateUserDetail);
router.post("/searchUser", searchUser);

export default router;
