import React from "react";
import Button from "../components/UI/Button";
import logoCompleto from "../assets/imagenes/logo-completo.png";

const MainPage = ({ onLoginClick }) => {
  const categories = [
    { icon: "📱", label: "Smartphones" },
    { icon: "🎧", label: "Audífonos" },
    { icon: "💻", label: "Laptops" },
    { icon: "📷", label: "Cámaras" },
    { icon: "📺", label: "Televisores" },
    { icon: "🏠", label: "Hogar" },
  ];

  return (
    <div className="min-h-screen text-gray-800 bg-[#f8f6eb]">
      <header className="flex justify-between items-center p-6 bg-white shadow-md">
        <img src={logoCompleto} alt="SOAP Logo" className="h-12" />
        <div className="flex space-x-4">
          <Button onClick={onLoginClick}>Login</Button>
          <Button>Exit</Button>
        </div>
      </header>

      <section className="p-6">
        <h2 className="text-2xl font-bold text-center mb-6">
          Anuncios de Temporada
        </h2>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {categories.map((category) => (
            <div
              key={category.label}
              className="bg-white p-4 rounded-lg shadow-md text-center hover:bg-gray-50 transition"
            >
              <div className="text-4xl mb-2">{category.icon}</div>
              <span className="text-sm font-medium">{category.label}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MainPage;
