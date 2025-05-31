// src/CurrencyContext.js
// import React, { createContext, useContext, useState, useEffect } from "react";

// const CurrencyContext = createContext();

// export const CurrencyProvider = ({ children }) => {
//   // Inicializa la moneda desde localStorage o usa MXN por defecto
//   const [currency, setCurrency] = useState(() => {
//     return localStorage.getItem("currency") || "MXN";
//   });

//   // Estado para la tasa de conversión
//   const [conversionRate, setConversionRate] = useState(1); // 1 para MXN por defecto

//   // Actualiza la moneda y guarda en localStorage
//   const changeCurrency = (newCurrency) => {
//     setCurrency(newCurrency);
//     localStorage.setItem("currency", newCurrency);
//   };

//   // Actualiza la tasa de conversión según la moneda seleccionada
//   useEffect(() => {
//     // Tasas de cambio relativas a MXN (ejemplo, ajusta según tasas reales al 30 de mayo de 2025)
//     const rates = {
//       MXN: 1, // Base
//       USD: 1 / 20, // Ejemplo: 1 USD = 20 MXN (0.05)
//       EUR: 1 / 22, // Ejemplo: 1 EUR = 22 MXN (0.04545...)
//       COP: 1 / 80, // Ejemplo: 1 COP = 0.0125 MXN (0.0125)
//     };

//     const newRate = rates[currency] || 1; // Fallback a 1 si la moneda no está definida
//     setConversionRate(newRate);
//     console.log(
//       `Moneda seleccionada: ${currency}, Tasa de conversión: ${newRate}`
//     ); // Debug
//   }, [currency]);

//   return (
//     <CurrencyContext.Provider
//       value={{ currency, conversionRate, changeCurrency }}
//     >
//       {children}
//     </CurrencyContext.Provider>
//   );
// };

// export const useCurrency = () => useContext(CurrencyContext); // Named export

import React, { createContext, useContext, useState, useEffect } from "react";

const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("currency") || "MXN";
    }
    return "MXN";
  });

  const [conversionRate, setConversionRate] = useState(1);

  const changeCurrency = (newCurrency) => {
    setCurrency(newCurrency);
    if (typeof window !== "undefined") {
      localStorage.setItem("currency", newCurrency);
    }
  };

  const formatPrice = (precio) => {
    if (!precio || isNaN(precio)) return "Precio no disponible";

    const precioBaseMXN = precio;

    if (currency === "MXN") {
      return new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "MXN",
        minimumFractionDigits: 2,
      }).format(precioBaseMXN);
    }

    const precioConvertido = precioBaseMXN * conversionRate;

    const formatConfigs = {
      USD: { locale: "en-US", currency: "USD" },
      EUR: { locale: "de-DE", currency: "EUR" },
      COP: { locale: "es-CO", currency: "COP" },
    };

    const config = formatConfigs[currency] || {
      locale: "es-MX",
      currency: currency,
    };

    return new Intl.NumberFormat(config.locale, {
      style: "currency",
      currency: config.currency,
      minimumFractionDigits: currency === "COP" ? 0 : 2,
    }).format(precioConvertido);
  };

  const getCurrencySymbol = (currencyCode = currency) => {
    const symbols = {
      MXN: "$",
      USD: "$",
      EUR: "€",
      COP: "$",
    };
    return symbols[currencyCode] || currencyCode;
  };

  useEffect(() => {
    const rates = {
      MXN: 1,
      USD: 0.05,
      EUR: 0.045,
      COP: 12.5,
    };

    const newRate = rates[currency] || 1;
    setConversionRate(newRate);
  }, [currency]);

  const availableCurrencies = [
    { code: "MXN", name: "Peso Mexicano", symbol: "$" },
    { code: "USD", name: "Dólar Estadounidense", symbol: "$" },
    { code: "EUR", name: "Euro", symbol: "€" },
    { code: "COP", name: "Peso Colombiano", symbol: "$" },
  ];

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        conversionRate,
        changeCurrency,
        formatPrice,
        getCurrencySymbol,
        availableCurrencies,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
};
