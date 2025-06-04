// import React, { useContext, useState, useRef, useEffect, useMemo } from "react";
// import { useNavigate, useLocation, useParams } from "react-router-dom"; // Añadido useLocation
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
//   hotsale,
//   Anuncio01,
//   i3,
//   i1,
//   i2,
// } from "../assets/imagenes/imagenesslider";
// import {
//   ChevronLeft,
//   ChevronRight,
//   LogOut,
//   Star,
//   Filter,
//   X,
// } from "lucide-react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import Login from "./Login";
// import { AuthContext } from "../context/AuthContext";
// import { toast } from "react-toastify";
// import {
//   FaSearch,
//   FaShoppingCart,
//   FaUser,
//   FaHeart,
//   FaBell,
//   FaHistory,
//   FaStore,
//   FaCreditCard,
//   FaList,
//   FaLock,
//   FaEnvelope,
//   FaCog,
//   FaSignOutAlt,
//   FaBars,
//   FaShopify,
//   FaTimes,
//   FaMobile,
//   FaKeyboard,
//   FaLaptop,
//   FaCamera,
//   FaTv,
//   FaHome,
//   FaRunning,
//   FaCar,
//   FaGamepad,
//   FaTshirt,
//   FaShoePrints,
//   FaChild,
//   FaGuitar,
//   FaBook,
//   FaBaby,
//   FaPaw,
//   FaUtensils,
//   FaBath,
//   FaPlane,
//   FaTree,
//   FaDumbbell,
//   FaGlassWhiskey,
//   FaAppleAlt,
//   FaGift,
//   FaHeadphones,
//   FaTabletAlt,
//   FaDesktop,
//   FaMousePointer,
//   FaTag,
//   FaTags,
//   FaChevronRight,
//   FaClock,
//   FaStar,
//   FaFire,
// } from "react-icons/fa";
// import { IoMdHelp } from "react-icons/io";
// import { RiCouponLine } from "react-icons/ri";
// import axios from "axios";
// import { BsPatchCheck } from "react-icons/bs";
// import Footer from "../components/Footer";
// import { useCurrency } from "../CurrencyContext"; // Asegúrate de que la ruta sea correcta
// import OfertasDestacadas from "../components/OfertasDestacadas";
// import ArticulosMasVendidos from "../components/ArticulosMasVendidos";
// // CATEGORÍAS

// const CATEGORIES = [
//   {
//     icon: <FaMobile className="text-blue-500" />,
//     label: "Smartphones",
//     path: "/buscar",
//     categoryValue: "TELEFONOS",
//   },
//   {
//     icon: <FaKeyboard className="text-purple-500" />,
//     label: "Periféricos",
//     path: "/buscar",
//     categoryValue: "PERIFÉRICOS", // Coincide con tus productos
//   },
//   {
//     icon: <FaLaptop className="text-indigo-500" />,
//     label: "Laptops",
//     path: "/buscar",
//     categoryValue: "LAPTOPS",
//   },
//   {
//     icon: <FaCamera className="text-yellow-500" />,
//     label: "Cámaras",
//     path: "/buscar",
//     categoryValue: "CÁMARAS",
//   },
//   {
//     icon: <FaTv className="text-red-500" />,
//     label: "Televisores",
//     path: "/buscar",
//     categoryValue: "TELEVISORES",
//   },
//   {
//     icon: <FaHome className="text-green-500" />,
//     label: "Hogar",
//     path: "/buscar",
//     categoryValue: "HOGAR",
//   },
//   {
//     icon: <FaRunning className="text-orange-500" />,
//     label: "Deportes",
//     path: "/buscar",
//     categoryValue: "DEPORTES",
//   },
//   {
//     icon: <FaCar className="text-gray-600" />,
//     label: "Vehículos",
//     path: "/buscar",
//     categoryValue: "VEHÍCULOS",
//   },
//   {
//     icon: <FaGamepad className="text-pink-500" />,
//     label: "Videojuegos",
//     path: "/buscar",
//     categoryValue: "GAMING", // Coincide con tus productos
//   },
//   {
//     icon: <FaTshirt className="text-teal-500" />,
//     label: "Ropa",
//     path: "/buscar",
//     categoryValue: "ROPA",
//   },
//   {
//     icon: <FaShoePrints className="text-brown-500" />,
//     label: "Zapatos",
//     path: "/buscar",
//     categoryValue: "ZAPATOS",
//   },
//   {
//     icon: <FaChild className="text-amber-500" />,
//     label: "Juguetes",
//     path: "/buscar",
//     categoryValue: "JUGUETES",
//   },
//   {
//     icon: <FaGuitar className="text-lime-500" />,
//     label: "Instrumentos",
//     path: "/buscar",
//     categoryValue: "INSTRUMENTOS",
//   },
//   {
//     icon: <FaBook className="text-blue-600" />,
//     label: "Libros",
//     path: "/buscar",
//     categoryValue: "LIBROS",
//   },
//   {
//     icon: <FaBaby className="text-pink-300" />,
//     label: "Bebés",
//     path: "/buscar",
//     categoryValue: "BEBÉS",
//   },
//   {
//     icon: <FaPaw className="text-yellow-600" />,
//     label: "Mascotas",
//     path: "/buscar",
//     categoryValue: "MASCOTAS",
//   },
//   {
//     icon: <FaUtensils className="text-red-400" />,
//     label: "Cocina",
//     path: "/buscar",
//     categoryValue: "COCINA",
//   },
//   {
//     icon: <FaBath className="text-blue-300" />,
//     label: "Baño",
//     path: "/buscar",
//     categoryValue: "BAÑO",
//   },
//   {
//     icon: <FaPlane className="text-indigo-300" />,
//     label: "Viajes",
//     path: "/buscar",
//     categoryValue: "VIAJE",
//   },
//   {
//     icon: <FaTree className="text-green-600" />,
//     label: "Jardín",
//     path: "/buscar",
//     categoryValue: "JARDÍN",
//   },
//   {
//     icon: <FaDumbbell className="text-gray-700" />,
//     label: "Fitness",
//     path: "/buscar",
//     categoryValue: "FITNESS",
//   },
//   {
//     icon: <FaGlassWhiskey className="text-amber-600" />,
//     label: "Bebidas",
//     path: "/buscar",
//     categoryValue: "BEBIDAS",
//   },

