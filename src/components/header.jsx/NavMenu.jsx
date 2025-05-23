import React from "react";
import {
  FaUser,
  FaHeart,
  FaBell,
  FaHistory,
  FaStore,
  FaCreditCard,
  FaShopify,
  FaTag,
  FaListUl,
  FaClipboardList,
  FaHeadset,
  FaCog,
} from "react-icons/fa";
import { RiCouponLine } from "react-icons/ri";
import { IoMdHelp } from "react-icons/io";
import { FaChevronDown, FaChevronLeft, FaChevronRight } from "react-icons/fa";
const NavMenu = ({
  menuScrollRef,
  canScrollLeft,
  canScrollRight,
  scrollMenu,
  toggleCategories,
  customNavItems,
  navigateTo,
}) => {
  const defaultNavItems = [
    { icon: <FaUser />, label: "Mi Cuenta", onClick: navigateTo.cuenta },
    { icon: <FaHeart />, label: "Favoritos", onClick: navigateTo.favoritos },
    {
      icon: <FaBell />,
      label: "Notificaciones",
      onClick: navigateTo.notificaciones,
    },
    {
      icon: <FaHistory />,
      label: "Mis Compras",
      onClick: navigateTo.historial,
    },
    { icon: <FaStore />, label: "Pedidos", onClick: navigateTo.pedidos },
    { icon: <FaCreditCard />, label: "Tarjetas", onClick: navigateTo.tarjetas },
    { icon: <FaShopify />, label: "Vender", onClick: navigateTo.venta },
    { icon: <RiCouponLine />, label: "Cupones", onClick: navigateTo.cupones },
    {
      icon: <FaTag />,
      label: "Ofertas",
      onClick: () => navigateTo.categoria("/ofertas"),
    },
    {
      icon: <FaListUl />,
      label: "Lista de Deseos",
      onClick: navigateTo.listaDeseos,
    },
    {
      icon: <FaClipboardList />,
      label: "Lista de Compras",
      onClick: navigateTo.listaCompras,
    },
    { icon: <IoMdHelp />, label: "Ayuda", onClick: navigateTo.ayuda },
    { icon: <FaHeadset />, label: "Soporte", onClick: navigateTo.soporte },
    {
      icon: <FaCog />,
      label: "Configuración",
      onClick: navigateTo.configuracion,
    },
  ];

  const navItems = [...defaultNavItems, ...customNavItems];

  return (
    <div className="bg-yellow-400 text-blue-900 w-full">
      <div className="w-full px-2">
        <div className="flex items-center">
          <button
            className="font-bold py-2 px-2 text-base flex items-center"
            onClick={toggleCategories}
          >
            <span>Categorías</span>
            <FaChevronDown className="ml-1" />
          </button>

          <div className="relative flex items-center flex-1 overflow-hidden">
            {canScrollLeft && (
              <button
                onClick={() => scrollMenu("left")}
                className="absolute left-0 z-10 h-full flex items-center justify-center px-1 bg-gradient-to-r from-yellow-400 to-transparent"
                aria-label="Scroll left"
              >
                <FaChevronLeft className="text-blue-900" />
              </button>
            )}

            <div
              ref={menuScrollRef}
              className="flex overflow-x-auto py-2 space-x-5 flex-1 no-scrollbar scroll-smooth"
              style={{
                msOverflowStyle: "none",
                scrollbarWidth: "none",
                paddingLeft: canScrollLeft ? "16px" : "0",
                paddingRight: canScrollRight ? "16px" : "0",
              }}
            >
              {navItems.map((item, index) => (
                <button
                  key={index}
                  className="whitespace-nowrap text-blue-900 font-medium flex items-center text-s"
                  onClick={item.onClick}
                >
                  {item.icon} {item.label}
                </button>
              ))}
            </div>

            {canScrollRight && (
              <button
                onClick={() => scrollMenu("right")}
                className="absolute right-0 z-10 h-full flex items-center justify-center px-1 bg-gradient-to-l from-yellow-400 to-transparent"
                aria-label="Scroll right"
              >
                <FaChevronRight className="text-blue-900" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavMenu;
