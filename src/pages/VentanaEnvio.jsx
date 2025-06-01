// import React from "react";
// import { Truck, ArrowLeft, Trash2, Plus, Minus } from "lucide-react";

// // Componente para gestionar la información de envío
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

//   const itemsValidos = Array.isArray(cartItems) ? cartItems : [];

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto">
//       <h2 className="text-2xl font-bold mb-6 flex items-center">
//         <Truck className="mr-2" /> Información de Entrega
//       </h2>

//       <div className="grid md:grid-cols-2 gap-6">
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
//                   className={`p-4 border rounded-lg cursor-pointer ${
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
//       <div className="flex justify-between mt-6 pt-4 border-t">
//         <button
//           onClick={() => setCurrentStep("carrito")}
//           className="flex items-center text-blue-600 hover:text-blue-800"
//         >
//           <ArrowLeft className="mr-1" size={20} /> Regresar al carrito
//         </button>
//         <button
//           onClick={() => setCurrentStep("pago")}
//           disabled={!validarDireccion()}
//           className={`px-4 py-2 rounded-lg font-medium ${
//             validarDireccion()
//               ? "bg-blue-600 hover:bg-blue-700 text-white"
//               : "bg-gray-300 text-gray-500 cursor-not-allowed"
//           }`}
//         >
//           Continuar al Pago
//         </button>
//       </div>

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

import React, { useState } from "react";
import { Truck, ArrowLeft, Trash2, Plus, Minus } from "lucide-react";

// Componente para gestionar la información de envío
const VentanaEnvio = ({
  direccion: direccionProp = {}, // Asegura un valor por defecto
  setDireccion,
  opcionesEnvio: opcionesEnvioProp = [], // Asegura un valor por defecto
  opcionEnvioSeleccionada: opcionEnvioSeleccionadaProp,
  setOpcionEnvioSeleccionada: setOpcionEnvioSeleccionadaProp,
  cartItems: cartItemsProp = [], // Asegura un valor por defecto
  actualizarCantidad,
  eliminarProducto,
  setCurrentStep,
}) => {
  // 🔥 API ENDPOINT: POST /api/direcciones (para guardar dirección)
  // 🔥 API ENDPOINT: GET /api/direcciones/usuario (para cargar direcciones guardadas)
  // 🔥 API ENDPOINT: GET /api/envios/opciones (para obtener opciones de envío)

  // Estados locales para manejar los cambios antes de confirmar
  const [localDireccion, setLocalDireccion] = useState({
    calle: direccionProp.calle || "",
    ciudad: direccionProp.ciudad || "",
    estado: direccionProp.estado || "",
    codigoPostal: direccionProp.codigoPostal || "",
    pais: direccionProp.pais || "México",
    instrucciones: direccionProp.instrucciones || "",
  });

  const [opcionEnvioSeleccionada, setOpcionEnvioSeleccionada] = useState(
    opcionEnvioSeleccionadaProp || "estandar"
  );

  const [opcionesEnvio] = useState(
    opcionesEnvioProp || [
      {
        id: "estandar",
        nombre: "Envío Estándar",
        precio: 99,
        dias: "3-5 días",
      },
      { id: "express", nombre: "Envío Express", precio: 199, dias: "1-2 días" },
    ]
  );

  const [cartItems] = useState(cartItemsProp);

  // Validación mejorada de dirección
  const validarDireccion = () => {
    const valido =
      localDireccion.calle?.trim() &&
      localDireccion.ciudad?.trim() &&
      localDireccion.estado?.trim() &&
      localDireccion.codigoPostal?.trim() &&
      localDireccion.pais?.trim() &&
      /^\d{5}$/.test(localDireccion.codigoPostal); // Validar que sean exactamente 5 dígitos

    console.log("Validación dirección:", {
      valido,
      direccion: localDireccion,
      codigoPostalValido: /^\d{5}$/.test(localDireccion.codigoPostal),
    });

    return valido;
  };

  const handleContinuar = () => {
    if (validarDireccion()) {
      // Actualiza los estados en el componente padre antes de continuar
      setDireccion(localDireccion);
      setOpcionEnvioSeleccionadaProp(opcionEnvioSeleccionada);
      setCurrentStep("pago");
    } else {
      console.error("Validación fallida. Datos:", localDireccion);
    }
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
                value={localDireccion.calle}
                onChange={(e) =>
                  setLocalDireccion({
                    ...localDireccion,
                    calle: e.target.value,
                  })
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
                  value={localDireccion.ciudad}
                  onChange={(e) =>
                    setLocalDireccion({
                      ...localDireccion,
                      ciudad: e.target.value,
                    })
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
                  value={localDireccion.estado}
                  onChange={(e) =>
                    setLocalDireccion({
                      ...localDireccion,
                      estado: e.target.value,
                    })
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
                  pattern="\d{5}"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={localDireccion.codigoPostal}
                  onChange={(e) =>
                    setLocalDireccion({
                      ...localDireccion,
                      codigoPostal: e.target.value,
                    })
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
                  value={localDireccion.pais}
                  onChange={(e) =>
                    setLocalDireccion({
                      ...localDireccion,
                      pais: e.target.value,
                    })
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
                value={localDireccion.instrucciones}
                onChange={(e) =>
                  setLocalDireccion({
                    ...localDireccion,
                    instrucciones: e.target.value,
                  })
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
            {opcionesEnvio.map((opcion) => (
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
                    <p className="text-sm text-gray-600 ml-6">{opcion.dias}</p>
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
                        <button
                          onClick={() =>
                            actualizarCantidad(item.id, item.cantidad - 1)
                          }
                          className="px-2 py-1 disabled:opacity-50"
                          disabled={item.cantidad <= 1}
                        >
                          <Minus size={16} />
                        </button>
                        <span className="px-2">{item.cantidad}</span>
                        <button
                          onClick={() =>
                            actualizarCantidad(item.id, item.cantidad + 1)
                          }
                          className="px-2 py-1 disabled:opacity-50"
                          disabled={item.cantidad >= item.stock}
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <button
                        onClick={() => eliminarProducto(item.id)}
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
          onClick={handleContinuar}
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
            continuar. El código postal debe tener exactamente 5 dígitos.
          </p>
        </div>
      )}
    </div>
  );
};

export default VentanaEnvio;
