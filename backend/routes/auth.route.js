import express from "express";
import { isLoggedIn } from "../middlewares/auth.middleware.js";
import { signup, login, logout, updateProfile, checkAuth } from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/check", isLoggedIn, checkAuth);
router.put("/update-profile", isLoggedIn, updateProfile);
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);


export default router;