import React, { useState, useRef, useEffect } from "react";
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
} from "../assets/imagenes/imagenesslider";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Login from "./Login"; // Importa tu componente Login existente
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
import { BiCategory } from "react-icons/bi";
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
import { FaSearch as SearchIcon } from "react-icons/fa";
// ==============================================
// CONSTANTES Y CONFIGURACIONES
// ==============================================

// CATEGORÍAS DISPONIBLES
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
// const CATEGORIES = [
//   {
//     icon: <Icons.MobileIcon size={36} />,
//     label: "Smartphones",
//     path: "/telefonos",
//   },
//   {
//     icon: <Icons.KeyboardIcon size={36} />,
//     label: "Periféricos",
//     path: "/perifericos",
//   },
//   { icon: <Icons.LaptopIcon size={36} />, label: "Laptops", path: "/laptops" },
//   { icon: <Icons.CameraIcon size={36} />, label: "Cámaras", path: "/camaras" },
//   {
//     icon: <Icons.TvIcon size={36} />,
//     label: "Televisores",
//     path: "/televisores",
//   },
//   { icon: <Icons.HomeIcon size={36} />, label: "Hogar", path: "/hogar" },
//   {
//     icon: <Icons.RunningIcon size={36} />,
//     label: "Deportes",
//     path: "/deportes",
//   },
//   { icon: <Icons.CarIcon size={36} />, label: "Vehículos", path: "/vehiculos" },
//   {
//     icon: <Icons.GamepadIcon size={36} />,
//     label: "Videojuegos",
//     path: "/videojuegos",
//   },
//   { icon: <Icons.ShirtIcon size={36} />, label: "Ropa", path: "/ropa" },
//   { icon: <Icons.ShoeIcon size={36} />, label: "Zapatos", path: "/zapatos" },
//   { icon: <Icons.ChildIcon size={36} />, label: "Juguetes", path: "/juguetes" },
//   {
//     icon: <Icons.GuitarIcon size={36} />,
//     label: "Instrumentos",
//     path: "/instrumentos",
//   },
//   { icon: <Icons.BookIcon size={36} />, label: "Libros", path: "/libros" },
//   { icon: <Icons.BabyIcon size={36} />, label: "Bebés", path: "/bebes" },
//   { icon: <Icons.PawIcon size={36} />, label: "Mascotas", path: "/mascotas" },
//   { icon: <Icons.UtensilsIcon size={36} />, label: "Cocina", path: "/cocina" },
//   { icon: <Icons.BathIcon size={36} />, label: "Baño", path: "/bano" },
//   { icon: <Icons.PlaneIcon size={36} />, label: "Viajes", path: "/viajes" },
//   { icon: <Icons.TreeIcon size={36} />, label: "Jardín", path: "/jardin" },
//   {
//     icon: <Icons.DumbbellIcon size={36} />,
//     label: "Fitness",
//     path: "/fitness",
//   },
//   { icon: <Icons.GlassIcon size={36} />, label: "Bebidas", path: "/bebidas" },
//   {
//     icon: <Icons.AppleIcon size={36} />,
//     label: "Alimentos",
//     path: "/alimentos",
//   },
//   { icon: <Icons.GiftIcon size={36} />, label: "Regalos", path: "/regalos" },
//   { icon: <Icons.HeadphonesIcon size={36} />, label: "Audio", path: "/audio" },
//   { icon: <Icons.TabletIcon size={36} />, label: "Tablets", path: "/tablets" },
//   {
//     icon: <Icons.DesktopIcon size={36} />,
//     label: "Computadoras",
//     path: "/computadoras",
//   },
//   {
//     icon: <Icons.KeyboardIcon size={36} />,
//     label: "Teclados",
//     path: "/teclados",
//   },
//   { icon: <Icons.MouseIcon size={36} />, label: "Mouses", path: "/mouses" },
// ];
// ANUNCIOS PARA EL SLIDER
const ANUNCIOS = [
  {
    imagen: dobleh2023,
    alt: "Oferta de productos de oficina",
    tag: "FULL",
    tagColor: "bg-green-500",
    tagIcon: "⚡",
    badge: "ENVÍOS RÁPIDOS",
  },
  {
    imagen: desaparecido,
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

// CONFIGURACIÓN DEL SLIDER
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

// ==============================================
// COMPONENTES REUTILIZABLES
// ==============================================

// Función para agregar productos al carrito (compartida)
const agregarAlCarrito = (
  productoId,
  productos,
  setCarrito,
  navigate = null
) => {
  const producto = productos.find((p) => p.id === productoId);
  if (!producto) return;

  setCarrito((prev) => {
    const existe = prev.find((item) => item.id === productoId);
    if (existe) {
      return prev.map((item) =>
        item.id === productoId ? { ...item, cantidad: item.cantidad + 1 } : item
      );
    }
    return [...prev, { ...producto, cantidad: 1 }];
  });

  // Feedback visual
  alert(`✅ ${producto.titulo} agregado al carrito`);

  // Redirigir si es compra rápida
  if (navigate) {
    navigate("/checkout", {
      state: {
        productos: [{ ...producto, cantidad: 1 }],
        modoCompraRapida: true,
      },
    });
  }
};

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
      <SearchIcon className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
      <button
        type="submit"
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-2 rounded-full font-medium hover:from-blue-600 hover:to-blue-700 transition-all shadow-md"
      >
        Buscar
      </button>
    </form>
  );
};

