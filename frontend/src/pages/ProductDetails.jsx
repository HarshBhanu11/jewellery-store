import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductBySlug } from "../api";
import axios from "axios";

function ProductDetails() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProductBySlug(slug)
      .then(setProduct)
      .catch(console.error);
  }, [slug]);

  const addToCart = async () => {
  try {
    await axios.post("http://localhost:4000/api/cart/add", {
      productId: product._id,
      quantity: 1,
    });

    alert("Product added to cart 🛒");
  } catch (err) {
    alert("Error adding to cart");
  }
};

  if (!product) return <p>Loading...</p>;

  return (
    <div>
      <h1>{product.name}</h1>

      <img src={product.imageUrl} width="300" alt={product.name} />

      <p>₹{product.price}</p>
      <p>{product.category}</p>

      {/* ✅ ADD TO CART BUTTON */}
      <button
        onClick={addToCart}
        style={{
          padding: "10px 20px",
          backgroundColor: "#000",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          marginTop: "15px",
        }}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductDetails;
