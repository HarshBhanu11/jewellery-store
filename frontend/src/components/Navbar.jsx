import { Link } from 'react-router-dom';


export default function Navbar() {
return (
<nav className="nav">
<div className="nav-inner">
<Link to="/" className="logo">Ghatkopar Jewels</Link>
<div className="links">
<Link to="/collections">Collections</Link>
<Link to="/about">About</Link>
<Link to="/contact">Contact</Link>
<Link to="/cart">🛒 Cart</Link>
</div>
</div>
</nav>
);
}