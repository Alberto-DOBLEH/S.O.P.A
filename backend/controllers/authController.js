/*
authController.js (nuevo)
Contiene toda la lógica de autenticación.

Aquí se valida si un usuario existe, se registra, y se hace login.

Se agregó bcrypt para encriptar contraseñas.

Se agregó jsonwebtoken para crear y devolver un token JWT.

📌 Antes todo esto estaba embutido en index.js, ahora está bien ordenado.
*/
const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const saltRounds = 10;

const verificarUsuario = (req, res) => {
  const { nombre } = req.body;
  db.query("SELECT * FROM usuarios WHERE nombre = ?", [nombre], (err, results) => {
    if (err) return res.status(500).send("Error en BD");
    res.status(200).json({ existe: results.length > 0 });
  });
};

const verificarTelefono = (req, res) => {
  const { telefono } = req.body;
  db.query("SELECT * FROM usuarios WHERE telefono = ?", [telefono], (err, results) => {
    if (err) return res.status(500).send("Error en BD");
    res.status(200).json({ existe: results.length > 0 });
  });
};

const registrar = (req, res) => {
  const { nombre, telefono, contraseña } = req.body;

  if (!nombre || !telefono || !contraseña) {
    return res.status(400).send("Todos los campos son obligatorios");
  }

  db.query("SELECT * FROM usuarios WHERE nombre = ?", [nombre], (err, results) => {
    if (err) return res.status(500).send("Error interno");
    if (results.length > 0) return res.status(409).send("El nombre ya existe");

    bcrypt.hash(contraseña, saltRounds, (err, hash) => {
      if (err) return res.status(500).send("Error al encriptar");
      db.query("INSERT INTO usuarios (nombre, telefono, contraseña) VALUES (?, ?, ?)", [nombre, telefono, hash], (err) => {
        if (err) return res.status(500).send("Error al registrar");
        res.status(201).send("Usuario registrado");
      });
    });
  });
};

const login = (req, res) => {
  const { usuario, contraseña } = req.body;

  db.query("SELECT * FROM usuarios WHERE nombre = ? OR telefono = ?", [usuario, usuario], (err, results) => {
    if (err) return res.status(500).send("Error en la BD");
    if (results.length === 0) return res.status(401).send("Usuario no encontrado");

    const user = results[0];

    bcrypt.compare(contraseña, user.contraseña, (err, result) => {
      if (err) return res.status(500).send("Error en la verificación");
      if (!result) return res.status(401).send("Contraseña incorrecta");

      const token = jwt.sign({ id_usuario: user.id_usuario }, process.env.JWT_SECRET, { expiresIn: "2h" });

      res.status(200).json({
        mensaje: "Inicio de sesión exitoso",
        token,
        usuario: {
          id: user.id_usuario,
          nombre: user.nombre
        }
      });
    });
  });
};

module.exports = { verificarUsuario, verificarTelefono, registrar, login };
