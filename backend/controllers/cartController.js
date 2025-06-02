// backend/controllers/cartController.js
const db = require("../db");

// Obtener ítems del carrito del usuario autenticado
const getCartItems = (req, res) => {
  const userId = req.userId;
  db.query(
    `SELECT c.id_carrito, p.id_producto, p.nombre, p.precio, c.cantidad
     FROM carrito c
     JOIN productos p ON c.id_producto = p.id_producto
     WHERE c.id_usuario = ? and c.estatus = 'A'`,
    [userId],
    (err, results) => {
      if (err) return res.status(500).json({ error: "Error al obtener carrito" });
      res.json(results);
    }
  );
};

// Agregar un producto al carrito (o aumentar cantidad si ya existe)
const addToCart = (req, res) => {
  const userId     = req.userId;
  const { id_producto, cantidad } = req.body;
  if (!id_producto || !cantidad)
    return res.status(400).json({ error: "Falta id_producto o cantidad" });

  // Verificar si ya existe en carrito
  db.query(
    `SELECT * FROM carrito WHERE id_usuario = ? AND id_producto = ?`,
    [userId, id_producto],
    (err, rows) => {
      if (err) return res.status(500).json({ error: "Error al consultar carrito" });

      if (rows.length > 0) {
        // Ya existe: actualizamos cantidad
        const nuevaCant = rows[0].cantidad + cantidad;
        db.query(
          `UPDATE carrito SET cantidad = ? WHERE id_carrito = ?`,
          [nuevaCant, rows[0].id_carrito],
          (err) => {
            if (err) return res.status(500).json({ error: "Error al actualizar carrito" });
            res.json({ mensaje: "Carrito actualizado", id_carrito: rows[0].id_carrito });
          }
        );
      } else {
        // No existe: insertamos nuevo registro
        db.query(
          `INSERT INTO carrito (id_usuario, id_producto, cantidad) VALUES (?, ?, ?)`,
          [userId, id_producto, cantidad],
          (err, result) => {
            if (err) return res.status(500).json({ error: "Error al agregar al carrito" });
            res.status(201).json({ mensaje: "Producto agregado al carrito", id_carrito: result.insertId });
          }
        );
      }
    }
  );
};

// Actualizar la cantidad de un ítem específico
const updateCartItem = (req, res) => {
  const userId     = req.userId;
  const { cantidad } = req.body;
  const id_carrito = req.params.id_carrito;
  if (cantidad === undefined)
    return res.status(400).json({ error: "Falta la cantidad" });

  // Aseguramos que el ítem pertenece al usuario
  db.query(
    `UPDATE carrito SET cantidad = ? WHERE id_carrito = ? AND id_usuario = ?`,
    [cantidad, id_carrito, userId],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Error al actualizar ítem" });
      if (result.affectedRows === 0)
        return res.status(404).json({ error: "Ítem no encontrado o no autorizado" });
      res.json({ mensaje: "Cantidad actualizada" });
    }
  );
};

// Eliminar un ítem del carrito
const removeCartItem = (req, res) => {
  const userId     = req.userId;
  const id_carrito = req.params.id_carrito;
  db.query(
    `DELETE FROM carrito WHERE id_carrito = ? AND id_usuario = ?`,
    [id_carrito, userId],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Error al eliminar ítem" });
      if (result.affectedRows === 0)
        return res.status(404).json({ error: "Ítem no encontrado o no autorizado" });
      res.json({ mensaje: "Ítem eliminado del carrito" });
    }
  );
};

module.exports = {
  getCartItems,
  addToCart,
  updateCartItem,
  removeCartItem,
};
