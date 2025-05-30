// src/pages/Venta.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Layout/Header";

const Venta = () => {
  const navigate = useNavigate();

  const irAVentaArticulo = () => {
    navigate("/venta-articulo");
  };

  const irAVentaVehiculo = () => {
    navigate("/venta-carro");
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#f0f4f8] flex flex-col items-center justify-center px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-10">
          Hola, ¿Qué es lo que deseas publicar?
        </h1>

        <div className="flex flex-col md:flex-row gap-6">
          <button
            onClick={irAVentaArticulo}
            className="w-64 h-40 border-2 border-gray-500 rounded-lg text-xl font-medium hover:bg-blue-100 transition-all"
          >
            Artículo
          </button>

          <button
            onClick={irAVentaVehiculo}
            className="w-64 h-40 border-2 border-gray-500 rounded-lg text-xl font-medium hover:bg-blue-100 transition-all"
          >
            Vehículo
          </button>
        </div>

        <footer className="mt-10 text-sm text-gray-500"></footer>
      </div>
    </>
  );
};

export default Venta;
