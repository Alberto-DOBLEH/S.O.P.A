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
} from "../assets/imagenes/imagenesslider";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Login from "./Login"; // Importa tu componente Login existente
import { ICONS } from "../assets/iconos/iconos";
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
} from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { IoMdHelp } from "react-icons/io";
import { RiCouponLine } from "react-icons/ri";

// CATEGORÍAS
const CATEGORIES = [
  { icon: ICONS.smartphones, label: "Smartphones", path: "/telefonos" },
  { icon: ICONS.perifericos, label: "Periféricos", path: "/perifericos" },
  { icon: ICONS.laptops, label: "Laptops", path: "/laptops" },
  { icon: ICONS.camaras, label: "Cámaras", path: "/camaras" },
  { icon: ICONS.televisores, label: "Televisores", path: "/televisores" },
  { icon: ICONS.hogar, label: "Hogar", path: "/hogar" },
  { icon: ICONS.deportes, label: "Deportes", path: "/deportes" },
  { icon: ICONS.vehiculos, label: "Vehículos", path: "/vehiculos" },
  { icon: ICONS.videojuegos, label: "Videojuegos", path: "/videojuegos" },
  { icon: ICONS.ropa, label: "Ropa", path: "/ropa" },
  { icon: ICONS.zapatos, label: "Zapatos", path: "/zapatos" },
  { icon: ICONS.juguetes, label: "Juguetes", path: "/juguetes" },
  {
    icon: <BiCategory size={24} />,
    label: "Instrumentos",
    path: "/instrumentos",
  },
  { icon: <BiCategory size={32} />, label: "Libros", path: "/libros" },
  { icon: <BiCategory size={32} />, label: "Bebés", path: "/bebes" },
  { icon: <BiCategory size={32} />, label: "Mascotas", path: "/mascotas" },
  { icon: <BiCategory size={32} />, label: "Cocina", path: "/cocina" },
  { icon: <BiCategory size={32} />, label: "Baño", path: "/bano" },
  { icon: <BiCategory size={32} />, label: "Viajes", path: "/viajes" },
  { icon: <BiCategory size={32} />, label: "Jardín", path: "/jardin" },
  { icon: <BiCategory size={32} />, label: "Fitness", path: "/fitness" },
  { icon: <BiCategory size={32} />, label: "Bebidas", path: "/bebidas" },
  { icon: <BiCategory size={32} />, label: "Alimentos", path: "/alimentos" },
  { icon: <BiCategory size={32} />, label: "Regalos", path: "/regalos" },
  { icon: <BiCategory size={32} />, label: "Audio", path: "/audio" },
  { icon: <BiCategory size={32} />, label: "Tablets", path: "/tablets" },
  {
    icon: <BiCategory size={32} />,
    label: "Computadoras",
    path: "/computadoras",
  },
  { icon: <BiCategory size={32} />, label: "Teclados", path: "/teclados" },
  { icon: <BiCategory size={32} />, label: "Mouses", path: "/mouses" },
];

// ANUNCIOS
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
];

