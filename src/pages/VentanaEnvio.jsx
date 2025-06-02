// import React from "react";
// import { Truck, ArrowLeft, Trash2, Plus, Minus } from "lucide-react";

// const VentanaEnvio = ({
//   direccion,
//   setDireccion,
//   opcionesEnvio,
//   opcionEnvioSeleccionada,
//   setOpcionEnvioSeleccionada,
//   cartItems,
//   actualizarCantidad,
//   eliminarProducto,
//   setCurrentStep,
// }) => {
//   // 🔥 API ENDPOINT: POST /api/direcciones (para guardar dirección)
//   // 🔥 API ENDPOINT: GET /api/direcciones/usuario (para cargar direcciones guardadas)
//   // 🔥 API ENDPOINT: GET /api/envios/opciones (para obtener opciones de envío)

//   const validarDireccion = () => {
//     return (
//       direccion?.calle &&
//       direccion?.ciudad &&
//       direccion?.estado &&
//       direccion?.codigoPostal &&
//       direccion?.pais
//     );
//   };

//   // Asegurar que cartItems es un array válido
//   const itemsValidos = Array.isArray(cartItems) ? cartItems : [];

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto">
//       <h2 className="text-2xl font-bold mb-6 flex items-center">
//         <Truck className="mr-2" /> Información de Entrega
//       </h2>

//       <div className="grid md:grid-cols-2 gap-8">
//         {/* Columna izquierda - Dirección */}
//         <div>
//           <h3 className="font-medium mb-4 text-lg">Dirección de envío</h3>

//           <div className="space-y-4">
//             <div>
//               <label className="block mb-1 text-sm text-gray-600">
//                 Calle y número *
//               </label>
//               <input
//                 type="text"
//                 className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 value={direccion?.calle || ""}
//                 onChange={(e) =>
//                   setDireccion({ ...direccion, calle: e.target.value })
//                 }
//                 placeholder="Ej. Av. Revolución 1234"
//                 required
//               />
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block mb-1 text-sm text-gray-600">
//                   Ciudad *
//                 </label>
//                 <input
//                   type="text"
//                   className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   value={direccion?.ciudad || ""}
//                   onChange={(e) =>
//                     setDireccion({ ...direccion, ciudad: e.target.value })
//                   }
//                   placeholder="Ej. Los Mochis"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block mb-1 text-sm text-gray-600">
//                   Estado *
//                 </label>
//                 <input
//                   type="text"
//                   className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   value={direccion?.estado || ""}
//                   onChange={(e) =>
//                     setDireccion({ ...direccion, estado: e.target.value })
//                   }
//                   placeholder="Ej. Sinaloa"
//                   required
//                 />
//               </div>
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block mb-1 text-sm text-gray-600">
//                   Código Postal *
//                 </label>
//                 <input
//                   type="text"
//                   className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   value={direccion?.codigoPostal || ""}
//                   onChange={(e) =>
//                     setDireccion({ ...direccion, codigoPostal: e.target.value })
//                   }
//                   placeholder="Ej. 81200"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block mb-1 text-sm text-gray-600">
//                   País *
//                 </label>
//                 <select
//                   className="w-full p-2 border rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   value={direccion?.pais || "México"}
//                   onChange={(e) =>
//                     setDireccion({ ...direccion, pais: e.target.value })
//                   }
//                 >
//                   <option value="México">México</option>
//                   <option value="Estados Unidos">Estados Unidos</option>
//                 </select>
//               </div>
//             </div>

//             <div>
//               <label className="block mb-1 text-sm text-gray-600">
//                 Instrucciones especiales (opcional)
//               </label>
//               <textarea
//                 className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 rows="3"
//                 value={direccion?.instrucciones || ""}
//                 onChange={(e) =>
//                   setDireccion({ ...direccion, instrucciones: e.target.value })
//                 }
//                 placeholder="Ej. Casa de color azul, tocar el timbre dos veces..."
//               />
//             </div>
//           </div>
//         </div>

//         {/* Columna derecha - Opciones de envío y resumen */}
//         <div>
//           <h3 className="font-medium mb-4 text-lg">Método de envío</h3>

