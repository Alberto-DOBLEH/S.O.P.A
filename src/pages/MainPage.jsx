import React, { useState, useRef } from "react";
import Button from "../components/UI/Button";
import {
  logoCompleto,
  backgroundImage,
  logoLetras,
  webo,
} from "../assets/imagenes/imagenes";
import {
  dobleh2023,
  desaparecido,
  losFondo,
} from "../assets/imagenes/imagenesslider";
import { icons } from "../assets/iconos/iconos"; //Todos los iconos
import { ChevronRight } from "lucide-react";
import Login from "./Login";
// Importación correcta de react-slick
import Slider from "react-slick";
// Importación correcta de los estilos
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MainPage = () => {
  const [ShowCarrito, setShowCarrito] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [ShowOpciones, setShowopciones] = useState(false);

  const imageness = [webo, desaparecido, losFondo, dobleh2023];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // Habilita el cambio automático
    autoplaySpeed: 3000, // 3 segundos entre transiciones
    pauseOnHover: false, // Opcional: sigue avanzando aunque el mouse esté sobre el slider
    arrows: false, // Opcional: oculta flechas de navegación
    responsive: [
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
        },
      },
    ],
  };

  const categories = [
    { icon: icons.telefono, label: "Smartphones", path: "/telefonos" },
    { icon: icons.perifericos, label: "perifericos", path: "/perifericos" },
    { icon: icons.laptop, label: "Laptops", path: "/laptops" },
    { icon: icons.camara, label: "Cámaras", path: "/camaras" },
    { icon: icons.tv, label: "Televisores", path: "/televisores" },
    { icon: icons.hogar, label: "Hogar", path: "/hogar" },
    { icon: icons.deportes, label: "Deportes", path: "/deportes" },
    { icon: icons.vehiculo, label: "Vehiculos", path: "/vehiculos" },
    { icon: icons.videojuego, label: "Videojuegos", path: "/videojuegos" },
    { icon: icons.juegomesa, label: "Juegos de Mesa", path: "/juegomesa" },
    { icon: icons.herramientas, label: "Herramientas", path: "/herramientas" },
  ];

  const categoriesContainerRef = useRef(null);

  const handleCategoryClick = (path) => {
    // Implementa la lógica de navegación
    console.log(`Navegando a ${path}`);
  };

  const scrollCategories = () => {
    if (categoriesContainerRef.current) {
      // Desplaza 300 píxeles a la derecha
      categoriesContainerRef.current.scrollBy({
        left: 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f6fc] relative text-[#484d45] max-w-screen overflow-x-hidden">
      {/* Header con logo y botones */}
      <header className="flex flex-col md:flex-row justify-between items-center p-6 md:p-6 bg-[#cae8ff] shadow-md">
        <img
          src={logoCompleto}
          alt="SOAP Logo"
          className="h-10 md:h-14 hover:scale-150 transition-transform duration-200 mb-2 md:mb-0"
        />
        {/* Botones del encabezado */}
        <div className="flex space-x-2 md:space-x-4 ">
          {/* B O T O N   C A R R I TO  */}
          <Button
            className=" bg-[#123e9d]"
            onClick={() => setShowCarrito(true)}
          >
            <img
              src={icons.carrito}
              className="hover:scale-90 transition-transform duration-200 w-6 h-6"
            />
          </Button>

          {/* B O T O N   L O G I N  */}
          <Button
            onClick={() => setShowLogin(true)}
            className="hover:bg-white   hover:scale-90 transition-transform duration-200  bg-[#123e9d] text-white"
          >
            Login
          </Button>

          {/* B O T O N    O P C I O N E S */}
          <Button
            onClick={() => setShowopciones(true)}
            className="hover:bg-slate-300   hover:scale-90 transition-transform duration-200 "
          >
            <img src={icons.opciones} className="w-6 h-6" />
          </Button>
        </div>
      </header>

      {/* Fondo  */}
      <div className="absolute inset-0 flex-left justify-center opacity-10 pointer-events-none">
        <img
          src={backgroundImage}
          alt="Flor decorativa"
          className="absolute left-0 w-1/3 md:w-1/4"
        />
      </div>

      {/* Contenido principal */}
      <main className="container px-4 py-8 relative z-10">
        {/* C A T E G O R I A S */}
        <div className="flex items-center relative">
          <h1 className="text-[20px] font-bold uppercase mb-4 mr-4">
            Categorias
          </h1>
          <div
            ref={categoriesContainerRef}
            className="flex overflow-x-auto space-x-4 pb-2
               [&::-webkit-scrollbar]:hidden 
               [-ms-overflow-style:none] 
               [scrollbar-width:none] relative
               w-full"
          >
            {categories.map((category) => (
              <button
                key={category.path}
                onClick={() => handleCategoryClick(category.path)}
                className="flex-shrink-0 bg-white p-4 rounded-lg shadow hover:shadow-md  flex flex-col items-center justify-center hover:bg-gray-50 border border-gray-200 
                w-[150px] h-[150px]  hover:scale-90 transition-transform duration-200"
              >
                <img
                  className=" icono-categoria"
                  src={category.icon}
                  alt={category.label}
                />
                <span className="text-sm font-medium text-gray-700 uppercase">
                  {category.label}
                </span>
              </button>
            ))}
          </div>

          {/* Botón de navegación */}
          <button
            onClick={scrollCategories}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 hover:bg-slate-400 shadow-md rounded-full p-2 hover:scale-150 transition-transform duration-200"
          >
            <ChevronRight className="text-gray-600" size={24} />
          </button>
        </div>
      </main>

      {/* A N U N C I O S  */}
      <div className="w-full">
        <h1 className="text-3xl font-bold">Anuncios de Temporada</h1>
      </div>

      <div style={{ width: "80%", margin: "0 auto", maxWidth: "800px" }}>
        <h2>tlin</h2>
        <Slider {...settings}>
          {imageness.map((image, index) => (
            <div key={index}>
              <div style={{ padding: "0 10px" }}>
                {" "}
                {/* Espacio entre slides */}
                <img
                  src={image}
                  alt={`Slide ${index}`}
                  style={{
                    width: "100%",
                    height: "auto",
                    maxHeight: "500px",
                    objectFit: "cover", // Para que la imagen cubra el espacio sin deformarse
                    borderRadius: "8px", // Opcional: bordes redondeados
                  }}
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Modal de Login */}
      {showLogin && <Login onClose={() => setShowLogin(false)} />}
      <footer>
        <div class="flex justify-center items-center h-screen">
          <img
            src={logoLetras}
            alt="SOAP Logo"
            className=" w-[150px] hover:scale-110 transition-transform duration-200"
          />
        </div>
      </footer>
    </div>
  );
};

export default MainPage;
