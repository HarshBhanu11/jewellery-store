import { useState } from "react";
import Navbar from "../components/Navbar";

export default function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    slug: "",
    price: "",
    category: "",
    tag: "",
    imageUrl: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(
      "http://localhost:4000/api/admin/products",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(product)
      }
    );

    const data = await res.json();

    if (res.ok) {
      alert("Product added");
      setProduct({
        name: "",
        slug: "",
        price: "",
        category: "",
        tag: "",
        imageUrl: ""
      });
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="admin-container">
      <Navbar />

      <form onSubmit={handleSubmit} className="card">
        <input placeholder="Name" onChange={e => setProduct({ ...product, name: e.target.value })} />
        <input placeholder="Slug" onChange={e => setProduct({ ...product, slug: e.target.value })} />
        <input placeholder="Price" onChange={e => setProduct({ ...product, price: e.target.value })} />
        <input placeholder="Category" onChange={e => setProduct({ ...product, category: e.target.value })} />
        <input placeholder="Tag" onChange={e => setProduct({ ...product, tag: e.target.value })} />
        <input placeholder="Image URL" onChange={e => setProduct({ ...product, imageUrl: e.target.value })} />
        <button>Add Product</button>
      </form>
    </div>
  );
}