// CONFIGURACIÓN SLIDER
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
    logout: () => {
      console.log("Cerrando sesión");
      navigate("/logout");
    },
    buscar: (term) => navigate(`/buscar?q=${encodeURIComponent(term)}`),
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

  // const SearchBar = () => (
  //   <div className="w-full max-w-3xl mx-auto mb-2">
  //     <form onSubmit={handleSearch} className="relative flex items-center">
  //       <input
  //         type="text"
  //         value={searchTerm}
  //         onChange={(e) => setSearchTerm(e.target.value)}
  //         placeholder="Buscar productos, categorías, marcas..."
  //         className="w-full px-4 py-2 pl-10 pr-16 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#123e9d] focus:border-transparent"
  //       />
  //       <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
  //         <FaSearch className="text-gray-500" />
  //       </div>
  //       <button
  //         type="submit"
  //         className="absolute right-2 bg-[#123e9d] text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-colors text-sm"
  //       >
  //         Buscar
  //       </button>
  //     </form>
  //   </div>
  // );

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

    return (
      <header className="bg-[#cae8ff] border-b border-blue-200 shadow-md">
        <div className=" mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-full flex flex-col md:flex-row justify-between items-center py-4">
            {/* Logo en la esquina izquierda */}
            <div className="order-2 md:order-1 w-full md:w-auto flex justify-center md:justify-start">
              <div
                className="cursor-pointer transition-transform duration-300 hover:scale-105"
                onClick={navigateTo.home}
              >
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
  // const Categorias = () => {
  //   const [showLeftButton, setShowLeftButton] = useState(false);
  //   const [showRightButton, setShowRightButton] = useState(true);
  //   const categoriesContainerRef = useRef(null);

  //   const handleCategoryClick = (path) => {
  //     navigate(path);
  //   };

  //   const verificarPosicionScroll = () => {
  //     if (categoriesContainerRef.current) {
  //       const { scrollLeft, scrollWidth, clientWidth } =
  //         categoriesContainerRef.current;
  //       setShowLeftButton(scrollLeft > 0);
  //       setShowRightButton(scrollLeft < scrollWidth - clientWidth - 1);
  //     }
  //   };

  //   const scrollCategories = (direction) => {
  //     if (categoriesContainerRef.current) {
  //       const scrollAmount = 300;
  //       const newScrollLeft =
  //         direction === "left"
  //           ? categoriesContainerRef.current.scrollLeft - scrollAmount
  //           : categoriesContainerRef.current.scrollLeft + scrollAmount;

  //       categoriesContainerRef.current.scrollTo({
  //         left: newScrollLeft,
  //         behavior: "smooth",
  //       });
  //     }
  //   };

  //   useEffect(() => {
  //     const container = categoriesContainerRef.current;
  //     const preventNativeScroll = (e) => {
  //       if (e.deltaY === 0) return;
  //       if (
  //         (e.deltaY < 0 && container.scrollLeft <= 0) ||
  //         (e.deltaY > 0 &&
  //           container.scrollLeft >=
  //             container.scrollWidth - container.clientWidth)
  //       ) {
  //         e.preventDefault();
  //       }
  //     };

  //     if (container) {
  //       container.addEventListener("wheel", preventNativeScroll, {
  //         passive: false,
  //       });
  //     }

  //     verificarPosicionScroll();
  //     window.addEventListener("resize", verificarPosicionScroll);

  //     return () => {
  //       if (container) {
  //         container.removeEventListener("wheel", preventNativeScroll);
  //       }
  //       window.removeEventListener("resize", verificarPosicionScroll);
  //     };
  //   }, []);

  //   return (
  //     <div className="flex items-center relative mb-4 w-full">
  //       <h2 className="text-xl font-bold uppercase mb-2">Categorías</h2>
  //       <div className="relative w-full">
  //         <div
  //           ref={categoriesContainerRef}
  //           className="flex overflow-x-auto space-x-4 pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] relative w-full px-8"
  //           onScroll={verificarPosicionScroll}
  //         >
  //           {CATEGORIES.map((category) => (
  //             <button
  //               key={category.path}
  //               onClick={() => handleCategoryClick(category.path)}
  //               className="flex-shrink-0 bg-white p-4 rounded-lg shadow hover:shadow-md flex flex-col items-center justify-center hover:bg-gray-50 border border-gray-200 w-[150px] h-[150px] hover:scale-90 transition-transform duration-200"
  //             >
  //               <span className="text-2xl mb-2">{category.icon}</span>
  //               <span className="text-sm font-medium text-gray-700 uppercase">
  //                 {category.label}
  //               </span>
  //             </button>
  //           ))}
  //         </div>

  //         {showLeftButton && (
  //           <button
  //             onClick={() => scrollCategories("left")}
  //             className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-200 shadow-md rounded-full p-2 hover:scale-110 transition-transform duration-200 z-10"
  //             aria-label="Categorías anteriores"
  //           >
  //             <ChevronRight className="text-gray-600 rotate-180" size={24} />
  //           </button>
  //         )}

  //         {showRightButton && (
  //           <button
  //             onClick={() => scrollCategories("right")}
  //             className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-200 shadow-md rounded-full p-2 hover:scale-110 transition-transform duration-200 z-10"
  //             aria-label="Más categorías"
  //           >
  //             <ChevronRight className="text-gray-600" size={24} />
  //           </button>
  //         )}
  //       </div>
  //     </div>
  //   );
  // };

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
        setShowLeftButton(scrollLeft > 5); // Pequeño umbral para mostrar el botón izquierdo
        setShowRightButton(scrollLeft < scrollWidth - clientWidth - 5); // Pequeño umbral para el botón derecho
      }
    };

    const scrollCategories = (direction) => {
      if (categoriesContainerRef.current) {
        // Calculamos el tamaño de cada tarjeta (incluyendo margen)
        const cardWidth = 140; // Ancho aproximado de cada tarjeta con margen
        const scrollAmount =
          direction === "left" ? -cardWidth * 3 : cardWidth * 3; // Desplazamiento de 3 tarjetas

        categoriesContainerRef.current.scrollBy({
          left: scrollAmount,
          behavior: "smooth",
        });

        // Actualizamos después del scroll para mostrar/ocultar botones correctamente
        setTimeout(checkScrollPosition, 500);
      }
    };

    useEffect(() => {
      const container = categoriesContainerRef.current;

      // Prevenir scroll vertical cuando se usa la rueda para scroll horizontal
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
      <div className="flex items-center mb-8 w-full relative">
        {/* Título centrado verticalmente */}
        <h2 className="text-xl font-bold uppercase mr-4 text-gray-800 w-36 flex-shrink-0 self-center">
          CATEGORÍAS
        </h2>

        {/* Contenedor del carrusel que ocupa el resto del espacio */}
        <div className="flex-grow relative">
          <div
            ref={categoriesContainerRef}
            className="flex overflow-x-auto space-x-4 pb-4 pt-2 px-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth"
            onScroll={checkScrollPosition}
          >
            {CATEGORIES.map((category) => (
              <button
                key={category.path}
                onClick={() => handleCategoryClick(category.path)}
                className="flex-shrink-0 bg-white p-4 rounded-lg shadow hover:shadow-md flex flex-col items-center justify-center w-32 h-32 hover:bg-gray-50 border border-gray-200 transition-all duration-200 hover:scale-95"
              >
                <span className="text-2xl mb-2">{category.icon}</span>
                <span className="text-sm font-medium text-gray-700 uppercase">
                  {category.label}
                </span>
              </button>
            ))}
          </div>

          {showLeftButton && (
            <button
              onClick={() => scrollCategories("left")}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-100 shadow-md rounded-full p-2 hover:scale-110 transition-transform duration-200 z-10"
              aria-label="Categorías anteriores"
            >
              <ChevronLeft className="text-gray-600" size={20} />
            </button>
          )}

          {showRightButton && (
            <button
              onClick={() => scrollCategories("right")}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-100 shadow-md rounded-full p-2 hover:scale-110 transition-transform duration-200 z-10"
              aria-label="Más categorías"
            >
              <ChevronRight className="text-gray-600" size={20} />
            </button>
          )}
        </div>
      </div>
    );
  };

  const Anuncios = () => (
    <section className="mb-12">
      <h2 className="text-center text-2xl font-bold mb-4">
        Anuncios de Temporada
      </h2>
      <div className="w-full mx-auto">
        <Slider {...SLIDER_SETTINGS}>
          {ANUNCIOS.map((anuncio, index) => (
            <div key={index} className="px-2">
              <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                <div className="relative h-64 md:h-72 overflow-hidden bg-gradient-to-r from-blue-100 via-yellow-100 to-orange-100">
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

  const Footer = () => (
    <footer className="py-8 flex justify-center items-center">
      <img src={logoLetras} alt="SOAP Logo" className="w-[150px]" />
    </footer>
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
