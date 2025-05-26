import React, { useContext, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  logoCompleto,
  backgroundImage,
  logoLetras,
} from "../assets/imagenes/imagenes";
import {
  dobleh2023,
  desaparecido,
  losFondo,
  alanSombrero,
  hotsale,
  Anuncio01,
  Anuncio02,
} from "../assets/imagenes/imagenesslider";
import { ChevronLeft, ChevronRight, LogOut } from "lucide-react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Login from "./Login"; // Importa tu componente Login existente
import { AuthContext } from "../context/AuthContext"; // Asegúrate de importar el contexto de autenticación
import { toast } from "react-toastify"; // Importa la librería de toast
// import { ICONS } from "../assets/iconos/iconos";
import {
  FaSearch,
  FaShoppingCart,
  FaUser,
  FaHeart,
  FaBell,
  FaHistory,
  FaStore,
  FaCreditCard,
  FaList,
  FaLock,
  FaEnvelope,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaShopify,
  FaTimes,
  // Nuevos iconos para las categorías
  FaMobile,
  FaKeyboard,
  FaLaptop,
  FaCamera,
  FaTv,
  FaHome,
  FaRunning,
  FaCar,
  FaGamepad,
  FaTshirt,
  FaShoePrints,
  FaChild,
  FaGuitar,
  FaBook,
  FaBaby,
  FaPaw,
  FaUtensils,
  FaBath,
  FaPlane,
  FaTree,
  FaDumbbell,
  FaGlassWhiskey,
  FaAppleAlt,
  FaGift,
  FaHeadphones,
  FaTabletAlt,
  FaDesktop,
  FaMousePointer,
} from "react-icons/fa";
import { IoMdHelp } from "react-icons/io";
import { RiCouponLine } from "react-icons/ri";
// Iconos correctos (ejemplos):
import {
  FaTag, // Ícono singular de etiqueta
  FaTags, // Ícono plural de etiquetas
  FaChevronRight, // Flecha derecha
  // FaShoppingCart, // Carrito de compras
  FaClock, // Reloj
  FaStar, // Añade esto
  FaFire, // Añade esto
  // Tus otros íconos FA aquí...
} from "react-icons/fa";
import axios from "axios"; // Para realizar peticiones a la API/BD
import { BsPatchCheck } from "react-icons/bs";
import Footer from "../components/Footer";
// CATEGORÍAS

const CATEGORIES = [
  { icon: <FaMobile size={36} />, label: "Smartphones", path: "/telefonos" },
  {
    icon: <FaKeyboard size={36} />,
    label: "Periféricos",
    path: "/perifericos",
  },
  { icon: <FaLaptop size={36} />, label: "Laptops", path: "/laptops" },
  { icon: <FaCamera size={36} />, label: "Cámaras", path: "/camaras" },
  { icon: <FaTv size={36} />, label: "Televisores", path: "/televisores" },
  { icon: <FaHome size={36} />, label: "Hogar", path: "/hogar" },
  { icon: <FaRunning size={36} />, label: "Deportes", path: "/deportes" },
  { icon: <FaCar size={36} />, label: "Vehículos", path: "/vehiculos" },
  { icon: <FaGamepad size={36} />, label: "Videojuegos", path: "/videojuegos" },
  { icon: <FaTshirt size={36} />, label: "Ropa", path: "/ropa" },
  { icon: <FaShoePrints size={36} />, label: "Zapatos", path: "/zapatos" },
  { icon: <FaChild size={36} />, label: "Juguetes", path: "/juguetes" },
  {
    icon: <FaGuitar size={36} />,
    label: "Instrumentos",
    path: "/instrumentos",
  },
  { icon: <FaBook size={36} />, label: "Libros", path: "/libros" },
  { icon: <FaBaby size={36} />, label: "Bebés", path: "/bebes" },
  { icon: <FaPaw size={36} />, label: "Mascotas", path: "/mascotas" },
  { icon: <FaUtensils size={36} />, label: "Cocina", path: "/cocina" },
  { icon: <FaBath size={36} />, label: "Baño", path: "/bano" },
  { icon: <FaPlane size={36} />, label: "Viajes", path: "/viajes" },
  { icon: <FaTree size={36} />, label: "Jardín", path: "/jardin" },
  { icon: <FaDumbbell size={36} />, label: "Fitness", path: "/fitness" },
  { icon: <FaGlassWhiskey size={36} />, label: "Bebidas", path: "/bebidas" },
  { icon: <FaAppleAlt size={36} />, label: "Alimentos", path: "/alimentos" },
  { icon: <FaGift size={36} />, label: "Regalos", path: "/regalos" },
  { icon: <FaHeadphones size={36} />, label: "Audio", path: "/audio" },
  { icon: <FaTabletAlt size={36} />, label: "Tablets", path: "/tablets" },
  {
    icon: <FaDesktop size={36} />,
    label: "Computadoras",
    path: "/computadoras",
  },
  { icon: <FaKeyboard size={36} />, label: "Teclados", path: "/teclados" },
  { icon: <FaMousePointer size={36} />, label: "Mouses", path: "/mouses" },
];
// ANUNCIOS
const ANUNCIOS = [
  {
    imagen: Anuncio01,
    alt: "Oferta de productos de oficina",
    tag: "FULL",
    tagColor: "bg-green-500",
    tagIcon: "⚡",
    badge: "ENVÍOS RÁPIDOS",
  },
  {
    imagen: Anuncio02,
    alt: "Ventiladores y productos para el calor",
    tag: "OFERTA",
    tagColor: "bg-red-500",
  },
  {
    imagen: losFondo,
    alt: "Productos para mascotas",
    tag: "NUEVO",
    tagColor: "bg-blue-500",
    badge: "20% DESCUENTO",
  },
  {
    imagen: alanSombrero,
    alt: "Sombreros",
    tag: "Sabor a Mexico",
    tagIcon: "🌮",
    tagColor: "bg-blue-500",
    badge: "CLICK YA!!",
  },
  {
    imagen: hotsale,
    alt: "Sombreros",
    tag: "Sabor a Mexico",
    tagIcon: "🌮",
    tagColor: "bg-blue-500",
    badge: "CLICK YA!!",
  },
];

