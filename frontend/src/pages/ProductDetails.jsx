import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductBySlug } from '../api';


export default function ProductDetails() {
const { slug } = useParams();
const [product, setProduct] = useState(null);


useEffect(() => {
fetchProductBySlug(slug)
.then(setProduct)
.catch(err => console.error(err));
}, [slug]);


if (!product) return <p style={{ padding: 24 }}>Loading...</p>;


const whatsappUrl = `https://wa.me/91YOURNUMBER?text=Hi,%20I%20am%20interested%20in%20${encodeURIComponent(
product.name
)}`;


return (
<div className="page product-detail" style={{ display: 'flex', gap: 24 }}>
<img src={product.imageUrl} alt={product.name} className="detail-img" style={{ width: 360, borderRadius: 8 }} />
<div>
<h1>{product.name}</h1>
<p className="price">₹{product.price}</p>
<p>Beautiful imitation jewellery available in Ghatkopar store.</p>
<a href={whatsappUrl} target="_blank" rel="noreferrer" className="btn">
Order on WhatsApp
</a>
</div>
</div>
);
}