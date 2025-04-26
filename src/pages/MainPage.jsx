// import React, { useState, useRef, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Button from "../components/UI/Button";
// import {
//   logoCompleto,
//   backgroundImage,
//   logoLetras,
// } from "../assets/imagenes/imagenes";
// import {
//   dobleh2023,
//   desaparecido,
//   losFondo,
//   alanSombrero,
// } from "../assets/imagenes/imagenesslider";
// import { ChevronRight } from "lucide-react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// import { ICONS } from "../assets/iconos/iconos"; // Ruta exacta al archivo
// import { BiCategory } from "react-icons/bi";
// import { IoMdHelp } from "react-icons/io";
// import { RiCouponLine } from "react-icons/ri";
// // CATEGORÍAS
// // const CATEGORIES = [
// //   { icon: <FaPhone size={24} />, label: "Smartphones", path: "/telefonos" },
// //   {
// //     icon: <BiCategory size={24} />,
// //     label: "Periféricos",
// //     path: "/perifericos",
// //   },
// //   { icon: <FaLaptop size={24} />, label: "Laptops", path: "/laptops" },
// //   { icon: <FaCamera size={24} />, label: "Cámaras", path: "/camaras" },
// //   { icon: <FaTv size={24} />, label: "Televisores", path: "/televisores" },
// //   { icon: <FaHome size={24} />, label: "Hogar", path: "/hogar" },
// //   { icon: <FaGamepad size={24} />, label: "Deportes", path: "/deportes" },
// //   { icon: <FaCar size={24} />, label: "Vehículos", path: "/vehiculos" },
// //   { icon: <FaGamepad size={24} />, label: "Videojuegos", path: "/videojuegos" },
// //   {
// //     icon: <FaGamepad size={24} />,
// //     label: "Juegos de Mesa",
// //     path: "/juegomesa",
// //   },
// //   { icon: <FaTools size={24} />, label: "Herramientas", path: "/herramientas" },
// // ];
// const CATEGORIES = [
//   { icon: ICONS.smartphones, label: "Smartphones", path: "/telefonos" },
//   { icon: ICONS.perifericos, label: "Periféricos", path: "/perifericos" },
//   { icon: ICONS.laptops, label: "Laptops", path: "/laptops" },
//   { icon: ICONS.camaras, label: "Cámaras", path: "/camaras" },
//   { icon: ICONS.televisores, label: "Televisores", path: "/televisores" },
//   { icon: ICONS.hogar, label: "Hogar", path: "/hogar" },
//   { icon: ICONS.deportes, label: "Deportes", path: "/deportes" },
//   { icon: ICONS.vehiculos, label: "Vehículos", path: "/vehiculos" },
//   { icon: ICONS.videojuegos, label: "Videojuegos", path: "/videojuegos" },
//   { icon: ICONS.ropa, label: "Ropa", path: "/ropa" },
//   { icon: ICONS.zapatos, label: "Zapatos", path: "/zapatos" },
//   { icon: ICONS.juguetes, label: "Juguetes", path: "/juguetes" },
//   { icon: ICONS.instrumentos, label: "Instrumentos", path: "/instrumentos" },
//   { icon: ICONS.libros, label: "Libros", path: "/libros" },
//   { icon: ICONS.bebes, label: "Bebés", path: "/bebes" },
//   { icon: ICONS.mascotas, label: "Mascotas", path: "/mascotas" },
//   { icon: ICONS.cocina, label: "Cocina", path: "/cocina" },
//   { icon: ICONS.bano, label: "Baño", path: "/bano" },
//   { icon: ICONS.oficina, label: "Oficina", path: "/oficina" },
//   { icon: ICONS.viajes, label: "Viajes", path: "/viajes" },
//   { icon: ICONS.jardin, label: "Jardín", path: "/jardin" },
//   { icon: ICONS.fitness, label: "Fitness", path: "/fitness" },
//   { icon: ICONS.bebidas, label: "Bebidas", path: "/bebidas" },
//   { icon: ICONS.alimentos, label: "Alimentos", path: "/alimentos" },
//   { icon: ICONS.regalos, label: "Regalos", path: "/regalos" },
//   { icon: ICONS.audio, label: "Audio", path: "/audio" },
//   { icon: ICONS.tablets, label: "Tablets", path: "/tablets" },
//   { icon: ICONS.computadoras, label: "Computadoras", path: "/computadoras" },
//   { icon: ICONS.teclados, label: "Teclados", path: "/teclados" },
//   { icon: ICONS.mouses, label: "Mouses", path: "/mouses" },
// ];
// // ANUNCIOS
// const ANUNCIOS = [
//   {
//     imagen: dobleh2023,
//     alt: "Oferta de productos de oficina",
//     tag: "FULL",
//     tagColor: "bg-green-500",
//     tagIcon: "⚡",
//     badge: "ENVÍOS RÁPIDOS",
//   },
//   {
//     imagen: desaparecido,
//     alt: "Ventiladores y productos para el calor",
//     tag: "OFERTA",
//     tagColor: "bg-red-500",
//   },
//   {
//     imagen: losFondo,
//     alt: "Productos para mascotas",
//     tag: "NUEVO",
//     tagColor: "bg-blue-500",
//     badge: "20% DESCUENTO",
//   },
//   {
//     imagen: alanSombrero,
//     alt: "Sombreros",
//     tag: "Sabor a Mexico",
//     tagIcon: "🌮",
//     tagColor: "bg-blue-500",
//     badge: "CLICK YA!!",
//   },
// ];

