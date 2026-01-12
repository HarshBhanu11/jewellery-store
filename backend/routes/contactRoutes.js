import express from "express";
import {
  addMessage,
  getMessages,
  markMessage,
  deleteMessage
} from "../controllers/contactController.js";
import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

// Public (website contact form)
router.post("/", addMessage);

// Admin (view messages)
router.get("/", adminAuth, getMessages);

// Admin (mark read / unread)
router.put("/:id/read", adminAuth, markMessage);

// Admin (delete message)
router.delete("/:id", adminAuth, deleteMessage);

export default router;