const ArticulosMasVendidos = () => {
  // Estados para los productos
  const [masVendidos, setMasVendidos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // Estado para el carrito (ejemplo básico)
  const [carrito, setCarrito] = useState([]);
  const navigate = useNavigate();

  // Datos de ejemplo
  const DATOS_EJEMPLO_MAS_VENDIDOS = [
    {
      id: 1,
      imagen: "https://via.placeholder.com/200",
      titulo: "Auriculares Bluetooth con cancelación de ruido",
      precio: 1299,
      calificacion: 4.8,
      numeroVentas: 1243,
      etiquetas: ["Tendencia", "Envío Gratis"],
      vendedor: "AudioPro México",
      verificado: true,
      categoria: "Audio",
    },
    {
      id: 2,
      imagen: "https://via.placeholder.com/200",
      titulo: "No son orijiji",
      precio: 999,
      calificacion: 5.0,
      numeroVentas: 1000,
      etiquetas: ["Tendencia", "Envío Gratis"],
      vendedor: "Adeudo México",
      verificado: true,
      categoria: "Calzado",
    },
    {
      id: 3,
      imagen: "https://via.placeholder.com/200",
      titulo: "Tenis semi originales Zona 30",
      precio: 1500,
      calificacion: 4.0,
      numeroVentas: 1243,
      etiquetas: ["Tendencia", "Envío Gratis"],
      vendedor: "Mike México",
      verificado: true,
      categoria: "Calzado",
    },
    {
      id: 4,
      imagen: "https://via.placeholder.com/200",
      titulo: "Juguete Tralalero Tralala",
      precio: 3000,
      calificacion: 5.0,
      numeroVentas: 10000,
      etiquetas: ["Tendencia", "Envío Gratis"],
      vendedor: "Bain Rot Italiano",
      verificado: true,
      categoria: "Jueguete",
    },
    // ... otros productos de ejemplo
  ];

  // Efecto para cargar productos
  useEffect(() => {
    const obtenerProductosMasVendidos = async () => {
      try {
        setCargando(true);
        // En producción, reemplazar con tu endpoint real
        // const respuesta = await axios.get('/api/productos/mas-vendidos');
        // setMasVendidos(respuesta.data);

        // Usando datos de ejemplo para el demo
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

  // Función para agregar al carrito
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

    // Feedback visual (en una app real usarías un toast)
    console.log("Carrito actualizado:", carrito);
    alert(`✅ ${producto.titulo} agregado al carrito`);
  };

  // Función para ver detalle del producto - MEJORADA Y CORREGIDA
  const verDetalleProducto = (productoId) => {
    // Encuentra el producto en el array correspondiente
    const producto = masVendidos.find((p) => p.id === productoId);

    // Validación completa antes de navegar
    if (!producto) {
      console.error("Producto no encontrado");
      return;
    }

    navigate(`/VerArticulo/${productoId}`, {
      state: {
        producto: {
          ...producto,
          imagenes: producto.imagenes || [], // Asegura array de imágenes
          especificaciones: producto.especificaciones || {},
          titulo: producto.titulo || "Producto sin nombre",
          precio: producto.precio || 0,
        },
      },
    });
  };

  // Función para compra rápida
  const handleCompraRapida = (productoId) => {
    const producto = masVendidos.find((p) => p.id === productoId);

    // 1. Agrega al carrito
    agregarAlCarrito(productoId);

    // 2. Redirige a checkout
    navigate("/checkout", {
      state: {
        productos: [{ ...producto, cantidad: 1 }],
        modoCompraRapida: true,
      },
    });
  };

  // Formateadores
  const formatoPrecio = (precio) => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
      minimumFractionDigits: 0,
    }).format(precio);
  };

  const formatearNumeroVentas = (numero) => {
    return numero >= 1000
      ? `${(numero / 1000).toFixed(1)}K vendidos`
      : `${numero} vendidos`;
  };

  // Componente de estrellas
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

  // Renderizado condicional
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

  // Renderizado principal
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
          <button className="text-blue-600 font-medium hover:text-blue-800 flex items-center">
            Ver todos <FaChevronRight className="ml-1" size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {masVendidos.map((producto) => (
            <div
              key={producto.id}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300"
            >
              {/* Área de imagen - MEJORADA para navegación */}
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

              {/* Área de información - MEJORADA para navegación */}
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
                    {formatoPrecio(producto.precio)}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Detiene la propagación para que no se active verDetalleProducto
                      handleCompraRapida(producto.id);
                    }}
                    className="ml-2 bg-green-600 hover:bg-green-700 text-white py-1 px-3 rounded-lg text-sm font-medium transition-colors duration-200"
                  >
                    Comprar ya
                  </button>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Detiene la propagación para que no se active verDetalleProducto
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

const OfertasDestacadas = () => {
  const navigate = useNavigate();
  const [cargando, setCargando] = useState(true);

  // Componente de estrellas para calificación
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

  // Datos de ejemplo para ofertas destacadas
  const OFERTAS = [
    {
      id: 1,
      imagen: "https://via.placeholder.com/200",
      titulo: "Smartwatch último modelo",
      precioOriginal: 3999,
      precioOferta: 2499,
      descuento: 38,
      tiempoRestante: "2 días",
      stock: 5,
      categoria: "Electrónicos",
      calificacion: 4.5,
    },
    {
      id: 2,
      imagen: "https://via.placeholder.com/200",
      titulo: "Audífonos inalámbricos premium",
      precioOriginal: 1899,
      precioOferta: 999,
      descuento: 47,
      tiempoRestante: "12 horas",
      stock: 8,
      categoria: "Audio",
      calificacion: 5.0,
    },
    {
      id: 3,
      imagen: "https://via.placeholder.com/200",
      titulo: "Cámara deportiva 4K resistente al agua",
      precioOriginal: 4599,
      precioOferta: 2999,
      descuento: 35,
      tiempoRestante: "3 días",
      stock: 3,
      categoria: "Cámaras",
      calificacion: 4.2,
    },
    {
      id: 4,
      imagen: "https://via.placeholder.com/200",
      titulo: "Zapatos deportivos ultralivianos",
      precioOriginal: 1299,
      precioOferta: 799,
      descuento: 40,
      tiempoRestante: "1 día",
      stock: 12,
      categoria: "Deportes",
      calificacion: 4.7,
    },
  ];

  //   useEffect(() => {
  //   const obtenerProductosMasVendidos = async () => {
  //     try {
  //       setCargando(true);
  //       // En producción, reemplazar con tu endpoint real
  //       // const respuesta = await axios.get('/api/productos/mas-vendidos');
  //       // setMasVendidos(respuesta.data);

  //       // Usando datos de ejemplo para el demo
  //       setTimeout(() => {
  //         setMasVendidos(DATOS_EJEMPLO_MAS_VENDIDOS);
  //         setCargando(false);
  //       }, 1000);
  //     } catch (err) {
  //       console.error("Error:", err);
  //       setError("Error al cargar productos");
  //       setMasVendidos(DATOS_EJEMPLO_MAS_VENDIDOS);
  //       setCargando(false);
  //     }
  //   };

  //   obtenerProductosMasVendidos();
  // }, []);
  // Renderizado condicional
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
  // Función para formatear precios en formato de moneda mexicana
  const formatoPrecio = (precio) => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
      minimumFractionDigits: 0,
    }).format(precio);
  };

  // Función para ver detalle del producto - MEJORADA Y CORREGIDA
  const verDetalleProducto = (productoId) => {
    // Solo busca en OFERTAS ya que este componente solo maneja esos productos
    const producto = OFERTAS.find((p) => p.id === productoId);

    // Validación completa antes de navegar
    if (!producto) {
      console.error("Producto no encontrado");
      return;
    }

    navigate(`/VerArticulo/${productoId}`, {
      state: {
        producto: {
          ...producto,
          imagenes: producto.imagenes || [], // Asegura array de imágenes
          especificaciones: producto.especificaciones || {},
          titulo: producto.titulo || "Producto sin nombre",
          precio: producto.precio || 0,
        },
      },
    });
  };
  // Función para agregar al carrito
  const agregarAlCarrito = (productoId) => {
    const producto = OFERTAS.find((p) => p.id === productoId);
    alert(`✅ ${producto.titulo} agregado al carrito`);
    // Implementar lógica real de carrito aquí
  };

  return (
    <section className="py-2 bg-gradient-to-br rounded-2xl shadow-sm my-10">
      <div className="container mx-auto px-4">
        {/* Encabezado de la sección */}
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

        {/* Grid de ofertas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {OFERTAS.map((oferta) => (
            <div
              key={oferta.id}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300"
            >
              {/* Área de imagen - MEJORADA para navegación */}
              <div
                className="relative cursor-pointer"
                onClick={() => verDetalleProducto(oferta.id)}
              >
                <span className="absolute top-3 left-3 bg-red-500 text-white text-sm font-bold px-2 py-1 rounded-lg z-10">
                  -{oferta.descuento}%
                </span>

                {/* Badge de stock limitado si hay menos de 6 productos */}
                {oferta.stock < 6 && (
                  <span className="absolute top-3 right-3 bg-orange-500 text-white text-xs px-2 py-1 rounded-full z-10">
                    ¡Solo {oferta.stock} disponibles!
                  </span>
                )}

                {/* Imagen del producto */}
                <div className="h-48 overflow-hidden bg-gray-100 flex items-center justify-center">
                  <img
                    src={oferta.imagen}
                    alt={oferta.titulo}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>

              {/* Área de información - MEJORADA para navegación */}
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

                {/* Estrellas de calificación */}
                <EstrellaCalificacion calificacion={oferta.calificacion} />

                {/* Precios */}
                <div className="flex items-end mb-3">
                  <span className="text-xl font-bold text-gray-800 mr-2">
                    {formatoPrecio(oferta.precioOferta)}
                  </span>
                  <span className="text-sm text-gray-500 line-through">
                    {formatoPrecio(oferta.precioOriginal)}
                  </span>
                </div>

                {/* Temporizador */}
                <div className="flex items-center text-xs text-gray-500 mb-4">
                  <FaClock className="mr-1" />
                  <span>Termina en: {oferta.tiempoRestante}</span>
                </div>

                {/* Botón de compra */}
                <button
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center"
                  onClick={(e) => {
                    e.stopPropagation(); // Detiene la propagación para que no se active verDetalleProducto
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

const SLIDER_SETTINGS = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 5000,
  pauseOnHover: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: { slidesToShow: 1, slidesToScroll: 1 },
    },
    {
      breakpoint: 768,
      settings: { slidesToShow: 1, slidesToScroll: 1 },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: true,
      },
    },
  ],
};

