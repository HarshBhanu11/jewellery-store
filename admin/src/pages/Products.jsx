import axios from "axios";
import { useEffect, useState } from "react";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/api/products")
      .then(res => setProducts(res.data));
  }, []);

  const del = async (id) => {
    await axios.delete(
      `http://localhost:4000/api/products/${id}`,
      { headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` } }
    );
    setProducts(products.filter(p => p._id !== id));
  };

  return (
    <div>
      <h2>Products</h2>
      {products.map(p => (
        <div key={p._id}>
          {p.name}
          <button onClick={() => del(p._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
