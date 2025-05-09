// ==============================================
// ICONOS DE FONTAWESOME (react-icons/fa)
// ==============================================

import {
  FaSearch as SearchIcon,
  FaShoppingCart as CartIcon,
  FaUser as UserIcon,
  FaHeart as HeartIcon,
  FaBell as BellIcon,
  FaHistory as HistoryIcon,
  FaStore as StoreIcon,
  FaCreditCard as CreditCardIcon,
  FaList as ListIcon,
  FaLock as LockIcon,
  FaEnvelope as EnvelopeIcon,
  FaCog as CogIcon,
  FaSignOutAlt as SignOutIcon,
  FaBars as MenuIcon,
  FaShopify as ShopifyIcon,
  FaTimes as CloseIcon,
  FaMobile as MobileIcon,
  FaKeyboard as KeyboardIcon,
  FaLaptop as LaptopIcon,
  FaCamera as CameraIcon,
  FaTv as TvIcon,
  FaHome as HomeIcon,
  FaRunning as RunningIcon,
  FaCar as CarIcon,
  FaGamepad as GamepadIcon,
  FaTshirt as ShirtIcon,
  FaShoePrints as ShoeIcon,
  FaChild as ChildIcon,
  FaGuitar as GuitarIcon,
  FaBook as BookIcon,
  FaBaby as BabyIcon,
  FaPaw as PawIcon,
  FaUtensils as UtensilsIcon,
  FaBath as BathIcon,
  FaPlane as PlaneIcon,
  FaTree as TreeIcon,
  FaDumbbell as DumbbellIcon,
  FaGlassWhiskey as GlassIcon,
  FaAppleAlt as AppleIcon,
  FaGift as GiftIcon,
  FaHeadphones as HeadphonesIcon,
  FaTabletAlt as TabletIcon,
  FaDesktop as DesktopIcon,
  FaMousePointer as MouseIcon,
  FaTag as TagIcon,
  FaTags as TagsIcon,
  FaChevronRight as ChevronRightIcon,
  FaChevronLeft as ChevronLeftIcon,
  FaClock as ClockIcon,
  FaStar as StarIcon,
  FaFire as FireIcon,
  FaFilter as FilterIcon,
} from "react-icons/fa";

// ==============================================
// ICONOS DE BOXICONS (react-icons/bi)
// ==============================================
import {
  BiCategory as CategoryIcon,
  BiUser as UserAltIcon,
  BiShoppingBag as ShoppingBagIcon,
  BiHelpCircle as HelpCircleIcon,
} from "react-icons/bi";

// ==============================================
// ICONOS DE IONICONS (react-icons/io)
// ==============================================
import {
  IoMdHelp as HelpIcon,
  IoMdNotifications as NotificationIcon,
} from "react-icons/io";

// ==============================================
// ICONOS DE REMIX ICONS (react-icons/ri)
// ==============================================
import {
  RiCouponLine as CouponIcon,
  RiSecurePaymentLine as SecurePaymentIcon,
  RiCustomerServiceLine as CustomerServiceIcon,
} from "react-icons/ri";

// ==============================================
// ICONOS DE BOOTSTRAP ICONS (react-icons/bs)
// ==============================================
import {
  BsPatchCheck as VerifiedIcon,
  BsStarFill as StarFillIcon,
  BsArrowRight as ArrowRightIcon,
} from "react-icons/bs";

// ==============================================
// ICONOS DE MATERIAL DESIGN (react-icons/md)
// ==============================================
import {
  MdPayment as PaymentIcon,
  MdLocalShipping as ShippingIcon,
} from "react-icons/md";

// ==============================================
// EXPORTACIÓN ORGANIZADA
// ==============================================

// Exportación por categorías
export const SystemIcons = {
  SearchIcon,
  MenuIcon,
  CloseIcon,
  UserIcon,
  SignOutIcon,
  CogIcon,
};

export const EcommerceIcons = {
  CartIcon,
  ShopIcon: ShopifyIcon,
  CategoryIcon,
  TagsIcon,
  CouponIcon,
  VerifiedIcon,
};

export const ProductIcons = {
  MobileIcon,
  LaptopIcon,
  CameraIcon,
  TvIcon,
  ShirtIcon,
  ShoeIcon,
  BookIcon,
  GiftIcon,
};

export const InterfaceIcons = {
  BellIcon,
  HeartIcon,
  StarIcon,
  ClockIcon,
  FilterIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
};

export const PaymentIcons = {
  CreditCardIcon,
  PaymentIcon,
  SecurePaymentIcon,
};

export const MiscIcons = {
  HomeIcon,
  CarIcon,
  PlaneIcon,
  TreeIcon,
  AppleIcon,
  GlassIcon,
  ChildIcon,
};

// Exportación individual nombrada (alternativa)
export {
  SearchIcon,
  CartIcon,
  UserIcon,
  // ... otros iconos que necesites exportar individualmente
};

// Exportación por paquetes (opcional)
export const FaIcons = {
  SearchIcon,
  CartIcon,
  UserIcon,
  // ... otros iconos de FontAwesome
};

export const BiIcons = {
  CategoryIcon,
  UserAltIcon,
  // ... otros iconos de Boxicons
};

// Exportación por defecto de todos los iconos
export default {
  ...SystemIcons,
  ...EcommerceIcons,
  ...ProductIcons,
  ...InterfaceIcons,
  ...PaymentIcons,
  ...MiscIcons,
};
