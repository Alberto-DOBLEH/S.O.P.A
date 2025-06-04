
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaShoppingCart,
  FaHeart,
  FaShare,
  FaTruck,
  FaShieldAlt,
  FaCreditCard,
  FaStore,
  FaMapMarkerAlt,
  FaCheckCircle,
} from "react-icons/fa";
import { BsPatchCheck } from "react-icons/bs";
import { RiCouponLine } from "react-icons/ri";
import { toast } from "react-toastify";
import { useCurrency } from "../CurrencyContext";
import { backgroundImage } from "../assets/imagenes/imagenes";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Footer from "../components/Footer";
import Header from "../components/Heaader";

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

const VerArticulo = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { formatPrice } = useCurrency();

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

  useEffect(() => {
    const favoriteIds = JSON.parse(localStorage.getItem("favorites")) || [];
    setEnFavoritos(favoriteIds.includes(id));

    if (!state?.producto) {
      setLoading(true);
      setTimeout(() => {
        const productoEncontrado = productosEjemplo.find((p) => p.id === id);
        if (productoEncontrado) {
          setProducto({
            ...productoEncontrado,
            imagenes: productoEncontrado.imagenes || [], // Ensure imagenes is an array
          });
          setComentarios(comentariosEjemplo);
          setPreguntas(preguntasEjemplo);
          setProductosRelacionados(
            productosEjemplo.filter((p) => p.id !== id).slice(0, 3)
          );
        } else {
          setProducto(null);
        }
        setLoading(false);
      }, 800);
    } else {
      setProducto({
        ...state.producto,
        imagenes: state.producto.imagenes || [], // Ensure imagenes is an array
      });
      setComentarios(comentariosEjemplo);
      setPreguntas(preguntasEjemplo);
      setProductosRelacionados(
        productosEjemplo.filter((p) => p.id !== id).slice(0, 3)
      );
    }
  }, [id, state?.producto]);

  const handleAgregarCarrito = async () => {
    try {
      console.log("Agregando al carrito:", producto.id);

      if (!producto.id) {
        console.error("Producto no encontrado");
        return;
      }

      const id_usuario = localStorage.getItem("idusuario");
      const response = await fetch(
        `http://localhost:3001/api/carrito/?userId=${id_usuario}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            id_producto: producto.id,
            cantidad: 1,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Error al agregar al carrito");
      }
      toast.success(
        `✅ ${producto.titulo || producto.title} agregado al carrito`
      );
      setEnCarrito(true);
    } catch (error) {
      console.error("Error al agregar al carrito:", error);
      toast.error("Error al agregar al carrito");
      return;
    }
  };

  const handleComprarAhora = () => {
    navigate("/checkout", {
      state: {
        productos: [
          {
            ...producto,
            cantidad,
            precioDescuento: producto.descuento > 0 ? producto.precio : null,
            discount: producto.descuento,
          },
        ],
        modoCompraRapida: true,
        direccion: {
          calle: "Calle Constitución",
          ciudad: "Culiacán",
          estado: "Sinaloa",
          codigoPostal: "81893",
          pais: "México",
        },
        opcionEnvioSeleccionada: "estandar",
        opcionesEnvio: [
          {
            id: "estandar",
            nombre: "Envío Estándar",
            precio: 99,
            dias: "3-5 días",
          },
          {
            id: "express",
            nombre: "Envío Express",
            precio: 199,
            dias: "1-2 días",
          },
        ],
      },
    });
  };

//Funciones de favoritos
  const toggleFavoritos = async () => {
    setEnFavoritos(!enFavoritos);
    if (!enFavoritos) {
      await agregarAFavoritos(producto.id);
    } else {
      await eliminarFavoritos(producto.id);
    }

    toast.info(!enFavoritos ? "Agregado a favoritos" : "Removido de favoritos");
  };

  const agregarAFavoritos = async (id) => {
    console.log("Agregando a favoritos:", id);
    try{
      const id_usuario = localStorage.getItem("idusuario");
      const response = await fetch(`http://localhost:3001/api/favs/?userId=${id_usuario}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          id_producto: id,
        }),
      });
      if (response.status === 400) {
        toast.error("El producto ya está en favoritos");
        return;
      } else {
        toast.success("Producto agregado a favoritos");
        navigate("/favoritos");
      }
    } catch (error) {
      console.error("Error al agregar a favoritos:", error);
    }
  }

  const eliminarFavoritos = async (id) => {
    console.log("Eliminando de favoritos:", id);
    try{
      const id_usuario = localStorage.getItem("idusuario");
      fetch(`http://localhost:3001/api/favs/?userId=${id_usuario}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          id_producto: id,
        }),
      });

    } catch (error) {
      console.error("Error al eliminar de favoritos:", error);
    }
  }

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
        <img
          src={backgroundImage}
          alt="Flor decorativa"
          className="absolute left-0 w-1/3 md:w-1/4 z-0 opacity-15"
        />
        <div className="relative bg-white/80 backdrop-blur-sm shadow-sm w-full border-b border-gray-200/30">
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
                  <span className="mx-2 text-gray-400/80">&gt</span>
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
                  <span className="mx-2 text-gray-400/80">&gt</span>
                  <span className="text-gray-800/90 font-medium truncate max-w-[160px] md:max-w-[240px]">
                    {producto.titulo || producto.title}
                  </span>
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 py-4">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm p-4 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="relative mb-4 rounded-lg overflow-hidden border border-gray-200">
                  <img
                    src={
                      producto.imagenes && producto.imagenes.length > 0
                        ? producto.imagenes[imagenSeleccionada]
                        : producto.imagen || "https://via.placeholder.com/400"
                    }
                    alt={producto.titulo || producto.title}
                    className="w-full h-auto object-contain aspect-square"
                  />
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
                {producto.imagenes && producto.imagenes.length > 1 ? (
                  <div className="flex space-x-2 relative">
                    <button
                      onClick={() =>
                        setImagenSeleccionada(
                          Math.max(0, imagenSeleccionada - 1)
                        )
                      }
                      className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-1 shadow-md"
                    >
                      <FaChevronLeft className="text-gray-600" />
                    </button>
                    <div className="flex space-x-2 overflow-x-auto px-8">
                      {producto.imagenes.map((img, idx) => (
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
                            src={img}
                            alt={`${
                              producto.titulo || producto.title
                            } - vista ${idx + 1}`}
                            className="w-16 h-16 object-cover"
                          />
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() =>
                        setImagenSeleccionada(
                          Math.min(
                            producto.imagenes.length - 1,
                            imagenSeleccionada + 1
                          )
                        )
                      }
                      className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-1 shadow-md"
                    >
                      <FaChevronRight className="text-gray-600" />
                    </button>
                  </div>
                ) : null}
              </div>

              <div>
                <div className="mb-4">
                  <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
                    {producto.título || producto.title}
                  </h1>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-600 mr-2">
                      Vendido por:
                    </span>
                    <span className="text-sm font-medium text-gray-700 mr-1">
                      {producto.vendidoPor || producto.brand}
                    </span>
                    {producto.verificado && (
                      <BsPatchCheck
                        className="text-blue-500"
                        title="Vendedor verificado"
                      />
                    )}
                  </div>
                </div>

                <div className="flex items-center mb-6">
                  <div className="flex mr-2">
                    {renderEstrellas(
                      producto.calificacion || producto.rating || 0
                    )}
                  </div>
                  <span className="text-lg font-bold text-gray-800 mr-2">
                    {(producto.calificacion || producto.rating || 0).toFixed(1)}
                  </span>
                  <span className="text-sm text-gray-500">
                    ({producto.numCalificaciones || producto.reviewCount || 0}{" "}
                    calificaciones)
                  </span>
                </div>

                <div className="mb-6">
                  <div className="flex items-center">
                    <span className="text-2xl md:text-3xl font-bold text-gray-900">
                      {formatPrice(producto.precio || producto.price || 0)}
                    </span>
                    {(producto.descuento || producto.discount || 0) > 0 && (
                      <span className="ml-3 text-lg text-gray-500 line-through">
                        {formatPrice(
                          producto.precioOriginal || producto.originalPrice || 0
                        )}
                      </span>
                    )}
                  </div>
                  {producto.envioGratis && (
                    <p className="text-green-600 flex items-center mt-2">
                      <FaTruck className="mr-2" />
                      Envío gratis
                    </p>
                  )}
                  <div className="mt-2 text-sm">
                    <p className="text-gray-600">
                      Hasta 12 meses sin intereses de{" "}
                      <span className="font-semibold">
                        {formatPrice(
                          Math.round(
                            (producto.precio || producto.price || 0) / 12
                          )
                        )}
                      </span>
                    </p>
                    <button className="text-blue-600 font-medium hover:text-blue-700 mt-1">
                      Ver opciones de pago
                    </button>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-sm text-gray-600 mb-1">
                    Stock disponible:
                  </p>
                  <div className="flex items-center">
                    <span className="font-medium text-gray-800 mr-2">
                      {producto.stock || 0} unidades
                    </span>
                    {producto.stock < 5 && producto.stock > 0 && (
                      <span className="text-red-600 text-sm">
                        ¡Últimas disponibles!
                      </span>
                    )}
                  </div>
                </div>

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
                        setCantidad(Math.min(producto.stock || 0, cantidad + 1))
                      }
                      className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-r-md bg-gray-100 text-gray-700 hover:bg-gray-200"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                  <button
                    onClick={handleComprarAhora}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    Comprar ahora
                  </button>
                  <button
                    onClick={handleAgregarCarrito}
                    className={`flex items-center justify-center w-full font-semibold py-3 px-4 rounded-lg transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${
                      enCarrito
                        ? "bg-green-500 hover:bg-green-600 text-white"
                        : "bg-blue-500 hover:bg-blue-600 text-white"
                    }`}
                  >
                    <FaShoppingCart className="mr-2" />
                    {enCarrito ? "Agregado" : "Agregar al carrito"}
                  </button>
                </div>

                <div className="hidden md:flex justify-between mt-4 mb-6">
                  <button
                    onClick={toggleFavoritos}
                    className="flex items-center text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    {enFavoritos ? (
                      <FaHeart className="text-red-500 mr-2" />
                    ) : (
                      <FaHeart className="text-gray-400 mr-2" />
                    )}
                    <span>{enFavoritos ? "En Favoritos" : "Favoritos"}</span>
                  </button>
                  <button className="flex items-center text-gray-700 hover:text-gray-900 transition-colors">
                    <FaShare className="text-gray-400 mr-2" />
                    <span>Compartir</span>
                  </button>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h3 className="font-semibold text-gray-800 mb-3">
                    Beneficios de tu compra
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <FaTruck className="text-green-600 mt-1 mr-3" />
                      <span className="text-sm text-gray-600">
                        Envío gratis a todo México en compras mayores a{" "}
                        {formatPrice(499)}
                      </span>
                    </li>
                    <li className="flex items-start">
                      <FaShieldAlt className="text-blue-600 mt-1 mr-3" />
                      <span className="text-sm text-gray-600">
                        Garantía de {producto.garantia || "N/A"} directamente
                        con el fabricante
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
                {activeTab === "descripcion" && (
                  <div className="prose max-w-none">
                    <p className="text-gray-700 leading-relaxed">
                      {producto.descripcion ||
                        producto.description ||
                        "No hay descripción disponible."}
                    </p>
                    {producto.especificaciones && (
                      <div className="mt-6">
                        <h3 className="text-lg font-medium text-gray-800 mb-3">
                          Características destacadas
                        </h3>
                        <ul className="list-disc pl-5 space-y-2 text-gray-700">
                          <li>
                            Pantalla de{" "}
                            {producto.especificaciones.pantalla || "N/A"} con
                            colores vibrantes y gran nitidez
                          </li>
                          <li>
                            Procesador{" "}
                            {producto.especificaciones.procesador || "N/A"} de
                            última generación
                          </li>
                          <li>
                            Memoria RAM de{" "}
                            {producto.especificaciones.ram || "N/A"} para
                            multitarea fluida
                          </li>
                          <li>
                            Almacenamiento de{" "}
                            {producto.especificaciones.almacenamiento || "N/A"}{" "}
                            para todos tus archivos
                          </li>
                          <li>
                            Sistema de cámaras de{" "}
                            {producto.especificaciones.camaraPrincipal || "N/A"}{" "}
                            para fotos profesionales
                          </li>
                          <li>
                            Batería de{" "}
                            {producto.especificaciones.bateria || "N/A"} para
                            uso prolongado
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "especificaciones" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-medium text-gray-800 mb-4">
                        Especificaciones técnicas
                      </h3>
                      <table className="min-w-full border-collapse">
                        <tbody>
                          {Object.entries(producto.especificaciones || {}).map(
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
                                  {value || "N/A"}
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-800 mb-4">
                        Información adicional
                      </h3>
                      <div className="space-y-4">
                        <div className="border border-gray-200 rounded-lg p-4">
                          <h4 className="font-medium text-gray-800 mb-2">
                            Contenido del paquete
                          </h4>
                          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                            <li>
                              1 x{" "}
                              {producto.título || producto.title || "Producto"}
                            </li>
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
                            <li>
                              Garantía de fábrica: {producto.garantia || "N/A"}
                            </li>
                            <li>Soporte técnico: Disponible 24/7</li>
                            <li>
                              Devoluciones: {producto.devolucion || "N/A"}{" "}
                              después de recibido
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "opiniones" && (
                  <div>
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                      <div>
                        <h3 className="text-lg font-medium text-gray-800">
                          Opiniones de clientes
                        </h3>
                        <div className="flex items-center mt-1">
                          <div className="flex mr-2">
                            {renderEstrellas(
                              producto.calificacion || producto.rating || 0
                            )}
                          </div>
                          <span className="text-lg font-bold text-gray-800 mr-2">
                            {(
                              producto.calificacion ||
                              producto.rating ||
                              0
                            ).toFixed(1)}
                          </span>
                          <span className="text-sm text-gray-500">
                            (
                            {producto.numCalificaciones ||
                              producto.reviewCount ||
                              0}{" "}
                            calificaciones)
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
                    {comentarios.length > 0 && (
                      <div className="mt-6 text-center">
                        <button className="text-blue-600 font-medium hover:text-blue-700">
                          Ver más opiniones
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "preguntas" && (
                  <div>
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                      <h3 className="text-lg font-medium text-gray-800">
                        Preguntas y respuestas
                      </h3>
                      <button className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                        Hacer una pregunta
                      </button>
                    </div>
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
                        src={
                          producto.imagenes[0] ||
                          "https://via.placeholder.com/400"
                        }
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
                          {renderEstrellas(producto.calificacion || 0)}
                        </div>
                        <span className="text-xs text-gray-600 ml-1">
                          ({producto.numCalificaciones || 0})
                        </span>
                      </div>
                      <div className="mt-2">
                        <span className="text-lg font-bold text-gray-900">
                          {formatPrice(producto.precio || 0)}
                        </span>
                        {producto.precioOriginal && (
                          <span className="ml-2 text-sm text-gray-500 line-through">
                            {formatPrice(producto.precioOriginal)}
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
                      Tus pagos están protegidos con encriptación SSL de 256
                      bits.
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
      </div>
      <Footer />
    </>
  );
};

export default VerArticulo;
