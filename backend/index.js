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
   require("dotenv").config();
   const express = require("express");
   const cors = require("cors");
   const bodyParser = require("body-parser");
   
   const app = express();
   
   // 👉 Importa rutas
   const authRoutes = require("./routes/authRoutes");
   const productosRoutes = require("./routes/products"); 
   const ventasRoutes = require("./routes/ventas");
   
   // 👉 Middlewares
   app.use(cors());
   app.use(bodyParser.json());
   
   // 👉 Rutas
   app.use("/api", authRoutes);
   app.use("/api/productos", productosRoutes); 
   app.use("/api/ventas", ventasRoutes);

   
   // 👉 Servidor
   const PORT = process.env.PORT || 3001;
   app.listen(PORT, () => {
     console.log(`🚀 Servidor backend activo en http://localhost:${PORT}`);
   });
   