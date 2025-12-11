import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

// GET all products (from MongoDB)
router.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single product (from MongoDB)
router.get("/products/:slug", async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });

    if (!product)
      return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Seed route (add products to MongoDB)
router.post("/products/seed", async (req, res) => {
  try {
    const products = req.body;

    await Product.deleteMany();      // Remove old data
    await Product.insertMany(products); // Insert new products

    res.json({ message: "Products added to MongoDB!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
