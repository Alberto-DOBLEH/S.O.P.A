import React, { useState } from "react";
import Button from "../components/UI/Button";
import logoCompleto from "../assets/imagenes/logo-completo.png";
import backgroundImage from "../assets/imagenes/Flor-Fondo.png";
import Engranaje from "../assets/imagenes/icons/Engranaje.png";

import Login from "./Login";

const MainPage = () => {
  const [showLogin, setShowLogin] = useState(false);

  const categories = [
    { icon: "📱", label: "Smartphones", path: "/smartphones" },
    { icon: "🎧", label: "Audífonos", path: "/audifonos" },
    { icon: "💻", label: "Laptops", path: "/laptops" },
    { icon: "📷", label: "Cámaras", path: "/camaras" },
    { icon: "📺", label: "Televisores", path: "/televisores" },
    { icon: "🏠", label: "Hogar", path: "/hogar" },
  ];

  const handleExit = () => {
    // Lógica para cerrar sesion
    console.log("Saliendo...");
  };

  const handleCategoryClick = (path) => {
    // Lógica para navegar a la categoría
    console.log(`Navegando a: ${path}`);
    // Ejemplo con react-router: navigate(path);
  };

  return (
    <div className="min-h-screen  bg-[#f8f6eb] relative text-[#484d45]">
      {/* Header con logo y botones */}
      <header className="flex justify-between items-center p-6 bg-white shadow-md">
        <img
          src={logoCompleto}
          alt="SOAP Logo"
          className="h-12 hover:scale-105 transition-transform duration-200"
        />

        <div className="flex space-x-4 text-[#484d45]">
          <Button onClick={() => setShowLogin(true)}>Login</Button>
          {/* <Button onClick={handleExit}>Exit</Button> */}
          <Button endIcon={<Engranaje />}> </Button>
        </div>
      </header>
      {/* Fondo  */}
      <div className="absolute inset-0 flex=left justify-center opacity-10 pointer-events-none">
        <img
          src={backgroundImage}
          alt="Flor decorativa"
          className="absolute left-0 w-1/4"
        />
      </div>
      {/* Contenido principal */}
      <main className="container mx-auto px-4 py-8 relative z-10">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-700">
          Anuncios de Temporada
        </h1>

        {/* Grid de categorías */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
          {categories.map((category) => (
            <button
              key={category.path}
              onClick={() => handleCategoryClick(category.path)}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-center hover:bg-gray-50"
            >
              <span className="text-5xl mb-3">{category.icon}</span>
              <span className="text-lg font-medium text-gray-700">
                {category.label}
              </span>
            </button>
          ))}
        </div>
      </main>
      {/* Modal de Login */}
      {showLogin && <Login onClose={() => setShowLogin(false)} />}
      <footer> tingui lilingui</footer>;
    </div>
  );
};

export default MainPage;
