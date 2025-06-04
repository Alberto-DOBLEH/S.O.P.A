const e = require("express");
const db = require("../db");
const { get } = require("../routes/favs");

// Obtener favoritos del usuario por id
// Obtener ítems del carrito del usuario autenticado
const getFavsItems = (req, res) => {
  const userId = req.userId;
  db.query(
    `SELECT f.id_favorito, p.id_producto, p.nombre, p.imagen
     FROM favoritos f
     JOIN productos p ON f.id_producto = p.id_producto
     WHERE f.id_usuario = ?`,
    [userId],
    (err, results) => {
      if (err) return res.status(500).json({ error: "Error al obtener carrito" });
      res.json(results);
    }
  );
};

// Agregar un producto a favoritos
const addToFavs = (req, res) => {
    const userId     = req.userId;
  const { id_producto } = req.body;

  console.log("Datos recibidos:", req.body);
  
  if (id_producto == null) 
    return res.status(400).json({ error: "Falta id_producto" });

  db.query(
    `INSERT INTO carrito (id_usuario, id_producto) VALUES (?, ?)`,
    [userId, id_producto],
    (err, result) => {
    if (err) return res.status(500).json({ error: "Error al agregar al carrito" });
        res.status(201).json({ mensaje: "Producto agregado al carrito", id_carrito: result.insertId });
        }
    );    
};

//  Eliminar un producto de favoritos
const removeFavsItem = (req, res) => {
  const userId = req.userId;
  const { id_favorito } = req.params;

  db.query(
    `DELETE FROM favoritos WHERE id_favorito = ? AND id_usuario = ?`,
    [id_favorito, userId],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Error al eliminar favorito" });
      if (result.affectedRows === 0) return res.status(404).json({ error: "Favorito no encontrado" });
      res.json({ mensaje: "Producto eliminado de favoritos" });
    }
  );
};

module.exports = { getFavsItems, addToFavs, removeFavsItem };