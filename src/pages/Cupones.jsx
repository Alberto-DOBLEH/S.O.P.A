// import React, { useState, useEffect } from "react";
// import Header from "../components/Heaader";
// import Footer from "../components/Footer";

// const Cupones = () => {
//   const [cupones, setCupones] = useState([]);

//   // Colores vibrantes inspirados en la imagen
//   const coloresVibrantes = [
//     {
//       bg: "from-teal-400 to-blue-500",
//       text: "text-white",
//       badge: "bg-blue-100 text-teal-800",
//     },
//     {
//       bg: "from-rose-400 to-pink-500",
//       text: "text-white",
//       badge: "bg-pink-100 text-rose-800",
//     },
//     {
//       bg: "from-emerald-400 to-green-500",
//       text: "text-white",
//       badge: "bg-green-100 text-emerald-800",
//     },
//     {
//       bg: "from-amber-400 to-yellow-500",
//       text: "text-gray-800",
//       badge: "bg-yellow-100 text-amber-800",
//     },
//     {
//       bg: "from-violet-400 to-purple-500",
//       text: "text-white",
//       badge: "bg-purple-100 text-violet-800",
//     },
//     {
//       bg: "from-lime-400 to-green-400",
//       text: "text-gray-800",
//       badge: "bg-green-100 text-lime-800",
//     },
//   ];

//   // Función para generar un cupón individual
//   const generarUnCupon = (index) => {
//     const colorIndex = index % coloresVibrantes.length;
//     return {
//       codigo: Math.random().toString(36).substring(2, 8).toUpperCase(),
//       descuento: Math.floor(Math.random() * 45) + 10, // 10% a 55%
//       fechavencimiento: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
//       colores: coloresVibrantes[colorIndex],
//     };
//   };

//   // Efecto para generar 3 cupones al cargar el componente
//   useEffect(() => {
//     const cuponesIniciales = Array(3)
//       .fill()
//       .map((_, index) => generarUnCupon(index));
//     setCupones(cuponesIniciales);
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
//       <Header />
//       <div className="container mx-auto px-4 py-12">
//         <div className="text-center mb-8">
//           <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
//             Cupones Disponibles
//           </h1>
//           <p className="text-lg text-gray-600">¡Aprovecha estos descuentos!</p>
//         </div>

//         <div className="cupones-list">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {cupones.map((cupon, index) => (
//               <div key={index} className="group relative">
//                 <div
//                   className={`bg-gradient-to-br ${cupon.colores.bg} rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl transform`}
//                 >
//                   {/* Decoración superior */}
//                   <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-300 via-pink-300 to-blue-300"></div>

//                   <div className="p-8 relative">
//                     {/* Efecto de brillo */}
//                     <div className="absolute top-4 right-4 w-8 h-8 bg-white bg-opacity-20 rounded-full blur-sm"></div>

//                     <div className="flex justify-between items-start mb-6">
//                       <span
//                         className={`inline-flex items-center px-4 py-2 rounded-full text-lg font-bold ${cupon.colores.badge} shadow-md`}
//                       >
//                         {cupon.descuento}% OFF
//                       </span>
//                       <div
//                         className={`text-sm ${cupon.colores.text} opacity-90 bg-black bg-opacity-10 px-3 py-1 rounded-full`}
//                       >
//                         30 días
//                       </div>
//                     </div>

//                     <div className="text-center mb-6">
//                       <h3
//                         className={`text-2xl font-bold ${cupon.colores.text} mb-3 tracking-wider`}
//                       >
//                         {cupon.codigo}
//                       </h3>
//                       <div className="w-16 h-1 bg-white bg-opacity-50 mx-auto rounded-full"></div>
//                     </div>

//                     <div className={`${cupon.colores.text} text-center`}>
//                       <p className="text-sm opacity-90 mb-2">Válido hasta:</p>
//                       <p className="font-semibold text-base">
//                         {cupon.fechavencimiento.toLocaleDateString("es-ES", {
//                           day: "numeric",
//                           month: "long",
//                           year: "numeric",
//                         })}
//                       </p>
//                     </div>

//                     {/* Botón de uso */}
//                     <button className="w-full mt-6 bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 backdrop-blur-sm border border-white border-opacity-20">
//                       Usar Cupón
//                     </button>
//                   </div>

//                   {/* Decoración inferior con círculos */}
//                   <div className="absolute bottom-0 left-0 w-full h-6 overflow-hidden">
//                     <div className="flex justify-between items-center h-full px-4">
//                       {Array(8)
//                         .fill()
//                         .map((_, i) => (
//                           <div
//                             key={i}
//                             className="w-3 h-3 bg-white bg-opacity-30 rounded-full"
//                           ></div>
//                         ))}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Cupones;

