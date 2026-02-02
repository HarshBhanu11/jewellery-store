import "./config/env.js";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import productRoutes from "./routes/productRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import adminAuthRoutes from "./routes/adminAuthRoutes.js";



const app = express();

// Middleware

app.use(cors());
app.use(express.json());
// Routes
app.use("/api/products", productRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/admin/auth", adminAuthRoutes);

// MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Error:", err));

// Server
app.listen(4000, () => {
  console.log("🚀 Backend running on http://localhost:4000");
});
