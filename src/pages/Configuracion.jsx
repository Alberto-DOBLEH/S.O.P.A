import React from "react";
import Header from "../components/Heaader";
import Footer from "../components/Footer";
import { useCurrency } from "../CurrencyContext"; // Importar el contexto

const Configuracion = () => {
  const { currency, changeCurrency } = useCurrency();

  // Lista de monedas soportadas
  const monedasDisponibles = [
    { codigo: "MXN", nombre: "Peso Mexicano (MXN)", simbolo: "$" },
    { codigo: "USD", nombre: "Dólar Estadounidense (USD)", simbolo: "$" },
    { codigo: "EUR", nombre: "Euro (EUR)", simbolo: "€" },
    { codigo: "COP", nombre: "Peso Colombiano (COP)", simbolo: "$" },
  ];

  const handleCurrencyChange = (e) => {
    const nuevaMoneda = e.target.value;
    changeCurrency(nuevaMoneda);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <Header />
      <main className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Mis Configuraciones
        </h1>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Configuración de Moneda
          </h2>
          <div className="space-y-4">
            <label
              htmlFor="currency"
              className="block text-sm font-medium text-gray-700"
            >
              Selecciona tu moneda preferida
            </label>
            <select
              id="currency"
              value={currency}
              onChange={handleCurrencyChange}
              className="w-full md:w-1/3 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
            >
              {monedasDisponibles.map((moneda) => (
                <option key={moneda.codigo} value={moneda.codigo}>
                  {moneda.nombre}
                </option>
              ))}
            </select>
            <p className="text-sm text-gray-600">
              Moneda actual:{" "}
              {monedasDisponibles.find((m) => m.codigo === currency)?.nombre}
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Configuracion;
