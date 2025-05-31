import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaTag,
  FaChevronRight,
  FaShoppingCart,
  FaClock,
  FaStar,
  FaFire,
} from "react-icons/fa";
import { useCurrency } from "../CurrencyContext";
import { toast } from "react-toastify";

const OfertasDestacadas = () => {
  const navigate = useNavigate();
  const [cargando, setCargando] = useState(true);
  const { currency, formatPrice, getCurrencySymbol } = useCurrency();

  const OFERTAS = [
    {
      id: 1,
      imagen: "https://via.placeholder.com/200",
      imagenes: [
        "https://via.placeholder.com/200",
        "https://via.placeholder.com/200/0000FF",
        "https://via.placeholder.com/200/FF0000",
      ],
      titulo: "Smartwatch último modelo",
      precioOriginal: 3999,
      precioOferta: 2499,
      descuento: 38,
      tiempoRestante: "2 días",
      stock: 5,
      categoria: "Electrónicos",
      calificacion: 4.5,
      especificaciones: {
        pantalla: "AMOLED 1.4''",
        bateria: "7 días",
        resistencia: "IP68",
        color: "Negro",
      },
      descripcion: "Smartwatch con monitor de ritmo cardíaco y GPS integrado.",
      envioGratis: true,
      garantia: "12 meses",
      devolucion: "30 días",
    },
    {
      id: 2,
      imagen: "https://via.placeholder.com/200",
      imagenes: [
        "https://via.placeholder.com/200",
        "https://via.placeholder.com/200/FFFF00",
      ],
      titulo: "Audífonos inalámbricos premium",
      precioOriginal: 1899,
      precioOferta: 999,
      descuento: 47,
      tiempoRestante: "12 horas",
      stock: 8,
      categoria: "Audio",
      calificacion: 5.0,
      especificaciones: {
        tipo: "Inalámbrico",
        bateria: "30 horas",
        cancelacionRuido: true,
        color: "Blanco",
      },
      descripcion:
        "Audífonos con cancelación activa de ruido y sonido premium.",
      envioGratis: true,
      garantia: "12 meses",
      devolucion: "30 días",
    },
    {
      id: 3,
      imagen: "https://via.placeholder.com/200",
      imagenes: [
        "https://via.placeholder.com/200",
        "https://via.placeholder.com/200/00FF00",
      ],
      titulo: "Cámara deportiva 4K resistente al agua",
      precioOriginal: 4599,
      precioOferta: 2999,
      descuento: 35,
      tiempoRestante: "3 días",
      stock: 3,
      categoria: "Cámaras",
      calificacion: 4.2,
      especificaciones: {
        resolucion: "4K 60fps",
        resistencia: "10m",
        bateria: "2 horas",
        peso: "120g",
      },
      descripcion:
        "Cámara deportiva para capturar tus aventuras en alta calidad.",
      envioGratis: false,
      garantia: "6 meses",
      devolucion: "15 días",
    },
    {
      id: 4,
      imagen: "https://via.placeholder.com/200",
      imagenes: [
        "https://via.placeholder.com/200",
        "https://via.placeholder.com/200/FF00FF",
      ],
      titulo: "Zapatos deportivos ultralivianos",
      precioOriginal: 1299,
      precioOferta: 799,
      descuento: 40,
      tiempoRestante: "1 día",
      stock: 12,
      categoria: "Deportes",
      calificacion: 4.7,
      especificaciones: {
        material: "Malla transpirable",
        peso: "220g",
        tallas: "22-30",
        color: "Azul/Negro",
      },
      descripcion:
        "Zapatos ideales para correr con máxima comodidad y ligereza.",
      envioGratis: true,
      garantia: "3 meses",
      devolucion: "15 días",
    },
  ];

  useEffect(() => {
    // Simulación de carga de datos
    setTimeout(() => {
      setCargando(false);
    }, 800);
  }, []);

  const verDetalleProducto = (productoId) => {
    const producto = OFERTAS.find((p) => p.id === productoId);
    if (!producto) {
      console.error("Producto no encontrado");
      return;
    }
    navigate(`/VerArticulo/${productoId}`, {
      state: {
        producto: {
          id: producto.id,
          titulo: producto.titulo,
          precio: producto.precioOferta,
          precioOriginal: producto.precioOriginal,
          descuento: producto.descuento,
          calificacion: producto.calificacion,
          numCalificaciones: Math.floor(Math.random() * 1000) + 100, // Valor aleatorio para ejemplo
          stock: producto.stock,
          vendidoPor: "Tienda Oficial",
          verificado: true,
          envioGratis: producto.envioGratis,
          full: true,
          garantia: producto.garantia,
          devolucion: producto.devolucion,
          imagenes: producto.imagenes,
          especificaciones: producto.especificaciones,
          descripcion: producto.descripcion,
          categoria: producto.categoria,
        },
      },
    });
  };

  const agregarAlCarrito = (productoId) => {
    const producto = OFERTAS.find((p) => p.id === productoId);
    toast.success(`✅ ${producto.titulo} agregado al carrito`);
  };

  const EstrellaCalificacion = ({ calificacion }) => {
    const calif = Math.round(calificacion * 10) / 10;
    return (
      <div className="flex items-center mb-2">
        <div className="flex text-yellow-400 mr-1">
          {[1, 2, 3, 4, 5].map((estrella) => (
            <FaStar
              key={estrella}
              className={
                calif >= estrella
                  ? "text-yellow-400"
                  : calif >= estrella - 0.5
                  ? "text-yellow-300"
                  : "text-gray-300"
              }
              size={14}
            />
          ))}
        </div>
        <span className="text-sm text-gray-600">{calif}</span>
      </div>
    );
  };

  if (cargando) {
    return (
      <section className="py-2 bg-gradient-to-br rounded-2xl shadow-sm my-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <div className="mr-4 bg-red-500 text-white p-2 rounded-lg">
                <FaTag size={24} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                OFERTAS DESTACADAS
              </h2>
            </div>
          </div>
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
            <span className="ml-3 text-gray-600">Cargando ofertas...</span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-2 bg-gradient-to-br rounded-2xl shadow-sm my-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <div className="mr-4 bg-red-500 text-white p-2 rounded-lg">
              <FaTag size={24} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              OFERTAS DESTACADAS
            </h2>
          </div>
          <button className="text-blue-600 font-medium hover:text-blue-800 flex items-center">
            Ver todas <FaChevronRight className="ml-1" size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {OFERTAS.map((oferta) => (
            <div
              key={oferta.id}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300"
            >
              <div
                className="relative cursor-pointer"
                onClick={() => verDetalleProducto(oferta.id)}
              >
                <span className="absolute top-3 left-3 bg-red-500 text-white text-sm font-bold px-2 py-1 rounded-lg z-10">
                  -{oferta.descuento}%
                </span>
                {oferta.stock < 6 && (
                  <span className="absolute top-3 right-3 bg-orange-500 text-white text-xs px-2 py-1 rounded-full z-10">
                    ¡Solo {oferta.stock} disponibles!
                  </span>
                )}
                <div className="h-48 overflow-hidden bg-gray-100 flex items-center justify-center">
                  <img
                    src={oferta.imagen}
                    alt={oferta.titulo}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>

              <div
                className="p-4 cursor-pointer"
                onClick={() => verDetalleProducto(oferta.id)}
              >
                <div className="text-xs text-blue-600 font-medium mb-1">
                  {oferta.categoria}
                </div>
                <h3 className="font-medium text-gray-800 mb-2 line-clamp-2 h-12 hover:text-blue-600 transition-colors">
                  {oferta.titulo}
                </h3>
                <EstrellaCalificacion calificacion={oferta.calificacion} />
                <div className="flex items-end mb-3">
                  <span className="text-xl font-bold text-gray-800 mr-2">
                    {formatPrice(oferta.precioOferta)}
                  </span>
                  <span className="text-sm text-gray-500 line-through">
                    {formatPrice(oferta.precioOriginal)}
                  </span>
                </div>
                <div className="flex items-center text-xs text-gray-500 mb-4">
                  <FaClock className="mr-1" />
                  <span>Termina en: {oferta.tiempoRestante}</span>
                </div>
                <button
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    agregarAlCarrito(oferta.id);
                  }}
                >
                  <FaShoppingCart className="mr-2" />
                  Agregar al carrito
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OfertasDestacadas;
