import React from "react";

const Breadcrumbs = ({ navigateTo }) => (
  <div className="bg-white shadow-sm w-full">
    <div className="w-full px-4 py-2">
      <div className="flex text-sm">
        <button
          onClick={navigateTo.home}
          className="text-gray-600 hover:text-blue-600"
        >
          Inicio
        </button>
        <span className="mx-2 text-gray-400">›</span>
        <button
          onClick={() => navigateTo.categoria("/zapatos")}
          className="text-gray-600 hover:text-blue-600"
        >
          Calzado
        </button>
        <span className="mx-2 text-gray-400">›</span>
        <span className="text-gray-800">Tenis semi originales Zona 30</span>
      </div>
    </div>
  </div>
);

export default Breadcrumbs;
