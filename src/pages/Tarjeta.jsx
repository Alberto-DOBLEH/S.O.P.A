import React, { useState, useEffect } from "react";
import { CreditCard, Trash2, ArrowLeft, Lock } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/Heaader";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { backgroundImage } from "../assets/imagenes/imagenes";
const Tarjeta = ({ setCurrentStep }) => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newCard, setNewCard] = useState({
    number: "",
    holder: "",
    expiry: "",
    cvv: "",
  });
  const [isAdding, setIsAdding] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCards = () => {
      try {
        const savedCards = JSON.parse(localStorage.getItem("cards")) || [];
        setCards(savedCards);
        setLoading(false);
      } catch (err) {
        console.error("Error loading cards:", err);
        setError("Error al cargar las tarjetas");
        setLoading(false);
      }
    };
    loadCards();
  }, []);

  const addCard = (e) => {
    e.preventDefault();
    if (!newCard.number || !newCard.holder || !newCard.expiry || !newCard.cvv) {
      toast.error("Por favor completa todos los campos");
      return;
    }
    if (!newCard.number.match(/^\d{16}$/)) {
      toast.error("El número de tarjeta debe tener 16 dígitos");
      return;
    }
    if (!newCard.expiry.match(/^(0[1-9]|1[0-2])\/[0-9]{2}$/)) {
      toast.error("La fecha de vencimiento debe tener formato MM/AA");
      return;
    }
    if (!newCard.cvv.match(/^\d{3,4}$/)) {
      toast.error("El CVV debe tener 3 o 4 dígitos");
      return;
    }
    const maskedNumber = `****-****-****-${newCard.number.slice(-4)}`;
    const card = { ...newCard, number: maskedNumber };
    const updatedCards = [...cards, card];
    setCards(updatedCards);
    localStorage.setItem("cards", JSON.stringify(updatedCards));
    setNewCard({ number: "", holder: "", expiry: "", cvv: "" });
    setIsAdding(false);
    toast.success("Tarjeta agregada con éxito");
  };

  const removeCard = (index) => {
    const updatedCards = cards.filter((_, i) => i !== index);
    setCards(updatedCards);
    localStorage.setItem("cards", JSON.stringify(updatedCards));
    toast.success("Tarjeta eliminada con éxito");
  };

  if (loading) {
    return (
      <div className="text-center py-10">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent mb-2"></div>
        <p className="text-gray-600">Cargando tarjetas...</p>
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
      <main className="max-w-3xl mx-auto px-4 py-8 flex-grow">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-6 flex items-center">
            <CreditCard className="mr-2" /> Gestionar Tarjetas
          </h1>

          {cards.length === 0 && !isAdding && (
            <div className="text-center py-6">
              <div className="text-4xl mb-2">😔</div>
              <p className="text-gray-500 text-md mb-1">
                No tienes tarjetas registradas.
              </p>
              <p className="text-gray-400 text-sm mb-3">
                Agrega una tarjeta para facilitar tus compras.
              </p>
              <button
                onClick={() => setIsAdding(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Agregar tarjeta
              </button>
            </div>
          )}

          {cards.length > 0 && (
            <div className="space-y-4 mb-6">
              {cards.map((card, index) => (
                <div
                  key={index}
                  className="border rounded-lg bg-gray-50 p-4 flex justify-between items-center"
                >
                  <div className="flex items-center">
                    <CreditCard className="text-blue-500 mr-3" size={20} />
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        Tarjeta terminada en {card.number.slice(-4)}
                      </p>
                      <p className="text-xs text-gray-600">
                        Titular: {card.holder}
                      </p>
                      <p className="text-xs text-gray-600">
                        Vencimiento: {card.expiry}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeCard(index)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {isAdding && (
            <div className="border rounded-lg p-4 mb-6 bg-gray-50">
              <h2 className="text-lg font-medium mb-4">
                Agregar nueva tarjeta
              </h2>
              <form onSubmit={addCard} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Número de tarjeta
                  </label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    value={newCard.number}
                    onChange={(e) =>
                      setNewCard({ ...newCard, number: e.target.value })
                    }
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    maxLength={16}
                    pattern="[0-9]{16}"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre del titular
                  </label>
                  <input
                    type="text"
                    placeholder="Nombre del titular"
                    value={newCard.holder}
                    onChange={(e) =>
                      setNewCard({ ...newCard, holder: e.target.value })
                    }
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Fecha de vencimiento
                    </label>
                    <input
                      type="text"
                      placeholder="MM/AA"
                      value={newCard.expiry}
                      onChange={(e) =>
                        setNewCard({ ...newCard, expiry: e.target.value })
                      }
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      pattern="(0[1-9]|1[0-2])/[0-9]{2}"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CVV
                    </label>
                    <input
                      type="text"
                      placeholder="CVV"
                      value={newCard.cvv}
                      onChange={(e) =>
                        setNewCard({ ...newCard, cvv: e.target.value })
                      }
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      maxLength={4}
                      pattern="[0-9]{3,4}"
                      required
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAdding(false)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Guardar
                  </button>
                </div>
              </form>
            </div>
          )}

          {!isAdding && cards.length > 0 && (
            <button
              onClick={() => setIsAdding(true)}
              className="w-full md:w-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Agregar nueva tarjeta
            </button>
          )}

          {/* Información de seguridad */}
          <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
            <div className="flex items-center mb-2">
              <Lock size={16} className="mr-2 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">
                Seguridad garantizada
              </span>
            </div>
            <p className="text-xs text-blue-700">
              Tu información está protegida con encriptación SSL de 256 bits.
            </p>
          </div>

          {/* Botón para volver al paso de pago */}
          {setCurrentStep && (
            <button
              onClick={() => setCurrentStep("pago")}
              className="mt-4 w-full bg-gray-200 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-300 flex items-center justify-center"
            >
              <ArrowLeft size={20} className="mr-2" /> Volver al pago
            </button>
          )}
        </div>
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default Tarjeta;