//   {
//     icon: <FaGift className="text-pink-500" />,
//     label: "Regalos",
//     path: "/buscar",
//     categoryValue: "REGALOS",
//   },
//   {
//     icon: <FaHeadphones className="text-blue-400" />,
//     label: "Audio",
//     path: "/buscar",
//     categoryValue: "AUDIO",
//   },
//   {
//     icon: <FaTabletAlt className="text-indigo-400" />,
//     label: "Tablets",
//     path: "/buscar",
//     categoryValue: "TABLETS",
//   },
//   {
//     icon: <FaDesktop className="text-gray-800" />,
//     label: "Computadoras",
//     path: "/buscar",
//     categoryValue: "COMPUTADORAS",
//   },
//   {
//     icon: <FaKeyboard className="text-purple-400" />,
//     label: "Teclados",
//     path: "/buscar",
//     categoryValue: "TECLADOS",
//   },
//   {
//     icon: <FaMousePointer className="text-gray-500" />,
//     label: "Mouses",
//     path: "/buscar",
//     categoryValue: "MOUSES",
//   },
// ];

// // ANUNCIOS
// const ANUNCIOS = [
//   {
//     imagen: i1,
//     alt: "Oferta de productos de oficina",
//     tag: "FULL",
//     tagColor: "bg-green-500",
//     tagIcon: "⚡",
//     badge: "ENVÍOS RÁPIDOS",
//   },
//   {
//     imagen: i2,
//     alt: "Ventiladores y productos para el calor",
//     tag: "OFERTA",
//     tagColor: "bg-red-500",
//   },
//   {
//     imagen: i3,
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
//   {
//     imagen: hotsale,
//     alt: "Sombreros",
//     tag: "Sabor a Mexico",
//     tagIcon: "🌮",
//     tagColor: "bg-blue-500",
//     badge: "CLICK YA!!",
//   },
// ];

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

// const MainPage = ({ onLoginClick, userName = "Usuario" }) => {
//   const [showOpciones, setShowOpciones] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const navigate = useNavigate();
//   const menuRef = useRef(null);
//   const timeoutRef = useRef(null);
//   const [showLoginModal, setShowLoginModal] = useState(false);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchTerm.trim()) {
//       navigate(`/buscar?q=${encodeURIComponent(searchTerm)}`);
//     }
//   };

//   const { logout } = useContext(AuthContext);

