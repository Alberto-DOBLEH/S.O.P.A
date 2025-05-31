/*
db.js (nuevo)
Maneja la conexión a MySQL.

Antes eso también estaba en index.js, ahora es un módulo aparte reutilizable.*/
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root", // reemplaza si tu usuario es diferente
  password: "root", // reemplaza si tu contraseña es diferente
  database: "sopa", // tu base de datos ya creada
});

connection.connect((err) => {
  if (err) {
    console.error("❌ Error al conectar con la base de datos:", err);
  } else {
    console.log("✅ Conectado a la base de datos MySQL");
  }
});

module.exports = connection;