// // CONFIGURACIÓN SLIDER
// const SLIDER_SETTINGS = {
//   dots: true,
//   infinite: true,
//   speed: 500,
//   slidesToShow: 1,
//   slidesToScroll: 1,
//   autoplay: true,
//   autoplaySpeed: 5000,
//   pauseOnHover: true,
//   responsive: [
//     {
//       breakpoint: 1024,
//       settings: { slidesToShow: 1, slidesToScroll: 1 },
//     },
//     {
//       breakpoint: 768,
//       settings: { slidesToShow: 1, slidesToScroll: 1 },
//     },
//     {
//       breakpoint: 480,
//       settings: {
//         slidesToShow: 1,
//         slidesToScroll: 1,
//         arrows: false,
//         dots: true,
//       },
//     },
//   ],
// };

// const MainPage = ({ onLoginClick }) => {
//   // ESTADOS
//   const [showOpciones, setShowOpciones] = useState(false);
//   const [showLeftButton, setShowLeftButton] = useState(false);
//   const [showRightButton, setShowRightButton] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const navigate = useNavigate();

//   // REFS
//   const categoriesContainerRef = useRef(null);
//   const menuRef = useRef(null);
//   const timeoutRef = useRef(null);

//   // HANDLERS
//   const handleCategoryClick = (path) => {
//     console.log(`Navegando a ${path}`);
//     // Por ahora solo imprime en consola, pero puedes usar navigate si quieres
//     // navigate(path);
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     console.log(`Buscando: ${searchTerm}`);
//   };

//   const handleCarritoClick = () => {
//     navigate("/carrito");
//   };

//   const handleLoginClick = () => {
//     // Usa la prop onLoginClick en lugar de navigate
//     if (onLoginClick) {
//       onLoginClick();
//     } else {
//       console.log("onLoginClick no está definido");
//     }
//   };

//   const verificarPosicionScroll = () => {
//     if (categoriesContainerRef.current) {
//       const { scrollLeft, scrollWidth, clientWidth } =
//         categoriesContainerRef.current;
//       setShowLeftButton(scrollLeft > 0);
//       setShowRightButton(scrollLeft < scrollWidth - clientWidth - 1);
//     }
//   };

//   const handleMouseEnter = () => {
//     if (timeoutRef.current) {
//       clearTimeout(timeoutRef.current);
//       timeoutRef.current = null;
//     }
//     setShowOpciones(true);
//   };

//   const handleMouseLeave = () => {
//     timeoutRef.current = setTimeout(() => {
//       setShowOpciones(false);
//     }, 300);
//   };

//   const toggleMenu = () => {
//     setShowOpciones(!showOpciones);
//   };

//   const scrollCategories = (direction) => {
//     if (categoriesContainerRef.current) {
//       const scrollAmount = 300;
//       const maxScroll =
//         categoriesContainerRef.current.scrollWidth -
//         categoriesContainerRef.current.clientWidth;
//       const currentScroll = categoriesContainerRef.current.scrollLeft;

