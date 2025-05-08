// pages/ZonaPrivada.jsx
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ZonaPrivada = () => {
  const { usuario, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!usuario) {
    return <p className="text-center mt-10 text-red-500">No tienes acceso. Inicia sesión.</p>;
  }

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">Bienvenido, {usuario}</h1>
      <p className="mb-6">Aquí puedes acceder a funciones exclusivas de usuario autenticado.</p>
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
      >
        Cerrar sesión
      </button>
    </div>
  );
};

export default ZonaPrivada;
