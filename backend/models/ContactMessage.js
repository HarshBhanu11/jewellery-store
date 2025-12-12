import mongoose from "mongoose";

const contactMessageSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

export default mongoose.model("ContactMessage", contactMessageSchema);
