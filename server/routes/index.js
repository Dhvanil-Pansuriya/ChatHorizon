import express from "express";
import registerUser from "../controllers/registerUser.js";
import checkEmail from "../controllers/checkEmail.js";
import checkPassword from "../controllers/checkPassword.js";

const router = express.Router();

// Create User API
router.post("/register", registerUser);
router.post("/checkEmail", checkEmail);
router.post("/checkPassword", checkPassword);

export default router;
