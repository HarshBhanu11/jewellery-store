import { useEffect, useState } from "react";
import { fetchProducts } from "../api";
import ProductCard from "../components/productcard";

export default function Collections() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        console.log(data);
        setProducts(data);
      } catch (err) {
        console.error(err);
      }
    };

    loadProducts();
  }, []);

  return (
    <div className="page">
      <h1>Collections</h1>

      <div className="grid">
        {products.map((p) => (
          <ProductCard
            key={p._id}   
            product={p}
          />
        ))}
      </div>
    </div>
  );
}
