import axios from 'axios';


const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000';

export const fetchProducts = () =>
  axios.get(`${API_BASE}/api/products`).then(res => res.data);

// Console log products here
fetchProducts().then(res => {
  console.log("Products:", res.data);
});


export const fetchProductBySlug = slug =>
axios.get(`${API_BASE}/api/products/${slug}`).then(res => res.data);

