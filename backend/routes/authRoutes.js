/*
authRoutes.js (nuevo)
Define las rutas HTTP (/login, /registro, etc.).

Cada ruta llama a una función del authController, así se separa lógica de rutas.
*/ 
const express = require("express");
const router = express.Router();
const { verificarUsuario, verificarTelefono, registrar, login, informacionUsuario, editarUsuario } = require("../controllers/authController");

router.get("/verificar-usuario", verificarUsuario);
router.post("/verificar-telefono", verificarTelefono);
router.post("/registro", registrar);
router.post("/login", login);
router.post("/informacion-usuario", informacionUsuario);
router.post("/editar-usuario", editarUsuario);

module.exports = router;
