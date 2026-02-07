import express from "express";
import Cart from "../models/Cart.js";

const router = express.Router();

/* ADD TO CART */
router.post("/add", async (req, res) => {
  const { productId, quantity } = req.body;

  let cart = await Cart.findOne();

  if (!cart) {
    cart = new Cart({
      items: [{ product: productId, quantity }],
    });
  } else {
    const index = cart.items.findIndex(
      (i) => i.product.toString() === productId
    );

    if (index > -1) {
      cart.items[index].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }
  }

  await cart.save();
  res.json(cart);
});

/* GET CART */
router.get("/", async (req, res) => {
  const cart = await Cart.findOne().populate("items.product");
  res.json(cart);
});

// UPDATE QUANTITY
router.put("/update", async (req, res) => {
  const { productId, quantity } = req.body;

  const cart = await Cart.findOne();

  const item = cart.items.find(
    (i) => i.product.toString() === productId
  );

  if (item) {
    item.quantity = quantity;
  }

  await cart.save();
  res.json(cart);
});

/* REMOVE ITEM */
router.delete("/remove/:productId", async (req, res) => {
  const cart = await Cart.findOne();

  cart.items = cart.items.filter(
    (i) => i.product.toString() !== req.params.productId
  );

  await cart.save();
  res.json(cart);
});

export default router;
