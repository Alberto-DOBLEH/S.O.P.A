const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

const productRoutes = require('./routes/products');

app.use(express.json());

// Usar las rutas
app.use('/api/products', productRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
