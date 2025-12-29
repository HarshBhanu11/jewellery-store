import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    tag: { type: String },
    imageUrl: { type: String, required: true }
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
