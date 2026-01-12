import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },          // ✅ phone added
    message: { type: String, required: true }
  },
  { timestamps: true }                // ✅ adds createdAt & updatedAt
);

export default mongoose.model("ContactMessage", contactSchema);