import React, { useState, useEffect } from "react";
import Header from "../components/Heaader";
import Footer from "../components/Footer";

const Cupones = () => {
  const [cupones, setCupones] = useState([]);

  // Colores vibrantes inspirados en la imagen
  const coloresVibrantes = [
    {
      bg: "from-teal-400 to-blue-500",
      text: "text-white",
      badge: "bg-blue-100 text-teal-800",
    },
    {
      bg: "from-rose-400 to-pink-500",
      text: "text-white",
      badge: "bg-pink-100 text-rose-800",
    },
    {
      bg: "from-emerald-400 to-green-500",
      text: "text-white",
      badge: "bg-green-100 text-emerald-800",
    },
    {
      bg: "from-amber-400 to-yellow-500",
      text: "text-gray-800",
      badge: "bg-yellow-100 text-amber-800",
    },
    {
      bg: "from-violet-400 to-purple-500",
      text: "text-white",
      badge: "bg-purple-100 text-violet-800",
    },
    {
      bg: "from-lime-400 to-green-400",
      text: "text-gray-800",
      badge: "bg-green-100 text-lime-800",
    },
  ];

  // Función para generar un cupón individual
  const generarUnCupon = (index) => {
    const colorIndex = index % coloresVibrantes.length;
    return {
      codigo: Math.random().toString(36).substring(2, 8).toUpperCase(),
      descuento: Math.floor(Math.random() * 45) + 10, // 10% a 55%
      fechavencimiento: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      colores: coloresVibrantes[colorIndex],
    };
  };

  // Efecto para cargar o generar cupones
  useEffect(() => {
    // Verificar si ya existen cupones en sessionStorage
    const storedCoupons = sessionStorage.getItem("userCoupons");
    if (storedCoupons) {
      // Cargar cupones desde sessionStorage
      setCupones(JSON.parse(storedCoupons));
    } else {
      // Generar nuevos cupones y guardarlos
      const cuponesIniciales = Array(3)
        .fill()
        .map((_, index) => generarUnCupon(index));
      setCupones(cuponesIniciales);
      sessionStorage.setItem("userCoupons", JSON.stringify(cuponesIniciales));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Cupones Disponibles
          </h1>
          <p className="text-lg text-gray-600">¡Aprovecha estos descuentos!</p>
        </div>

        <div className="cupones-list">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cupones.map((cupon, index) => (
              <div key={index} className="group relative">
                <div
                  className={`bg-gradient-to-br ${cupon.colores.bg} rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl transform`}
                >
                  {/* Decoración superior */}
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-300 via-pink-300 to-blue-300"></div>

                  <div className="p-8 relative">
                    {/* Efecto de brillo */}
                    <div className="absolute top-4 right-4 w-8 h-8 bg-white bg-opacity-20 rounded-full blur-sm"></div>

                    <div className="flex justify-between items-start mb-6">
                      <span
                        className={`inline-flex items-center px-4 py-2 rounded-full text-lg font-bold ${cupon.colores.badge} shadow-md`}
                      >
                        {cupon.descuento}% OFF
                      </span>
                      <div
                        className={`text-sm ${cupon.colores.text} opacity-90 bg-black bg-opacity-10 px-3 py-1 rounded-full`}
                      >
                        30 días
                      </div>
                    </div>

                    <div className="text-center mb-6">
                      <h3
                        className={`text-2xl font-bold ${cupon.colores.text} mb-3 tracking-wider`}
                      >
                        {cupon.codigo}
                      </h3>
                      <div className="w-16 h-1 bg-white bg-opacity-50 mx-auto rounded-full"></div>
                    </div>

                    <div className={`${cupon.colores.text} text-center`}>
                      <p className="text-sm opacity-90 mb-2">Válido hasta:</p>
                      <p className="font-semibold text-base">
                        {new Date(cupon.fechavencimiento).toLocaleDateString(
                          "es-ES",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          }
                        )}
                      </p>
                    </div>

                    {/* Botón de uso */}
                    <button className="w-full mt-6 bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 backdrop-blur-sm border border-white border-opacity-20">
                      Usar Cupón
                    </button>
                  </div>

                  {/* Decoración inferior con círculos */}
                  <div className="absolute bottom-0 left-0 w-full h-6 overflow-hidden">
                    <div className="flex justify-between items-center h-full px-4">
                      {Array(8)
                        .fill()
                        .map((_, i) => (
                          <div
                            key={i}
                            className="w-3 h-3 bg-white bg-opacity-30 rounded-full"
                          ></div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cupones;
