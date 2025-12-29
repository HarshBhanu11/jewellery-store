import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductBySlug } from "../api";

function ProductDetails() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProductBySlug(slug)
      .then(setProduct)
      .catch(console.error);
  }, [slug]);

  if (!product) return <p>Loading...</p>;

  return (
    <div>
      <h1>{product.name}</h1>
      <img src={product.imageUrl} width="300" />
      <p>₹{product.price}</p>
      <p>{product.category}</p>
    </div>
  );
}

export default ProductDetails;
