const express = require("express");
const router = express.Router();

// ➕  middleware de subida
const upload  = require("../middlewares/uploadMiddleware");

const {
  getProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
  subirImagenProducto 
} = require("../controllers/productsController");

router.get("/", getProductos);
router.post("/", crearProducto);
router.put("/:id", actualizarProducto);
router.delete("/:id", eliminarProducto);

// ➕ Nueva ruta para subir imagen a un producto existente:
router.post(
  "/:id_producto/imagen",
  upload.single("imagen"),    // campo “imagen”
  subirImagenProducto
);

module.exports = router;
