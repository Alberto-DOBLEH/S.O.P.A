import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  // Iconos de Font Awesome
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaShoppingCart,
  FaHeart,
  FaShare,
  // // FaChevronLeft,
  // FaChevronRight,
  FaTruck,
  FaShieldAlt,
  FaCreditCard,
  FaStore,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaUser,
  FaBell,
  FaSearch,
  FaShopify,
  FaHistory,
  FaCog,
} from "react-icons/fa";
import {
  FaLaptop,
  FaTv,
  FaHome,
  FaGamepad,
  FaTshirt,
  FaShoePrints,
  FaBook,
  FaUtensils,
  FaBath,
  FaGift,
  FaTabletAlt,
  FaClipboardList,
  FaHeadset,
  FaDesktop,
  FaMobileAlt,
  FaChevronDown,
} from "react-icons/fa";
// Agrega esta importación con los demás imports de iconos
import { IoMdHelp } from "react-icons/io";
import { BsPatchCheck } from "react-icons/bs";
import { RiCouponLine } from "react-icons/ri";
import { toast } from "react-toastify";
import logoCompleto from "../assets/imagenes/logo-completo.png";
import { logoLetras, backgroundImage } from "../assets/imagenes/imagenes";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaTag, FaListUl } from "react-icons/fa";
import Header from "../components/Header";
const productosEjemplo = [
  {
    id: "1",
    titulo: "Smartphone XYZ Pro 128GB - 6.7'' AMOLED - 108MP",
    precio: 12999,
    precioOriginal: 14999,
    descuento: 13,
    calificacion: 4.7,
    numCalificaciones: 1243,
    stock: 15,
    vendidoPor: "TecnoShop MX",
    verificado: true,
    envioGratis: true,
    full: true,
    garantia: "12 meses",
    devolucion: "30 días",
    imagenes: [
      "https://m.media-amazon.com/images/I/71xb2xkN5qL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/61+5XcRqMaL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/71yzyH-ohgL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/61XZQXFQeVL._AC_SL1500_.jpg",
    ],
    especificaciones: {
      pantalla: "6.7'' AMOLED 120Hz",
      procesador: "Snapdragon 8 Gen 2",
      ram: "8GB",
      almacenamiento: "128GB",
      camaraPrincipal: "108MP + 12MP + 8MP",
      camaraFrontal: "32MP",
      bateria: "5000mAh",
      so: "Android 13",
      conectividad: "5G, Wi-Fi 6, Bluetooth 5.2",
      dimensiones: "163.7 x 76.2 x 8.9 mm",
      peso: "205g",
      color: "Negro Espacial",
    },
    descripcion:
      "El Smartphone XYZ Pro redefine la experiencia móvil con su potente rendimiento y cámara profesional. Disfruta de fotos impresionantes con el sistema de cámara de 108MP, juegos fluidos gracias al procesador Snapdragon 8 Gen 2 y una pantalla AMOLED de 120Hz para contenido vibrante.",
    categoria: "Smartphones",
  },
  {
    id: "2",
    titulo: "Laptop UltraSlim 14'' - 16GB RAM - 512GB SSD",
    precio: 18999,
    precioOriginal: 21999,
    descuento: 14,
    calificacion: 4.5,
    numCalificaciones: 876,
    stock: 8,
    vendidoPor: "TecnoShop MX",
    verificado: true,
    envioGratis: true,
    full: false,
    garantia: "24 meses",
    devolucion: "15 días",
    imagenes: [
      "https://m.media-amazon.com/images/I/71pC69I3lzL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/71YI6e-EwVL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/71TPda7cwUL._AC_SL1500_.jpg",
    ],
    especificaciones: {
      pantalla: "14'' IPS FHD 1920x1080",
      procesador: "Intel Core i7-1260P",
      ram: "16GB DDR4",
      almacenamiento: "512GB NVMe SSD",
      graficos: "Intel Iris Xe",
      bateria: "60Wh (hasta 10 horas)",
      so: "Windows 11 Pro",
      puertos: "2x Thunderbolt 4, 2x USB-A, HDMI, 3.5mm",
      peso: "1.3kg",
      color: "Plata",
    },
    descripcion:
      "La Laptop UltraSlim combina potencia y portabilidad con un diseño delgado y ligero. Ideal para profesionales y estudiantes que necesitan rendimiento en un formato fácil de transportar.",
    categoria: "Laptops",
  },
];

