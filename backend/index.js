// index.js actualizado para permitir login con nombre o teléfono, y verificación de duplicado
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require('bcrypt');
const saltRounds = 10;

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configura tu conexión
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345",
  database: "sopa"
});

// Conecta
db.connect((err) => {
  if (err) {
    console.error("Error al conectar con la base de datos:", err);
  } else {
    console.log("Conexión exitosa a la base de datos MySQL");
  }
});

// Ruta para verificar si un nombre de usuario ya existe
app.post("/api/verificar-usuario", (req, res) => {
  const { nombre } = req.body;
  const query = `SELECT * FROM usuarios WHERE nombre = ?`;
  db.query(query, [nombre], (err, results) => {
    if (err) {
      console.error("Error en la base de datos:", err);
      return res.status(500).send("Error interno del servidor");
    }
    res.status(200).json({ existe: results.length > 0 });
  });
});

app.post("/api/verificar-telefono", (req, res) => {
  const { telefono } = req.body;

  const query = `SELECT * FROM usuarios WHERE telefono = ?`;
  db.query(query, [telefono], (err, results) => {
    if (err) {
      console.error("Error al verificar teléfono:", err);
      return res.status(500).send("Error interno del servidor");
    }

    res.status(200).json({ existe: results.length > 0 });
  });
});


// Ruta para registrar usuarios
app.post("/api/registro", (req, res) => {
  const { nombre, telefono, contraseña } = req.body;

  // Verificar si el nombre de usuario ya existe
  const checkQuery = `SELECT * FROM usuarios WHERE nombre = ?`;
  db.query(checkQuery, [nombre], (err, results) => {
    if (err) {
      console.error("Error al verificar nombre:", err);
      return res.status(500).send("Error interno");
    }
    if (results.length > 0) {
      return res.status(409).send("El nombre de usuario ya existe");
    }

    // Hashear la contraseña y registrar
    bcrypt.hash(contraseña, saltRounds, (err, hash) => {
      if (err) {
        console.error("Error al encriptar la contraseña:", err);
        return res.status(500).send("Error al procesar la contraseña");
      }

      const insertQuery = `INSERT INTO usuarios (nombre, telefono, contraseña) VALUES (?, ?, ?)`;
      db.query(insertQuery, [nombre, telefono, hash], (err, result) => {
        if (err) {
          console.error("Error al registrar usuario:", err);
          return res.status(500).send("Error al registrar usuario");
        }
        res.status(200).send("Usuario registrado con éxito");
      });
    });
  });
});

// Ruta de login usando nombre o teléfono
app.post("/api/login", (req, res) => {
  const { usuario, contraseña } = req.body;

  // Buscar por nombre o por teléfono
  const query = `SELECT * FROM usuarios WHERE nombre = ? OR telefono = ?`;
  db.query(query, [usuario, usuario], (err, results) => {
    if (err) {
      console.error("Error en la base de datos:", err);
      return res.status(500).send("Error interno del servidor");
    }

    if (results.length === 0) {
      return res.status(401).send("Usuario no encontrado");
    }

    const usuarioDB = results[0];

    // Comparar la contraseña ingresada con el hash almacenado
    bcrypt.compare(contraseña, usuarioDB.contraseña, (err, result) => {
      if (err) {
        console.error("Error al comparar contraseñas:", err);
        return res.status(500).send("Error interno");
      }

      if (!result) {
        return res.status(401).send("Contraseña incorrecta");
      }

      res.status(200).send("Inicio de sesión exitoso");
    });
  });
});


// Servidor en marcha
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});
