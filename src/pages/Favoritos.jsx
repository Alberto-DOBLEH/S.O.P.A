import React, { useState, useEffect } from "react";
import { FaHeart, FaStar, FaTrash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/Heaader";
import Footer from "../components/Footer";
import { backgroundImage } from "../assets/imagenes/imagenes";
const Favoritos = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadFavorites = async () => {
    setLoading(true);

    try {
      const idusuario = localStorage.getItem("idusuario");
      const response = await fetch(
        `http://localhost:3001/api/favs/?userId=${idusuario}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Error al cargar los favoritos");
      }
      const data = await response.json();
      setFavorites(data);
      setLoading(false);
    } catch (err) {
      console.error("Error al cargar los favoritos:", err);
    }
  };
  useEffect(() => {
    loadFavorites();
  }, []);

  const removeFavorite = async (id) => {
    try {
      const idusuario = localStorage.getItem("idusuario");
      const response = await fetch(
        `http://localhost:3001/api/favs/?userId=${idusuario}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ id_producto: id }),
        }
      );
      if (!response.ok) {
        toast.error("Error al eliminar el favorito");
        return;
      }
      await loadFavorites(); // Recargar favoritos después de eliminar
      toast.success("Favorito eliminado correctamente");
    } catch (err) {
      console.error("Error al eliminar el favorito:", err);
      toast.error("Error al eliminar el favorito");
    }
  };

  const formatPrice = (price) => {
    return `$${price.toFixed(2)}`; // Simulación simple, ajusta según CurrencyContext si lo usas
  };

  if (loading) {
    return (
      <div className="text-center py-10">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent mb-2"></div>
        <p className="text-gray-600">Cargando favoritos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="bg-gray-50 min-h-screen flex flex-col">
        <Header />
        <main className="max-w-7xl mx-auto px-4 py-8 flex-grow">
          <div className="text-center py-10">
            <div className="text-4xl mb-2">😔</div>
            <p className="text-gray-500 text-md mb-1">
              No tienes favoritos todavía.
            </p>
            <p className="text-gray-400 text-sm mb-3">
              ¡Explora y agrega tus productos favoritos!
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <div className="absolute inset-0 flex justify-center opacity-10 pointer-events-none">
        <img
          src={backgroundImage}
          alt="Flor decorativa de fondo"
          className="absolute left-0 w-1/3 md:w-1/4"
          loading="lazy"
        />
      </div>

      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8 flex-grow">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Tus Favoritos</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favorites.map((product) => (
            <div
              key={product.id_favoritos}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative cursor-pointer">
                <span className="absolute top-3 left-3 bg-red-500 text-white text-sm font-bold px-2 py-1 rounded-lg z-10">
                  Favorito
                </span>
                <div className="h-48 overflow-hidden bg-gray-100 flex items-center justify-center">
                  <img
                    src={product.imagen}
                    alt={product.nombre}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
              <div className="p-4">
                <div className="text-xs text-blue-600 font-medium mb-1">
                  {product.categoria}
                </div>
                <h3 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2 leading-tight">
                  {product.nombre}
                </h3>
                <div className="flex items-center mb-1">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`w-3 h-3 ${
                          i < product.reseñas ? "fill-current" : ""
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 ml-1">
                    ({product.conteo_reseñas.toLocaleString()})
                  </span>
                </div>
                <div className="flex items-center space-x-1 mb-2">
                  {product.originalPrice && (
                    <span className="text-xs text-gray-500 line-through">
                      {formatPrice(product.precio_original)}
                    </span>
                  )}
                  <span className="text-md font-bold text-blue-600">
                    {formatPrice(product.precio)}
                  </span>
                  {product.discount > 0 && (
                    <span className="text-xs font-semibold text-red-600">
                      {product.descuento}% OFF
                    </span>
                  )}
                </div>
                {product.nuevo_usado === "N" ? (
                  <div className="text-xs text-gray-500 mb-2">Nuevo</div>
                ) : (
                  <div className="text-xs text-gray-500 mb-2">Usado</div>
                )}
                <button
                  onClick={() => removeFavorite(product.id_producto)}
                  className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center"
                >
                  <FaTrash className="mr-2" /> Quitar de favoritos
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default Favoritos;