//           <div className="space-y-3 mb-6">
//             {Array.isArray(opcionesEnvio) &&
//               opcionesEnvio.map((opcion) => (
//                 <div
//                   key={opcion.id}
//                   className={`p-4 border rounded-lg cursor-pointer transition-colors ${
//                     opcionEnvioSeleccionada === opcion.id
//                       ? "border-blue-500 bg-blue-50"
//                       : "hover:border-gray-300"
//                   }`}
//                   onClick={() => setOpcionEnvioSeleccionada(opcion.id)}
//                 >
//                   <div className="flex justify-between items-center">
//                     <div>
//                       <div className="flex items-center">
//                         <input
//                           type="radio"
//                           name="envio"
//                           checked={opcionEnvioSeleccionada === opcion.id}
//                           onChange={() => setOpcionEnvioSeleccionada(opcion.id)}
//                           className="mr-3"
//                         />
//                         <p className="font-medium">{opcion.nombre}</p>
//                       </div>
//                       <p className="text-sm text-gray-600 ml-6">
//                         {opcion.dias}
//                       </p>
//                     </div>
//                     <p className="font-bold text-lg">${opcion.precio}</p>
//                   </div>
//                 </div>
//               ))}
//           </div>

//           <div className="border-t pt-6">
//             <h3 className="font-medium mb-3 text-lg">Resumen del pedido</h3>
//             <div className="bg-gray-50 p-4 rounded-lg">
//               <div className="border rounded-lg divide-y">
//                 {itemsValidos.map((item) => (
//                   <div
//                     key={item.id}
//                     className="p-4 flex justify-between items-center"
//                   >
//                     <div className="flex items-center space-x-4">
//                       <img
//                         src={item.imagen}
//                         alt={item.nombre}
//                         className="w-16 h-16 object-cover rounded"
//                       />
//                       <div>
//                         <h3 className="font-medium">{item.nombre}</h3>
//                         <p className="text-gray-600">
//                           ${item.precio?.toLocaleString()}
//                         </p>
//                       </div>
//                     </div>

//                     <div className="flex items-center space-x-4">
//                       <div className="flex items-center border rounded">
//                         <button
//                           onClick={() =>
//                             actualizarCantidad(item.id, item.cantidad - 1)
//                           }
//                           className="px-2 py-1 disabled:opacity-50"
//                           disabled={item.cantidad <= 1}
//                         >
//                           <Minus size={16} />
//                         </button>
//                         <span className="px-2">{item.cantidad}</span>
//                         <button
//                           onClick={() =>
//                             actualizarCantidad(item.id, item.cantidad + 1)
//                           }
//                           className="px-2 py-1 disabled:opacity-50"
//                           disabled={item.cantidad >= item.stock}
//                         >
//                           <Plus size={16} />
//                         </button>
//                       </div>

//                       <button
//                         onClick={() => eliminarProducto(item.id)}
//                         className="text-red-500 hover:text-red-700"
//                       >
//                         <Trash2 size={18} />
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Botones de navegación */}
//       <div className="flex justify-between mt-8 pt-4 border-t">
//         <button
//           onClick={() => setCurrentStep("carrito")}
//           className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
//         >
//           <ArrowLeft className="mr-1" size={20} /> Regresar al carrito
//         </button>

//         <button
//           onClick={() => setCurrentStep("pago")}
//           disabled={!validarDireccion()}
//           className={`px-6 py-2 rounded-lg font-medium transition-colors ${
//             validarDireccion()
//               ? "bg-blue-600 hover:bg-blue-700 text-white"
//               : "bg-gray-300 text-gray-500 cursor-not-allowed"
//           }`}
//         >
//           Continuar al Pago
//         </button>
//       </div>

//       {/* Mensaje de validación */}
//       {!validarDireccion() && (
//         <div className="mt-4 p-3 bg-yellow-100 border border-yellow-400 rounded-lg">
//           <p className="text-sm text-yellow-800">
//             Por favor, completa todos los campos obligatorios (*) para
//             continuar.
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default VentanaEnvio;

// import React from "react";
// import { ArrowLeft, Truck, Plus, Minus, Trash2 } from "lucide-react";
// import StepIndicator from "./StepIndicator";

// interface VentanaEnvioProps {
//   direccion: any;
//   setDireccion: (direccion: any) => void;
//   opcionesEnvio: any[];
//   opcionEnvioSeleccionada: string;
//   setOpcionEnvioSeleccionada: (opcion: string) => void;
//   cartItems: any[];
//   actualizarCantidad: (id: number, cantidad: number) => void;
//   eliminarProducto: (id: number) => void;
//   setCurrentStep: (step: string) => void;
// }

