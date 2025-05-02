/*
authRoutes.js (nuevo)
Define las rutas HTTP (/login, /registro, etc.).

Cada ruta llama a una función del authController, así se separa lógica de rutas.
*/ 
const express = require("express");
const router = express.Router();
const { verificarUsuario, verificarTelefono, registrar, login } = require("../controllers/authController");

router.post("/verificar-usuario", verificarUsuario);
router.post("/verificar-telefono", verificarTelefono);
router.post("/registro", registrar);
router.post("/login", login);

module.exports = router;
