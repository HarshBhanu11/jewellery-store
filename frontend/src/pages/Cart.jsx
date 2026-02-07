import { useEffect, useState } from "react";
import axios from "axios";

export default function Cart() {
  const [cart, setCart] = useState(null);

  const fetchCart = () => {
    axios
      .get("http://localhost:4000/api/cart")
      .then((res) => setCart(res.data));
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQty = async (id, qty) => {
    if (qty < 1) return;

    await axios.put("http://localhost:4000/api/cart/update", {
      productId: id,
      quantity: qty,
    });

    fetchCart();
  };

  const removeItem = async (id) => {
    await axios.delete(`http://localhost:4000/api/cart/remove/${id}`);
    fetchCart();
  };

  if (!cart || cart.items.length === 0) {
    return <h2>Cart is empty</h2>;
  }

  const total = cart.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div style={{ padding: "30px" }}>
      <h2>Your Cart</h2>

      {cart.items.map((item) => (
        <div
          key={item.product._id}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            borderBottom: "1px solid #ddd",
            padding: "15px 0",
          }}
        >
          {/* PRODUCT IMAGE */}
          <img
            src={item.product.imageUrl}
            width="60"
            height="60"
            style={{ objectFit: "cover" }}
          />

          {/* PRODUCT INFO */}
          <div style={{ flex: 1 }}>
            <h4>{item.product.name}</h4>
            <p>₹{item.product.price}</p>

            {/* QUANTITY CONTROLS */}
            <div>
              <button onClick={() => updateQty(item.product._id, item.quantity - 1)}>
                -
              </button>

              <span style={{ margin: "0 10px" }}>
                {item.quantity}
              </span>

              <button onClick={() => updateQty(item.product._id, item.quantity + 1)}>
                +
              </button>
            </div>
          </div>

          <button onClick={() => removeItem(item.product._id)}>
            Remove
          </button>
        </div>
      ))}

      <h3>Total: ₹{total}</h3>
    </div>
  );
}