// const VentanaEnvio = ({
//   direccion,
//   setDireccion,
//   opcionesEnvio,
//   opcionEnvioSeleccionada,
//   setOpcionEnvioSeleccionada,
//   cartItems,
//   actualizarCantidad,
//   eliminarProducto,
//   setCurrentStep,
// }: VentanaEnvioProps) => {
//   const validarDireccion = () => {
//     return (
//       direccion?.calle &&
//       direccion?.ciudad &&
//       direccion?.estado &&
//       direccion?.codigoPostal &&
//       direccion?.pais
//     );
//   };

//   const itemsValidos = Array.isArray(cartItems) ? cartItems : [];

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-6xl mx-auto px-4 py-8">
//         <div className="flex items-center justify-between mb-8">
//           <h1 className="text-3xl font-bold text-gray-900">Información de Envío</h1>
//           <StepIndicator currentStep="envio" />
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Columna izquierda - Información de envío */}
//           <div className="lg:col-span-2 space-y-6">
//             {/* Dirección de envío */}
//             <div className="bg-white rounded-lg shadow-sm p-6">
//               <h3 className="text-lg font-semibold mb-4 flex items-center">
//                 <Truck className="mr-2 text-blue-600" size={20} />
//                 Dirección de envío
//               </h3>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="md:col-span-2">
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Calle y número *
//                   </label>
//                   <input
//                     type="text"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     value={direccion?.calle || ""}
//                     onChange={(e) =>
//                       setDireccion({ ...direccion, calle: e.target.value })
//                     }
//                     placeholder="Ej. Calle Constitución 123"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Ciudad *
//                   </label>
//                   <input
//                     type="text"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     value={direccion?.ciudad || ""}
//                     onChange={(e) =>
//                       setDireccion({ ...direccion, ciudad: e.target.value })
//                     }
//                     placeholder="Culiacán"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Estado *
//                   </label>
//                   <input
//                     type="text"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     value={direccion?.estado || ""}
//                     onChange={(e) =>
//                       setDireccion({ ...direccion, estado: e.target.value })
//                     }
//                     placeholder="Sinaloa"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Código Postal *
//                   </label>
//                   <input
//                     type="text"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     value={direccion?.codigoPostal || ""}
//                     onChange={(e) =>
//                       setDireccion({ ...direccion, codigoPostal: e.target.value })
//                     }
//                     placeholder="81893"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     País *
//                   </label>
//                   <select
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     value={direccion?.pais || "México"}
//                     onChange={(e) =>
//                       setDireccion({ ...direccion, pais: e.target.value })
//                     }
//                   >
//                     <option value="México">México</option>
//                     <option value="Estados Unidos">Estados Unidos</option>
//                   </select>
//                 </div>
//               </div>
//             </div>

//             {/* Opciones de envío */}
//             <div className="bg-white rounded-lg shadow-sm p-6">
//               <h3 className="text-lg font-semibold mb-4">Método de envío</h3>
//               <div className="space-y-3">
//                 {Array.isArray(opcionesEnvio) &&
//                   opcionesEnvio.map((opcion) => (
//                     <div
//                       key={opcion.id}
//                       className={`p-4 border rounded-lg cursor-pointer transition-colors ${
//                         opcionEnvioSeleccionada === opcion.id
//                           ? "border-blue-500 bg-blue-50"
//                           : "border-gray-200 hover:border-gray-300"
//                       }`}
//                       onClick={() => setOpcionEnvioSeleccionada(opcion.id)}
//                     >
//                       <div className="flex justify-between items-center">
//                         <div className="flex items-center">
//                           <input
//                             type="radio"
//                             name="envio"
//                             checked={opcionEnvioSeleccionada === opcion.id}
//                             onChange={() => setOpcionEnvioSeleccionada(opcion.id)}
//                             className="mr-3"
//                           />
//                           <div>
//                             <p className="font-medium text-gray-900">{opcion.nombre}</p>
//                             <p className="text-sm text-gray-600">{opcion.dias}</p>
//                           </div>
//                         </div>
//                         <p className="font-semibold text-gray-900">${opcion.precio}</p>
//                       </div>
//                     </div>
//                   ))}
//               </div>
//             </div>
//           </div>

