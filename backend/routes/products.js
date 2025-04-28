const express = require('express');
const router = express.Router();
const { getProducts, createProduct, updateProduct, deleteProduct } = require('../controllers/productsController');

// Ruta para obtener todos los productos
router.get('/', getProducts);

// Ruta para crear un producto
router.post('/', createProduct);

// Ruta para actualizar un producto por id
router.put('/:id', updateProduct);

// Ruta para eliminar un producto por id
router.delete('/:id', deleteProduct);

module.exports = router;
