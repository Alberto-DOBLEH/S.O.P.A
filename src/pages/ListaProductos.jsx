import React, { useEffect, useState } from "react";

function ListaProductos() {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/productos", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!res.ok) {
          throw new Error("Error al obtener productos");
        }
        const data = await res.json();
        setProductos(data);
      } catch (err) {
        console.error("Error al obtener productos:", err);
        setError("No se pudieron cargar los productos");
      }
    };

    obtenerProductos();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Lista de Productos</h2>
      {error && <p className="text-red-500">{error}</p>}

      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Nombre</th>
            <th className="p-2 border">Descripción</th>
            <th className="p-2 border">Precio</th>
            <th className="p-2 border">Stock</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id_producto}>
              <td className="p-2 border">{producto.id_producto}</td>
              <td className="p-2 border">{producto.nombre}</td>
              <td className="p-2 border">{producto.descripcion}</td>
              <td className="p-2 border">${producto.precio}</td>
              <td className="p-2 border">{producto.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListaProductos;