// Componente de sección del menú
const MenuSection = ({ title, children }) => (
  <div className="py-2 px-1">
    <h3 className="text-xs font-semibold text-gray-500 px-3 mb-2">{title}</h3>
    <div className="space-y-1">{children}</div>
  </div>
);

// Componente de ítem del menú
const MenuItem = ({ icon, text, onClick, className = "" }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-blue-50 rounded-md transition-colors duration-150 ${className}`}
  >
    <span className="flex-shrink-0">{icon}</span>
    <span className="text-sm">{text}</span>
  </button>
);

// Componente de calificación con estrellas
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

// ==============================================
// COMPONENTES PRINCIPALES
// ==============================================

// Componente de Artículos Más Vendidos
const ArticulosMasVendidos = ({ carrito, setCarrito }) => {
  const [masVendidos, setMasVendidos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
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
  ];

  // Efecto para cargar productos
  useEffect(() => {
    const obtenerProductosMasVendidos = async () => {
      try {
        setCargando(true);
        // Simular carga de API
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

  // Función para formatear precios
  const formatoPrecio = (precio) => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
      minimumFractionDigits: 0,
    }).format(precio);
  };

  // Función para formatear número de ventas
  const formatearNumeroVentas = (numero) => {
    return numero >= 1000
      ? `${(numero / 1000).toFixed(1)}K vendidos`
      : `${numero} vendidos`;
  };

  // Renderizado durante la carga
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
              <div className="relative">
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

              <div className="p-4">
                <div className="text-xs text-blue-600 font-medium mb-1">
                  {producto.categoria}
                </div>
                <h3 className="font-medium text-gray-800 mb-2 line-clamp-2 h-12">
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
                    onClick={() =>
                      agregarAlCarrito(
                        producto.id,
                        masVendidos,
                        setCarrito,
                        navigate
                      )
                    }
                    className="ml-2 bg-green-600 hover:bg-green-700 text-white py-1 px-3 rounded-lg text-sm font-medium transition-colors duration-200"
                  >
                    Comprar ya
                  </button>
                </div>

                <button
                  onClick={() =>
                    agregarAlCarrito(producto.id, masVendidos, setCarrito)
                  }
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

const OfertasDestacadas = ({ carrito, setCarrito }) => {
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
    },
  ];

  const formatoPrecio = (precio) => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
      minimumFractionDigits: 0,
    }).format(precio);
  };

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
              <div className="relative">
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

              <div className="p-4">
                <div className="text-xs text-blue-600 font-medium mb-1">
                  {oferta.categoria}
                </div>
                <h3 className="font-medium text-gray-800 mb-2 line-clamp-2 h-12">
                  {oferta.titulo}
                </h3>

                <div className="flex items-end mb-3">
                  <span className="text-xl font-bold text-gray-800 mr-2">
                    {formatoPrecio(oferta.precioOferta)}
                  </span>
                  <span className="text-sm text-gray-500 line-through">
                    {formatoPrecio(oferta.precioOriginal)}
                  </span>
                </div>

                <div className="flex items-center text-xs text-gray-500 mb-4">
                  <FaClock className="mr-1" />
                  <span>Termina en: {oferta.tiempoRestante}</span>
                </div>

                <button
                  onClick={() =>
                    agregarAlCarrito(oferta.id, OFERTAS, setCarrito)
                  }
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
// const OfertasDestacadas = ({ carrito, setCarrito }) => {
//   const OFERTAS = [
//     {
//       id: 1,
//       imagen: "https://via.placeholder.com/200",
//       titulo: "Smartwatch último modelo",
//       precioOriginal: 3999,
//       precioOferta: 2499,
//       descuento: 38,
//       tiempoRestante: "2 días",
//       stock: 5,
//       categoria: "Electrónicos",
//     },
//     {
//       id: 2,
//       imagen: "https://via.placeholder.com/200",
//       titulo: "Audífonos inalámbricos premium",
//       precioOriginal: 1899,
//       precioOferta: 999,
//       descuento: 47,
//       tiempoRestante: "12 horas",
//       stock: 8,
//       categoria: "Audio",
//     },
//     {
//       id: 3,
//       imagen: "https://via.placeholder.com/200",
//       titulo: "Cámara deportiva 4K resistente al agua",
//       precioOriginal: 4599,
//       precioOferta: 2999,
//       descuento: 35,
//       tiempoRestante: "3 días",
//       stock: 3,
//       categoria: "Cámaras",
//     },
//     {
//       id: 4,
//       imagen: "https://via.placeholder.com/200",
//       titulo: "Zapatos deportivos ultralivianos",
//       precioOriginal: 1299,
//       precioOferta: 799,
//       descuento: 40,
//       tiempoRestante: "1 día",
//       stock: 12,
//       categoria: "Deportes",
//     },
//   ];

//   const formatoPrecio = (precio) => {
//     return new Intl.NumberFormat("es-MX", {
//       style: "currency",
//       currency: "MXN",
//       minimumFractionDigits: 0,
//     }).format(precio);
//   };

//   return (
//     <section className="py-2 bg-gradient-to-br rounded-2xl shadow-sm my-10">
//       <div className="container mx-auto px-4">
//         <div className="flex items-center justify-between mb-8">
//           <div className="flex items-center">
//             <div className="mr-4 bg-red-500 text-white p-2 rounded-lg">
//               <Icons.TagIcon size={24} />
//             </div>
//             <h2 className="text-2xl font-bold text-gray-800">
//               OFERTAS DESTACADAS
//             </h2>
//           </div>
//           <button className="text-blue-600 font-medium hover:text-blue-800 flex items-center">
//             Ver todas <Icons.ChevronRightIcon className="ml-1" size={14} />
//           </button>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {OFERTAS.map((oferta) => (
//             <div
//               key={oferta.id}
//               className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300"
//             >
//               <div className="relative">
//                 <span className="absolute top-3 left-3 bg-red-500 text-white text-sm font-bold px-2 py-1 rounded-lg z-10">
//                   -{oferta.descuento}%
//                 </span>

//                 {oferta.stock < 6 && (
//                   <span className="absolute top-3 right-3 bg-orange-500 text-white text-xs px-2 py-1 rounded-full z-10">
//                     ¡Solo {oferta.stock} disponibles!
//                   </span>
//                 )}

//                 <div className="h-48 overflow-hidden bg-gray-100 flex items-center justify-center">
//                   <img
//                     src={oferta.imagen}
//                     alt={oferta.titulo}
//                     className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
//                   />
//                 </div>
//               </div>

//               <div className="p-4">
//                 <div className="text-xs text-blue-600 font-medium mb-1">
//                   {oferta.categoria}
//                 </div>
//                 <h3 className="font-medium text-gray-800 mb-2 line-clamp-2 h-12">
//                   {oferta.titulo}
//                 </h3>

//                 <div className="flex items-end mb-3">
//                   <span className="text-xl font-bold text-gray-800 mr-2">
//                     {formatoPrecio(oferta.precioOferta)}
//                   </span>
//                   <span className="text-sm text-gray-500 line-through">
//                     {formatoPrecio(oferta.precioOriginal)}
//                   </span>
//                 </div>

//                 <div className="flex items-center text-xs text-gray-500 mb-4">
//                   <Icons.ClockIcon className="mr-1" />
//                   <span>Termina en: {oferta.tiempoRestante}</span>
//                 </div>

//                 <button
//                   onClick={() =>
//                     agregarAlCarrito(oferta.id, OFERTAS, setCarrito)
//                   }
//                   className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center mt-2"
//                 >
//                   <Icons.CartIcon className="mr-2" />
//                   Agregar al carrito
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };
// Componente de Categorías
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
          container.scrollLeft >= container.scrollWidth - container.clientWidth)
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
    <div className="w-full py-0">
      <div className="container mx-auto px-1">
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
                  className="flex-shrink-0 bg-white p-4 rounded-xl shadow-lg flex flex-col items-center justify-center w-28 h-32 sm:w-32 sm:h-36 hover:bg-blue-300 border border-gray-100 transition-all duration-200 hover:scale-105 group"
                >
                  <span className="text-2xl mb-3 text-black group-hover:text-cyan-900">
                    {category.icon}
                  </span>
                  <span className="text-xs font-semibold text-gray-700 uppercase text-center px-1 group-hover:text-white">
                    {category.label}
                  </span>
                </button>
              ))}
            </div>

            {showLeftButton && (
              <button
                onClick={() => scrollCategories("left")}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white hover:bg-blue-200 shadow-lg rounded-full p-2 sm:p-3 hover:scale-110 transition-all duration-200 z-10 border border-gray-200"
                aria-label="Categorías anteriores"
              >
                <ChevronLeft className="text-blue-600" size={24} />
              </button>
            )}

            {showRightButton && (
              <button
                onClick={() => scrollCategories("right")}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white hover:bg-blue-100 shadow-lg rounded-full p-2 sm:p-3 hover:scale-110 transition-all duration-200 z-10 border border-gray-200"
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

// Componente de Anuncios
const Anuncios = () => (
  <section className="mb-8 max-w-7xl mx-auto px-4">
    <h2 className="text-center text-2xl font-bold mb-4">
      Anuncios de Temporada
    </h2>
    <div className="w-full mx-auto">
      <Slider {...SLIDER_SETTINGS}>
        {ANUNCIOS.map((anuncio, index) => (
          <div key={index} className="px-2">
            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
              <div className="relative aspect-[16/9] md:aspect-[16/7] lg:aspect-[16/5] overflow-hidden bg-gradient-to-r from-blue-100 via-yellow-100 to-orange-100">
                {anuncio.tag && (
                  <div className="absolute top-4 left-4 z-10">
                    <div
                      className={`${anuncio.tagColor} text-white px-3 py-1 rounded-lg font-bold flex items-center`}
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
                    <div className="bg-white text-gray-800 px-3 py-1 rounded-full text-xs font-medium shadow-sm">
                      {anuncio.badge}
                    </div>
                  </div>
                )}
                <img
                  src={anuncio.imagen}
                  className="w-full h-full object-cover"
                  alt={anuncio.alt}
                />
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  </section>
);

// Componente de Header
const Header = ({ setShowLoginModal, carrito }) => {
  const [showOpciones, setShowOpciones] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const timeoutRef = useRef(null);

  const navigateTo = {
    home: () => navigate("/"),
    carrito: () => navigate("/carrito"),
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
    logout: () => navigate("/logout"),
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

  return (
    <header className="bg-[#cae8ff] border-b border-blue-200 shadow-md">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full flex flex-col md:flex-row justify-between items-center py-4">
          <div className="order-2 md:order-1 w-full md:w-auto flex justify-center md:justify-start">
            <div
              className="cursor-pointer transition-transform duration-300 hover:scale-105"
              onClick={navigateTo.home}
            >
              <img src={logoCompleto} alt="SOAP Logo" className="w-36" />
            </div>
          </div>

          <div className="order-1 md:order-2 w-full md:max-w-3xl mx-0 md:mx-8 mb-4 md:mb-0">
            <SearchBar />
          </div>

          <div className="order-3 md:order-3 flex items-center space-x-3">
            <button
              className="bg-blue-600 p-3.5 rounded-full text-white shadow-md transition-all duration-200 relative z-10 hover:bg-[#edf6f9] hover:text-blue-600"
              onClick={navigateTo.carrito}
              aria-label="Carrito de compras"
            >
              <FaShoppingCart className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                {carrito.length}
              </span>
            </button>

            <button
              onClick={() => setShowLoginModal(true)}
              className="bg-blue-600 text-white px-8 py-2 rounded-full font-medium shadow-md transition-all duration-200 text-lg md:text-xl hover:bg-[#edf6f9] hover:text-blue-600 group"
            >
              <span>Login</span>
            </button>

            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={toggleMenu}
                className="bg-blue-600 p-3.5 rounded-full text-white shadow-md transition-all duration-200 relative z-10 hover:bg-[#edf6f9] hover:text-blue-600"
                aria-label="Menú de opciones"
                aria-expanded={showOpciones}
              >
                <FaBars className="w-6 h-6" />
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
                        <p className="font-medium text-gray-900">Usuario</p>
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
                        onClick={navigateTo.carrito}
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

const Footer = () => (
  <footer className="py-8 flex justify-center items-center">
    <img src={logoLetras} alt="SOAP Logo" className="w-[150px]" />
  </footer>
);

// Componente principal MainPage
const MainPage = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [carrito, setCarrito] = useState([]);

  return (
    <div className="min-h-screen bg-[#f4f6fc] relative text-[#484d45] max-w-screen overflow-x-hidden">
      <div className="absolute inset-0 flex justify-center opacity-10 pointer-events-none">
        <img
          src={backgroundImage}
          alt="Flor decorativa"
          className="absolute left-0 w-1/3 md:w-1/4"
        />
      </div>

      <Header setShowLoginModal={setShowLoginModal} carrito={carrito} />

      <main className="container mx-auto px-4 py-8 relative z-10">
        <Categorias />
        <Anuncios />
        <OfertasDestacadas carrito={carrito} setCarrito={setCarrito} />
        <ArticulosMasVendidos carrito={carrito} setCarrito={setCarrito} />
      </main>

      <Footer />

      {showLoginModal && <Login onClose={() => setShowLoginModal(false)} />}
    </div>
  );
};

export default MainPage;
