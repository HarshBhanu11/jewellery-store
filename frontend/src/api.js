import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;

// Get all products
export const fetchProducts = async () => {
  const res = await axios.get(`${API_BASE}/api/products`);
  return res.data;
};

// Get product by slug ✅ REQUIRED
export const fetchProductBySlug = async (slug) => {
  const res = await axios.get(`${API_BASE}/api/products/${slug}`);
  return res.data;
};
