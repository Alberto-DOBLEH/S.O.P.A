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
  FaPhone,
  FaLaptop,
  FaTv,
  FaCamera,
  FaHome,
  FaCar,
  FaGamepad,
  FaTools,
} from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { IoMdHelp } from "react-icons/io";
import { RiCouponLine } from "react-icons/ri";
import { GiClothes, GiRunningShoe } from "react-icons/gi";
import { MdToys, MdSportsBaseball, MdHealthAndSafety } from "react-icons/md";

export const ICONS = {
  // Iconos de UI
  buscar: <FaSearch size={20} />,
  carrito: <FaShoppingCart size={20} />,
  usuario: <FaUser size={20} />,
  favoritos: <FaHeart size={20} />,
  notificaciones: <FaBell size={20} />,
  historial: <FaHistory size={20} />,
  tienda: <FaStore size={20} />,
  tarjeta: <FaCreditCard size={20} />,
  lista: <FaList size={20} />,
  seguridad: <FaLock size={20} />,
  correo: <FaEnvelope size={20} />,
  configuracion: <FaCog size={20} />,
  salir: <FaSignOutAlt size={20} />,
  ayuda: <IoMdHelp size={20} />,
  cupones: <RiCouponLine size={20} />,

  // Iconos de categorías
  smartphones: <FaPhone size={24} />,
  perifericos: <BiCategory size={24} />,
  laptops: <FaLaptop size={24} />,
  camaras: <FaCamera size={24} />,
  televisores: <FaTv size={24} />,
  hogar: <FaHome size={24} />,
  deportes: <MdSportsBaseball size={24} />,
  vehiculos: <FaCar size={24} />,
  videojuegos: <FaGamepad size={24} />,
  herramientas: <FaTools size={24} />,
  ropa: <GiClothes size={24} />,
  zapatos: <GiRunningShoe size={24} />,
  juguetes: <MdToys size={24} />,
  salud: <MdHealthAndSafety size={24} />,
};
