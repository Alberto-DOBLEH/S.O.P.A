import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaStar, FaFire, FaChevronRight, FaShoppingCart } from "react-icons/fa";
import { BsPatchCheck } from "react-icons/bs";
import { useCurrency } from "../CurrencyContext";
import { toast } from "react-toastify";

const ArticulosMasVendidos = () => {
  const [masVendidos, setMasVendidos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [carrito, setCarrito] = useState([]);
  const navigate = useNavigate();
  const { currency, formatPrice, changeCurrency, availableCurrencies } =
    useCurrency();

  const DATOS_EJEMPLO_MAS_VENDIDOS = [
    {
      id: "1",
      imagen: "https://via.placeholder.com/200",
      imagenes: [
        "https://via.placeholder.com/200",
        "https://via.placeholder.com/200/0000FF",
        "https://via.placeholder.com/200/FF0000",
      ],
      titulo: "Auriculares Bluetooth con cancelación de ruido",
      precio: 1299,
      precioOriginal: 1499,
      descuento: 13,
      calificacion: 4.8,
      numeroVentas: 1243,
      etiquetas: ["Tendencia", "Envío Gratis"],
      vendedor: "AudioPro México",
      verificado: true,
      categoria: "Audio",
      stock: 50,
      envioGratis: true,
      full: false,
      garantia: "12 meses",
      devolucion: "30 días",
      especificaciones: {
        tipo: "Inalámbrico",
        bateria: "20 horas",
        conectividad: "Bluetooth 5.0",
        color: "Negro",
      },
      descripcion:
        "Auriculares Bluetooth de alta calidad con cancelación activa de ruido, ideales para música y llamadas.",
    },
    {
      id: "2",
      imagen: "https://via.placeholder.com/200",
      imagenes: [
        "https://via.placeholder.com/200",
        "https://via.placeholder.com/200/FFFF00",
      ],
      titulo: "Tenis deportivos",
      precio: 999,
      precioOriginal: 1199,
      descuento: 16,
      calificacion: 5.0,
      numeroVentas: 1000,
      etiquetas: ["Tendencia", "Envío Gratis"],
      vendedor: "Adeudo México",
      verificado: true,
      categoria: "Calzado",
      stock: 30,
      envioGratis: true,
      full: false,
      garantia: "6 meses",
      devolucion: "15 días",
      especificaciones: {
        material: "Sintético",
        talla: "25-30 MX",
        color: "Blanco",
      },
      descripcion:
        "Tenis cómodos y duraderos, perfectos para actividades deportivas.",
    },
    {
      id: "3",
      imagen: "https://via.placeholder.com/200",
      imagenes: [
        "https://via.placeholder.com/200",
        "https://via.placeholder.com/200/00FF00",
      ],
      titulo: "Tenis semi originales Zona 30",
      precio: 1500,
      precioOriginal: 1800,
      descuento: 17,
      calificacion: 4.0,
      numeroVentas: 1243,
      etiquetas: ["Tendencia", "Envío Gratis"],
      vendedor: "Mike México",
      verificado: true,
      categoria: "Calzado",
      stock: 20,
      envioGratis: true,
      full: false,
      garantia: "6 meses",
      devolucion: "15 días",
      especificaciones: {
        material: "Cuero sintético",
        talla: "26-29 MX",
        color: "Negro",
      },
      descripcion: "Tenis de diseño moderno con gran comodidad.",
    },
    {
      id: "4",
      imagen: "https://via.placeholder.com/200",
      imagenes: [
        "https://via.placeholder.com/200",
        "https://via.placeholder.com/200/FF00FF",
      ],
      titulo: "Juguete Tralalero Tralala",
      precio: 3000,
      precioOriginal: 3500,
      descuento: 14,
      calificacion: 5.0,
      numeroVentas: 10000,
      etiquetas: ["Tendencia", "Envío Gratis"],
      vendedor: "Bain Rot Italiano",
      verificado: true,
      categoria: "Juguetes",
      stock: 100,
      envioGratis: true,
      full: true,
      garantia: "12 meses",
      devolucion: "30 días",
      especificaciones: {
        tipo: "Interactivo",
        edad: "3+ años",
        material: "Plástico",
      },
      descripcion:
        "Juguete interactivo que estimula la creatividad de los niños.",
    },
  ];

  useEffect(() => {
    const obtenerProductosMasVendidos = async () => {
      try {
        setCargando(true);
        setTimeout(() => {
          setMasVendidos(DATOS_EJEMPLO_MAS_VENDIDOS);
          setCargando(false);
        }, 1000);
      } catch (err) {
        console.error("Error:", err);
        setError("Error al cargar productos");
        setMasVendidos(DATOS_EJEMPLO_MAS_VENDIDOS);
        setCargando(false);
      }
    };
    obtenerProductosMasVendidos();
  }, []);

  const agregarAlCarrito = (productoId) => {
    const producto = masVendidos.find((p) => p.id === productoId);
    setCarrito((prev) => {
      const existe = prev.find((item) => item.id === productoId);
      if (existe) {
        return prev.map((item) =>
          item.id === productoId
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
    toast.success(`✅ ${producto.titulo} agregado al carrito`);
  };

  const verDetalleProducto = (productoId) => {
    const producto = masVendidos.find((p) => p.id === productoId);
    if (!producto) {
      console.error("Producto no encontrado");
      return;
    }
    navigate(`/VerArticulo/${productoId}`, {
      state: {
        producto: {
          id: producto.id,
          titulo: producto.titulo,
          precio: producto.precio,
          precioOriginal: producto.precioOriginal || producto.precio,
          descuento: producto.descuento || 0,
          calificacion: producto.calificacion || 0,
          numCalificaciones: producto.numeroVentas || 0,
          stock: producto.stock || 10,
          vendidoPor: producto.vendedor || "Desconocido",
          verificado: producto.verificado || false,
          envioGratis: producto.etiquetas?.includes("Envío Gratis") || false,
          full: producto.full || false,
          garantia: producto.garantia || "Sin garantía",
          devolucion: producto.devolucion || "Sin devoluciones",
          imagenes: producto.imagenes || [producto.imagen],
          especificaciones: producto.especificaciones || {},
          descripcion: producto.descripcion || "Sin descripción disponible",
          categoria: producto.categoria || "Sin categoría",
        },
      },
    });
  };

  const handleCompraRapida = (productoId) => {
    const producto = masVendidos.find((p) => p.id === productoId);
    agregarAlCarrito(productoId);
    navigate("/checkout", {
      state: {
        productos: [
          {
            id: producto.id,
            titulo: producto.titulo,
            precio: producto.precio,
            cantidad: 1,
            imagenes: producto.imagenes || [producto.imagen],
          },
        ],
        modoCompraRapida: true,
      },
    });
  };

  const formatearNumeroVentas = (numero) => {
    return numero >= 1000
      ? `${(numero / 1000).toFixed(1)}K vendidos`
      : `${numero} vendidos`;
  };

  const EstrellaCalificacion = ({ calificacion }) => {
    const calif = Math.round(calificacion * 10) / 10;
    return (
      <div className="flex items-center">
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
              <div className="mr-4 bg-orange-500 text-white p-2 rounded-lg">
                <FaFire size={24} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                ARTÍCULOS MÁS VENDIDOS
              </h2>
            </div>
          </div>
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
            <span className="ml-3 text-gray-600">Cargando productos...</span>
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
            <div className="mr-4 bg-orange-500 text-white p-2 rounded-lg">
              <FaFire size={24} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              ARTÍCULOS MÁS VENDIDOS
            </h2>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={currency}
              onChange={(e) => changeCurrency(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {availableCurrencies.map((curr) => (
                <option key={curr.code} value={curr.code}>
                  {curr.name} ({curr.symbol})
                </option>
              ))}
            </select>
            <button className="text-blue-600 font-medium hover:text-blue-800 flex items-center">
              Ver todos <FaChevronRight className="ml-1" size={14} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {masVendidos.map((producto) => (
            <div
              key={producto.id}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300"
            >
              <div
                className="relative cursor-pointer"
                onClick={() => verDetalleProducto(producto.id)}
              >
                {producto.etiquetas?.length > 0 && (
                  <div className="absolute top-3 left-3 z-10 flex flex-wrap gap-2">
                    {producto.etiquetas.map((etiqueta, idx) => (
                      <span
                        key={idx}
                        className={`text-white text-xs font-bold px-2 py-1 rounded-lg ${
                          etiqueta === "Tendencia"
                            ? "bg-purple-500"
                            : etiqueta === "Oferta"
                            ? "bg-red-500"
                            : etiqueta === "Envío Gratis"
                            ? "bg-green-500"
                            : "bg-gray-500"
                        }`}
                      >
                        {etiqueta}
                      </span>
                    ))}
                  </div>
                )}
                <span className="absolute top-3 right-3 bg-orange-500 text-white text-xs px-2 py-1 rounded-full z-10">
                  {formatearNumeroVentas(producto.numeroVentas)}
                </span>
                <div className="h-48 overflow-hidden bg-gray-100 flex items-center justify-center">
                  <img
                    src={producto.imagen}
                    alt={producto.titulo}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>

              <div
                className="p-4 cursor-pointer"
                onClick={() => verDetalleProducto(producto.id)}
              >
                <div className="text-xs text-blue-600 font-medium mb-1">
                  {producto.categoria}
                </div>
                <h3 className="font-medium text-gray-800 mb-2 line-clamp-2 h-12 hover:text-blue-600 transition-colors">
                  {producto.titulo}
                </h3>
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <span className="mr-1">{producto.vendedor}</span>
                  {producto.verificado && (
                    <BsPatchCheck
                      className="text-blue-500"
                      size={16}
                      title="Vendedor verificado"
                    />
                  )}
                </div>
                <EstrellaCalificacion calificacion={producto.calificacion} />

                <div className="mt-3 mb-4 flex justify-between items-center">
                  <span className="text-xl font-bold text-gray-800">
                    {formatPrice(producto.precio)}
                  </span>
                  {producto.precioOriginal && (
                    <span className="ml-2 text-sm text-gray-500 line-through">
                      {formatPrice(producto.precioOriginal)}
                    </span>
                  )}
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCompraRapida(producto.id);
                    }}
                    className="ml-2 bg-green-600 hover:bg-green-700 text-white py-1 px-3 rounded-lg text-sm font-medium transition-colors duration-200"
                  >
                    Comprar Ya
                  </button>
                  {producto.descuento > 0 && (
                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      -{producto.descuento}%
                    </span>
                  )}
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    agregarAlCarrito(producto.id);
                  }}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center mt-2"
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

export default ArticulosMasVendidos;
