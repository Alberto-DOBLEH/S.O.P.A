import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaStar,
  FaShoppingCart,
  FaHeart,
  FaShare,
  FaTruck,
  FaShieldAlt,
  FaCreditCard,
  FaStore,
  FaMapMarkerAlt,
  FaUser,
  FaBell,
  FaSearch,
  FaShopify,
  FaHistory,
  FaCog,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
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
} from "react-icons/fa";
import { IoMdHelp } from "react-icons/io";
import { BsPatchCheck } from "react-icons/bs";
import { RiCouponLine } from "react-icons/ri";
import { FaTag, FaListUl } from "react-icons/fa";
import { toast } from "react-toastify";
import logoCompleto from "../assets/imagenes/logo-completo.png";

const Header = () => {
  // 🚀 HOOKS DE NAVEGACIÓN Y ESTADO
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [cartCount, setCartCount] = useState(3);
  const [showCategories, setShowCategories] = useState(false);
  const [showOpciones, setShowOpciones] = useState(false);
  const [userName] = useState("Usuario Ejemplo");

  // 📍 REFERENCIAS PARA ELEMENTOS DEL DOM
  const headerRef = useRef(null);
  const menuScrollRef = useRef(null);
  const menuRef = useRef(null);

  // 🎛️ ESTADOS PARA CONTROL DE SCROLL Y VISIBILIDAD
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // 🔄 EFECTO: Verificar si es posible hacer scroll en el menú horizontal
  useEffect(() => {
    const checkScroll = () => {
      if (menuScrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = menuScrollRef.current;
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5); // 5px de margen
      }
    };

    checkScroll();
    window.addEventListener("resize", checkScroll);
    menuScrollRef.current?.addEventListener("scroll", checkScroll);

    return () => {
      window.removeEventListener("resize", checkScroll);
      menuScrollRef.current?.removeEventListener("scroll", checkScroll);
    };
  }, []);

  // 👁️ EFECTO: Controlar visibilidad del header según scroll de la página
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 150) {
        // Scrolleando hacia abajo y pasó la altura del header - ocultar header
        setHeaderVisible(false);
      } else {
        // Scrolleando hacia arriba o en la parte superior - mostrar header
        setHeaderVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // ↔ FUNCIÓN: Desplazar menú horizontal
  const scrollMenu = (direction) => {
    if (menuScrollRef.current) {
      const scrollAmount = 200; // píxeles a desplazar
      menuScrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  //  OBJETO: Funciones de navegación centralizadas
  const navigateTo = {
    home: () => navigate("/"),
    carrito: () => navigate("/carrito"),
    cuenta: () => navigate("/mi-cuenta"),
    notificaciones: () => navigate("/notificaciones"),
    categoria: (path) => navigate(path),
    perfil: () => navigate("/mi-perfil"),
    favoritos: () => navigate("/favoritos"),
    venta: () => navigate("/vender-articulo"),
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

  //  FUNCIÓN: Manejar búsqueda mejorada
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/buscar?q=${encodeURIComponent(searchTerm.trim())}`);
      setShowCategories(false);
    }
  };

  //  FUNCIÓN: Toggle del menú de categorías
  const toggleCategories = (e) => {
    e.stopPropagation();
    setShowCategories(!showCategories);
  };

  // 🎛️ FUNCIONES: Manejar menú de opciones de usuario
  const toggleMenu = () => setShowOpciones(!showOpciones);
  const handleMouseEnter = () => setShowOpciones(true);
  const handleMouseLeave = () => setShowOpciones(false);
  const handleCarritoClick = () => {
    navigateTo.carrito();
    setShowOpciones(false);
  };

  // 🏷️ DATOS: Grupos de categorías organizadas
  const categoryGroups = [
    {
      title: "Tecnología",
      categories: [
        { icon: <FaMobileAlt />, label: "Smartphones", path: "/telefonos" },
        { icon: <FaLaptop />, label: "Laptops", path: "/laptops" },
        { icon: <FaDesktop />, label: "Computadoras", path: "/computadoras" },
        { icon: <FaTabletAlt />, label: "Tablets", path: "/tablets" },
        { icon: <FaTv />, label: "Televisores", path: "/televisores" },
      ],
    },
    {
      title: "Hogar",
      categories: [
        { icon: <FaHome />, label: "Hogar", path: "/hogar" },
        { icon: <FaUtensils />, label: "Cocina", path: "/cocina" },
        { icon: <FaBath />, label: "Baño", path: "/bano" },
      ],
    },
    {
      title: "Moda",
      categories: [
        { icon: <FaTshirt />, label: "Ropa", path: "/ropa" },
        { icon: <FaShoePrints />, label: "Zapatos", path: "/zapatos" },
      ],
    },
    {
      title: "Otros",
      categories: [
        { icon: <FaGamepad />, label: "Videojuegos", path: "/videojuegos" },
        { icon: <FaBook />, label: "Libros", path: "/libros" },
        { icon: <FaGift />, label: "Regalos", path: "/regalos" },
      ],
    },
  ];

  // 🎯 COMPONENTE: Barra de búsqueda mejorada
  const SearchBar = () => (
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

  return (
    <header
      className={`w-full transition-transform duration-300 ${
        headerVisible ? "translate-y-0" : "-translate-y-full"
      }`}
      style={{ position: "sticky", top: 0, zIndex: 50 }}
    >
      {/* 🎨 BARRA PRINCIPAL CON LOGO, BÚSQUEDA Y ACCIONES */}
      <div className="bg-[#cae8ff] border-b border-blue-200 shadow-md opacity-80">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-full flex flex-col md:flex-row justify-between items-center py-4">
            {/* LOGO EN LA ESQUINA IZQUIERDA */}
            <div className="order-2 md:order-1 w-full md:w-auto flex justify-center md:justify-start">
              <div className="cursor-pointer" onClick={navigateTo.home}>
                <img src={logoCompleto} alt="SOAP Logo" className="w-40 h-12" />
              </div>
            </div>

            {/* BARRA DE BÚSQUEDA EN EL CENTRO */}
            <div className="order-1 md:order-2 w-full md:max-w-3xl mx-0 md:mx-8 mb-4 md:mb-0">
              <SearchBar />
            </div>

            {/* BOTONES DE ACCIÓN EN LA ESQUINA DERECHA */}
            <div className="order-3 md:order-3 flex items-center space-x-3">
              {/* BOTÓN DE CARRITO DE COMPRAS */}
              <button
                className="bg-blue-600 p-3.5 rounded-full text-white shadow-md transition-all duration-200 relative z-10 hover:bg-[#edf6f9] hover:text-blue-600"
                onClick={navigateTo.carrito}
                aria-label="Carrito de compras"
              >
                <FaShoppingCart className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                  {cartCount}
                </span>
              </button>

              {/* BOTÓN DE PERFIL */}
              <button
                onClick={navigateTo.perfil}
                className="bg-blue-600 p-2 rounded-full text-white shadow-md transition-all duration-200 hover:bg-[#edf6f9] hover:text-blue-600 flex flex-col items-center justify-center w-16 h-16"
                aria-label="Perfil de usuario"
              >
                <FaUser className="w-6 h-6 mb-1" />
                <span className="text-xs">Perfil</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 🎨 BARRA DE CATEGORÍAS CON SCROLL HORIZONTAL */}
      {/* <div className="bg-yellow-400 text-blue-900 w-full">
       */}
      <div className="bg-[#f4f6fc] text-blue-900 w-full opacity-80">
        <div className="w-full px-2 py-1">
          <div className="flex items-center space-x-2">
            {/* Botón de Categorías */}
            <button
              className="font-bold py-1 text-sm flex items-center whitespace-nowrap"
              onClick={toggleCategories}
            >
              <span>Categorías</span>
              <FaChevronDown className="ml-1" size={14} />
            </button>

            {/* Botones de navegación */}
            <div className="flex items-center space-x-3 overflow-x-auto">
              <button
                className="flex items-center text-s whitespace-nowrap"
                onClick={navigateTo.cuenta}
              >
                <FaUser className="mr-1" size={12} /> Mi Cuenta
              </button>
              <button
                className="flex items-center text-s whitespace-nowrap"
                onClick={navigateTo.favoritos}
              >
                <FaHeart className="mr-1" size={12} /> Favoritos
              </button>
              <button
                className="flex items-center text-s whitespace-nowrap"
                onClick={navigateTo.notificaciones}
              >
                <FaBell className="mr-1" size={12} /> Notificaciones
              </button>
              <button
                className="flex items-center text-s whitespace-nowrap"
                onClick={navigateTo.historial}
              >
                <FaHistory className="mr-1" size={12} /> Historial
              </button>
              <button
                className="flex items-center text-s whitespace-nowrap"
                onClick={navigateTo.pedidos}
              >
                <FaStore className="mr-1" size={12} /> Pedidos
              </button>
              <button
                className="flex items-center text-s whitespace-nowrap"
                onClick={navigateTo.tarjetas}
              >
                <FaCreditCard className="mr-1" size={12} /> Tarjetas
              </button>
              <button
                className="flex items-center text-s whitespace-nowrap"
                onClick={navigateTo.venta}
              >
                <FaShopify className="mr-1" size={12} /> Vender
              </button>
              <button
                className="flex items-center text-s whitespace-nowrap"
                onClick={navigateTo.cupones}
              >
                <RiCouponLine className="mr-1" size={12} /> Cupones
              </button>
              <button
                className="flex items-center text-s whitespace-nowrap"
                onClick={() => navigateTo.categoria("/ofertas")}
              >
                <FaTag className="mr-1" size={12} /> Ofertas
              </button>
              <button
                className="flex items-center text-s whitespace-nowrap"
                onClick={navigateTo.listaDeseos}
              >
                <FaListUl className="mr-1" size={12} /> Deseos
              </button>
              <button
                className="flex items-center text-s whitespace-nowrap"
                onClick={navigateTo.listaCompras}
              >
                <FaClipboardList className="mr-1" size={12} /> Compras
              </button>
              <button
                className="flex items-center text-s whitespace-nowrap"
                onClick={navigateTo.ayuda}
              >
                <IoMdHelp className="mr-1" size={12} /> Ayuda
              </button>
              <button
                className="flex items-center text-s whitespace-nowrap"
                onClick={navigateTo.soporte}
              >
                <FaHeadset className="mr-1" size={12} /> Soporte
              </button>
              <button
                className="flex items-center text-s whitespace-nowrap"
                onClick={navigateTo.configuracion}
              >
                <FaCog className="mr-1" size={12} /> Configuración
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 📂 MENÚ DESPLEGABLE DE CATEGORÍAS - ANCHO COMPLETO */}
      {showCategories && (
        <div
          className="absolute w-full shadow-2xl border border-gray-200 z-50 rounded-lg overflow-hidden"
          style={{ backgroundColor: "#f4f6fc" }}
        >
          <div className="w-full px-6 py-6 grid grid-cols-1 md:grid-cols-4 gap-8">
            {categoryGroups.map((group, index) => (
              <div
                key={index}
                className="border-r border-gray-200 last:border-r-0 pr-6 last:pr-0 hover:bg-gradient-to-b hover:from-blue-50 hover:to-indigo-50 rounded-lg p-4 transition-all duration-300"
              >
                <h3 className="font-bold text-xl mb-4 text-transparent bg-gradient-to-r from-blue-800 to-indigo-900 bg-clip-text">
                  {group.title}
                </h3>
                <ul className="space-y-3">
                  {group.categories.map((category, idx) => (
                    <li key={idx}>
                      <button
                        className="flex items-center w-full text-left py-2 px-3 rounded-lg hover:bg-gradient-to-r hover:from-blue-100 hover:to-indigo-100 hover:shadow-md transition-all duration-200 group"
                        onClick={() => {
                          navigateTo.categoria(category.path);
                          setShowCategories(false);
                        }}
                      >
                        <span
                          className={`mr-3 transform group-hover:scale-110 transition-all duration-200 ${
                            idx % 6 === 0
                              ? "text-red-400 group-hover:text-red-300"
                              : idx % 6 === 1
                              ? "text-green-400 group-hover:text-green-300"
                              : idx % 6 === 2
                              ? "text-blue-400 group-hover:text-blue-300"
                              : idx % 6 === 3
                              ? "text-yellow-400 group-hover:text-yellow-300"
                              : idx % 6 === 4
                              ? "text-purple-400 group-hover:text-purple-300"
                              : "text-pink-400 group-hover:text-pink-300"
                          }`}
                        >
                          {category.icon}
                        </span>
                        <span className="text-gray-700 group-hover:text-indigo-800 font-medium">
                          {category.label}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
