import React, { useState, useRef, useEffect } from "react";
import Button from "../components/UI/Button";
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
import { icons } from "../assets/iconos/iconos"; //Todos los iconos
import { ChevronRight } from "lucide-react";
import Login from "./Login";
// Importación correcta de react-slick
import Slider from "react-slick";
// Importación correcta de los estilos
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Datos estáticos fuera del componente
const CATEGORIES = [
  { icon: icons.telefono, label: "Smartphones", path: "/telefonos" },
  { icon: icons.perifericos, label: "Periféricos", path: "/perifericos" },
  { icon: icons.laptop, label: "Laptops", path: "/laptops" },
  { icon: icons.camara, label: "Cámaras", path: "/camaras" },
  { icon: icons.tv, label: "Televisores", path: "/televisores" },
  { icon: icons.hogar, label: "Hogar", path: "/hogar" },
  { icon: icons.deportes, label: "Deportes", path: "/deportes" },
  { icon: icons.vehiculo, label: "Vehículos", path: "/vehiculos" },
  { icon: icons.videojuego, label: "Videojuegos", path: "/videojuegos" },
  { icon: icons.juegomesa, label: "Juegos de Mesa", path: "/juegomesa" },
  { icon: icons.herramientas, label: "Herramientas", path: "/herramientas" },
];

// Datos de anuncios actualizados con miniaturas y tags
const ANUNCIOS = [
  {
    imagen: dobleh2023,
    alt: "Oferta de productos de oficina",
    tag: "FULL",
    tagColor: "bg-green-500",
    tagIcon: "⚡",
    badge: "ENVÍOS RÁPIDOS",
    miniaturas: [
      { img: icons.silla, alt: "Silla de oficina" },
      { img: icons.herramientas, alt: "Herramientas" },
      { img: icons.carrito, alt: "Embalaje" },
      { img: icons.opciones, alt: "Silla ergonómica" },
    ],
  },
  {
    imagen: desaparecido,
    alt: "Ventiladores y productos para el calor",
    tag: "OFERTA",
    tagColor: "bg-red-500",
    miniaturas: [
      { img: icons.hogar, alt: "Piscina inflable" },
      { img: icons.laptop, alt: "Control Xbox" },
      { img: icons.tv, alt: "Ventilador" },
      { img: icons.herramientas, alt: "Ventilador portátil" },
    ],
  },
  {
    imagen: losFondo,
    alt: "Productos para mascotas",
    tag: "NUEVO",
    tagColor: "bg-blue-500",
    badge: "20% DESCUENTO",
    miniaturas: [
      { img: icons.juegomesa, alt: "Alimento para perros" },
      { img: icons.herramientas, alt: "Alimento para gatos" },
      { img: icons.hogar, alt: "Casa para perros" },
      { img: icons.deportes, alt: "Limpiador" },
    ],
  },
  {
    imagen: alanSombrero,
    alt: "Sombreros",
    tag: "Sabor a Mexico",
    tagIcon: "🌮",
    tagColor: "bg-blue-500",
    badge: "CLICK YA!!",
    miniaturas: [
      { img: icons.juegomesa, alt: "Alimento para perros" },
      { img: icons.herramientas, alt: "Alimento para gatos" },
      { img: icons.hogar, alt: "Casa para perros" },
      { img: icons.deportes, alt: "Limpiador" },
    ],
  },
];

// Configuración del slider con comentarios explicativos
const SLIDER_SETTINGS = {
  dots: true, // Muestra puntos de navegación
  infinite: true, // Desplazamiento infinito
  speed: 500, // Velocidad de transición
  slidesToShow: 1, // Muestra un slide a la vez
  slidesToScroll: 1, // Desplaza de uno en uno
  autoplay: true, // Cambio automático habilitado
  autoplaySpeed: 5000, // 5 segundos entre transiciones
  pauseOnHover: true, // Pausa al hacer hover
  // arrows: true, // Muestra flechas de navegación
  fade: false, // Efecto fade desactivado
  responsive: [
    // Configuración responsive
    {
      breakpoint: 1024, // Para pantallas grandes
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 768, // Para tablets
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480, // Para móviles
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false, // Oculta flechas en móviles
        dots: true, // Muestra puntos en móviles
      },
    },
  ],
};

