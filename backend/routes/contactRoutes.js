import express from "express";
import { submitContactForm } from "../controllers/contactController.js";
import { body } from "express-validator";

const router = express.Router();

router.post(
  "/contact",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Invalid email"),
    body("phone").notEmpty().withMessage("Phone is required"),
    body("message").notEmpty().withMessage("Message is required")
  ],
  submitContactForm
);

export default router;
