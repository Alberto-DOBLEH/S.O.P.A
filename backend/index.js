// index.js
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('¡Backend funcionando!');
});

// Ruta de ejemplo para login
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  // ⚠️ Lógica temporal
  if (email === 'admin@admin.com' && password === '1234') {
    res.json({ success: true, message: 'Login correcto' });
  } else {
    res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
  }
});
// Ruta para obtener productos
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Datos simulados
const products = [
  { id: 1, name: 'Smartphone X', price: 499 },
  { id: 2, name: 'Laptop Pro',    price: 999 },
  { id: 3, name: 'Cámara SLR',    price: 299 }
];

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

