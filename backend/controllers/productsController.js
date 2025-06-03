const db = require('../db');
const path = require("path");

// 🔍 Obtener todos los productos
const getProductos = (req, res) => {
  db.query('SELECT * FROM productos', (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al obtener productos' });
    res.json(results);
  });
};

// ➕ Crear nuevo producto
const crearProducto = (req, res) => {
  const { nombre, descripcion, precio, stock } = req.body;
  if (!nombre || !precio || stock === undefined) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }

  const query = 'INSERT INTO productos (nombre, descripcion, precio, stock) VALUES (?, ?, ?, ?)';
  db.query(query, [nombre, descripcion, precio, stock], (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al crear producto' });
    res.status(201).json({ id_producto: result.insertId, nombre, descripcion, precio, stock });
  });
};

// ✏️ Editar producto
const actualizarProducto = (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, precio, stock } = req.body;

  const query = 'UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, stock = ? WHERE id_producto = ?';
  db.query(query, [nombre, descripcion, precio, stock, id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al actualizar producto' });
    res.json({ mensaje: 'Producto actualizado correctamente' });
  });
};

// ❌ Eliminar producto
const eliminarProducto = (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM productos WHERE id_producto = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al eliminar producto' });
    res.json({ mensaje: 'Producto eliminado correctamente' });
  });
};


const subirImagenProducto = (req, res) => {
  const id = req.params.id_producto;
  if (!req.file) return res.status(400).json({ error: "No se subió archivo" });

  const ruta = `/uploads/${req.file.filename}`; // ruta pública
  // Guardar la ruta en la BD:
  db.query(
    "UPDATE productos SET imagen = ? WHERE id_producto = ?",
    [ruta, id],
    (err) => {
      if (err) return res.status(500).json({ error: "Error al guardar ruta en BD" });
      res.json({ mensaje: "Imagen subida", imagen: ruta });
    }
  );
};

const productosPorCategoria = (req, res) => {
  const { categoria } = req.params;
  db.query('SELECT * FROM productos WHERE categoria = ?', [categoria], (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al obtener productos por categoría' });
    res.json(results);
  });
};

const obtenerProductoPorId = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM productos WHERE id_producto = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al obtener producto' });
    if (results.length === 0) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(results[0]);
  });
}

module.exports = {
  getProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
  subirImagenProducto,
  productosPorCategoria,
  obtenerProductoPorId
};
