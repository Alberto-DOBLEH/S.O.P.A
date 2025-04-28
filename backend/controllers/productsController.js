let products = [
  { id: 1, nombre: 'Producto 1', precio: 100 },
  { id: 2, nombre: 'Producto 2', precio: 200 }
];

// GET: Obtener todos los productos
const getProducts = (req, res) => {
  res.json(products);
};

// POST: Crear un nuevo producto
const createProduct = (req, res) => {
  const { nombre, precio } = req.body;
  const nuevoProducto = {
    id: products.length + 1,
    nombre,
    precio
  };
  products.push(nuevoProducto);
  res.status(201).json(nuevoProducto);
};

// PUT: Actualizar un producto
const updateProduct = (req, res) => {
  const { id } = req.params;
  const { nombre, precio } = req.body;
  const producto = products.find(p => p.id === parseInt(id));

  if (!producto) {
    return res.status(404).json({ mensaje: 'Producto no encontrado' });
  }

  producto.nombre = nombre || producto.nombre;
  producto.precio = precio || producto.precio;

  res.json(producto);
};

// DELETE: Eliminar un producto
const deleteProduct = (req, res) => {
  const { id } = req.params;
  const index = products.findIndex(p => p.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ mensaje: 'Producto no encontrado' });
  }

  products.splice(index, 1);

  res.json({ mensaje: 'Producto eliminado' });
};

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct
};
