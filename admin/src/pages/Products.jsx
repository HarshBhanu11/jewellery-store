import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);

  const token = localStorage.getItem("token");

  const fetchProducts = async () => {
    const res = await fetch("http://localhost:4000/api/admin/products", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const data = await res.json();
    console.log(data);
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    await fetch(`http://localhost:4000/api/admin/products/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    fetchProducts();
  };

  const updateProduct = async () => {
    await fetch(
      `http://localhost:4000/api/admin/products/${editProduct._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(editProduct)
      }
    );

    setEditProduct(null);
    fetchProducts();
  };

  return (
    <div className="admin-container">
      <Navbar />

      <div className="content">
        <h2>Products</h2>

        {products.map((p) => (
          <div key={p._id} className="card">
            <h4>{p.name}</h4>
            <p>₹{p.price}</p>

            <button onClick={() => setEditProduct(p)}>Edit</button>
            <button onClick={() => deleteProduct(p._id)}>Delete</button>
          </div>
        ))}

        {editProduct && (
          <div className="card">
            <h3>Edit Product</h3>

            <input
              value={editProduct.name}
              onChange={(e) =>
                setEditProduct({ ...editProduct, name: e.target.value })
              }
            />

            <input
              value={editProduct.price}
              onChange={(e) =>
                setEditProduct({ ...editProduct, price: e.target.value })
              }
            />

            <button onClick={updateProduct}>Update</button>
          </div>
        )}
      </div>
    </div>
  );
}
