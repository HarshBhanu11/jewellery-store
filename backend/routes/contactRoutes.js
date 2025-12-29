import express from "express";
import { addMessage, getMessages } from "../controllers/contactController.js";
import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

// Public (website contact form)
router.post("/", addMessage);

// Admin (view messages)
router.get("/", adminAuth, getMessages);

export default router;
