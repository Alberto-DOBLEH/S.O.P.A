const express = require("express");
const router = express.Router();
const {
  getProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto
} = require("../controllers/productsController");

router.get("/", getProductos);
router.post("/", crearProducto);
router.put("/:id", actualizarProducto);
router.delete("/:id", eliminarProducto);

module.exports = router;
