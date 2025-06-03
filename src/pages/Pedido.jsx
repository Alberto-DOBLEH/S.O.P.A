import React, { useState, useEffect } from "react";
import {
  Package,
  Truck,
  MapPin,
  Clock,
  CheckCircle,
  User,
  Phone,
} from "lucide-react";
import Header from "../components/Heaader";
import Footer from "../components/Footer";

const Pedido = () => {
  const [pedido, setPedido] = useState(null);
  const [estadoActual, setEstadoActual] = useState(0);
  const [tiempoRestante, setTiempoRestante] = useState("25-35");

  // Datos del pedido simulado
  const pedidoEjemplo = {
    codigo: "PED-A7K9M2",
    fecha: "2025-06-01",
    cliente: "Juan Pérez",
    telefono: "+52 667 123 4567",
    productos: [
      { nombre: "Auriculares Bluetooth Premium", cantidad: 1, precio: 1250.0 },
      { nombre: "Tablet Android Pro", cantidad: 1, precio: 3500.0 },
    ],
    total: 4750.0,
    direccion: "Calle Constitución 123, Culiacán, Sinaloa 81893",
    repartidor: "Carlos Mendoza",
  };

  const etapas = [
    {
      titulo: "Pedido Confirmado",
      descripcion: "Tu pedido ha sido recibido y confirmado",
      hora: "14:20",
      completado: true,
    },
    {
      titulo: "Preparando Pedido",
      descripcion: "Estamos empaquetando tus productos",
      hora: "14:45",
      completado: true,
    },
    {
      titulo: "En Camino",
      descripcion: "El repartidor va hacia tu dirección",
      hora: "15:10",
      completado: false,
      actual: true,
    },
    {
      titulo: "Entregado",
      descripcion: "Tu pedido ha sido entregado",
      hora: "15:45",
      completado: false,
    },
  ];

  // Simular progreso del pedido
  useEffect(() => {
    setPedido(pedidoEjemplo);

    const interval = setInterval(() => {
      const minutos = Math.floor(Math.random() * 10) + 20;
      setTiempoRestante(`${minutos}-${minutos + 10}`);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const generarNuevoPedido = () => {
    const nuevoCodigo = `PED-${Math.random()
      .toString(36)
      .substring(2, 8)
      .toUpperCase()}`;
    const nuevoPedido = {
      ...pedidoEjemplo,
      codigo: nuevoCodigo,
      fecha: new Date().toISOString().split("T")[0],
    };
    setPedido(nuevoPedido);
    setEstadoActual(Math.floor(Math.random() * 3));
  };

  if (!pedido) return <div>Cargando...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header estilo SOFA */}
      <Header />

      <div className="container mx-auto px-6 py-8 max-w-4xl">
        {/* Título principal */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Seguimiento de Pedido
          </h2>
          <p className="text-gray-600">
            Código:{" "}
            <span className="font-mono font-bold text-blue-600">
              {pedido.codigo}
            </span>
          </p>
        </div>

        {/* Ventana principal de seguimiento */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          {/* Estado actual destacado */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-8 text-center">
            <div className="flex items-center justify-center mb-4">
              <Truck className="w-12 h-12" />
            </div>
            <h3 className="text-2xl font-bold mb-2">
              ¡Tu pedido va en camino!
            </h3>
            <p className="text-lg opacity-90">
              Tiempo estimado de llegada: {tiempoRestante} minutos
            </p>
            <div className="mt-4 bg-white bg-opacity-20 rounded-full px-4 py-2 inline-block">
              <p className="text-sm font-medium">
                Repartidor: {pedido.repartidor}
              </p>
            </div>
          </div>

          {/* Mapa simulado */}
          <div className="bg-gradient-to-br from-blue-100 to-green-100 h-48 flex items-center justify-center border-b">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <p className="text-gray-700 font-medium">
                Ubicación del Repartidor
              </p>
              <p className="text-sm text-gray-600">A 2.3 km de tu dirección</p>
            </div>
          </div>

          {/* Progreso del pedido */}
          <div className="p-8">
            <h4 className="text-xl font-bold text-gray-800 mb-6">
              Estado del Pedido
            </h4>
            <div className="space-y-6">
              {etapas.map((etapa, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    {etapa.completado ? (
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-6 h-6 text-white" />
                      </div>
                    ) : etapa.actual ? (
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center animate-pulse">
                        <Clock className="w-6 h-6 text-white" />
                      </div>
                    ) : (
                      <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                        <div className="w-4 h-4 bg-white rounded-full"></div>
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h5
                        className={`font-semibold ${
                          etapa.actual
                            ? "text-blue-600"
                            : etapa.completado
                            ? "text-green-600"
                            : "text-gray-500"
                        }`}
                      >
                        {etapa.titulo}
                      </h5>
                      <span className="text-sm text-gray-500">
                        {etapa.hora}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mt-1">
                      {etapa.descripcion}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Información del pedido */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Detalles de entrega */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
              <MapPin className="w-5 h-5 text-blue-600 mr-2" />
              Dirección de Entrega
            </h4>
            <p className="text-gray-700 mb-3">{pedido.direccion}</p>
            <div className="flex items-center text-gray-600">
              <Phone className="w-4 h-4 mr-2" />
              <span className="text-sm">{pedido.telefono}</span>
            </div>
          </div>

          {/* Resumen del pedido */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
              <Package className="w-5 h-5 text-blue-600 mr-2" />
              Productos
            </h4>
            <div className="space-y-3">
              {pedido.productos.map((producto, idx) => (
                <div key={idx} className="flex justify-between text-sm">
                  <span className="text-gray-700">
                    {producto.nombre} x{producto.cantidad}
                  </span>
                  <span className="font-medium">
                    ${producto.precio.toFixed(2)}
                  </span>
                </div>
              ))}
              <div className="border-t pt-3 flex justify-between font-bold">
                <span>Total:</span>
                <span className="text-blue-600">
                  ${pedido.total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Pedido;
