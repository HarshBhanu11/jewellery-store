import { Link } from 'react-router-dom';


export default function ProductCard({ product }) {
return (
<div className="card">
<img src={product.imageUrl} alt={product.name} className="card-img" />
<h3>{product.name}</h3>
<p>₹{product.price}</p>
<Link to={`/product/${product.slug}`}>View Details</Link>
</div>
);
}