//           {/* Columna derecha - Resumen */}
//           <div className="lg:col-span-1">
//             <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
//               <h3 className="text-lg font-semibold mb-4">Resumen del pedido</h3>

//               <div className="space-y-3 mb-6">
//                 {itemsValidos.map((item) => (
//                   <div
//                     key={item.id}
//                     className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg"
//                   >
//                     <img
//                       src={item.imagen}
//                       alt={item.nombre}
//                       className="w-12 h-12 object-cover rounded"
//                     />
//                     <div className="flex-1 min-w-0">
//                       <h4 className="text-sm font-medium text-gray-900 truncate">
//                         {item.nombre}
//                       </h4>
//                       <p className="text-sm text-gray-600">
//                         ${item.precio?.toLocaleString()}
//                       </p>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <div className="flex items-center border rounded">
//                         <button
//                           onClick={() =>
//                             actualizarCantidad(item.id, item.cantidad - 1)
//                           }
//                           className="px-2 py-1 hover:bg-gray-50"
//                           disabled={item.cantidad <= 1}
//                         >
//                           <Minus size={14} />
//                         </button>
//                         <span className="px-2 text-sm">{item.cantidad}</span>
//                         <button
//                           onClick={() =>
//                             actualizarCantidad(item.id, item.cantidad + 1)
//                           }
//                           className="px-2 py-1 hover:bg-gray-50"
//                           disabled={item.cantidad >= item.stock}
//                         >
//                           <Plus size={14} />
//                         </button>
//                       </div>
//                       <button
//                         onClick={() => eliminarProducto(item.id)}
//                         className="text-red-500 hover:text-red-700 p-1"
//                       >
//                         <Trash2 size={14} />
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               <div className="flex gap-3">
//                 <button
//                   onClick={() => setCurrentStep("carrito")}
//                   className="flex items-center px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
//                 >
//                   <ArrowLeft size={16} className="mr-2" />
//                   Volver
//                 </button>
//                 <button
//                   onClick={() => setCurrentStep("pago")}
//                   disabled={!validarDireccion()}
//                   className={`flex-1 px-4 py-2 rounded-lg font-medium ${
//                     validarDireccion()
//                       ? "bg-blue-600 hover:bg-blue-700 text-white"
//                       : "bg-gray-300 text-gray-500 cursor-not-allowed"
//                   }`}
//                 >
//                   Continuar al Pago
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VentanaEnvio;
import React from "react";
import { Truck, ArrowLeft, Trash2, Plus, Minus } from "lucide-react";