const MainPage = ({ onLoginClick, userName = "Usuario" }) => {
  const [showOpciones, setShowOpciones] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const timeoutRef = useRef(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/buscar?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  const { logout } = useContext(AuthContext);

  const navigateTo = {
    home: () => navigate("/"),
    carrito: () => navigate("/carrito"),
    login: () => (onLoginClick ? onLoginClick() : navigate("/login")),
    perfil: () => navigate("/perfil"),
    favoritos: () => navigate("/lista-deseos"),
    notificaciones: () => navigate("/notificaciones"),
    historial: () => navigate("/historial-compras"),
    pedidos: () => navigate("/pedidos-activos"),
    tarjetas: () => navigate("/tarjeta"),
    cupones: () => navigate("/cupones"),
    listaDeseos: () => navigate("/lista-deseos"),
    listaCompras: () => navigate("/lista-compras"),
    ayuda: () => navigate("/ayuda"),
    privacidad: () => navigate("/privacidad"),
    soporte: () => navigate("/soporte"),
    configuracion: () => navigate("/configuracion"),
    venta: () => navigate("/venta"),
    verArticulo: () => navigate("/VerArticulo"),
    logout: () => {
      logout();
      toast.success("Sesión cerrada exitosamente", {
        toastId: "logout-exito",
      });
      navigate("/login");
    },
  };

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setShowOpciones(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setShowOpciones(false);
    }, 300);
  };

  const toggleMenu = () => {
    setShowOpciones(!showOpciones);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowOpciones(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const handleSearch = (e) => {
      e.preventDefault();
      if (searchTerm.trim()) {
        navigate(`/buscar?q=${encodeURIComponent(searchTerm.trim())}`);
      }
    };

    return (
      <form
        onSubmit={handleSearch}
        className="relative flex w-full max-w-3xl mx-auto"
      >
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-5 py-4 pl-14 pr-24 bg-white border-2 border-gray-200 rounded-full shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 text-lg placeholder-gray-400"
          placeholder="Buscar productos, marcas..."
        />
        <FaSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-2 rounded-full font-medium hover:from-blue-600 hover:to-blue-700 transition-all shadow-md"
        >
          Buscar
        </button>
      </form>
    );
  };

  const MenuSection = ({ title, children }) => (
    <div className="py-2 px-1">
      <h3 className="text-xs font-semibold text-gray-500 px-3 mb-2">{title}</h3>
      <div className="space-y-1">{children}</div>
    </div>
  );

  const MenuItem = ({ icon, text, onClick, className = "" }) => (
    <button
      onClick={onClick}
      className={`w-full flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-blue-50 rounded-md transition-colors duration-150 ${className}`}
    >
      <span className="flex-shrink-0">{icon}</span>
      <span className="text-sm">{text}</span>
    </button>
  );

  const Header = () => {
    const handleCarritoClick = () => {
      navigateTo.carrito();
      setShowOpciones(false);
    };
    const navigate = useNavigate(); // Asegúrate de inicializar navigate si no lo hiciste

    const [showOpciones, setShowOpciones] = useState(false); // 🔧 Estado faltante
    const [userName] = useState("Usuario Ejemplo");
    const menuRef = useRef(null); // 🔧 Referencia faltante
    // Funciones para manejar el menú de opciones
    const toggleMenu = () => setShowOpciones(!showOpciones);
    const handleMouseEnter = () => setShowOpciones(true);
    const handleMouseLeave = () => setShowOpciones(false);

    // Funciones de navegación actualizadas
    const navigateTo = {
      home: () => navigate("/"),
      carrito: () => navigate("/carrito"),
      cuenta: () => navigate("/mi-cuenta"),
      notificaciones: () => navigate("/notificaciones"),
      categoria: (path) => navigate(path),
      perfil: () => navigate("/mi-perfil"),
      favoritos: () => navigate("/favoritos"),
      venta: () => navigate("/venta"),
      historial: () => navigate("/historial-compras"),
      pedidos: () => navigate("/pedidos-activos"),
      tarjetas: () => navigate("/mis-tarjetas"),
      cupones: () => navigate("/cupones-promociones"),
      listaDeseos: () => navigate("/lista-deseos"),
      listaCompras: () => navigate("/lista-compras"),
      ayuda: () => navigate("/centro-ayuda"),
      privacidad: () => navigate("/privacidad-seguridad"),
      soporte: () => navigate("/contactar-soporte"),
      configuracion: () => navigate("/configuracion"),
      logout: () => navigate("/logout"),
    };

    // Componentes auxiliares para el menú
    const MenuSection = ({ title, children }) => (
      <div className="py-2">
        <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          {title}
        </h3>
        <div className="mt-1">{children}</div>
      </div>
    );

    const MenuItem = ({ icon, text, onClick, className = "" }) => (
      <button
        onClick={onClick}
        className={`w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 ${className}`}
      >
        <span className="mr-3">{icon}</span>
        {text}
      </button>
    );

    return (
      <header className="bg-[#cae8ff] border-b border-blue-200 shadow-md">
        <div className=" mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-full flex flex-col md:flex-row justify-between items-center py-4">
            {/* Logo en la esquina izquierda */}
            <div className="order-2 md:order-1 w-full md:w-auto flex justify-center md:justify-start">
              <div className="cursor-pointer" onClick={navigateTo.home}>
                <img src={logoCompleto} alt="SOAP Logo" className="w-36" />
              </div>
            </div>

            {/* Barra de búsqueda en el centro */}
            <div className="order-1 md:order-2 w-full md:max-w-3xl mx-0 md:mx-8 mb-4 md:mb-0">
              <SearchBar />
            </div>

            {/* Botones en la esquina derecha y con mayor separación */}
            <div className="order-3 md:order-3 flex items-center space-x-3">
              {" "}
              {/*B O T O N  C A R R I T O   D E   C O M P R A S */}
              <button
                // className="bg-white p-3 rounded-full text-blue-600 shadow-md transition-all duration-200 flex items-center justify-center relative hover:bg-[#edf6f9] hover:text-black"
                className="bg-blue-600 p-3.5 rounded-full text-white shadow-md transition-all duration-200 relative z-10 hover:bg-[#edf6f9] hover:text-blue-600"
                onClick={navigateTo.carrito}
                aria-label="Carrito de compras"
              >
                <FaShoppingCart className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                  0
                </span>
              </button>
              {/* B O T O N   L O G I N */}
              <button
                onClick={() => setShowLoginModal(true)}
                className="bg-blue-600 text-white px-8 py-2 rounded-full font-medium shadow-md transition-all duration-200 text-lg md:text-xl hover:bg-[#edf6f9] hover:text-blue-600 group"
              >
                <span>Login</span>
              </button>
              {/* B O T O N   M E N U */}
              <div
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  onClick={toggleMenu}
                  className="bg-blue-500 p-2 rounded-full text-white shadow-md transition-all duration-200 hover:bg-blue-400 flex flex-col items-center justify-center w-16 h-16"
                  aria-label="Menú de opciones"
                  aria-expanded={showOpciones}
                >
                  <FaBars className="w-6 h-6 mb-1" />
                  <span className="text-xs">Menú</span>
                </button>

                {showOpciones && (
                  <div
                    ref={menuRef}
                    className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl z-50 border border-gray-100 overflow-hidden"
                  >
                    <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-blue-100">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full mr-3 border border-blue-200 bg-blue-100 flex items-center justify-center shadow-sm">
                          <FaUser className="text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {userName}
                          </p>
                          <p className="text-xs text-gray-500">Comprador</p>
                        </div>
                      </div>
                    </div>

                    <div className="max-h-96 overflow-y-auto divide-y divide-gray-100">
                      <MenuSection title="Mi Cuenta">
                        <MenuItem
                          icon={<FaUser className="text-blue-500" />}
                          text="Mi perfil"
                          onClick={navigateTo.perfil}
                        />
                        <MenuItem
                          icon={<FaHeart className="text-red-500" />}
                          text="Favoritos"
                          onClick={navigateTo.favoritos}
                        />
                        <MenuItem
                          icon={<FaBell className="text-yellow-500" />}
                          text="Notificaciones"
                          onClick={navigateTo.notificaciones}
                        />
                        <MenuItem
                          icon={<FaShopify className="text-green-500" />}
                          text="Vender Artículo"
                          onClick={navigateTo.venta}
                        />
                      </MenuSection>

                      <MenuSection title="Mis Compras">
                        <MenuItem
                          icon={<FaShoppingCart className="text-blue-500" />}
                          text="Carrito de compras"
                          onClick={handleCarritoClick}
                        />
                        <MenuItem
                          icon={<FaHistory className="text-purple-500" />}
                          text="Historial de compras"
                          onClick={navigateTo.historial}
                        />
                        <MenuItem
                          icon={<FaStore className="text-indigo-500" />}
                          text="Pedidos activos"
                          onClick={navigateTo.pedidos}
                        />
                      </MenuSection>

                      <MenuSection title="Métodos de Pago">
                        <MenuItem
                          icon={<FaCreditCard className="text-gray-700" />}
                          text="Mis tarjetas"
                          onClick={navigateTo.tarjetas}
                        />
                        <MenuItem
                          icon={<RiCouponLine className="text-orange-500" />}
                          text="Cupones y promociones"
                          onClick={navigateTo.cupones}
                        />
                      </MenuSection>

                      <MenuSection title="Mis Listas">
                        <MenuItem
                          icon={<FaList className="text-teal-500" />}
                          text="Lista de deseos"
                          onClick={navigateTo.listaDeseos}
                        />
                        <MenuItem
                          icon={<FaList className="text-blue-500" />}
                          text="Lista de compras"
                          onClick={navigateTo.listaCompras}
                        />
                      </MenuSection>

                      <MenuSection title="Ayuda y Configuración">
                        <MenuItem
                          icon={<IoMdHelp className="text-blue-500" />}
                          text="Centro de ayuda"
                          onClick={navigateTo.ayuda}
                        />
                        <MenuItem
                          icon={<FaLock className="text-gray-700" />}
                          text="Privacidad y seguridad"
                          onClick={navigateTo.privacidad}
                        />
                        <MenuItem
                          icon={<FaEnvelope className="text-green-500" />}
                          text="Contactar soporte"
                          onClick={navigateTo.soporte}
                        />
                        <MenuItem
                          icon={<FaCog className="text-gray-600" />}
                          text="Configuración"
                          onClick={navigateTo.configuracion}
                        />
                      </MenuSection>

                      <div className="p-2 bg-gray-50">
                        <MenuItem
                          icon={<FaSignOutAlt className="text-red-500" />}
                          text="Cerrar sesión"
                          onClick={navigateTo.logout}
                          className="hover:bg-red-50"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  };

  const Categorias = () => {
    const navigate = useNavigate();
    const [showLeftButton, setShowLeftButton] = useState(false);
    const [showRightButton, setShowRightButton] = useState(true);
    const categoriesContainerRef = useRef(null);

    const handleCategoryClick = (path) => {
      navigate(path);
    };

    const checkScrollPosition = () => {
      if (categoriesContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } =
          categoriesContainerRef.current;
        setShowLeftButton(scrollLeft > 5);
        setShowRightButton(scrollLeft < scrollWidth - clientWidth - 5);
      }
    };

    const scrollCategories = (direction) => {
      if (categoriesContainerRef.current) {
        const cardWidth = 128;
        const visibleWidth = categoriesContainerRef.current.clientWidth;
        const scrollAmount =
          Math.floor(visibleWidth / cardWidth) * cardWidth * 0.8;

        categoriesContainerRef.current.scrollBy({
          left: direction === "left" ? -scrollAmount : scrollAmount,
          behavior: "smooth",
        });

        setTimeout(checkScrollPosition, 500);
      }
    };

    useEffect(() => {
      const container = categoriesContainerRef.current;
      const preventVerticalScroll = (e) => {
        if (e.deltaY === 0) return;
        if (
          (e.deltaY < 0 && container.scrollLeft <= 0) ||
          (e.deltaY > 0 &&
            container.scrollLeft >=
              container.scrollWidth - container.clientWidth)
        ) {
          e.preventDefault();
        }
      };

      if (container) {
        container.addEventListener("wheel", preventVerticalScroll, {
          passive: false,
        });
        checkScrollPosition();
      }

      window.addEventListener("resize", checkScrollPosition);
      return () => {
        if (container) {
          container.removeEventListener("wheel", preventVerticalScroll);
        }
        window.removeEventListener("resize", checkScrollPosition);
      };
    }, []);

    return (
      <div className="w-full py-2 relative before:absolute before:inset-0 before:bg-gray-50 before:opacity-50">
        <div className="container mx-auto px-1 relative z-10">
          <div className="flex items-center relative">
            <h2 className="text-xl font-bold uppercase mr-4 lg:mr-8 text-gray-600 w-24 lg:w-36 flex-shrink-0">
              CATEGORÍAS
            </h2>

            <div className="flex-grow relative overflow-hidden">
              <div
                ref={categoriesContainerRef}
                className="flex overflow-x-auto space-x-4 pt-2 px-2 scrollbar-hide scroll-smooth no-scrollbar"
                onScroll={checkScrollPosition}
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {CATEGORIES.map((category) => (
                  <button
                    key={category.path}
                    onClick={() => handleCategoryClick(category.path)}
                    className="flex-shrink-0 bg-white p-4 rounded-xl shadow-xl flex flex-col items-center justify-center w-28 h-32 sm:w-32 sm:h-36 hover:bg-blue-300 border border-gray-100 transition-all duration-300 hover:scale-105 group relative"
                    style={{
                      boxShadow:
                        "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(0, 0, 0, 0.03)",
                    }}
                  >
                    <div className="absolute inset-0 rounded-xl opacity-0 bg-gradient-to-b from-white to-transparent group-hover:opacity-10"></div>
                    <span className="text-2xl mb-3 text-black group-hover:text-cyan-900 transition-colors duration-300">
                      {category.icon}
                    </span>
                    <span className="text-xs font-semibold text-gray-700 uppercase text-center px-1 group-hover:text-white transition-colors duration-300">
                      {category.label}
                    </span>
                  </button>
                ))}
              </div>

              {/* Boton slider izquierda */}
              {showLeftButton && (
                <button
                  onClick={() => scrollCategories("left")}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white hover:bg-blue-200 shadow-xl rounded-full p-2 sm:p-3 hover:scale-110 transition-all duration-300 z-10 border border-gray-200"
                  style={{
                    boxShadow:
                      "0 10px 15px -3px rgba(0, 0, 0, 0.15), 0 4px 6px -2px rgba(0, 0, 0, 0.1)",
                  }}
                  aria-label="Categorías anteriores"
                >
                  <ChevronLeft className="text-blue-600" size={24} />
                </button>
              )}

              {/* Boton slider derecha */}
              {showRightButton && (
                <button
                  onClick={() => scrollCategories("right")}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white hover:bg-blue-100 shadow-xl rounded-full p-2 sm:p-3 hover:scale-110 transition-all duration-300 z-10 border border-gray-200"
                  style={{
                    boxShadow:
                      "0 10px 15px -3px rgba(0, 0, 0, 0.15), 0 4px 6px -2px rgba(0, 0, 0, 0.1)",
                  }}
                  aria-label="Más categorías"
                >
                  <ChevronRight className="text-blue-600" size={24} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const Anuncios = () => (
    <section className="w-full overflow-hidden">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold relative inline-block">
          Anuncios de Temporada
        </h2>
      </div>
      <div className="w-full">
        <Slider {...SLIDER_SETTINGS}>
          {ANUNCIOS.map((anuncio, index) => (
            <div key={index} className="w-full">
              <div className="relative overflow-hidden w-full">
                <div className="relative aspect-[16/9] md:aspect-[16/7] lg:aspect-[16/5] overflow-hidden bg-gradient-to-r from-blue-100 via-yellow-100 to-orange-100">
                  {anuncio.tag && (
                    <div className="absolute top-4 left-4 z-10">
                      <div
                        className={`${anuncio.tagColor} text-white px-3 py-1 rounded-lg font-bold flex items-center filter drop-shadow-md`}
                      >
                        {anuncio.tagIcon && (
                          <span className="mr-1">{anuncio.tagIcon}</span>
                        )}
                        {anuncio.tag}
                      </div>
                    </div>
                  )}
                  {anuncio.badge && (
                    <div className="absolute top-4 right-4 z-10">
                      <div className="bg-white text-gray-800 px-3 py-1 rounded-full text-xs font-medium">
                        {anuncio.badge}
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 shadow-inner bg-gradient-to-t from-black/20 to-transparent opacity-30 pointer-events-none"></div>
                  <img
                    src={anuncio.imagen}
                    className="w-full h-full object-cover"
                    alt={anuncio.alt}
                    style={{
                      filter: "brightness(1.02) contrast(1.05)",
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-[#f4f6fc] relative text-[#484d45] max-w-screen overflow-x-hidden">
      <div className="absolute inset-0 flex justify-center opacity-10 pointer-events-none">
        <img
          src={backgroundImage}
          alt="Flor decorativa"
          className="absolute left-0 w-1/3 md:w-1/4"
        />
      </div>

      <Header />
      <main className="container mx-auto px-4 py-8 relative z-10">
        <Categorias />
        <Anuncios />
        <OfertasDestacadas />
        <ArticulosMasVendidos />
      </main>
      <Footer />

      {/* Modal de Login - Esta es la corrección clave */}
      {showLoginModal && (
        <Login
          onClose={() => setShowLoginModal(false)}
          // Pasa cualquier otra prop que necesite tu componente Login
        />
      )}
    </div>
  );
};

export default MainPage;
