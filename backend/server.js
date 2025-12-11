import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import contactRoutes from "./routes/contactRoutes.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Add this line after the other route setup
app.use("/api", contactRoutes);
app.use("/api", productRoutes);


// MongoDB setup
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error:", err));



app.listen(4000, () =>
  console.log("Backend running on http://localhost:4000")
);
