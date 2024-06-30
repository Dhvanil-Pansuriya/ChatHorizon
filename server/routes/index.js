import express from "express";
import registerUser from "../controllers/registerUser.js";

const router = express.Router();

// Create User API
router.post("/register", registerUser);

export default router;
