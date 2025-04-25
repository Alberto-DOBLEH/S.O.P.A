const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

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

// Ruta para registrar usuarios
app.post("/api/registro", (req, res) => {
  const { nombre, telefono, contraseña } = req.body;

  const query = `INSERT INTO usuarios (nombre, telefono, contraseña) VALUES (?, ?, ?)`;

  db.query(query, [nombre, telefono, contraseña], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error al registrar usuario");
    } else {
      res.status(200).send("Usuario registrado con éxito");
    }
  });
});

// Servidor en marcha
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});
