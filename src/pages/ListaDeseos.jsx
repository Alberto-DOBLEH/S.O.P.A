import React from "react";
import Header from "../components/Heaader";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const ListaDeseos = () => {
  const navigate = useNavigate();

  const navigateTo = {
    home: () => navigateTo("/"),
  };

  return (
    <div>
      <Header />
      <h1>Lista de Deseos</h1>

      {/* Contenido de la lista de deseos */}
      <div className="text-black">
        <h1>Coming Soon</h1>
        <div className=" cursor-pointer" onClick={navigateTo.home}>
          <button
            type="submit"
            className="transform -translate-y-1/2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-2 rounded-full font-medium hover:from-blue-600 hover:to-blue-700 transition-all shadow-md"
          >
            Regresar al incio
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ListaDeseos;