const comentariosEjemplo = [
  {
    id: 1,
    usuario: "Juan Pérez",
    calificacion: 5,
    fecha: "2023-05-15",
    titulo: "Excelente teléfono",
    comentario:
      "El teléfono superó mis expectativas. La cámara toma fotos increíbles y la batería dura todo el día. Lo recomiendo 100%.",
    likes: 24,
    dislikes: 2,
    respuestas: [
      {
        id: 1,
        usuario: "TecnoShop MX",
        fecha: "2023-05-16",
        comentario:
          "¡Gracias por tu compra y comentario, Juan! Nos alegra que estés disfrutando tu nuevo smartphone.",
      },
    ],
  },
  {
    id: 2,
    usuario: "María González",
    calificacion: 4,
    fecha: "2023-06-22",
    titulo: "Muy bueno, pero...",
    comentario:
      "El teléfono es excelente en general, aunque me parece que el precio es un poco alto para lo que ofrece. La cámara es espectacular.",
    likes: 12,
    dislikes: 0,
    respuestas: [],
  },
];

const preguntasEjemplo = [
  {
    id: 1,
    usuario: "Carlos R.",
    fecha: "2023-06-10",
    pregunta: "¿Trae cargador incluido?",
    respuestas: [
      {
        id: 1,
        usuario: "TecnoShop MX",
        fecha: "2023-06-10",
        respuesta:
          "Hola Carlos, sí incluye cargador rápido de 65W en la caja. Saludos.",
      },
    ],
  },
  {
    id: 2,
    usuario: "Ana M.",
    fecha: "2023-07-05",
    pregunta: "¿Es resistente al agua?",
    respuestas: [],
  },
];

