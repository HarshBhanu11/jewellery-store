import express from "express";
import {
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct
} from "../controllers/adminController.js";
import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

// GET all products
router.get("/products", adminAuth, getAllProducts);

// ADD product
router.post("/products", adminAuth, addProduct);

// UPDATE product
router.put("/products/:id", adminAuth, updateProduct);

// DELETE product
router.delete("/products/:id", adminAuth, deleteProduct);

export default router;
