import Product from "../models/Product.js";

// GET ALL PRODUCTS
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ADD PRODUCT
export const addProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.json({ message: "Product added successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE PRODUCT
export const updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated)
      return res.status(404).json({ message: "Product not found" });

    res.json({ message: "Product updated", product: updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE PRODUCT
export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
