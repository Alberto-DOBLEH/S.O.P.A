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
        </div>
      </div>
    </header>
  );
};

export default Header;
