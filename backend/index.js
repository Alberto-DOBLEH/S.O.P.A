/*
🟩 index.js (antes: hacía todo, ahora: solo inicia el servidor)
Antes:
Manejo de rutas
Conexión a MySQL
Registro/login de usuarios
Ahora:
Solo importa módulos
Configura Express y escucha en el puerto
Delega la lógica a otros archivos
app.use("/api", authRoutes);

 authController.js (nuevo)
 authRoutes.js (nuevo)
  .env (nuevo)
   db.js (nuevo)
 */
// backend/index.js

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// 🛡️ Cambio: Importamos el middleware de autorización JWT
const verifyToken = require("./middlewares/authMiddleware");

const app = express();

// ———————————————————————————————————————————————
// 🛡️ Cambio: Configuración de CORS para aceptar solo nuestro frontend
app.use(cors({
  origin: "http://localhost:3000",  // URL donde corre tu React
  credentials: true                  // permite enviar cabeceras de auth/cookies
}));
// ———————————————————————————————————————————————

app.use(bodyParser.json());

// 👉 Importar rutas
const authRoutes      = require("./routes/authRoutes");
const productosRoutes = require("./routes/products");
const ventasRoutes    = require("./routes/ventas");
// ➕ Importa el router de carrito
const cartRoutes = require("./routes/cart");

// ———————————————————————————————————————————————
// 🗺️ Cambio: Prefijo /api/auth para separar las rutas de autenticación
app.use("/api/auth", authRoutes);
// ———————————————————————————————————————————————

// ———————————————————————————————————————————————
// 🛡️ Cambio: Proteger rutas de productos y ventas con el middleware verifyToken
app.use("/api/productos", productosRoutes);
app.use("/api/ventas",    verifyToken, ventasRoutes);
// ———————————————————————————————————————————————
// 🔧 Nueva ruta protegida para carrito:
app.use("/api/carrito",   verifyToken, cartRoutes);
// backend/index.js
app.use("/uploads", express.static("uploads"));



const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Servidor backend activo en http://localhost:${PORT}`);
});
