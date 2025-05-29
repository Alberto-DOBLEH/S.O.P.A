import React from "react";
import { FaShoppingCart, FaBars } from "react-icons/fa";
import logoCompleto from "../../assets/imagenes/logo-completo.png";
import { useNavigate } from "react-router-dom";

const Header = ({ onLoginClick }) => {
  const navigate = useNavigate();

  return (
    <header className="bg-[#cae8ff] border-b border-blue-200 shadow-md">
      <div className="mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div onClick={() => navigate("/")} className="cursor-pointer">
          <img src={logoCompleto} alt="SOPA Logo" className="w-36" />
        </div>

        {/* Botones */}
        <div className="flex gap-4">
          <button
            className="bg-blue-600 p-3 rounded-full text-white shadow-md hover:bg-blue-700 relative"
            onClick={() => navigate("/carrito")}
          >
            <FaShoppingCart className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              0
            </span>
          </button>

          <button
            onClick={onLoginClick}
            className="bg-blue-600 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-700"
          >
            Perfil
          </button>

          <button className="bg-blue-500 p-3 rounded-full text-white shadow-md hover:bg-blue-600">
            <FaBars className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
