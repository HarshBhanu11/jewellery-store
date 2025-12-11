import { useEffect, useState } from 'react';
import { fetchProducts } from '../api';
import ProductCard from '../components/productcard';

export default function Collections() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts()
      .then(data => {
        console.log("Fetched products:", data);
        setProducts(data); // this must be an array
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="page">
      <h1>Collections</h1>
      <div className="grid">
        {products.map(p => (
          <ProductCard 
            key={p.id}
            product={p}  // 👈 pass product details
          />
        ))}
      </div>
    </div>
  );
}