//       let newScrollPosition;
//       if (direction === "right") {
//         newScrollPosition = Math.min(currentScroll + scrollAmount, maxScroll);
//       } else {
//         newScrollPosition = Math.max(currentScroll - scrollAmount, 0);
//       }

//       categoriesContainerRef.current.scrollTo({
//         left: newScrollPosition,
//         behavior: "smooth",
//       });

//       setTimeout(verificarPosicionScroll, 300);
//     }
//   };

//   // EFECTOS
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (menuRef.current && !menuRef.current.contains(event.target)) {
//         setShowOpciones(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   useEffect(() => {
//     const container = categoriesContainerRef.current;
//     const preventNativeScroll = (e) => {
//       if (e.deltaY === 0) return;
//       if (
//         (e.deltaY < 0 && container.scrollLeft <= 0) ||
//         (e.deltaY > 0 &&
//           container.scrollLeft >= container.scrollWidth - container.clientWidth)
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

//   // COMPONENTES INTERNOS
//   const MenuItem = ({ icon, text, onClick, highlight = false }) => (
//     <button
//       className={`w-full text-left px-4 py-3 text-sm ${
//         highlight ? "text-red-600" : "text-gray-700"
//       } hover:bg-gray-100 rounded flex items-center transition-colors duration-200`}
//       onClick={onClick}
//     >
//       <span className="text-lg mr-3">{icon}</span>
//       <span>{text}</span>
//     </button>
//   );

//   const SearchBar = () => (
//     <div className="w-full max-w-3xl mx-auto mb-2">
//       <form onSubmit={handleSearch} className="relative flex items-center">
//         <input
//           type="text"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           placeholder="Buscar productos, categorías, marcas..."
//           className="w-full px-4 py-2 pl-10 pr-16 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#123e9d] focus:border-transparent"
//         />
//         <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
//           <FaSearch className="text-gray-500" />
//         </div>
//         <button
//           type="submit"
//           className="absolute right-2 bg-[#123e9d] text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-colors text-sm"
//         >
//           Buscar
//         </button>
//       </form>
//     </div>
//   );

//   const Header = () => (
//     <header className="flex flex-col md:flex-row justify-between items-start p-6 md:p-6 bg-[#cae8ff] shadow-md">
//       <div className="w-full flex flex-col md:flex-row justify-between items-center">
//         <img
//           src={logoCompleto}
//           alt="SOAP Logo"
//           className="h-10 md:h-14 hover:scale-105 transition-transform duration-200 mb-4 md:mb-0"
//         />

//         <div className="w-full mt-4 md:mt-4">
//           <SearchBar />
//         </div>

//         <div className="flex space-x-2 md:space-x-4">
//           <Button
//             className="bg-[#123e9d] p-2 hover:scale-90 hover:bg-[#edf6f9] transition-transform duration-200 group"
//             onClick={handleCarritoClick}
//             aria-label="Carrito de compras"
//           >
//             <FaShoppingCart className="text-white w-6 h-6 group-hover:text-black transition-colors duration-200" />
//           </Button>

//           <Button
//             onClick={handleLoginClick}
//             className="hover:bg-[#edf6f9] hover:text-black hover:scale-90 transition-transform duration-200 bg-[#123e9d] text-white"
//           >
//             Login
//           </Button>

//           <div
//             className="relative"
//             onMouseEnter={handleMouseEnter}
//             onMouseLeave={handleMouseLeave}
//           >
//             <Button
//               onClick={toggleMenu}
//               className="hover:bg-[#edf6f9] transition-colors relative z-10 p-2 bg-[#123e9d]"
//               aria-label="Menú de opciones"
//               aria-expanded={showOpciones}
//             >
//               <FaUser className="text-white w-6 h-6" />
//             </Button>

//             {showOpciones && (
//               <div
//                 ref={menuRef}
//                 className="absolute right-0 mt-2 w-72 bg-[#edf6f9] rounded-lg shadow-xl z-50 border border-gray-200 overflow-hidden"
//               >
//                 <div className="p-4 border-b border-gray-200 bg-gray-50">
//                   <div className="flex items-center">
//                     <div className="w-10 h-10 rounded-full mr-3 border border-gray-200 bg-blue-100 flex items-center justify-center">
//                       <FaUser className="text-blue-600" />
//                     </div>
//                     <div>
//                       <p className="font-medium text-gray-900">nombrePerfil</p>
//                       <p className="text-xs text-gray-500">Comprador</p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="max-h-96 overflow-y-auto divide-y divide-gray-200">
//                   <div className="p-2">
//                     <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
//                       Mi Cuenta
//                     </div>
//                     <MenuItem
//                       icon={<FaUser />}
//                       text="Mi perfil"
//                       onClick={() => console.log("Mi perfil")}
//                     />
//                     <MenuItem
//                       icon={<FaHeart />}
//                       text="Favoritos"
//                       onClick={() => console.log("Favoritos")}
//                     />
//                     <MenuItem
//                       icon={<FaBell />}
//                       text="Notificaciones"
//                       onClick={() => console.log("Notificaciones")}
//                     />
//                   </div>

//                   <div className="p-2">
//                     <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
//                       Mis Compras
//                     </div>
//                     <MenuItem
//                       icon={<FaShoppingCart />}
//                       text="Carrito de compras"
//                       onClick={handleCarritoClick}
//                     />
//                     <MenuItem
//                       icon={<FaHistory />}
//                       text="Historial de compras"
//                       onClick={() => console.log("Historial")}
//                     />
//                     <MenuItem
//                       icon={<FaStore />}
//                       text="Pedidos activos"
//                       onClick={() => console.log("Pedidos")}
//                     />
//                   </div>

//                   <div className="p-2">
//                     <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
//                       Métodos de Pago
//                     </div>
//                     <MenuItem
//                       icon={<FaCreditCard />}
//                       text="Mis tarjetas"
//                       onClick={() => console.log("Tarjetas")}
//                     />
//                     <MenuItem
//                       icon={<RiCouponLine />}
//                       text="Cupones y promociones"
//                       onClick={() => console.log("Cupones")}
//                     />
//                   </div>

//                   <div className="p-2">
//                     <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
//                       Mis Listas
//                     </div>
//                     <MenuItem
//                       icon={<FaList />}
//                       text="Lista de deseos"
//                       onClick={() => console.log("Deseos")}
//                     />
//                     <MenuItem
//                       icon={<FaList />}
//                       text="Lista de compras"
//                       onClick={() => console.log("Compras")}
//                     />
//                   </div>

//                   <div className="p-2">
//                     <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
//                       Ayuda y Configuración
//                     </div>
//                     <MenuItem
//                       icon={<IoMdHelp />}
//                       text="Centro de ayuda"
//                       onClick={() => console.log("Ayuda")}
//                     />
//                     <MenuItem
//                       icon={<FaLock />}
//                       text="Privacidad y seguridad"
//                       onClick={() => console.log("Privacidad")}
//                     />
//                     <MenuItem
//                       icon={<FaEnvelope />}
//                       text="Contactar soporte"
//                       onClick={() => console.log("Soporte")}
//                     />
//                     <MenuItem
//                       icon={<FaCog />}
//                       text="Configuración"
//                       onClick={() => console.log("Configuración")}
//                     />
//                   </div>

//                   <div className="p-2">
//                     <MenuItem
//                       icon={<FaSignOutAlt />}
//                       text="Cerrar sesión"
//                       onClick={() => console.log("Cerrar sesión")}
//                       highlight={true}
//                     />
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </header>
//   );

//   const Categorias = () => (
//     <div className="flex flex-col relative mb-8">
//       <h2 className="text-xl font-bold uppercase mb-4">Categorías</h2>
//       <div className="flex items-center relative">
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
//               <span className="text-2xl mb-2 ">{category.icon}</span>
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

//   const Anuncios = () => (
//     <section className="mb-12">
//       <h2 className="text-center text-2xl font-bold mb-4">
//         Anuncios de Temporada
//       </h2>
//       <div className="w-full mx-auto">
//         <Slider {...SLIDER_SETTINGS}>
//           {ANUNCIOS.map((anuncio, index) => (
//             <div key={index} className="px-2">
//               <div className="bg-white rounded-lg overflow-hidden shadow-lg">
//                 <div className="relative h-64 md:h-72 overflow-hidden bg-gradient-to-r from-blue-100 via-yellow-100 to-orange-100">
//                   {anuncio.tag && (
//                     <div className="absolute top-4 left-4 z-10">
//                       <div
//                         className={`${anuncio.tagColor} text-white px-3 py-1 rounded-lg font-bold flex items-center`}
//                       >
//                         {anuncio.tagIcon && (
//                           <span className="mr-1">{anuncio.tagIcon}</span>
//                         )}
//                         {anuncio.tag}
//                       </div>
//                     </div>
//                   )}
//                   {anuncio.badge && (
//                     <div className="absolute top-4 right-4 z-10">
//                       <div className="bg-white text-gray-800 px-3 py-1 rounded-full text-xs font-medium shadow-sm">
//                         {anuncio.badge}
//                       </div>
//                     </div>
//                   )}
//                   <img
//                     src={anuncio.imagen}
//                     className="w-full h-full object-cover"
//                     alt={anuncio.alt}
//                   />
//                 </div>
//               </div>
//             </div>
//           ))}
//         </Slider>
//       </div>
//     </section>
//   );

//   const Footer = () => (
//     <footer className="py-8 flex justify-center items-center">
//       <img
//         src={logoLetras}
//         alt="SOAP Logo"
//         className="w-[150px] hover:scale-110 transition-transform duration-200"
//       />
//     </footer>
//   );

//   return (
//     <div className="min-h-screen bg-[#f4f6fc] relative text-[#484d45] max-w-screen overflow-x-hidden">
//       <div className="absolute inset-0 flex-left justify-center opacity-10 pointer-events-none">
//         <img
//           src={backgroundImage}
//           alt="Flor decorativa"
//           className="absolute left-0 w-1/3 md:w-1/4"
//         />
//       </div>

//       <Header />
//       <main className="container mx-auto px-4 py-8 relative z-10">
//         <Categorias />
//         <Anuncios />
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default MainPage;
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import { ChevronRight } from "lucide-react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
  // Asegúrate de tener definidos estos íconos en el archivo iconos.js
  {
    icon: <BiCategory size={24} />,
    label: "Instrumentos",
    path: "/instrumentos",
  },
  { icon: <BiCategory size={24} />, label: "Libros", path: "/libros" },
  { icon: <BiCategory size={24} />, label: "Bebés", path: "/bebes" },
  { icon: <BiCategory size={24} />, label: "Mascotas", path: "/mascotas" },
  { icon: <BiCategory size={24} />, label: "Cocina", path: "/cocina" },
  { icon: <BiCategory size={24} />, label: "Baño", path: "/bano" },
  { icon: <BiCategory size={24} />, label: "Oficina", path: "/oficina" },
  { icon: <BiCategory size={24} />, label: "Viajes", path: "/viajes" },
  { icon: <BiCategory size={24} />, label: "Jardín", path: "/jardin" },
  { icon: <BiCategory size={24} />, label: "Fitness", path: "/fitness" },
  { icon: <BiCategory size={24} />, label: "Bebidas", path: "/bebidas" },
  { icon: <BiCategory size={24} />, label: "Alimentos", path: "/alimentos" },
  { icon: <BiCategory size={24} />, label: "Regalos", path: "/regalos" },
  { icon: <BiCategory size={24} />, label: "Audio", path: "/audio" },
  { icon: <BiCategory size={24} />, label: "Tablets", path: "/tablets" },
  {
    icon: <BiCategory size={24} />,
    label: "Computadoras",
    path: "/computadoras",
  },
  { icon: <BiCategory size={24} />, label: "Teclados", path: "/teclados" },
  { icon: <BiCategory size={24} />, label: "Mouses", path: "/mouses" },
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

const MainPage = ({ onLoginClick }) => {
  // ESTADOS
  const [showOpciones, setShowOpciones] = useState(false);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // REFS
  const categoriesContainerRef = useRef(null);
  const menuRef = useRef(null);
  const timeoutRef = useRef(null);

  // HANDLERS
  const handleCategoryClick = (path) => {
    console.log(`Navegando a ${path}`);
    // Por ahora solo imprime en consola, pero puedes usar navigate si quieres
    // navigate(path);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(`Buscando: ${searchTerm}`);
  };

  const handleCarritoClick = () => {
    navigate("/carrito");
  };

  const handleLoginClick = () => {
    // Usa la prop onLoginClick en lugar de navigate
    if (onLoginClick) {
      onLoginClick();
    } else {
      console.log("onLoginClick no está definido");
    }
  };

  const verificarPosicionScroll = () => {
    if (categoriesContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        categoriesContainerRef.current;
      setShowLeftButton(scrollLeft > 0);
      setShowRightButton(scrollLeft < scrollWidth - clientWidth - 1);
    }
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

  const scrollCategories = (direction) => {
    if (categoriesContainerRef.current) {
      const scrollAmount = 300;
      const maxScroll =
        categoriesContainerRef.current.scrollWidth -
        categoriesContainerRef.current.clientWidth;
      const currentScroll = categoriesContainerRef.current.scrollLeft;

      let newScrollPosition;
      if (direction === "right") {
        newScrollPosition = Math.min(currentScroll + scrollAmount, maxScroll);
      } else {
        newScrollPosition = Math.max(currentScroll - scrollAmount, 0);
      }

      categoriesContainerRef.current.scrollTo({
        left: newScrollPosition,
        behavior: "smooth",
      });

      setTimeout(verificarPosicionScroll, 300);
    }
  };

  // EFECTOS
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowOpciones(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const container = categoriesContainerRef.current;
    const preventNativeScroll = (e) => {
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
      container.addEventListener("wheel", preventNativeScroll, {
        passive: false,
      });
    }

    verificarPosicionScroll();
    window.addEventListener("resize", verificarPosicionScroll);

    return () => {
      if (container) {
        container.removeEventListener("wheel", preventNativeScroll);
      }
      window.removeEventListener("resize", verificarPosicionScroll);
    };
  }, []);

  // COMPONENTES INTERNOS
  const MenuItem = ({ icon, text, onClick, highlight = false }) => (
    <button
      className={`w-full text-left px-4 py-3 text-sm ${
        highlight ? "text-red-600" : "text-gray-700"
      } hover:bg-gray-100 rounded flex items-center transition-colors duration-200`}
      onClick={onClick}
    >
      <span className="text-lg mr-3">{icon}</span>
      <span>{text}</span>
    </button>
  );

  const SearchBar = () => (
    <div className="w-full max-w-3xl mx-auto mb-2">
      <form onSubmit={handleSearch} className="relative flex items-center">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar productos, categorías, marcas..."
          className="w-full px-4 py-2 pl-10 pr-16 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#123e9d] focus:border-transparent"
        />
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          <FaSearch className="text-gray-500" />
        </div>
        <button
          type="submit"
          className="absolute right-2 bg-[#123e9d] text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-colors text-sm"
        >
          Buscar
        </button>
      </form>
    </div>
  );

  const Header = () => (
    <header className="flex flex-col md:flex-row justify-between items-start p-6 md:p-6 bg-[#cae8ff] shadow-md">
      <div className="w-full flex flex-col md:flex-row justify-between items-center">
        <img
          src={logoCompleto}
          alt="SOAP Logo"
          className="h-10 md:h-14 hover:scale-105 transition-transform duration-200 mb-4 md:mb-0"
        />

        <div className="w-full mt-4 md:mt-4">
          <SearchBar />
        </div>

        <div className="flex space-x-2 md:space-x-4">
          <Button
            className="bg-[#123e9d] p-2 hover:scale-90 hover:bg-[#edf6f9] transition-transform duration-200 group"
            onClick={handleCarritoClick}
            aria-label="Carrito de compras"
          >
            <FaShoppingCart className="text-white w-6 h-6 group-hover:text-black transition-colors duration-200" />
          </Button>

          <Button
            onClick={handleLoginClick}
            className="hover:bg-[#edf6f9] hover:text-black hover:scale-90 transition-transform duration-200 bg-[#123e9d] text-white"
          >
            Login
          </Button>

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
              <FaUser className="text-white w-6 h-6" />
            </Button>

            {showOpciones && (
              <div
                ref={menuRef}
                className="absolute right-0 mt-2 w-72 bg-[#edf6f9] rounded-lg shadow-xl z-50 border border-gray-200 overflow-hidden"
              >
                <div className="p-4 border-b border-gray-200 bg-gray-50">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full mr-3 border border-gray-200 bg-blue-100 flex items-center justify-center">
                      <FaUser className="text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">nombrePerfil</p>
                      <p className="text-xs text-gray-500">Comprador</p>
                    </div>
                  </div>
                </div>

                <div className="max-h-96 overflow-y-auto divide-y divide-gray-200">
                  <div className="p-2">
                    <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Mi Cuenta
                    </div>
                    <MenuItem
                      icon={<FaUser />}
                      text="Mi perfil"
                      onClick={() => console.log("Mi perfil")}
                    />
                    <MenuItem
                      icon={<FaHeart />}
                      text="Favoritos"
                      onClick={() => console.log("Favoritos")}
                    />
                    <MenuItem
                      icon={<FaBell />}
                      text="Notificaciones"
                      onClick={() => console.log("Notificaciones")}
                    />
                  </div>

                  <div className="p-2">
                    <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Mis Compras
                    </div>
                    <MenuItem
                      icon={<FaShoppingCart />}
                      text="Carrito de compras"
                      onClick={handleCarritoClick}
                    />
                    <MenuItem
                      icon={<FaHistory />}
                      text="Historial de compras"
                      onClick={() => console.log("Historial")}
                    />
                    <MenuItem
                      icon={<FaStore />}
                      text="Pedidos activos"
                      onClick={() => console.log("Pedidos")}
                    />
                  </div>

                  <div className="p-2">
                    <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Métodos de Pago
                    </div>
                    <MenuItem
                      icon={<FaCreditCard />}
                      text="Mis tarjetas"
                      onClick={() => console.log("Tarjetas")}
                    />
                    <MenuItem
                      icon={<RiCouponLine />}
                      text="Cupones y promociones"
                      onClick={() => console.log("Cupones")}
                    />
                  </div>

                  <div className="p-2">
                    <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Mis Listas
                    </div>
                    <MenuItem
                      icon={<FaList />}
                      text="Lista de deseos"
                      onClick={() => console.log("Deseos")}
                    />
                    <MenuItem
                      icon={<FaList />}
                      text="Lista de compras"
                      onClick={() => console.log("Compras")}
                    />
                  </div>

                  <div className="p-2">
                    <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Ayuda y Configuración
                    </div>
                    <MenuItem
                      icon={<IoMdHelp />}
                      text="Centro de ayuda"
                      onClick={() => console.log("Ayuda")}
                    />
                    <MenuItem
                      icon={<FaLock />}
                      text="Privacidad y seguridad"
                      onClick={() => console.log("Privacidad")}
                    />
                    <MenuItem
                      icon={<FaEnvelope />}
                      text="Contactar soporte"
                      onClick={() => console.log("Soporte")}
                    />
                    <MenuItem
                      icon={<FaCog />}
                      text="Configuración"
                      onClick={() => console.log("Configuración")}
                    />
                  </div>

                  <div className="p-2">
                    <MenuItem
                      icon={<FaSignOutAlt />}
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

  const Categorias = () => (
    <div className="flex flex-col relative mb-8">
      <h2 className="text-xl font-bold uppercase mb-4">Categorías</h2>
      <div className="flex items-center relative">
        <div
          ref={categoriesContainerRef}
          className="flex overflow-x-auto space-x-4 pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] relative w-full px-8"
          onScroll={verificarPosicionScroll}
        >
          {CATEGORIES.map((category) => (
            <button
              key={category.path}
              onClick={() => handleCategoryClick(category.path)}
              className="flex-shrink-0 bg-white p-4 rounded-lg shadow hover:shadow-md flex flex-col items-center justify-center hover:bg-gray-50 border border-gray-200 w-[150px] h-[150px] hover:scale-90 transition-transform duration-200"
            >
              <span className="text-2xl mb-2 ">{category.icon}</span>
              <span className="text-sm font-medium text-gray-700 uppercase">
                {category.label}
              </span>
            </button>
          ))}
        </div>

        {showLeftButton && (
          <button
            onClick={() => scrollCategories("left")}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-200 shadow-md rounded-full p-2 hover:scale-110 transition-transform duration-200 z-10"
            aria-label="Categorías anteriores"
          >
            <ChevronRight className="text-gray-600 rotate-180" size={24} />
          </button>
        )}

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
    </div>
  );

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
      <img
        src={logoLetras}
        alt="SOAP Logo"
        className="w-[150px] hover:scale-110 transition-transform duration-200"
      />
    </footer>
  );

  return (
    <div className="min-h-screen bg-[#f4f6fc] relative text-[#484d45] max-w-screen overflow-x-hidden">
      <div className="absolute inset-0 flex-left justify-center opacity-10 pointer-events-none">
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
    </div>
  );
};

export default MainPage;