//   const navigateTo = {
//     home: () => navigate("/"),
//     carrito: () => navigate("/carrito"),
//     login: () => (onLoginClick ? onLoginClick() : navigate("/login")),
//     perfil: () => navigate("/perfil"),
//     favoritos: () => navigate("/lista-deseos"),
//     notificaciones: () => navigate("/notificaciones"),
//     historial: () => navigate("/historial"),
//     pedido: () => navigate("/pedido"),
//     tarjetas: () => navigate("/tarjeta"),
//     cupones: () => navigate("/cupones"),
//     listaDeseos: () => navigate("/lista-deseos"),
//     listaCompras: () => navigate("/lista-compras"),
//     ayuda: () => navigate("/ayuda"),
//     privacidad: () => navigate("/privacidad"),
//     soporte: () => navigate("/soporte"),
//     configuracion: () => navigate("/configuracion"),
//     venta: () => navigate("/venta"),
//     verArticulo: () => navigate("/VerArticulo"),
//     logout: () => {
//       logout();
//       toast.success("Sesión cerrada exitosamente", {
//         toastId: "logout-exito",
//       });
//       navigate("/login");
//     },
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

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (menuRef.current && !menuRef.current.contains(event.target)) {
//         setShowOpciones(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//       if (timeoutRef.current) {
//         clearTimeout(timeoutRef.current);
//       }
//     };
//   }, []);

//   const SearchBar = () => {
//     const [searchTerm, setSearchTerm] = useState("");
//     const navigate = useNavigate();

//     const handleSearch = (e) => {
//       e.preventDefault();
//       if (searchTerm.trim()) {
//         navigate(`/buscar?q=${encodeURIComponent(searchTerm.trim())}`);
//       }
//     };

//     return (
//       <form
//         onSubmit={handleSearch}
//         className="relative flex w-full max-w-3xl mx-auto"
//       >
//         <input
//           type="text"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="w-full px-5 py-4 pl-14 pr-24 bg-white border-2 border-gray-200 rounded-full shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 text-lg placeholder-gray-400"
//           placeholder="Buscar productos, marcas..."
//         />
//         <FaSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
//         <button
//           type="submit"
//           className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-2 rounded-full font-medium hover:from-blue-600 hover:to-blue-700 transition-all shadow-md"
//         >
//           Buscar
//         </button>
//       </form>
//     );
//   };

//   const MenuSection = ({ title, children }) => (
//     <div className="py-2 px-1">
//       <h3 className="text-xs font-semibold text-gray-500 px-3 mb-2">{title}</h3>
//       <div className="space-y-1">{children}</div>
//     </div>
//   );

//   const MenuItem = ({ icon, text, onClick, className = "" }) => (
//     <button
//       onClick={onClick}
//       className={`w-full flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-blue-50 rounded-md transition-colors duration-150 ${className}`}
//     >
//       <span className="flex-shrink-0">{icon}</span>
//       <span className="text-sm">{text}</span>
//     </button>
//   );

//   const Header = () => {
//     const [userName, setuserName] = useState();
//     const [isAuthenticated, setIsAuthenticated] = useState(false);
//     const [cartcount, setCartCount] = useState(0);
//     useEffect(() => {
//       const usuario = localStorage.getItem("usuario");
//       if (usuario) {
//         setuserName(usuario);
//         setIsAuthenticated(true);
//       }
//     }, []);
//     useEffect(() => {
//       const cartcheck = async () => {
//         try {
//           const id = localStorage.getItem("idusuario");
//           const response = await fetch(
//             `http://localhost:3001/api/carrito?userId=${id}`,
//             {
//               method: "GET",
//               headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${localStorage.getItem("token")}`,
//               },
//             }
//           );
//           if (!response.ok) {
//             throw new Error("Error al obtener el carrito");
//           }
//           const data = await response.json();
//           setCartCount(data.length);
//         } catch (error) {
//           console.error("Error al verificar el carrito:", error);
//         }
//       };
//       cartcheck();
//     }, []);

//     const logout = () => {
//       if (!isAuthenticated) {
//         toast.error("No hay sesión iniciada", {
//           toastId: "logout-error",
//         });
//       } else {
//         localStorage.removeItem("usuario");
//         setIsAuthenticated(false);
//         toast.success("Sesión cerrada exitosamente", {
//           toastId: "logout-exito",
//         });
//         navigate("/");
//       }
//     };
//     const handleCarritoClick = () => {
//       navigateTo.carrito();
//       setShowOpciones(false);
//     };
//     const navigate = useNavigate(); // Asegúrate de inicializar navigate si no lo hiciste

//     const [showOpciones, setShowOpciones] = useState(false); // 🔧 Estado faltante
//     const menuRef = useRef(null); // 🔧 Referencia faltante
//     // Funciones para manejar el menú de opciones
//     const toggleMenu = () => setShowOpciones(!showOpciones);
//     const handleMouseEnter = () => setShowOpciones(true);
//     const handleMouseLeave = () => setShowOpciones(false);

//     // Funciones de navegación actualizadas
//     const navigateTo = {
//       home: () => navigate("/"),
//       carrito: () => navigate("/carrito"),
//       // cuenta: () => navigate("/perfil"),
//       notificaciones: () => navigate("/notificaciones"),
//       // categoria: (path) => navigate(path),
//       perfil: () => navigate("/perfil"),
//       favoritos: () => navigate("/favoritos"),
//       venta: () => navigate("/venta"),
//       historial: () => navigate("/historial"),
//       pedido: () => navigate("/pedido"),
//       tarjetas: () => navigate("/tarjetas"),
//       cupones: () => navigate("/cupones"),
//       listadeseos: () => navigate("/listadeseos"),
//       listaCompras: () => navigate("/lista-compras"),
//       ayuda: () => navigate("/ayuda"),
//       privacidad: () => navigate("/privacidad"),
//       soporte: () => navigate("/soporte"),
//       configuracion: () => navigate("/configuracion"),
//     };

//     // Componentes auxiliares para el menú
//     const MenuSection = ({ title, children }) => (
//       <div className="py-2">
//         <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
//           {title}
//         </h3>
//         <div className="mt-1">{children}</div>
//       </div>
//     );

//     const MenuItem = ({ icon, text, onClick, className = "" }) => (
//       <button
//         onClick={onClick}
//         className={`w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 ${className}`}
//       >
//         <span className="mr-3">{icon}</span>
//         {text}
//       </button>
//     );

//     return (
//       <header className="bg-[#cae8ff] border-b border-blue-200 shadow-md">
//         <div className=" mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="w-full flex flex-col md:flex-row justify-between items-center py-4">
//             {/* Logo en la esquina izquierda */}
//             <div className="order-2 md:order-1 w-full md:w-auto flex justify-center md:justify-start">
//               <div className="cursor-pointer" onClick={navigateTo.home}>
//                 <img src={logoCompleto} alt="SOAP Logo" className="w-36" />
//               </div>
//             </div>

//             {/* Barra de búsqueda en el centro */}
//             <div className="order-1 md:order-2 w-full md:max-w-3xl mx-0 md:mx-8 mb-4 md:mb-0">
//               <SearchBar />
//             </div>

//             {/* Botones en la esquina derecha y con mayor separación */}
//             <div className="order-3 md:order-3 flex items-center space-x-3">
//               {" "}
//               {/*B O T O N  C A R R I T O   D E   C O M P R A S */}
//               <button
//                 // className="bg-white p-3 rounded-full text-blue-600 shadow-md transition-all duration-200 flex items-center justify-center relative hover:bg-[#edf6f9] hover:text-black"
//                 className="bg-blue-600 p-3.5 rounded-full text-white shadow-md transition-all duration-200 relative z-10 hover:bg-[#edf6f9] hover:text-blue-600"
//                 onClick={navigateTo.carrito}
//                 aria-label="Carrito de compras"
//               >
//                 <FaShoppingCart className="w-6 h-6" />
//                 <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
//                   {cartcount}
//                 </span>
//               </button>
//               {/* B O T O N   L O G I N */}
//               {!isAuthenticated && (
//                 <button
//                   onClick={() => setShowLoginModal(true)}
//                   className="bg-blue-600 text-white px-8 py-2 rounded-full font-medium shadow-md transition-all duration-200 text-lg md:text-xl hover:bg-[#edf6f9] hover:text-blue-600 group"
//                 >
//                   <span>Login</span>
//                 </button>
//               )}
//               {/* B O T O N   M E N U */}
//               <div
//                 className="relative"
//                 onMouseEnter={handleMouseEnter}
//                 onMouseLeave={handleMouseLeave}
//               >
//                 <button
//                   onClick={toggleMenu}
//                   className="bg-blue-600 p-2 rounded-full text-white shadow-md transition-all duration-200 hover:bg-blue-400 flex flex-col items-center justify-center w-16 h-16"
//                   aria-label="Menú de opciones"
//                   aria-expanded={showOpciones}
//                 >
//                   <FaBars className="w-6 h-6 mb-1" />
//                   <span className="text-xs">Menú</span>
//                 </button>

//                 {showOpciones && (
//                   <div
//                     ref={menuRef}
//                     className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl z-50 border border-gray-100 overflow-hidden"
//                   >
//                     <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-blue-100">
//                       <div className="flex items-center">
//                         <div className="w-10 h-10 rounded-full mr-3 border border-blue-200 bg-blue-100 flex items-center justify-center shadow-sm">
//                           <FaUser className="text-blue-600" />
//                         </div>
//                         <div>
//                           <p className="font-medium text-gray-900">
//                             {userName}
//                           </p>
//                           <p className="text-xs text-gray-500">Comprador</p>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="max-h-96 overflow-y-auto divide-y divide-gray-100">
//                       <MenuSection title="Mi Cuenta">
//                         <MenuItem
//                           icon={<FaUser className="text-blue-500" />}
//                           text="Mi perfil"
//                           onClick={navigateTo.perfil}
//                         />
//                         <MenuItem
//                           icon={<FaHeart className="text-red-500" />}
//                           text="Favoritos"
//                           onClick={navigateTo.favoritos}
//                         />
//                         <MenuItem
//                           icon={<FaBell className="text-yellow-500" />}
//                           text="Notificaciones"
//                           onClick={navigateTo.notificaciones}
//                         />
//                         <MenuItem
//                           icon={<FaShopify className="text-green-500" />}
//                           text="Vender Artículo"
//                           onClick={navigateTo.venta}
//                         />
//                       </MenuSection>

//                       <MenuSection title="Mis Compras">
//                         <MenuItem
//                           icon={<FaShoppingCart className="text-blue-500" />}
//                           text="Carrito de compras"
//                           onClick={handleCarritoClick}
//                         />
//                         <MenuItem
//                           icon={<FaHistory className="text-purple-500" />}
//                           text="Historial de compras"
//                           onClick={navigateTo.historial}
//                         />
//                         <MenuItem
//                           icon={<FaStore className="text-indigo-500" />}
//                           text="Pedidos activos"
//                           onClick={navigateTo.pedido}
//                         />
//                       </MenuSection>

//                       <MenuSection title="Métodos de Pago">
//                         <MenuItem
//                           icon={<FaCreditCard className="text-gray-700" />}
//                           text="Mis tarjetas"
//                           onClick={navigateTo.tarjetas}
//                         />
//                         <MenuItem
//                           icon={<RiCouponLine className="text-orange-500" />}
//                           text="Cupones y promociones"
//                           onClick={navigateTo.cupones}
//                         />
//                       </MenuSection>

//                       <MenuSection title="Mis Listas">
//                         <MenuItem
//                           icon={<FaList className="text-teal-500" />}
//                           text="Lista de deseos"
//                           onClick={navigateTo.listadeseos}
//                         />
//                         <MenuItem
//                           icon={<FaList className="text-blue-500" />}
//                           text="Lista de compras"
//                           onClick={navigateTo.listaCompras}
//                         />
//                       </MenuSection>

//                       <MenuSection title="Ayuda y Configuración">
//                         <MenuItem
//                           icon={<IoMdHelp className="text-blue-500" />}
//                           text="Centro de ayuda"
//                           onClick={navigateTo.ayuda}
//                         />
//                         <MenuItem
//                           icon={<FaLock className="text-gray-700" />}
//                           text="Privacidad y seguridad"
//                           onClick={navigateTo.privacidad}
//                         />
//                         <MenuItem
//                           icon={<FaEnvelope className="text-green-500" />}
//                           text="Contactar soporte"
//                           onClick={navigateTo.soporte}
//                         />
//                         <MenuItem
//                           icon={<FaCog className="text-gray-600" />}
//                           text="Configuración"
//                           onClick={navigateTo.configuracion}
//                         />
//                       </MenuSection>

//                       <div className="p-2 bg-gray-50">
//                         {isAuthenticated && (
//                           <MenuItem
//                             icon={<FaSignOutAlt className="text-red-500" />}
//                             text="Cerrar sesión"
//                             onClick={logout}
//                             className="hover:bg-red-50"
//                           />
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>
//     );
//   };

//   const Categorias = () => {
//     const navigate = useNavigate();
//     const [showLeftButton, setShowLeftButton] = useState(false);
//     const [showRightButton, setShowRightButton] = useState(true);
//     const categoriesContainerRef = useRef(null);

//     const handleCategoryClick = (path, categoryValue) => {
//       // Navegar a /buscar con el parámetro de categoría
//       navigate(`/buscar?category=${encodeURIComponent(categoryValue)}`);
//     };

//     const checkScrollPosition = () => {
//       if (categoriesContainerRef.current) {
//         const { scrollLeft, scrollWidth, clientWidth } =
//           categoriesContainerRef.current;
//         setShowLeftButton(scrollLeft > 5);
//         setShowRightButton(scrollLeft < scrollWidth - clientWidth - 5);
//       }
//     };

//     const scrollCategories = (direction) => {
//       if (categoriesContainerRef.current) {
//         const cardWidth = 128;
//         const visibleWidth = categoriesContainerRef.current.clientWidth;
//         const scrollAmount =
//           Math.floor(visibleWidth / cardWidth) * cardWidth * 0.8;

//         categoriesContainerRef.current.scrollBy({
//           left: direction === "left" ? -scrollAmount : scrollAmount,
//           behavior: "smooth",
//         });

//         setTimeout(checkScrollPosition, 500);
//       }
//     };

//     useEffect(() => {
//       const container = categoriesContainerRef.current;
//       const preventVerticalScroll = (e) => {
//         if (e.deltaY === 0) return;
//         if (
//           (e.deltaY < 0 && container.scrollLeft <= 0) ||
//           (e.deltaY > 0 &&
//             container.scrollLeft >=
//               container.scrollWidth - container.clientWidth)
//         ) {
//           e.preventDefault();
//         }
//       };

//       if (container) {
//         container.addEventListener("wheel", preventVerticalScroll, {
//           passive: false,
//         });
//         checkScrollPosition();
//       }

//       window.addEventListener("resize", checkScrollPosition);
//       return () => {
//         if (container) {
//           container.removeEventListener("wheel", preventVerticalScroll);
//         }
//         window.removeEventListener("resize", checkScrollPosition);
//       };
//     }, []);

//     return (
//       <div className="w-full py-2 relative before:absolute before:inset-0 before:bg-gray-50 before:opacity-50">
//         <div className="container mx-auto px-1 relative z-10">
//           <div className="flex items-center relative">
//             <h2 className="text-xl font-bold uppercase mr-4 lg:mr-8 text-gray-600 w-24 lg:w-36 flex-shrink-0">
//               CATEGORÍAS
//             </h2>

//             <div className="flex-grow relative overflow-hidden">
//               <div
//                 ref={categoriesContainerRef}
//                 className="flex overflow-x-auto space-x-4 pt-2 px-2 scrollbar-hide scroll-smooth no-scrollbar"
//                 onScroll={checkScrollPosition}
//                 style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
//               >
//                 {CATEGORIES.map((category) => (
//                   <button
//                     key={category.path}
//                     onClick={() =>
//                       handleCategoryClick(category.path, category.categoryValue)
//                     }
//                     className="flex-shrink-0 bg-white p-4 rounded-xl shadow-xl flex flex-col items-center justify-center w-28 h-32 sm:w-32 sm:h-36 hover:bg-blue-100 border border-gray-100 transition-all duration-300 hover:scale-105 group relative"
//                     style={{
//                       boxShadow:
//                         "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(0, 0, 0, 0.03)",
//                     }}
//                   >
//                     <div className="absolute inset-0 rounded-xl opacity-0 bg-gradient-to-b from-white to-transparent group-hover:opacity-10"></div>
//                     <span className="text-3xl mb-3 group-hover:text-blue-600 transition-colors duration-300">
//                       {category.icon}
//                     </span>
//                     <span className="text-xs font-semibold text-gray-700 uppercase text-center px-1 group-hover:text-blue-800 transition-colors duration-300">
//                       {category.label}
//                     </span>
//                   </button>
//                 ))}
//               </div>

//               {showLeftButton && (
//                 <button
//                   onClick={() => scrollCategories("left")}
//                   className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white hover:bg-blue-200 shadow-xl rounded-full p-2 sm:p-3 hover:scale-110 transition-all duration-300 z-10 border border-gray-200"
//                   style={{
//                     boxShadow:
//                       "0 10px 15px -3px rgba(0, 0, 0, 0.15), 0 4px 6px -2px rgba(0, 0, 0, 0.1)",
//                   }}
//                   aria-label="Categorías anteriores"
//                 >
//                   <ChevronLeft className="text-blue-600" size={24} />
//                 </button>
//               )}

//               {showRightButton && (
//                 <button
//                   onClick={() => scrollCategories("right")}
//                   className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white hover:bg-blue-100 shadow-xl rounded-full p-2 sm:p-3 hover:scale-110 transition-all duration-300 z-10 border border-gray-200"
//                   style={{
//                     boxShadow:
//                       "0 10px 15px -3px rgba(0, 0, 0, 0.15), 0 4px 6px -2px rgba(0, 0, 0, 0.1)",
//                   }}
//                   aria-label="Más categorías"
//                 >
//                   <ChevronRight className="text-blue-600" size={24} />
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const Anuncios = () => (
//     <section className="w-full overflow-hidden">
//       <div className="text-center mb-6">
//         <h2 className="text-2xl font-bold relative inline-block">
//           Anuncios de Temporada
//         </h2>
//       </div>
//       <div className="w-full">
//         <Slider {...SLIDER_SETTINGS}>
//           {ANUNCIOS.map((anuncio, index) => (
//             <div key={index} className="w-full">
//               <div className="relative overflow-hidden w-full">
//                 <div className="relative aspect-[16/9] md:aspect-[16/7] lg:aspect-[16/5] overflow-hidden bg-gradient-to-r from-blue-100 via-yellow-100 to-orange-100">
//                   {anuncio.tag && (
//                     <div className="absolute top-4 left-4 z-10">
//                       <div
//                         className={`${anuncio.tagColor} text-white px-3 py-1 rounded-lg font-bold flex items-center filter drop-shadow-md`}
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
//                       <div className="bg-white text-gray-800 px-3 py-1 rounded-full text-xs font-medium">
//                         {anuncio.badge}
//                       </div>
//                     </div>
//                   )}
//                   <div className="absolute inset-0 shadow-inner bg-gradient-to-t from-black/20 to-transparent opacity-30 pointer-events-none"></div>
//                   <img
//                     src={anuncio.imagen}
//                     className="w-full h-full object-cover"
//                     alt={anuncio.alt}
//                     style={{
//                       filter: "brightness(1.02) contrast(1.05)",
//                     }}
//                   />
//                 </div>
//               </div>
//             </div>
//           ))}
//         </Slider>
//       </div>
//     </section>
//   );

//   return (
//     <div className="min-h-screen bg-[#f4f6fc] relative text-[#484d45] max-w-screen overflow-x-hidden">
//       <div className="absolute inset-0 flex justify-center opacity-10 pointer-events-none">
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
//         <OfertasDestacadas />
//         <ArticulosMasVendidos />
//       </main>
//       <Footer />

//       {/* Modal de Login - Esta es la corrección clave */}
//       {showLoginModal && (
//         <Login
//           onClose={() => setShowLoginModal(false)}
//           // Pasa cualquier otra prop que necesite tu componente Login
//         />
//       )}
//     </div>
//   );
// };

// export default MainPage;

import React, { useContext, useState, useRef, useEffect, useMemo } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
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
  i3,
  i1,
  i2,
} from "../assets/imagenes/imagenesslider";
import {
  ChevronLeft,
  ChevronRight,
  LogOut,
  Star,
  Filter,
  X,
} from "lucide-react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Login from "./Login";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
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
  FaTag,
  FaTags,
  FaChevronRight,
  FaClock,
  FaStar,
  FaFire,
} from "react-icons/fa";
import { IoMdHelp } from "react-icons/io";
import { RiCouponLine } from "react-icons/ri";
import axios from "axios";
import { BsPatchCheck } from "react-icons/bs";
import Footer from "../components/Footer";
import { useCurrency } from "../CurrencyContext";
import OfertasDestacadas from "../components/OfertasDestacadas";
import ArticulosMasVendidos from "../components/ArticulosMasVendidos";