const Footer = () => {
  const navigate = useNavigate();

  const navigateTo = {
    home: () => navigate("/"),
    about: () => navigate("/nosotros"),
    contact: () => navigate("/contacto"),
    terms: () => navigate("/terminos"),
    privacy: () => navigate("/privacidad"),
  };

  return (
    <footer className="bg-gray-800 text-white mt-12">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div className="col-span-1 md:col-span-1">
            <img src={logoLetras} alt="TecnoShop Logo" className="h-8 mb-4" />
            <p className="text-sm text-gray-300 mb-4">
              Tu tienda de tecnología de confianza con los mejores precios y
              servicio.
            </p>
            <div className="flex space-x-4">
              {/* Iconos de redes sociales */}
              <a href="#" className="text-gray-300 hover:text-white">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </a>
            </div>
          </div>

          {/* Enlaces */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Acerca de</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={navigateTo.about}
                  className="text-gray-300 hover:text-white"
                >
                  Quiénes somos
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/nuestras-tiendas")}
                  className="text-gray-300 hover:text-white"
                >
                  Nuestras tiendas
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/trabaja-con-nosotros")}
                  className="text-gray-300 hover:text-white"
                >
                  Trabaja con nosotros
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/blog")}
                  className="text-gray-300 hover:text-white"
                >
                  Blog de tecnología
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Ayuda</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => navigate("/centro-ayuda")}
                  className="text-gray-300 hover:text-white"
                >
                  Centro de ayuda
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/comprar")}
                  className="text-gray-300 hover:text-white"
                >
                  Cómo comprar
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/devoluciones")}
                  className="text-gray-300 hover:text-white"
                >
                  Devoluciones
                </button>
              </li>
              <li>
                <button
                  onClick={navigateTo.contact}
                  className="text-gray-300 hover:text-white"
                >
                  Contáctanos
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Información legal</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={navigateTo.terms}
                  className="text-gray-300 hover:text-white"
                >
                  Términos y condiciones
                </button>
              </li>
              <li>
                <button
                  onClick={navigateTo.privacy}
                  className="text-gray-300 hover:text-white"
                >
                  Política de privacidad
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/cookies")}
                  className="text-gray-300 hover:text-white"
                >
                  Política de cookies
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Medios de pago y envío */}
        <div className="mt-10 pt-6 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <h4 className="text-sm font-medium mb-3">Métodos de pago</h4>
              <div className="flex space-x-3">
                {[
                  "Visa",
                  "Mastercard",
                  "American Express",
                  "PayPal",
                  "Oxxo",
                ].map((method, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-700 text-white px-3 py-1 rounded text-xs"
                  >
                    {method}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-3">Opciones de envío</h4>
              <div className="flex space-x-3">
                {["DHL", "FedEx", "Estafeta", "Correos de México"].map(
                  (courier, idx) => (
                    <div
                      key={idx}
                      className="bg-gray-700 text-white px-3 py-1 rounded text-xs"
                    >
                      {courier}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-gray-700 text-sm text-gray-400 text-center">
          <p>© 2025 TecnoShop MX. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

const VerArticulo = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  // Estados principales
  const [producto, setProducto] = useState(state?.producto || null);
  const [loading, setLoading] = useState(!state?.producto);
  const [cantidad, setCantidad] = useState(1);
  const [imagenSeleccionada, setImagenSeleccionada] = useState(0);
  const [comentarios, setComentarios] = useState([]);
  const [preguntas, setPreguntas] = useState([]);
  const [activeTab, setActiveTab] = useState("descripcion");
  const [productosRelacionados, setProductosRelacionados] = useState([]);
  const [enCarrito, setEnCarrito] = useState(false);
  const [enFavoritos, setEnFavoritos] = useState(false);

  // Cargar datos de ejemplo
  useEffect(() => {
    if (!state?.producto) {
      setLoading(true);
      // Simular carga de API
      setTimeout(() => {
        const productoEncontrado = productosEjemplo.find((p) => p.id === id);
        if (productoEncontrado) {
          setProducto(productoEncontrado);
          setComentarios(comentariosEjemplo);
          setPreguntas(preguntasEjemplo);
          // Simular productos relacionados (excluyendo el actual)
          setProductosRelacionados(
            productosEjemplo.filter((p) => p.id !== id).slice(0, 3)
          );
        } else {
          setProducto(null);
        }
        setLoading(false);
      }, 800);
    } else {
      setComentarios(comentariosEjemplo);
      setPreguntas(preguntasEjemplo);
      setProductosRelacionados(
        productosEjemplo.filter((p) => p.id !== id).slice(0, 3)
      );
    }
  }, [id, state?.producto]);

  // Formatear precio
  const formatoPrecio = (precio) => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
      minimumFractionDigits: 0,
    }).format(precio);
  };

  // Funciones de interacción
  const handleAgregarCarrito = () => {
    setEnCarrito(true);
    toast.success(`Se agregó ${cantidad} ${producto.titulo} al carrito`);
  };

  const handleComprarAhora = () => {
    navigate("/checkout", {
      state: {
        productos: [{ ...producto, cantidad }],
        modoCompraRapida: true,
      },
    });
  };

  const toggleFavoritos = () => {
    setEnFavoritos(!enFavoritos);
    toast.info(!enFavoritos ? "Agregado a favoritos" : "Removido de favoritos");
  };

  // Renderizar estrellas de calificación
  const renderEstrellas = (calificacion) => {
    const estrellas = [];
    const estrellasLlenas = Math.floor(calificacion);
    const tieneMediaEstrella = calificacion % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= estrellasLlenas) {
        estrellas.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (i === estrellasLlenas + 1 && tieneMediaEstrella) {
        estrellas.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
      } else {
        estrellas.push(<FaRegStar key={i} className="text-yellow-400" />);
      }
    }

    return estrellas;
  };

  // Estados de carga y error
  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
              <span className="ml-3 text-gray-600">Cargando producto...</span>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!producto) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 py-12">
          <div className="container mx-auto px-4 text-center py-20">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Producto no encontrado
            </h2>
            <p className="text-gray-600 mb-6">
              El producto que estás buscando no existe o ha sido removido.
            </p>
            <button
              onClick={() => navigate("/")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
            >
              Volver al inicio
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="relative w-full">
        {/* Imagen de fondo decorativa */}
        <img
          src={backgroundImage}
          alt="Flor decorativa"
          className="absolute left-0 w-1/3 md:w-1/4 z-0 opacity-15"
        />

        {/* Breadcrumb funcional */}
        <div className="relative  bg-white/80 backdrop-blur-sm shadow-sm w-full border-b border-gray-200/30">
          <div className="container mx-auto px-4">
            <nav className="text-sm py-1">
              <ol className="flex items-center space-x-2 text-gray-700">
                <li className="flex items-center">
                  <button
                    onClick={() => navigate("/")}
                    className="text-blue-600/90 hover:text-blue-700 hover:underline transition-colors duration-200"
                  >
                    Inicio
                  </button>
                </li>

                <li className="flex items-center">
                  <span className="mx-2 text-gray-400/80">&gt;</span>
                  <button
                    onClick={() =>
                      navigate(`/categoria/${producto.categoria.toLowerCase()}`)
                    }
                    className="text-blue-600/90 hover:text-blue-700 hover:underline transition-colors duration-200"
                  >
                    {producto.categoria}
                  </button>
                </li>

                <li className="flex items-center">
                  <span className="mx-2 text-gray-400/80">&gt;</span>
                  <span className="text-gray-800/90 font-medium truncate max-w-[160px] md:max-w-[240px]">
                    {producto.titulo}
                  </span>
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 py-4">
        <div className="container mx-auto px-4">
          {/* Breadcrumbs */}

          {/* Contenido principal */}
          <div className="bg-white rounded-lg shadow-sm p-4 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Columna izquierda: Galería de imágenes */}
              <div>
                {/* Imagen principal */}
                <div className="relative mb-4 rounded-lg overflow-hidden border border-gray-200">
                  <img
                    // src={logoCompleto}   imagen del producto
                    alt={producto.titulo}
                    className="w-full h-auto object-contain aspect-square"
                  />
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {producto.descuento > 0 && (
                      <span className="bg-red-600 text-white text-sm font-bold py-1 px-3 rounded-full">
                        -{producto.descuento}%
                      </span>
                    )}
                    {producto.envioGratis && (
                      <span className="bg-green-600 text-white text-sm font-bold py-1 px-3 rounded-full">
                        Envío gratis
                      </span>
                    )}
                    {producto.full && (
                      <span className="bg-blue-600 text-white text-sm font-bold py-1 px-3 rounded-full">
                        FULL
                      </span>
                    )}
                  </div>
                </div>

                {/* Miniaturas */}
                <div className="flex space-x-2 relative">
                  <button
                    onClick={() =>
                      setImagenSeleccionada(Math.max(0, imagenSeleccionada - 1))
                    }
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-1 shadow-md"
                  >
                    <FaChevronLeft className="text-gray-600" />
                  </button>

                  <div className="flex space-x-2 overflow-x-auto px-6">
                    {[...Array(4)].map((_, idx) => (
                      <div
                        key={idx}
                        onClick={() => setImagenSeleccionada(idx)}
                        className={`cursor-pointer rounded-md overflow-hidden border-2 ${
                          imagenSeleccionada === idx
                            ? "border-blue-500"
                            : "border-gray-200"
                        }`}
                      >
                        <img
                          src="/api/placeholder/150/150"
                          alt={`${producto.titulo} - vista ${idx + 1}`}
                          className="w-16 h-16 object-cover"
                        />
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() =>
                      setImagenSeleccionada(Math.min(3, imagenSeleccionada + 1))
                    }
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-1 shadow-md"
                  >
                    <FaChevronRight className="text-gray-600" />
                  </button>
                </div>

                {/* Compartir y favoritos (móvil) */}
                <div className="flex justify-between mt-6 md:hidden">
                  <button
                    onClick={toggleFavoritos}
                    className="flex items-center text-gray-700 hover:text-gray-900"
                  >
                    {enFavoritos ? (
                      <FaHeart className="text-red-500 mr-2" />
                    ) : (
                      <FaHeart className="text-gray-400 mr-2" />
                    )}
                    <span>{enFavoritos ? "Guardado" : "Guardar"}</span>
                  </button>
                  <button className="flex items-center text-gray-700 hover:text-gray-900">
                    <FaShare className="text-gray-400 mr-2" />
                    <span>Compartir</span>
                  </button>
                </div>
              </div>

              {/* Columna derecha: Información del producto */}
              <div>
                {/* Título y vendedor */}
                <div className="mb-4">
                  <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
                    {producto.titulo}
                  </h1>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-600 mr-2">
                      Vendido por:
                    </span>
                    <span className="text-sm font-medium text-gray-700 mr-1">
                      {producto.vendidoPor}
                    </span>
                    {producto.verificado && (
                      <BsPatchCheck
                        className="text-blue-500"
                        title="Vendedor verificado"
                      />
                    )}
                  </div>
                </div>

                {/* Calificaciones */}
                <div className="flex items-center mb-6">
                  <div className="flex mr-2">
                    {renderEstrellas(producto.calificacion)}
                  </div>
                  <span className="text-lg font-bold text-gray-800 mr-2">
                    {producto.calificacion.toFixed(1)}
                  </span>
                  <span className="text-sm text-gray-500">
                    ({producto.numCalificaciones} calificaciones)
                  </span>
                </div>

                {/* Precio */}
                <div className="mb-6">
                  <div className="flex items-center">
                    <span className="text-2xl md:text-3xl font-bold text-gray-900">
                      {formatoPrecio(producto.precio)}
                    </span>
                    {producto.descuento > 0 && (
                      <span className="ml-3 text-lg text-gray-500 line-through">
                        {formatoPrecio(producto.precioOriginal)}
                      </span>
                    )}
                  </div>
                  {producto.envioGratis && (
                    <p className="text-green-600 flex items-center mt-2">
                      <FaTruck className="mr-2" />
                      Envío gratis
                    </p>
                  )}

                  {/* Cuotas */}
                  <div className="mt-2 text-sm">
                    <p className="text-gray-600">
                      Hasta 12 meses sin intereses de{" "}
                      <span className="font-semibold">
                        {formatoPrecio(Math.round(producto.precio / 12))}
                      </span>
                    </p>
                    <button className="text-blue-600 font-medium hover:text-blue-700 mt-1">
                      Ver opciones de pago
                    </button>
                  </div>
                </div>

                {/* Stock */}
                <div className="mb-6">
                  <p className="text-sm text-gray-600 mb-1">
                    Stock disponible:
                  </p>
                  <div className="flex items-center">
                    <span className="font-medium text-gray-800 mr-2">
                      {producto.stock} unidades
                    </span>
                    {producto.stock < 5 && (
                      <span className="text-red-600 text-sm">
                        ¡Últimas disponibles!
                      </span>
                    )}
                  </div>
                </div>

                {/* Cantidad */}
                <div className="mb-6">
                  <p className="text-sm text-gray-600 mb-2">Cantidad:</p>
                  <div className="flex items-center">
                    <button
                      onClick={() => setCantidad(Math.max(1, cantidad - 1))}
                      className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-l-md bg-gray-100 text-gray-700 hover:bg-gray-200"
                    >
                      -
                    </button>
                    <span className="w-12 h-8 flex items-center justify-center border-t border-b border-gray-300 bg-white">
                      {cantidad}
                    </span>
                    <button
                      onClick={() =>
                        setCantidad(Math.min(producto.stock, cantidad + 1))
                      }
                      className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-r-md bg-gray-100 text-gray-700 hover:bg-gray-200"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Botones de acción */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                  <button
                    onClick={handleComprarAhora}
                    className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg transition-colors"
                  >
                    Comprar ahora
                  </button>
                  <button
                    onClick={handleAgregarCarrito}
                    className={`flex items-center justify-center font-bold py-3 px-4 rounded-lg transition-colors ${
                      enCarrito
                        ? "bg-green-600 hover:bg-green-700 text-white"
                        : "bg-blue-600 hover:bg-blue-700 text-white"
                    }`}
                  >
                    <FaShoppingCart className="mr-2" />
                    {enCarrito ? "Agregado" : "Agregar al carrito"}
                  </button>
                </div>

                {/* Compartir y favoritos (escritorio) */}
                <div className="hidden md:flex justify-between mt-4 mb-6">
                  <button
                    onClick={toggleFavoritos}
                    className="flex items-center text-gray-700 hover:text-gray-900"
                  >
                    {enFavoritos ? (
                      <FaHeart className="text-red-500 mr-2" />
                    ) : (
                      <FaHeart className="text-gray-400 mr-2" />
                    )}
                    <span>{enFavoritos ? "Guardado" : "Guardar"}</span>
                  </button>
                  <button className="flex items-center text-gray-700 hover:text-gray-900">
                    <FaShare className="text-gray-400 mr-2" />
                    <span>Compartir</span>
                  </button>
                </div>

                {/* Beneficios */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h3 className="font-semibold text-gray-800 mb-3">
                    Beneficios de tu compra
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <FaTruck className="text-green-600 mt-1 mr-3" />
                      <span className="text-sm text-gray-600">
                        Envío gratis a todo México en compras mayores a $499
                      </span>
                    </li>
                    <li className="flex items-start">
                      <FaShieldAlt className="text-blue-600 mt-1 mr-3" />
                      <span className="text-sm text-gray-600">
                        Garantía de {producto.garantia} directamente con el
                        fabricante
                      </span>
                    </li>
                    <li className="flex items-start">
                      <FaCreditCard className="text-purple-600 mt-1 mr-3" />
                      <span className="text-sm text-gray-600">
                        Paga con cualquier método de pago y hasta en 12 MSI
                      </span>
                    </li>
                    <li className="flex items-start">
                      <RiCouponLine className="text-orange-600 mt-1 mr-3" />
                      <span className="text-sm text-gray-600">
                        Obtén 5% en cupones para tu próxima compra
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Tiendas con stock */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">
                    Disponible en tiendas físicas
                  </h3>
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="flex items-center bg-gray-50 p-3 border-b border-gray-200">
                      <FaStore className="text-gray-500 mr-2" />
                      <span className="font-medium text-gray-700">
                        Verifica disponibilidad
                      </span>
                    </div>
                    <div className="p-3">
                      <div className="flex items-center mb-3">
                        <FaMapMarkerAlt className="text-red-500 mr-2" />
                        <span className="text-sm text-gray-600">
                          Selecciona tu ubicación para ver tiendas cercanas
                        </span>
                      </div>
                      <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 rounded-lg transition-colors">
                        Ver tiendas disponibles
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs de información adicional */}
            <div className="mt-10 border-t border-gray-200 pt-8">
              <div className="flex overflow-x-auto scrollbar-hide">
                <button
                  onClick={() => setActiveTab("descripcion")}
                  className={`mr-6 pb-2 font-medium ${
                    activeTab === "descripcion"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Descripción
                </button>
                <button
                  onClick={() => setActiveTab("especificaciones")}
                  className={`mr-6 pb-2 font-medium ${
                    activeTab === "especificaciones"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Especificaciones
                </button>
                <button
                  onClick={() => setActiveTab("opiniones")}
                  className={`mr-6 pb-2 font-medium ${
                    activeTab === "opiniones"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Opiniones ({comentarios.length})
                </button>
                <button
                  onClick={() => setActiveTab("preguntas")}
                  className={`mr-6 pb-2 font-medium ${
                    activeTab === "preguntas"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Preguntas ({preguntas.length})
                </button>
              </div>

              <div className="mt-6">
                {/* Descripción */}
                {activeTab === "descripcion" && (
                  <div className="prose max-w-none">
                    <p className="text-gray-700 leading-relaxed">
                      {producto.descripcion}
                    </p>
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">
                        Características destacadas
                      </h3>
                      <ul className="list-disc pl-5 space-y-2 text-gray-700">
                        <li>
                          Pantalla {producto.especificaciones.pantalla} con
                          colores vibrantes y gran nitidez
                        </li>
                        <li>
                          Procesador {producto.especificaciones.procesador} de
                          última generación
                        </li>
                        <li>
                          Memoria RAM de {producto.especificaciones.ram} para
                          multitarea fluida
                        </li>
                        <li>
                          Almacenamiento de{" "}
                          {producto.especificaciones.almacenamiento} para todos
                          tus archivos
                        </li>
                        <li>
                          Sistema de cámaras de{" "}
                          {producto.especificaciones.camaraPrincipal} para fotos
                          profesionales
                        </li>
                        <li>
                          Batería de {producto.especificaciones.bateria} para
                          uso prolongado
                        </li>
                      </ul>
                    </div>
                  </div>
                )}

                {/* Especificaciones */}
                {activeTab === "especificaciones" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Especificaciones técnicas
                      </h3>
                      <table className="min-w-full border-collapse">
                        <tbody>
                          {Object.entries(producto.especificaciones).map(
                            ([key, value], idx) => (
                              <tr
                                key={idx}
                                className={
                                  idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                                }
                              >
                                <td className="py-3 px-4 text-sm font-medium text-gray-700 border border-gray-200">
                                  {key.charAt(0).toUpperCase() +
                                    key.slice(1).replace(/([A-Z])/g, " $1")}
                                </td>
                                <td className="py-3 px-4 text-sm text-gray-600 border border-gray-200">
                                  {value}
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Información adicional
                      </h3>
                      <div className="space-y-4">
                        <div className="border border-gray-200 rounded-lg p-4">
                          <h4 className="font-medium text-gray-800 mb-2">
                            Contenido del paquete
                          </h4>
                          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                            <li>1 x {producto.titulo}</li>
                            <li>1 x Cable de carga</li>
                            <li>1 x Adaptador de corriente</li>
                            <li>1 x Manual de usuario</li>
                            <li>1 x Tarjeta de garantía</li>
                          </ul>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-4">
                          <h4 className="font-medium text-gray-800 mb-2">
                            Garantía y soporte
                          </h4>
                          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                            <li>Garantía de fábrica: {producto.garantia}</li>
                            <li>Soporte técnico: Disponible 24/7</li>
                            <li>
                              Devoluciones: {producto.devolucion} después de
                              recibido
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Opiniones */}
                {activeTab === "opiniones" && (
                  <div>
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          Opiniones de clientes
                        </h3>
                        <div className="flex items-center mt-1">
                          <div className="flex mr-2">
                            {renderEstrellas(producto.calificacion)}
                          </div>
                          <span className="text-lg font-bold text-gray-800 mr-2">
                            {producto.calificacion.toFixed(1)}
                          </span>
                          <span className="text-sm text-gray-500">
                            ({producto.numCalificaciones} calificaciones)
                          </span>
                        </div>
                      </div>
                      <button className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                        Escribir una opinión
                      </button>
                    </div>

                    <div className="space-y-6">
                      {comentarios.map((comentario) => (
                        <div
                          key={comentario.id}
                          className="border-b border-gray-200 pb-6"
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center">
                                <div className="flex mr-2">
                                  {renderEstrellas(comentario.calificacion)}
                                </div>
                                <h4 className="font-medium text-gray-800">
                                  {comentario.titulo}
                                </h4>
                              </div>
                              <p className="text-sm text-gray-500 mt-1">
                                Por {comentario.usuario} - {comentario.fecha}
                              </p>
                            </div>
                            <div className="flex items-center space-x-3 text-sm">
                              <button className="flex items-center text-gray-500 hover:text-gray-700">
                                <FaCheckCircle className="mr-1" />
                                <span>Útil ({comentario.likes})</span>
                              </button>
                            </div>
                          </div>
                          <p className="text-gray-700 mt-3">
                            {comentario.comentario}
                          </p>

                          {/* Respuestas */}
                          {comentario.respuestas.length > 0 && (
                            <div className="mt-4 pl-6 border-l-2 border-gray-200">
                              {comentario.respuestas.map((respuesta) => (
                                <div key={respuesta.id} className="mt-3">
                                  <p className="text-sm font-medium text-gray-800">
                                    Respuesta de {respuesta.usuario}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    {respuesta.fecha}
                                  </p>
                                  <p className="text-sm text-gray-700 mt-1">
                                    {respuesta.comentario}
                                  </p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Ver más comentarios */}
                    {comentarios.length > 0 && (
                      <div className="mt-6 text-center">
                        <button className="text-blue-600 font-medium hover:text-blue-700">
                          Ver más opiniones
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Preguntas */}
                {activeTab === "preguntas" && (
                  <div>
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-gray-800">
                        Preguntas y respuestas
                      </h3>
                      <button className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                        Hacer una pregunta
                      </button>
                    </div>

                    {/* Preguntas */}
                    <div className="space-y-6">
                      {preguntas.map((pregunta) => (
                        <div
                          key={pregunta.id}
                          className="border-b border-gray-200 pb-6"
                        >
                          <div>
                            <p className="font-medium text-gray-800">
                              <span className="text-blue-600 mr-2">P:</span>
                              {pregunta.pregunta}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                              Por {pregunta.usuario} - {pregunta.fecha}
                            </p>
                          </div>

                          {/* Respuestas */}
                          {pregunta.respuestas.length > 0 ? (
                            <div className="mt-4">
                              {pregunta.respuestas.map((respuesta) => (
                                <div
                                  key={respuesta.id}
                                  className="pl-6 border-l-2 border-gray-200"
                                >
                                  <p className="font-medium text-gray-800">
                                    <span className="text-green-600 mr-2">
                                      R:
                                    </span>
                                    {respuesta.respuesta}
                                  </p>
                                  <p className="text-sm text-gray-500 mt-1">
                                    Por {respuesta.usuario} - {respuesta.fecha}
                                  </p>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="mt-4 pl-6 border-l-2 border-gray-200">
                              <p className="text-gray-600 italic">
                                Esta pregunta aún no tiene respuestas.
                              </p>
                              <button className="text-blue-600 text-sm font-medium hover:text-blue-700 mt-1">
                                Responder
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Ver más preguntas */}
                    {preguntas.length > 0 && (
                      <div className="mt-6 text-center">
                        <button className="text-blue-600 font-medium hover:text-blue-700">
                          Ver más preguntas
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Productos relacionados */}
          <div className="mt-12">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              Productos relacionados
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {productosRelacionados.map((producto) => (
                <div
                  key={producto.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow overflow-hidden"
                >
                  <div className="relative">
                    <img
                      src="/api/placeholder/300/300"
                      alt={producto.titulo}
                      className="w-full h-48 object-contain"
                    />
                    {producto.descuento > 0 && (
                      <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold py-1 px-2 rounded-full">
                        -{producto.descuento}%
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-medium text-gray-800 line-clamp-2 h-10">
                      {producto.titulo}
                    </h3>
                    <div className="flex items-center mt-2">
                      <div className="flex text-xs">
                        {renderEstrellas(producto.calificacion)}
                      </div>
                      <span className="text-xs text-gray-600 ml-1">
                        ({producto.numCalificaciones})
                      </span>
                    </div>
                    <div className="mt-2">
                      <span className="text-lg font-bold text-gray-900">
                        {formatoPrecio(producto.precio)}
                      </span>
                      {producto.precioOriginal && (
                        <span className="ml-2 text-sm text-gray-500 line-through">
                          {formatoPrecio(producto.precioOriginal)}
                        </span>
                      )}
                    </div>
                    {producto.envioGratis && (
                      <p className="text-xs text-green-600 mt-1 flex items-center">
                        <FaTruck className="mr-1" />
                        Envío gratis
                      </p>
                    )}
                    <div className="mt-3 flex justify-between">
                      <button
                        onClick={() =>
                          navigate(`/articulo/${producto.id}`, {
                            state: { producto },
                          })
                        }
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        Ver detalles
                      </button>
                      <button
                        onClick={() => {
                          toast.success(
                            `"${producto.titulo}" agregado al carrito`
                          );
                        }}
                        className="text-gray-700 hover:text-gray-900"
                      >
                        <FaShoppingCart />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Garantías y seguridad */}
          <div className="mt-12 bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              Compra con confianza
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <FaShieldAlt className="text-blue-600 text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">
                    Garantía protegida
                  </h3>
                  <p className="text-sm text-gray-600">
                    Todos nuestros productos incluyen garantía de fábrica y
                    soporte técnico.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <FaCreditCard className="text-green-600 text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">
                    Pago seguro
                  </h3>
                  <p className="text-sm text-gray-600">
                    Tus pagos están protegidos con encriptación SSL de 256 bits.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-purple-100 p-3 rounded-full mr-4">
                  <FaTruck className="text-purple-600 text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">
                    Envíos confiables
                  </h3>
                  <p className="text-sm text-gray-600">
                    Rastreo en tiempo real y protección contra extravíos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default VerArticulo;
