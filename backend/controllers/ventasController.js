const db = require("../db");

// POST /api/ventas
const crearVenta = (req, res) => {
  const { id_usuario, productos, metodo_pago } = req.body;

  if (!id_usuario || !productos || productos.length === 0) {
    return res.status(400).json({ error: "Faltan datos para crear la venta" });
  }

  // Calcular total
  let total = 0;
  for (let p of productos) {
    total += p.precio * p.cantidad;
  }

  const insertVenta = `
    INSERT INTO ventas (id_usuario, total, metodo_pago)
    VALUES (?, ?, ?)
  `;

  db.query(insertVenta, [id_usuario, total, metodo_pago], (err, result) => {
    if (err) {
        console.error("Error SQL al crear la venta:", err);
        return res.status(500).json({ error: "Error al crear la venta", detalle: err.message });
      }
      
    const id_venta = result.insertId;

    // Insertar detalle por cada producto
    const insertDetalle = `
      INSERT INTO detalle_ventas (id_venta, id_producto, cantidad, precio_unitario)
      VALUES ?
    `;

    const valores = productos.map(p => [
      id_venta,
      p.id_producto,
      parseInt(p.cantidad),        // 👈 Fuerza a entero
      parseFloat(p.precio)         // 👈 Fuerza a decimal
    ]);
    

    db.query(insertDetalle, [valores], (err2) => {
      if (err2) return res.status(500).json({ error: "Error al insertar detalle de venta" });

      res.status(201).json({ mensaje: "Venta registrada con éxito", id_venta });
    });
  });
};
// PUT /api/ventas/estado/:id_venta
const actualizarEstadoVenta = (req, res) => {
  const { id_venta } = req.params;
  const { estado } = req.body;

  const query = "UPDATE ventas SET estado = ?, fecha_actualizacion = NOW() WHERE id_venta = ?";
  db.query(query, [estado, id_venta], (err, result) => {
    if (err) {
      console.error("Error al actualizar estado:", err);
      return res.status(500).json({ error: "No se pudo actualizar el estado" });
    }
    res.status(200).json({ mensaje: "Estado actualizado correctamente" });
  });
};

// GET /api/ventas/usuario/:id_usuario
const obtenerVentasPorUsuario = (req, res) => {
  const { id_usuario } = req.params;

  const query = `
    SELECT v.id_venta, v.total, v.estado, v.metodo_pago, v.fecha_compra,
           dv.id_producto, dv.cantidad, dv.precio_unitario, p.nombre AS nombre_producto
    FROM ventas v
    JOIN detalle_ventas dv ON v.id_venta = dv.id_venta
    JOIN productos p ON dv.id_producto = p.id_producto
    WHERE v.id_usuario = ?
    ORDER BY v.fecha_compra DESC
  `;

  db.query(query, [id_usuario], (err, results) => {
    if (err) {
      console.error("Error al obtener ventas:", err);
      return res.status(500).json({ error: "Error al obtener las ventas" });
    }

    // Agrupar por id_venta
    const ventas = {};
    results.forEach(row => {
      if (!ventas[row.id_venta]) {
        ventas[row.id_venta] = {
          id_venta: row.id_venta,
          total: row.total,
          estado: row.estado,
          metodo_pago: row.metodo_pago,
          fecha_compra: row.fecha_compra,
          productos: []
        };
      }

      ventas[row.id_venta].productos.push({
        id_producto: row.id_producto,
        nombre: row.nombre_producto,
        cantidad: row.cantidad,
        precio_unitario: row.precio_unitario
      });
    });

    res.status(200).json(Object.values(ventas));
  });
};


module.exports = { crearVenta, actualizarEstadoVenta, obtenerVentasPorUsuario };

