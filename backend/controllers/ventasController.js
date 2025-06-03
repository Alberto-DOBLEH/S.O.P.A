// backend/controllers/ventasController.js

const db = require("../db");

// 1) Crear una nueva venta (checkout)
const crearVenta = (req, res) => {
  const { productos, metodo_pago } = req.body;
  const id_usuario = req.userId || req.body.id_usuario;
  const estado = "Aprobado"

  if (!productos || productos.length === 0) {
    return res.status(400).json({ error: "Faltan productos para la venta" });
  }

  // 1.1 Obtener precios reales de la BD
  const ids = productos.map(p => p.id_producto);
  db.query(
    "SELECT id_producto, precio FROM productos WHERE id_producto IN (?)",
    [ids],
    (err, rows) => {
      if (err) {
        console.error("Error al leer precios:", err);
        return res.status(500).json({ error: "Error al leer precios" });
      }

      const priceMap = {};
      rows.forEach(r => {
        priceMap[r.id_producto] = r.precio;
      });

      // 1.2 Calcular total
      const total = productos.reduce(
        (sum, p) => sum + (priceMap[p.id_producto] || 0) * p.cantidad,
        0
      );

      // 1.3 Insertar cabecera de la venta
      db.query(
        "INSERT INTO ventas (id_usuario, total, metodo_pago, estado) VALUES (?, ?, ?, ?)",
        [id_usuario, total, metodo_pago, estado],
        (err2, result) => {
          if (err2) {
            console.error("Error al crear venta (cabecera):", err2);
            return res.status(500).json({ error: "Error al crear venta" });
          }

          const id_venta = result.insertId;

          // 1.4 Preparar y guardar los detalles
          const valores = productos.map(p => [
            id_venta,
            p.id_producto,
            p.cantidad,
            priceMap[p.id_producto]
          ]);

          db.query(
            "INSERT INTO detalle_ventas (id_venta, id_producto, cantidad, precio_unitario) VALUES ?",
            [valores],
            (err3) => {
              if (err3) {
                console.error("Error al insertar detalle de venta:", err3);
                return res.status(500).json({ error: "Error al insertar detalle" });
              }
              return res.status(201).json({ mensaje: "Venta registrada con éxito", id_venta });
            }
          );
        }
      );
    }
  );
};

// 2) Actualizar el estado de una venta
const actualizarEstadoVenta = (req, res) => {
  const id_venta = req.params.id_venta;
  const { estado } = req.body;

  if (!estado) {
    return res.status(400).json({ error: "Debe enviar el nuevo estado" });
  }

  db.query(
    "UPDATE ventas SET estado = ? WHERE id_venta = ?",
    [estado, id_venta],
    (err, result) => {
      if (err) {
        console.error("Error al actualizar estado de venta:", err);
        return res.status(500).json({ error: "Error al actualizar estado" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Venta no encontrada" });
      }
      res.json({ mensaje: "Estado de venta actualizado" });
    }
  );
};

// 3) Obtener el historial de ventas de un usuario
const obtenerVentasPorUsuario = (req, res) => {
  const id_usuario = req.userId || req.params.id_usuario;
  db.query(
    `SELECT v.id_venta,
            v.total,
            v.metodo_pago,
            v.estado,
            v.fecha_creacion AS fecha,
            dv.id_producto,
            dv.cantidad,
            dv.precio_unitario,
            p.nombre AS nombre_producto
     FROM ventas v
     JOIN detalle_ventas dv ON v.id_venta = dv.id_venta
     JOIN productos p ON dv.id_producto = p.id_producto
     WHERE v.id_usuario = ?
     ORDER BY v.fecha_creacion DESC`,
    [id_usuario],
    (err, results) => {
      if (err) {
        console.error("Error al obtener ventas:", err);
        return res.status(500).json({ error: "Error al obtener ventas" });
      }

      // Agrupar ventas
      const ventasMap = new Map();

      results.forEach((row) => {
        if (!ventasMap.has(row.id_venta)) {
          ventasMap.set(row.id_venta, {
            id_venta: row.id_venta,
            total: row.total,
            metodo_pago: row.metodo_pago,
            estado: row.estado,
            fecha: row.fecha,
            productos: []
          });
        }

        ventasMap.get(row.id_venta).productos.push({
          id_producto: row.id_producto,
          nombre: row.nombre_producto,
          cantidad: row.cantidad,
          precio_unitario: row.precio_unitario
        });
      });

      const ventasAgrupadas = Array.from(ventasMap.values());
      res.json(ventasAgrupadas);
    }
  );
};

module.exports = {
  crearVenta,
  actualizarEstadoVenta,
  obtenerVentasPorUsuario
};
