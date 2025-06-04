import React, { useState, useEffect } from "react";
import {
  Package,
  User,
  MapPin,
  Calendar,
  CreditCard,
  Truck,
  CheckCircle,
} from "lucide-react";
import Header from "../components/Heaader";
import Footer from "../components/Footer";
import { use } from "react";
import { backgroundImage } from "../assets/imagenes/imagenes";
const Historial = () => {
  const [pedidos, setPedidos] = useState([]);
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);
  const [mostrarDetalle, setMostrarDetalle] = useState(false);

  const cargarPedidos = async () => {
    try {
      const idusuario = localStorage.getItem("idusuario");
      const response = await fetch(
        `http://localhost:3001/api/ventas/usuario/${idusuario}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Error al cargar los pedidos");
      }

      const data = await response.json();

      const datosprocesados = data.map((item) => ({
        ...item,
        total: parseFloat(item.total), // convierte el string a número decimal
      }));

      setPedidos(datosprocesados);
    } catch (error) {
      console.error("Error al cargar los pedidos:", error);
    }
  };

  useEffect(() => {
    cargarPedidos();
  }, []);

  // Productos de ejemplo
  const productosEjemplo = [
    {
      nombre: "Auriculares Bluetooth Premium",
      precio: 1250.0,
      categoria: "Electrónicos",
    },
    { nombre: "Tablet Android Pro", precio: 3500.0, categoria: "Electrónicos" },
    {
      nombre: "Sillas Ergonómicas Oficina",
      precio: 2800.0,
      categoria: "Muebles",
    },
    { nombre: "Mesa de Centro Moderna", precio: 1850.0, categoria: "Muebles" },
    {
      nombre: "Lámpara LED Inteligente",
      precio: 650.0,
      categoria: "Iluminación",
    },
    { nombre: "Set de Cocina Premium", precio: 4200.0, categoria: "Hogar" },
    { nombre: "Sofá 3 Plazas Luxury", precio: 8500.0, categoria: "Muebles" },
    {
      nombre: "Smart TV 55 Pulgadas",
      precio: 6800.0,
      categoria: "Electrónicos",
    },
  ];

  const estados = ["Pendiente", "Procesando", "Enviado", "Entregado"];
  const clientes = [
    "Juan Pérez",
    "María González",
    "Carlos López",
    "Ana Martínez",
    "Luis Rodríguez",
  ];

  // Generar pedido aleatorio
  const generarPedido = () => {
    const productosSeleccionados = [];
    const numProductos = Math.floor(Math.random() * 3) + 1;

    for (let i = 0; i < numProductos; i++) {
      const producto =
        productosEjemplo[Math.floor(Math.random() * productosEjemplo.length)];
      const cantidad = Math.floor(Math.random() * 3) + 1;
      productosSeleccionados.push({ ...producto, cantidad });
    }

    const total = productosSeleccionados.reduce(
      (sum, item) => sum + item.precio * item.cantidad,
      0
    );
    const fechaBase = new Date();
    fechaBase.setDate(fechaBase.getDate() - Math.floor(Math.random() * 30));

    return {
      id: `#${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      fecha: fechaBase.toISOString().split("T")[0],
      cliente: clientes[Math.floor(Math.random() * clientes.length)],
      productos: productosSeleccionados,
      total: total,
      estado: estados[Math.floor(Math.random() * estados.length)],
      direccion: `Calle ${Math.floor(Math.random() * 500)} #${Math.floor(
        Math.random() * 100
      )}, Culiacán, Sinaloa`,
      email: "cliente@example.com",
    };
  };

  const getEstadoColor = (estado) => {
    switch (estado) {
      case "Pendiente":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Procesando":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Enviado":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "Entregado":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const verDetalle = (pedido) => {
    setPedidoSeleccionado(pedido);
    setMostrarDetalle(true);
  };

  const cerrarDetalle = () => {
    setMostrarDetalle(false);
    setPedidoSeleccionado(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="absolute inset-0 flex justify-center opacity-10 pointer-events-none">
        <img
          src={backgroundImage}
          alt="Flor decorativa de fondo"
          className="absolute left-0 w-1/3 md:w-1/4"
          loading="lazy"
        />
      </div>

      {/* Header estilo SOFA */}
      <Header />
      {/* Navegación */}
      <nav className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-3">
          <div className="flex space-x-8 text-sm">
            <span className="text-blue-600 font-medium border-b-2 border-blue-600 pb-2">
              Historial de Pedidos
            </span>
            <span className="text-gray-500 hover:text-gray-700 cursor-pointer">
              Mi Cuenta
            </span>
            <span className="text-gray-500 hover:text-gray-700 cursor-pointer">
              Favoritos
            </span>
            <span className="text-gray-500 hover:text-gray-700 cursor-pointer">
              Cupones
            </span>
          </div>
        </div>
      </nav>
      <div className="container mx-auto px-6 py-8">
        {/* Título de sección */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Mi Perfil</h2>
          <div className="flex items-center space-x-4 text-gray-600">
            <Package className="w-5 h-5" />
            <span className="text-lg font-medium">Historial de Pedidos</span>
          </div>
        </div>

        {/* Lista de pedidos */}
        <div className="space-y-4">
          {pedidos.map((pedido, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-gray-800">
                        Pedido {pedido.id}
                      </span>
                      <span className="text-gray-500">-</span>
                      <span className="text-gray-600">{pedido.fecha}</span>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium border ${getEstadoColor(
                      pedido.estado
                    )}`}
                  >
                    {pedido.estado}
                  </span>
                </div>

                <div className="mb-4">
                  <p className="text-gray-700 mb-2">
                    {pedido.productos.length > 1
                      ? `${pedido.productos[0].nombre} (+${
                          pedido.productos.length - 1
                        } más)`
                      : pedido.productos[0].nombre}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-gray-800">
                    ${pedido.total.toFixed(2)}
                  </div>
                  <button
                    onClick={() => verDetalle(pedido)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                  >
                    Ver Detalles
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Modal de detalle */}
      {mostrarDetalle && pedidoSeleccionado && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-800">
                  Detalle del Pedido
                </h3>
                <button
                  onClick={cerrarDetalle}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Info básica */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Número de Pedido
                  </label>
                  <p className="text-lg font-bold text-gray-800">
                    {pedidoSeleccionado.id}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Fecha
                  </label>
                  <p className="text-lg text-gray-800">
                    {pedidoSeleccionado.fecha}
                  </p>
                </div>
              </div>

              {/* Cliente */}
              {pedidoSeleccionado.cliente && (
                <div className="border-t pt-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <User className="w-5 h-5 text-blue-600" />
                    <h4 className="font-semibold text-gray-800">
                      Información del Cliente
                    </h4>
                  </div>
                  <p className="text-gray-700">{pedidoSeleccionado.cliente}</p>
                  <p className="text-gray-600">{pedidoSeleccionado.email}</p>
                </div>
              )}

              {/* Dirección */}
              {pedidoSeleccionado.direccion && (
                <div className="border-t pt-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <h4 className="font-semibold text-gray-800">
                      Dirección de Entrega
                    </h4>
                  </div>
                  <p className="text-gray-700">
                    {pedidoSeleccionado.direccion}
                  </p>
                </div>
              )}

              {/* Productos */}
              <div className="border-t pt-4">
                <div className="flex items-center space-x-3 mb-4">
                  <Package className="w-5 h-5 text-blue-600" />
                  <h4 className="font-semibold text-gray-800">Productos</h4>
                </div>
                <div className="space-y-3">
                  {pedidoSeleccionado.productos.map((producto, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center bg-gray-50 p-3 rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-gray-800">
                          {producto.nombre}
                        </p>
                        <p className="text-sm text-gray-600">
                          Cantidad: {producto.cantidad}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-800">
                          $
                          {(
                            producto.precio_unitario * producto.cantidad
                          ).toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-600">
                          ${producto.precio_unitario.toFixed(2)} c/u
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total */}
              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-semibold text-gray-800">
                    Total del Pedido:
                  </span>
                  <span className="text-2xl font-bold text-blue-600">
                    ${pedidoSeleccionado.total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Estado */}
              <div className="border-t pt-4">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-800">
                    Estado Actual:
                  </span>
                  <span
                    className={`px-4 py-2 rounded-full font-medium border ${getEstadoColor(
                      pedidoSeleccionado.estado
                    )}`}
                  >
                    {pedidoSeleccionado.estado}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Historial;