// Componente para gestionar la información de envío
const VentanaEnvio = ({
  direccion,
  setDireccion,
  opcionesEnvio,
  opcionEnvioSeleccionada,
  setOpcionEnvioSeleccionada,
  cartItems,
  actualizarCantidad,
  eliminarProducto,
  setCurrentStep,
}) => {
  // 🔥 API ENDPOINT: POST /api/direcciones (para guardar dirección)
  // 🔥 API ENDPOINT: GET /api/direcciones/usuario (para cargar direcciones guardadas)
  // 🔥 API ENDPOINT: GET /api/envios/opciones (para obtener opciones de envío)

  const validarDireccion = () => {
    return (
      direccion?.calle &&
      direccion?.ciudad &&
      direccion?.estado &&
      direccion?.codigoPostal &&
      direccion?.pais
    );
  };

  const itemsValidos = Array.isArray(cartItems) ? cartItems : [];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <Truck className="mr-2" /> Información de Entrega
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Columna izquierda - Dirección */}
        <div>
          <h3 className="font-medium mb-4 text-lg">Dirección de envío</h3>
          <div className="space-y-4">
            <div>
              <label className="block mb-1 text-sm text-gray-600">
                Calle y número *
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={direccion?.calle || ""}
                onChange={(e) =>
                  setDireccion({ ...direccion, calle: e.target.value })
                }
                placeholder="Ej. Av. Revolución 1234"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-sm text-gray-600">
                  Ciudad *
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={direccion?.ciudad || ""}
                  onChange={(e) =>
                    setDireccion({ ...direccion, ciudad: e.target.value })
                  }
                  placeholder="Ej. Los Mochis"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 text-sm text-gray-600">
                  Estado *
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={direccion?.estado || ""}
                  onChange={(e) =>
                    setDireccion({ ...direccion, estado: e.target.value })
                  }
                  placeholder="Ej. Sinaloa"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-sm text-gray-600">
                  Código Postal *
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={direccion?.codigoPostal || ""}
                  onChange={(e) =>
                    setDireccion({ ...direccion, codigoPostal: e.target.value })
                  }
                  placeholder="Ej. 81200"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 text-sm text-gray-600">
                  País *
                </label>
                <select
                  className="w-full p-2 border rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={direccion?.pais || "México"}
                  onChange={(e) =>
                    setDireccion({ ...direccion, pais: e.target.value })
                  }
                >
                  <option value="México">México</option>
                  <option value="Estados Unidos">Estados Unidos</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block mb-1 text-sm text-gray-600">
                Instrucciones especiales (opcional)
              </label>
              <textarea
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
                value={direccion?.instrucciones || ""}
                onChange={(e) =>
                  setDireccion({ ...direccion, instrucciones: e.target.value })
                }
                placeholder="Ej. Casa de color azul, tocar el timbre dos veces..."
              />
            </div>
          </div>
        </div>

        {/* Columna derecha - Opciones de envío y resumen */}
        <div>
          <h3 className="font-medium mb-4 text-lg">Método de envío</h3>
          <div className="space-y-3 mb-6">
            {Array.isArray(opcionesEnvio) &&
              opcionesEnvio.map((opcion) => (
                <div
                  key={opcion.id}
                  className={`p-4 border rounded-lg cursor-pointer ${
                    opcionEnvioSeleccionada === opcion.id
                      ? "border-blue-500 bg-blue-50"
                      : "hover:border-gray-300"
                  }`}
                  onClick={() => setOpcionEnvioSeleccionada(opcion.id)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          name="envio"
                          checked={opcionEnvioSeleccionada === opcion.id}
                          onChange={() => setOpcionEnvioSeleccionada(opcion.id)}
                          className="mr-3"
                        />
                        <p className="font-medium">{opcion.nombre}</p>
                      </div>
                      <p className="text-sm text-gray-600 ml-6">
                        {opcion.dias}
                      </p>
                    </div>
                    <p className="font-bold text-lg">${opcion.precio}</p>
                  </div>
                </div>
              ))}
          </div>

          <div className="border-t pt-6">
            <h3 className="font-medium mb-3 text-lg">Resumen del pedido</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="border rounded-lg divide-y">
                {itemsValidos.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 flex justify-between items-center"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.imagen}
                        alt={item.nombre}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div>
                        <h3 className="font-medium">{item.nombre}</h3>
                        <p className="text-gray-600">
                          ${item.precio?.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center border rounded">
                        {item.cantidad > 1 ? (
                        <button
                          onClick={() =>
                            actualizarCantidad(item.id_carrito, item.cantidad - 1)
                          }
                          className="px-2 py-1 disabled:opacity-50"
                          disabled={item.cantidad <= 1}
                        >
                          <Minus size={16} />
                        </button>
                        ) : null}
                        <span className="px-2">{item.cantidad}</span>
                        <button
                          onClick={() =>
                            actualizarCantidad(item.id_carrito, item.cantidad + 1)
                          }
                          className="px-2 py-1 disabled:opacity-50"
                          disabled={item.cantidad >= item.stock}
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <button
                        onClick={() => eliminarProducto(item.id_carrito)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Botones de navegación */}
      <div className="flex justify-between mt-6 pt-4 border-t">
        <button
          onClick={() => setCurrentStep("carrito")}
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="mr-1" size={20} /> Regresar al carrito
        </button>
        <button
          onClick={() => setCurrentStep("pago")}
          disabled={!validarDireccion()}
          className={`px-4 py-2 rounded-lg font-medium ${
            validarDireccion()
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Continuar al Pago
        </button>
      </div>

      {!validarDireccion() && (
        <div className="mt-4 p-3 bg-yellow-100 border border-yellow-400 rounded-lg">
          <p className="text-sm text-yellow-800">
            Por favor, completa todos los campos obligatorios (*) para
            continuar.
          </p>
        </div>
      )}
    </div>
  );
};

export default VentanaEnvio;
