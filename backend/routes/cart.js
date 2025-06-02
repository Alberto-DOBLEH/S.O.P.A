// backend/routes/cart.js
const express = require("express");
const router = express.Router();
const {
  getCartItems,
  addToCart,
  updateCartItem,
  removeCartItem,
  updateCartStatus,
} = require("../controllers/cartController");

// GET   /api/carrito          → obtener ítems
// POST  /api/carrito          → agregar al carrito
// PUT   /api/carrito/:id_carrito  → actualizar cantidad
// DELETE /api/carrito/:id_carrito → eliminar ítem
router.get("/", getCartItems);
router.post("/", addToCart);
router.put("/:id_carrito", updateCartItem);
router.delete("/:id_carrito", removeCartItem);
router.post("/update", updateCartStatus);

module.exports = router;