const CATEGORIES = [
  {
    icon: <FaMobile className="text-blue-500" />,
    label: "Smartphones",
    path: "/buscar",
    categoryValue: "TELEFONOS",
  },
  {
    icon: <FaKeyboard className="text-purple-500" />,
    label: "Periféricos",
    path: "/buscar",
    categoryValue: "PERIFÉRICOS",
  },
  {
    icon: <FaLaptop className="text-indigo-500" />,
    label: "Laptops",
    path: "/buscar",
    categoryValue: "LAPTOPS",
  },
  {
    icon: <FaCamera className="text-yellow-500" />,
    label: "Cámaras",
    path: "/buscar",
    categoryValue: "CÁMARAS",
  },
  {
    icon: <FaTv className="text-red-500" />,
    label: "Televisores",
    path: "/buscar",
    categoryValue: "TELEVISORES",
  },
  {
    icon: <FaHome className="text-green-500" />,
    label: "Hogar",
    path: "/buscar",
    categoryValue: "HOGAR",
  },
  {
    icon: <FaRunning className="text-orange-500" />,
    label: "Deportes",
    path: "/buscar",
    categoryValue: "DEPORTES",
  },
  {
    icon: <FaCar className="text-gray-600" />,
    label: "Vehículos",
    path: "/buscar",
    categoryValue: "VEHÍCULOS",
  },
  {
    icon: <FaGamepad className="text-pink-500" />,
    label: "Videojuegos",
    path: "/buscar",
    categoryValue: "GAMING",
  },
  {
    icon: <FaTshirt className="text-teal-500" />,
    label: "Ropa",
    path: "/buscar",
    categoryValue: "ROPA",
  },
  {
    icon: <FaShoePrints className="text-brown-500" />,
    label: "Zapatos",
    path: "/buscar",
    categoryValue: "ZAPATOS",
  },
  {
    icon: <FaChild className="text-amber-500" />,
    label: "Juguetes",
    path: "/buscar",
    categoryValue: "JUGUETES",
  },
  {
    icon: <FaGuitar className="text-lime-500" />,
    label: "Instrumentos",
    path: "/buscar",
    categoryValue: "INSTRUMENTOS",
  },
  {
    icon: <FaBook className="text-blue-600" />,
    label: "Libros",
    path: "/buscar",
    categoryValue: "LIBROS",
  },
  {
    icon: <FaBaby className="text-pink-300" />,
    label: "Bebés",
    path: "/buscar",
    categoryValue: "BEBÉS",
  },
  {
    icon: <FaPaw className="text-yellow-600" />,
    label: "Mascotas",
    path: "/buscar",
    categoryValue: "MASCOTAS",
  },
  {
    icon: <FaUtensils className="text-red-400" />,
    label: "Cocina",
    path: "/buscar",
    categoryValue: "COCINA",
  },
  {
    icon: <FaBath className="text-blue-300" />,
    label: "Baño",
    path: "/buscar",
    categoryValue: "BAÑO",
  },
  {
    icon: <FaPlane className="text-indigo-300" />,
    label: "Viajes",
    path: "/buscar",
    categoryValue: "VIAJE",
  },
  {
    icon: <FaTree className="text-green-600" />,
    label: "Jardín",
    path: "/buscar",
    categoryValue: "JARDÍN",
  },
  {
    icon: <FaDumbbell className="text-gray-700" />,
    label: "Fitness",
    path: "/buscar",
    categoryValue: "FITNESS",
  },
  {
    icon: <FaGlassWhiskey className="text-amber-600" />,
    label: "Bebidas",
    path: "/buscar",
    categoryValue: "BEBIDAS",
  },
  {
    icon: <FaGift className="text-pink-500" />,
    label: "Regalos",
    path: "/buscar",
    categoryValue: "REGALOS",
  },
  {
    icon: <FaHeadphones className="text-blue-400" />,
    label: "Audio",
    path: "/buscar",
    categoryValue: "AUDIO",
  },
  {
    icon: <FaTabletAlt className="text-indigo-400" />,
    label: "Tablets",
    path: "/buscar",
    categoryValue: "TABLETS",
  },
  {
    icon: <FaDesktop className="text-gray-800" />,
    label: "Computadoras",
    path: "/buscar",
    categoryValue: "COMPUTADORAS",
  },
  {
    icon: <FaKeyboard className="text-purple-400" />,
    label: "Teclados",
    path: "/buscar",
    categoryValue: "TECLADOS",
  },
  {
    icon: <FaMousePointer className="text-gray-500" />,
    label: "Mouses",
    path: "/buscar",
    categoryValue: "MOUSES",
  },
];

