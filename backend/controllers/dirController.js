
const db = require("../db")
// Crear una nueva dirección
const crearDireccion = (req, res) => {
  const {
    id_usuario,
    calle,
    no_ext,
    no_interior,
    ciudad,
    codigo_postal,
    pais,
    estado
  } = req.body;

  const query = `
    INSERT INTO direcciones (id_usuario, calle, no_ext, no_interior, ciudad, codigo_postal, pais, estado)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [id_usuario, calle, no_ext, no_interior, ciudad, codigo_postal, pais, estado],
    (err, result) => {
      if (err) {
        console.error("Error SQL al insertar dirección:", err);
        return res.status(500).json({ error: "Error al crear dirección" });
      }
      res.status(201).json({ message: "Dirección creada correctamente" });
    }
  );
};

// Obtener todas las direcciones
const obtenerTodasLasDirecciones = (req, res) => {
  const query = "SELECT * FROM direcciones";

  db.query(query, (err, results) => {
    if (err) {
      console.error("❌ Error SQL al obtener todas las direcciones:", err);
      return res.status(500).json({ error: "Error al obtener direcciones" });
    }
    res.json(results);
  });
};

// Obtener direcciones por usuario
const obtenerDireccionesPorUsuario = (req, res) => {
  const { id_usuario } = req.params;

  const query = "SELECT * FROM direcciones WHERE id_usuario = ?";

  db.query(query, [id_usuario], (err, results) => {
    if (err) {
      console.error("❌ Error SQL al obtener direcciones del usuario:", err);
      return res.status(500).json({ error: "Error al obtener direcciones" });
    }
    res.json(results);
  });
};

const actualizarDireccion = (req, res) => {
  const { id_direccion } = req.params;
  const {
    calle,
    no_ext,
    no_interior,
    ciudad,
    codigo_postal,
    pais,
    colonia
  } = req.body;

  const query = `
    UPDATE direcciones
    SET calle = ?, no_ext = ?, no_interior = ?, ciudad = ?, codigo_postal = ?, pais = ?, colonia = ?
    WHERE id_direccion = ?
  `;

  db.query(
    query,
    [calle, no_ext, no_interior, ciudad, codigo_postal, pais, colonia, id_direccion],
    (err, result) => {
      if (err) {
        console.error("❌ Error al actualizar dirección:", err);
        return res.status(500).json({ error: "Error al actualizar dirección" });
      }
      res.status(200).json({ message: "Dirección actualizada correctamente" });
    }
  );
};

const eliminarDireccion = (req, res) => {
  const { id_direccion } = req.params;

  const query = "DELETE FROM direcciones WHERE id_direccion = ?";

  db.query(query, [id_direccion], (err, result) => {
    if (err) {
      console.error("❌ Error al eliminar dirección:", err);
      return res.status(500).json({ error: "Error al eliminar dirección" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Dirección no encontrada" });
    }

    res.status(200).json({ message: "Dirección eliminada correctamente" });
  });
};

module.exports = {
  crearDireccion,
  obtenerTodasLasDirecciones,
  obtenerDireccionesPorUsuario,
  actualizarDireccion,
  eliminarDireccion
};