const MainPage = () => {
  // Estados
  const [showCarrito, setShowCarrito] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showOpciones, setShowOpciones] = useState(false);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // Nuevo estado para búsqueda

  // Refs
  const categoriesContainerRef = useRef(null);
  const menuRef = useRef(null);
  const timeoutRef = useRef(null);

  // Verificar posición del scroll para mostrar/ocultar botones de navegación
  const verificarPosicionScroll = () => {
    if (categoriesContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        categoriesContainerRef.current;
      setShowLeftButton(scrollLeft > 0);
      setShowRightButton(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  // Handlers
  const handleCategoryClick = (path) => {
    // Implementa la lógica de navegación
    console.log(`Navegando a ${path}`);
  };

  // Handler para búsqueda
  const handleSearch = (e) => {
    e.preventDefault();
    console.log(`Buscando: ${searchTerm}`);
    // Aquí implementarás la lógica de búsqueda
  };

  // Cierra el menú cuando se hace clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        // Si el clic fue fuera del menú, cierra el menú
        setShowOpciones(false);
      }
    };

    // mousedown verifica si el objetivo del clic está dentro del menú (referenciado por menuRef).

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Efecto para configurar event listeners(para el scroll categorias
  useEffect(() => {
    verificarPosicionScroll();
    window.addEventListener("resize", verificarPosicionScroll);
    return () => window.removeEventListener("resize", verificarPosicionScroll);
  }, []);

  // Control de hover para el menú
  // Abre el menú cuando el cursor entra en él.
  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setShowOpciones(true);
  };
  // Cierra el menú con un pequeño retraso cuando el cursor sale de él.
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setShowOpciones(false);
    }, 300);
  };

  const toggleMenu = () => {
    setShowOpciones(!showOpciones);
  };

  // Scroll horizontal para categorías
  const scrollCategories = (direction) => {
    if (categoriesContainerRef.current) {
      const scrollAmount = 300;
      categoriesContainerRef.current.scrollBy({
        left: direction === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });

      setTimeout(verificarPosicionScroll, 300);
    }
  };

  // Efecto para configurar event listeners
  useEffect(() => {
    verificarPosicionScroll();
    window.addEventListener("resize", verificarPosicionScroll);
    return () => window.removeEventListener("resize", verificarPosicionScroll);
  }, []);

  const MenuOpciones = () => (
    <div
      ref={menuRef}
      className="absolute right-0 mt-2 w-64 bg-[#edf6f9] rounded-lg shadow-xl z-50 border border-gray-200 overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Sección superior con información del usuario */}
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center">
          <img
            src={icons.usuario}
            alt="Usuario"
            className="w-10 h-10 rounded-full mr-3 border border-gray-200"
          />
          <div>
            <p className="font-medium text-gray-900">guillermoeye</p>
            <p className="text-xs text-gray-500">Usuario</p>
          </div>
        </div>
      </div>

      {/* Lista de opciones */}
      <div className="max-h-96 overflow-y-auto">
        {/* Grupos de opciones... (mantener igual que en tu código) */}
      </div>
    </div>
  );

  const MenuItem = ({ icon, text, onClick, highlight = false }) => (
    <button
      className={`w-full text-left px-3 py-2 text-sm ${
        highlight ? "text-red-600" : "text-gray-700"
      } hover:bg-gray-100 rounded flex items-center`}
      onClick={onClick}
    >
      <img src={icon} alt={text} className="w-5 h-5 mr-3" />
      {text}
    </button>
  );

  // Componente de barra de búsqueda
  const SearchBar = () => (
    <div className="w-full max-w-3xl mx-auto mb-2">
      <form onSubmit={handleSearch} className="relative flex items-center">
        {/* Input de búsqueda */}
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar productos, categorías, marcas..."
          className="w-full px-4 py-2 pl-10 pr-16 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#123e9d] focus:border-transparent"
        />

        {/* Icono de búsqueda */}
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          <img
            src={icons.buscar || icons.telefono}
            alt="Buscar"
            className="w-5 h-5 text-gray-500"
          />
        </div>

        {/* Botón de búsqueda */}
        <button
          type="submit"
          className="absolute right-2 bg-[#123e9d] text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-colors text-sm"
        >
          Buscar
        </button>
      </form>
    </div>
  );

  // Componente Header con barra de búsqueda
  const Header = () => (
    <header className="flex flex-col md:flex-row justify-between items-start p-6 md:p-6 bg-[#cae8ff] shadow-md">
      <div className="w-full flex flex-col md:flex-row justify-between items-center">
        {/* Logo de la empresa */}
        <img
          src={logoCompleto}
          alt="SOAP Logo"
          className="h-10 md:h-14 hover:scale-105 transition-transform duration-200 mb-4 md:mb-0"
        />

        {/* Barra de búsqueda */}
        <div className="w-full mt-4 md:mt-4">
          <SearchBar />
        </div>

        {/* Contenedor de botones del encabezado */}
        <div className="flex space-x-2 md:space-x-4">
          {/* B O T O N   C A R R I T O */}
          {/* <Button
            className="bg-[#123e9d]"
            onClick={() => setShowCarrito(true)}
            // aria-label="Carrito de compras"
          >
            <img
              src={icons.carrito}
              alt="Carrito"
              className="hover:scale-90 hover:bg-[#edf6f9] transition-transform duration-200 w-6 h-6 "
              // onError={(e) => {
              //   e.target.onerror = null;
              //   e.target.src = "/ruta/alternativa/carrito.png";
              // }}
            />
          </Button> */}
          <Button
            className="bg-[#123e9d] p-2 hover:scale-90 hover:bg-[#edf6f9] transition-transform duration-200" // Añade padding consistente
            onClick={() => setShowCarrito(true)}
            aria-label="Carrito de compras"
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <img
                src={icons.carrito}
                alt="Carrito"
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/default-icons/carrito.png";
                }}
              />
            </div>
          </Button>

          {/* B O T O N   L O G I N */}
          <Button
            onClick={() => setShowLogin(true)}
            className="hover:bg-[#edf6f9] hover:text-black hover:scale-90 transition-transform duration-200 bg-[#123e9d] text-white"
          >
            Login
          </Button>

          {/* B O T O N   O P C I O N E S */}
          {/* Botón Opciones con menú desplegable */}
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Button
              onClick={toggleMenu}
              className="hover:bg-[#edf6f9] transition-colors relative z-10 p-2 bg-[#123e9d]"
              aria-label="Menú de opciones"
              aria-expanded={showOpciones}
            >
              <div className="w-6 h-6 flex items-center justify-center">
                <img
                  src={icons.opciones || "/default-icons/opciones.png"}
                  alt="Menú de opciones"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/default-icons/opciones.png";
                  }}
                />
              </div>
            </Button>

            {showOpciones && (
              <div
                ref={menuRef}
                className="absolute right-0 mt-2 w-64 bg-[#edf6f9] rounded-lg shadow-xl z-50 border border-gray-200 overflow-hidden"
              >
                {/* Sección superior con información del usuario */}
                <div className="p-4 border-b border-gray-200 bg-gray-50">
                  <div className="flex items-center">
                    <img
                      src={icons.usuario}
                      alt="Usuario"
                      className="w-10 h-10 rounded-full mr-3 border border-gray-200"
                    />
                    <div>
                      <p className="font-medium text-gray-900">nombrePerfil</p>
                      {/* <p className="text-xs text-gray-500">Canal</p> */}
                      <p className="text-xs text-gray-500">Comprador</p>
                    </div>
                  </div>
                </div>

                {/* Lista de opciones */}
                <div className="max-h-96 overflow-y-auto">
                  {/* Opciones del usuario */}
                  <div className="p-2">
                    <MenuItem
                      icon={icons.usuario}
                      text="Mi perfil"
                      onClick={() => console.log("Mi perfil")}
                    />
                    <MenuItem
                      icon={icons.carrito}
                      text="Mis compras"
                      onClick={() => console.log("Mis compras")}
                    />
                    <MenuItem
                      icon={icons.opciones}
                      text="Configuración"
                      onClick={() => console.log("Configuración")}
                    />
                  </div>

                  {/* Separador */}
                  <div className="border-t border-gray-200 my-1"></div>

                  {/* Opciones adicionales */}
                  <div className="p-2">
                    <MenuItem
                      icon={icons.herramientas}
                      text="Ayuda"
                      onClick={() => console.log("Ayuda")}
                    />
                    <MenuItem
                      icon={icons.juegomesa}
                      text="Términos y condiciones"
                      onClick={() => console.log("Términos")}
                    />
                    <MenuItem
                      icon={icons.laptop}
                      text="Cerrar sesión"
                      onClick={() => console.log("Cerrar sesión")}
                      highlight={true}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );

  // Componente Categorías con navegación horizontal
  const Categorias = () => (
    <div className="flex items-center relative mb-8">
      {/* Título de sección */}
      <h2 className="text-xl font-bold uppercase mb-4 mr-4">Categorías</h2>

      {/* Contenedor scrollable de categorías */}
      <div
        ref={categoriesContainerRef}
        className="flex overflow-x-auto space-x-4 pb-2
           [&::-webkit-scrollbar]:hidden 
           [-ms-overflow-style:none] 
           [scrollbar-width:none] relative
           w-full"
      >
        {/* Mapeo de categorías */}
        {CATEGORIES.map((category) => (
          <button
            key={category.path}
            onClick={() => handleCategoryClick(category.path)}
            className="flex-shrink-0 bg-white p-4 rounded-lg shadow hover:shadow-md flex flex-col items-center justify-center hover:bg-gray-50 border border-gray-200
            w-[150px] h-[150px] hover:scale-90 transition-transform duration-200"
          >
            <img
              className="icono-categoria"
              src={category.icon}
              alt={category.label}
            />
            <span className="text-sm font-medium text-gray-700 uppercase">
              {category.label}
            </span>
          </button>
        ))}
      </div>

      {/* Botón izquierdo de navegación (solo visible cuando hay scroll izquierdo) */}
      {showLeftButton && (
        <button
          onClick={() => scrollCategories("left")}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-200 shadow-md rounded-full p-2 hover:scale-110 transition-transform duration-200 z-10"
          aria-label="Categorías anteriores"
        >
          <ChevronRight className="text-gray-600 rotate-180" size={24} />
        </button>
      )}

      {/* Botón derecho de navegación (solo visible cuando hay scroll derecho) */}
      {showRightButton && (
        <button
          onClick={() => scrollCategories("right")}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-200 shadow-md rounded-full p-2 hover:scale-110 transition-transform duration-200 z-10"
          aria-label="Más categorías"
        >
          <ChevronRight className="text-gray-600" size={24} />
        </button>
      )}
    </div>
  );

  // Componente Anuncios con slider mejorado
  const Anuncios = () => (
    <section className="mb-12">
      {/* Título de sección */}
      <h2 className=" text-center text-2xl font-bold mb-4">
        Anuncios de Temporada
      </h2>

      {/* Contenedor del slider */}
      <div className="w-full mx-auto">
        <Slider {...SLIDER_SETTINGS}>
          {/* Mapeo de anuncios */}
          {ANUNCIOS.map((anuncio, index) => (
            <div key={index} className="px-2">
              {/* Tarjeta completa del anuncio */}
              <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                {/* Banner principal con imagen y efectos */}
                <div className="relative h-64 md:h-72 overflow-hidden bg-gradient-to-r from-blue-100 via-yellow-100 to-orange-100">
                  {/* Tag destacado (opcional) */}
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

                  {/* Badge promocional (opcional) */}
                  {anuncio.badge && (
                    <div className="absolute top-4 right-4 z-10">
                      <div className="bg-white text-gray-800 px-3 py-1 rounded-full text-xs font-medium shadow-sm">
                        {anuncio.badge}
                      </div>
                    </div>
                  )}

                  {/* Imagen principal del anuncio */}
                  <img
                    src={anuncio.imagen}
                    className="w-full h-full object-cover"
                    alt={anuncio.alt}
                  />
                </div>

                {/* Miniaturas de productos relacionados */}
                <div className="grid grid-cols-4 gap-1 p-2 bg-gray-50">
                  {anuncio.miniaturas.map((miniatura, i) => (
                    <button
                      key={i}
                      onClick={() =>
                        console.log(`Producto ${i} del anuncio ${index}`)
                      }
                      className="bg-white rounded-md p-2 flex items-center justify-center hover:shadow-md transition-shadow border border-gray-200"
                    >
                      <img
                        src={miniatura.img}
                        alt={miniatura.alt}
                        className="w-full h-12 object-contain"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );

  // Componente Footer simple
  const Footer = () => (
    <footer className="py-8 flex justify-center items-center">
      <img
        src={logoLetras}
        alt="SOAP Logo"
        className="w-[150px] hover:scale-110 transition-transform duration-200"
      />
    </footer>
  );

  return (
    <div className="min-h-screen bg-[#f4f6fc] relative text-[#484d45] max-w-screen overflow-x-hidden">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 flex-left justify-center opacity-10 pointer-events-none">
        <img
          src={backgroundImage}
          alt="Flor decorativa"
          className="absolute left-0 w-1/3 md:w-1/4"
        />
      </div>
      {/* console.log('Iconos disponibles:', Object.keys(icons)); */}
      {/* Estructura principal */}
      <Header />
      <main className="container mx-auto px-4 py-8 relative z-10">
        <Categorias />
        <Anuncios />
      </main>
      <Footer />
      {/* Modal de Login */}
      {showLogin && <Login onClose={() => setShowLogin(false)} />}
    </div>
  );
};

export default MainPage;