import express from "express";
import { isLoggedIn } from "../middlewares/auth.middleware.js";
import { getUsersSidebar, getMessages, sendMessage } from "../controllers/message.controller.js";

const router = express.Router();

router.get("/users", isLoggedIn, getUsersSidebar);
router.get("/:id", isLoggedIn, getMessages);
router.post("/send/:id", isLoggedIn, sendMessage);

export default router;