const ANUNCIOS = [
  {
    imagen: i1,
    alt: "Oferta de productos de oficina",
    tag: "FULL",
    tagColor: "bg-green-500",
    tagIcon: "⚡",
    badge: "ENVÍOS RÁPIDOS",
  },
  {
    imagen: i2,
    alt: "Ventiladores y productos para el calor",
    tag: "OFERTA",
    tagColor: "bg-red-500",
  },
  {
    imagen: i3,
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
    historial: () => navigate("/historial"),
    pedido: () => navigate("/pedido"),
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
          aria-label="Buscar productos y marcas"
        />
        <FaSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-2 rounded-full font-medium hover:from-blue-600 hover:to-blue-700 transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300"
          aria-label="Iniciar búsqueda"
        >
          Buscar
        </button>
      </form>
    );
  };

  const MenuSection = ({ title, children }) => (
    <div className="py-2 px-1">
      <h3 className="text-xs font-semibold text-gray-700 px-3 mb-2">{title}</h3>
      <div className="space-y-1">{children}</div>
    </div>
  );

  const MenuItem = ({ icon, text, onClick, className = "" }) => (
    <button
      onClick={onClick}
      className={`w-full flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-blue-50 rounded-md transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-300 ${className}`}
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      aria-label={text}
    >
      <span className="flex-shrink-0">{icon}</span>
      <span className="text-sm">{text}</span>
    </button>
  );

  const Header = () => {
    const [userName, setuserName] = useState();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [cartcount, setCartCount] = useState(0);
    useEffect(() => {
      const usuario = localStorage.getItem("usuario");
      if (usuario) {
        setuserName(usuario);
        setIsAuthenticated(true);
      }
    }, []);
    useEffect(() => {
      const cartcheck = async () => {
        try {
          const id = localStorage.getItem("idusuario");
          const response = await fetch(
            `http://localhost:3001/api/carrito?userId=${id}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          if (!response.ok) {
            throw new Error("Error al obtener el carrito");
          }
          const data = await response.json();
          setCartCount(data.length);
        } catch (error) {
          console.error("Error al verificar el carrito:", error);
        }
      };
      cartcheck();
    }, []);

    const logout = () => {
      if (!isAuthenticated) {
        toast.error("No hay sesión iniciada", {
          toastId: "logout-error",
        });
      } else {
        localStorage.removeItem("usuario");
        setIsAuthenticated(false);
        toast.success("Sesión cerrada exitosamente", {
          toastId: "logout-exito",
        });
        navigate("/");
      }
    };
    const handleCarritoClick = () => {
      navigateTo.carrito();
      setShowOpciones(false);
    };
    const navigate = useNavigate();

    const [showOpciones, setShowOpciones] = useState(false);
    const menuRef = useRef(null);

    const toggleMenu = () => setShowOpciones(!showOpciones);
    const handleMouseEnter = () => setShowOpciones(true);
    const handleMouseLeave = () => setShowOpciones(false);

    const navigateTo = {
      home: () => navigate("/"),
      carrito: () => navigate("/carrito"),
      perfil: () => navigate("/perfil"),
      favoritos: () => navigate("/favoritos"),
      venta: () => navigate("/venta"),
      historial: () => navigate("/historial"),
      pedido: () => navigate("/pedido"),
      tarjetas: () => navigate("/tarjetas"),
      cupones: () => navigate("/cupones"),
      listadeseos: () => navigate("/listadeseos"),
      listaCompras: () => navigate("/lista-compras"),
      ayuda: () => navigate("/ayuda"),
      privacidad: () => navigate("/privacidad"),
      soporte: () => navigate("/soporte"),
      configuracion: () => navigate("/configuracion"),
    };

    return (
      <header className="bg-[#cae8ff] border-b border-blue-200 shadow-md">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-full flex flex-col md:flex-row justify-between items-center py-4">
            <div className="order-2 md:order-1 w-full md:w-auto flex justify-center md:justify-start">
              <div
                className="cursor-pointer"
                onClick={navigateTo.home}
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && navigateTo.home()}
                aria-label="Ir a la página principal"
              >
                <img
                  src={logoCompleto}
                  alt="SOAP Logo"
                  className="w-36"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="order-1 md:order-2 w-full md:max-w-3xl mx-0 md:mx-8 mb-4 md:mb-0">
              <SearchBar />
            </div>

            <div className="order-3 md:order-3 flex items-center space-x-3">
              <button
                className="bg-blue-600 p-3.5 rounded-full text-white shadow-md transition-all duration-200 relative z-10 hover:bg-[#edf6f9] hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                onClick={navigateTo.carrito}
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && navigateTo.carrito()}
                aria-label={`Ver carrito con ${cartcount} productos`}
              >
                <FaShoppingCart className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                  {cartcount}
                </span>
              </button>
              {!isAuthenticated && (
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="bg-blue-600 text-white px-8 py-2 rounded-full font-medium shadow-md transition-all duration-200 text-lg md:text-xl hover:bg-[#edf6f9] hover:text-blue-600 group focus:outline-none focus:ring-2 focus:ring-blue-300"
                  tabIndex={0}
                  onKeyDown={(e) =>
                    e.key === "Enter" && setShowLoginModal(true)
                  }
                  aria-label="Iniciar sesión"
                >
                  <span>Login</span>
                </button>
              )}
              <div
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  onClick={toggleMenu}
                  className="bg-blue-600 p-2 rounded-full text-white shadow-md transition-all duration-200 hover:bg-blue-400 flex flex-col items-center justify-center w-16 h-16 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  aria-label={
                    showOpciones
                      ? "Cerrar menú de opciones"
                      : "Abrir menú de opciones"
                  }
                  aria-expanded={showOpciones}
                  aria-controls="menu-dropdown"
                >
                  <FaBars className="w-6 h-6 mb-1" />
                  <span className="text-xs">Menú</span>
                </button>

                {showOpciones && (
                  <div
                    ref={menuRef}
                    id="menu-dropdown"
                    className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl z-50 border border-gray-100 overflow-hidden"
                    role="menu"
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
                          <p className="text-xs text-gray-700">Comprador</p>
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
                          onClick={navigateTo.pedido}
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
                          onClick={navigateTo.listadeseos}
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
                        {isAuthenticated && (
                          <MenuItem
                            icon={<FaSignOutAlt className="text-red-500" />}
                            text="Cerrar sesión"
                            onClick={logout}
                            className="hover:bg-red-50"
                          />
                        )}
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

    const handleCategoryClick = (path, categoryValue) => {
      navigate(`/buscar?category=${encodeURIComponent(categoryValue)}`);
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
                    onClick={() =>
                      handleCategoryClick(category.path, category.categoryValue)
                    }
                    className="flex-shrink-0 bg-white p-4 rounded-xl shadow-xl flex flex-col items-center justify-center w-28 h-32 sm:w-32 sm:h-36 hover:bg-blue-100 border border-gray-100 transition-all duration-300 hover:scale-105 group relative focus:outline-none focus:ring-2 focus:ring-blue-300"
                    tabIndex={0}
                    onKeyDown={(e) =>
                      e.key === "Enter" &&
                      handleCategoryClick(category.path, category.categoryValue)
                    }
                    style={{
                      boxShadow:
                        "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(0, 0, 0, 0.03)",
                    }}
                    aria-label={`Explorar categoría ${category.label}`}
                  >
                    <div className="absolute inset-0 rounded-xl opacity-0 bg-gradient-to-b from-white to-transparent group-hover:opacity-10"></div>
                    <span className="text-3xl mb-3 group-hover:text-blue-600 transition-colors duration-300">
                      {category.icon}
                    </span>
                    <span className="text-xs font-semibold text-gray-700 uppercase text-center px-1 group-hover:text-blue-800 transition-colors duration-300">
                      {category.label}
                    </span>
                  </button>
                ))}
              </div>

              {showLeftButton && (
                <button
                  onClick={() => scrollCategories("left")}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white hover:bg-blue-200 shadow-xl rounded-full p-2 sm:p-3 hover:scale-110 transition-all duration-300 z-10 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  tabIndex={0}
                  onKeyDown={(e) =>
                    e.key === "Enter" && scrollCategories("left")
                  }
                  style={{
                    boxShadow:
                      "0 10px 15px -3px rgba(0, 0, 0, 0.15), 0 4px 6px -2px rgba(0, 0, 0, 0.1)",
                  }}
                  aria-label="Ver categorías anteriores"
                >
                  <ChevronLeft className="text-blue-600" size={24} />
                </button>
              )}

              {showRightButton && (
                <button
                  onClick={() => scrollCategories("right")}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white hover:bg-blue-100 shadow-xl rounded-full p-2 sm:p-3 hover:scale-110 transition-all duration-300 z-10 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  tabIndex={0}
                  onKeyDown={(e) =>
                    e.key === "Enter" && scrollCategories("right")
                  }
                  style={{
                    boxShadow:
                      "0 10px 15px -3px rgba(0, 0, 0, 0.15), 0 4px 6px -2px rgba(0, 0, 0, 0.1)",
                  }}
                  aria-label="Ver más categorías"
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
    <section
      className="w-full overflow-hidden"
      aria-label="Anuncios promocionales"
    >
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
                    style={{ filter: "brightness(1.02) contrast(1.05)" }}
                    loading="lazy"
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
          alt="Flor decorativa de fondo"
          className="absolute left-0 w-1/3 md:w-1/4"
          loading="lazy"
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

      {showLoginModal && <Login onClose={() => setShowLoginModal(false)} />}
    </div>
  );
};

export default MainPage;
