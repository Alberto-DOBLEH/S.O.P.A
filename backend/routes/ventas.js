const express = require("express");
const router = express.Router();
const {
  crearVenta,
  actualizarEstadoVenta,
  obtenerVentasPorUsuario,
} = require("../controllers/ventasController");


router.post("/", crearVenta);

// 🔧 Nueva ruta para actualizar estado:
router.put("/estado/:id_venta", actualizarEstadoVenta);
// 🔧 Nueva ruta para para obtener ventas::
router.get("/usuario/:id_usuario", obtenerVentasPorUsuario);

module.exports = router;
