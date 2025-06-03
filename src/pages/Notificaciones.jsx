import React from "react";
import Header from "../components/Heaader";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { FaClock } from "react-icons/fa"; // Ícono para "Coming Soon"

const Notificationes = () => {
  const navigate = useNavigate();

  const navigateTo = {
    home: () => navigate("/"),
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Header />
      <div className="absolute inset-0 flex justify-center opacity-10 pointer-events-none">
        <img
          alt="Flor decorativa"
          className="absolute left-0 w-1/3 md:w-1/4"
        />
      </div>
      <main className="max-w-7xl mx-auto px-4 py-8 flex-grow">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Mis Notificaciones
          </h1>
          <div className="flex flex-col items-center justify-center space-y-6">
            <div className="flex items-center space-x-2 text-yellow-600">
              <FaClock className="w-6 h-6" />
              <p className="text-lg font-medium">Coming Soon</p>
            </div>
            <p className="text-gray-600 max-w-md">
              Estamos trabajando para traerte esta funcionalidad. ¡Vuelve pronto
              para gestionar tu lista de deseos!
            </p>
            <button
              type="button"
              aria-label="Regresar al inicio"
              onClick={navigateTo.home}
              className="transform -translate-y-1/2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-full font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Regresar al Inicio
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Notificationes;
