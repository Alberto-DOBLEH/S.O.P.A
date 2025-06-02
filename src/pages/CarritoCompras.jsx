// import React, { useState, useEffect } from "react";
// import {
//   Trash2,
//   Plus,
//   Minus,
//   ShoppingCart as CartIcon,
//   ChevronRight,
//   MapPin,
//   Edit3,
//   Check,
//   X,
//   Star,
//   Truck,
//   Shield,
//   ArrowLeft,
//   Heart,
//   Gift,
//   Tag,
//   Clock,
// } from "lucide-react";
// import Header from "../components/Heaader"; // Fixed typo: "Heaader" → "Header"
// import Footer from "../components/Footer";
// import CompraExitosa from "../pages/CompraExitosa";
// import VentanaEnvio from "../pages/VentanaEnvio";
// import VentanaPago from "../pages/VentanaPago";
// import { useCurrency } from "../CurrencyContext"; // Importamos el contexto de moneda

// const CarritoCompras = () => {
//   // Obtenemos el contexto de moneda
//   const { currency, conversionRate } = useCurrency();
//   console.log("Currency:", currency, "Conversion Rate:", conversionRate); // Debug log to verify values

//   // *** INTERRUPTOR MANUAL PARA TESTING ***
//   const [hasItems, setHasItems] = useState(true);

//   // Estados principales
//   const [cartItems, setCartItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentStep, setCurrentStep] = useState("carrito");
//   const [showSuccess, setShowSuccess] = useState(false);

//   // Estados para información de envío
//   const [direccion, setDireccion] = useState({
//     calle: "Calle Constitución",
//     ciudad: "Culiacán",
//     estado: "Sinaloa",
//     codigoPostal: "81893",
//     pais: "México",
//   });

//   // Estados para gestión de direcciones
//   const [showAddressModal, setShowAddressModal] = useState(false);
//   const [savedAddresses, setSavedAddresses] = useState([]);
//   const [isEditingAddress, setIsEditingAddress] = useState(false);
//   const [newAddress, setNewAddress] = useState({
//     street: "",
//     city: "",
//     state: "",
//     zipCode: "",
//     country: "México",
//     isDefault: false,
//   });

//   // Estados para pago
//   const [metodoPago, setMetodoPago] = useState("tarjeta");
//   const [codigoDescuento, setCodigoDescuento] = useState("");
//   const [terminosAceptados, setTerminosAceptados] = useState(false);

//   // Opciones de envío
//   const opcionesEnvio = [
//     { id: "estandar", nombre: "Envío Estándar", precio: 99, dias: "3-5 días" },
//     { id: "express", nombre: "Envío Express", precio: 199, dias: "1-2 días" },
//   ];
//   const [opcionEnvioSeleccionada, setOpcionEnvioSeleccionada] =
//     useState("estandar");

//   // Simular carga inicial del carrito
//   useEffect(() => {
//     const fetchCart = async () => {
//       setLoading(true);
//       try {
//         // 🔥 API ENDPOINT: GET /api/carrito
//         const data = hasItems
//           ? [
//               {
//                 id: 1,
//                 nombre: "Auriculares Bluetooth Premium",
//                 precio: 4299,
//                 precioDescuento: 3439,
//                 cantidad: 1,
//                 imagen:
//                   "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
//                 stock: 10,
//                 discount: 20,
//                 descripcion: "Cancelación de ruido activa - Negro mate",
//                 rating: 4.8,
//                 reviews: 2847,
//               },
//               {
//                 id: 2,
//                 nombre: "Tablet Android Pro",
//                 precio: 999,
//                 precioDescuento: 849,
//                 cantidad: 1,
//                 imagen:
//                   "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop",
//                 stock: 5,
//                 discount: 15,
//                 descripcion: '10.1" OLED - 128GB - WiFi + 5G',
//                 rating: 4.6,
//                 reviews: 1523,
//               },
//             ]
//           : [];

//         setCartItems(data);

//         // Datos de ejemplo para direcciones
//         setSavedAddresses([
//           {
//             id: 1,
//             street: "Calle Constitución 123",
//             city: "Culiacán",
//             state: "Sinaloa",
//             zipCode: "81893",
//             country: "México",
//             isDefault: true,
//           },
//           {
//             id: 2,
//             street: "Av. Álvaro Obregón 456",
//             city: "Culiacán",
//             state: "Sinaloa",
//             zipCode: "80020",
//             country: "México",
//             isDefault: false,
//           },
//         ]);
//       } catch (error) {
//         console.error("Error al cargar carrito:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCart();
//   }, [hasItems]);

//   // Funciones del carrito
//   const actualizarCantidad = (id, nuevaCantidad) => {
//     if (nuevaCantidad < 1) return;

//     const item = cartItems.find((item) => item.id === id);
//     if (nuevaCantidad > item.stock) return;

//     // 🔥 API ENDPOINT: PUT /api/carrito/${id}
//     setCartItems((prev) =>
//       prev.map((item) =>
//         item.id === id ? { ...item, cantidad: nuevaCantidad } : item
//       )
//     );
//   };

//   const eliminarProducto = (id) => {
//     // 🔥 API ENDPOINT: DELETE /api/carrito/${id}
//     setCartItems((prev) => prev.filter((item) => item.id !== id));
//   };

//   const saveForLater = (id) => {
//     console.log("Producto guardado para después:", id);
//   };

//   const buyNow = (id) => {
//     console.log("Comprar ahora producto:", id);
//   };

//   // Función para formatear precios según la moneda
//   const formatPrice = (price) => {
//     const rate =
//       typeof conversionRate === "number" && conversionRate > 0
//         ? conversionRate
//         : 1;
//     const convertedPrice = typeof price === "number" ? price * rate : 0;
//     return currency === "USD"
//       ? `US$${convertedPrice.toFixed(2)}`
//       : currency === "MXN"
//       ? `$${convertedPrice.toFixed(2)}`
//       : `${convertedPrice.toFixed(2)} ${currency}`; // Fallback for other currencies
//   };

//   // Calcular totales
//   const calcularTotales = () => {
//     // Use a fallback conversion rate of 1 if conversionRate is invalid
//     const rate =
//       typeof conversionRate === "number" && conversionRate > 0
//         ? conversionRate
//         : 1;

//     // Calcular subtotal usando precioDescuento (o precio si no hay descuento)
//     const subtotal = cartItems.reduce(
//       (sum, item) =>
//         sum + (item.precioDescuento || item.precio) * item.cantidad * rate,
//       0
//     );

//     // Ajustar costo de envío según la moneda
//     const envio =
//       subtotal >= 1000 * rate
//         ? 0
//         : opcionesEnvio.find((op) => op.id === opcionEnvioSeleccionada).precio *
//           rate;

//     // Calcular IVA (16%)
//     const iva = subtotal * 0.16;

//     // Aplicar descuento si aplica
//     const descuento = codigoDescuento === "DESCUENTO10" ? subtotal * 0.1 : 0;

//     // Calcular total
//     const total = subtotal + envio + iva - descuento;

//     return { subtotal, envio, iva, descuento, total };
//   };

//   // Función para aplicar descuento
//   const aplicarDescuento = () => {
//     if (codigoDescuento === "DESCUENTO10") {
//       alert("Descuento del 10% aplicado!");
//     } else {
//       alert("Código de descuento no válido");
//     }
//   };

//   // Funciones para gestión de direcciones
//   const openAddressModal = () => {
//     setShowAddressModal(true);
//   };

//   const closeAddressModal = () => {
//     setShowAddressModal(false);
//     setIsEditingAddress(false);
//     setNewAddress({
//       street: "",
//       city: "",
//       state: "",
//       zipCode: "",
//       country: "México",
//       isDefault: false,
//     });
//   };

//   const selectAddress = (address) => {
//     if (address.isDefault) {
//       setSavedAddresses((prev) =>
//         prev.map((addr) => ({ ...addr, isDefault: addr.id === address.id }))
//       );
//     }
//     setDireccion({
//       calle: address.street,
//       ciudad: address.city,
//       estado: address.state,
//       codigoPostal: address.zipCode,
//       pais: address.country,
//     });
//     closeAddressModal();
//   };

//   const saveNewAddress = () => {
//     if (!newAddress.street || !newAddress.city || !newAddress.zipCode) return;

//     const addressToSave = {
//       ...newAddress,
//       id: Date.now(),
//     };

//     if (addressToSave.isDefault) {
//       setSavedAddresses((prev) =>
//         prev.map((addr) => ({ ...addr, isDefault: false }))
//       );
//     }

//     setSavedAddresses((prev) => [...prev, addressToSave]);

//     if (addressToSave.isDefault) {
//       setDireccion({
//         calle: addressToSave.street,
//         ciudad: addressToSave.city,
//         estado: addressToSave.state,
//         codigoPostal: addressToSave.zipCode,
//         pais: addressToSave.country,
//       });
//     }

//     closeAddressModal();
//   };

//   const deleteAddress = (addressId) => {
//     setSavedAddresses((prev) => prev.filter((addr) => addr.id !== addressId));
//     if (savedAddresses.find((addr) => addr.id === addressId)?.isDefault) {
//       setSavedAddresses((prev) =>
//         prev.length > 0
//           ? prev.map((addr, index) => ({
//               ...addr,
//               isDefault: index === 0,
//             }))
//           : prev
//       );
//     }
//   };

//   const finalizarCompra = async () => {
//     if (!terminosAceptados) {
//       alert("Debes aceptar los términos y condiciones");
//       return;
//     }

//     setLoading(true);
//     try {
//       // 🔥 API ENDPOINT: POST /api/pagos/procesar (para procesar el pago)
//       setTimeout(() => {
//         setShowSuccess(true);
//         setLoading(false);
//         setCartItems([]);
//       }, 1500);
//     } catch (error) {
//       console.error("Error al finalizar compra:", error);
//       alert("Ocurrió un error al procesar tu pago");
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
//       <Header />

//       {/* Panel de testing mejorado */}
//       <div className="bg-gradient-to-r from-yellow-400 to-orange-400 border-b border-yellow-300 shadow-sm">
//         <div className="container mx-auto flex items-center justify-between px-4 py-3">
//           <div className="flex items-center space-x-3">
//             <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
//             <span className="text-sm font-semibold text-gray-800">
//               🧪 Modo Testing - Eliminar en producción
//             </span>
//           </div>
//           <button
//             onClick={() => setHasItems(!hasItems)}
//             className={`flex items-center px-5 py-2 rounded-full text-white font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg ${
//               hasItems
//                 ? "bg-red-500 hover:bg-red-600 hover:shadow-red-200"
//                 : "bg-green-500 hover:bg-green-600 hover:shadow-green-200"
//             }`}
//           >
//             {hasItems ? (
//               <>
//                 <Trash2 size={16} className="mr-2" />
//                 Vaciar Carrito
//               </>
//             ) : (
//               <>
//                 <Plus size={16} className="mr-2" />
//                 Llenar Carrito
//               </>
//             )}
//           </button>
//         </div>
//       </div>

//       <main className="container mx-auto py-8 px-4">
//         {showSuccess ? (
//           <CompraExitosa
//             metodoPago={metodoPago}
//             calcularTotales={calcularTotales}
//             setShowSuccess={setShowSuccess}
//             setCurrentStep={setCurrentStep}
//           />
//         ) : (
//           <>
//             {/* Header mejorado con indicador de pasos */}
//             <div className="flex items-center justify-between mb-8">
//               <h1 className="text-3xl font-bold text-gray-900">
//                 {currentStep === "carrito"
//                   ? "Mi Carrito"
//                   : currentStep === "envio"
//                   ? "Información de Envío"
//                   : "Método de Pago"}
//               </h1>

//               {/* Indicador de pasos */}
//               <div className="flex items-center space-x-4 bg-white rounded-full px-6 py-3 shadow-lg">
//                 {["carrito", "envio", "pago"].map((step, index) => (
//                   <React.Fragment key={step}>
//                     <div
//                       className={`flex items-center transition-all duration-300 ${
//                         currentStep === step
//                           ? "text-blue-600 font-semibold scale-110"
//                           : "text-gray-400"
//                       }`}
//                     >
//                       <div
//                         className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 transition-all duration-300 ${
//                           currentStep === step
//                             ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
//                             : index <
//                               ["carrito", "envio", "pago"].indexOf(currentStep)
//                             ? "bg-green-500 text-white"
//                             : "bg-gray-200"
//                         }`}
//                       >
//                         {index <
//                         ["carrito", "envio", "pago"].indexOf(currentStep) ? (
//                           <Check size={16} />
//                         ) : (
//                           index + 1
//                         )}
//                       </div>
//                       <span className="hidden md:block">
//                         {step.charAt(0).toUpperCase() + step.slice(1)}
//                       </span>
//                     </div>
//                     {index < 2 && (
//                       <ChevronRight
//                         className="text-gray-300 transition-colors"
//                         size={20}
//                       />
//                     )}
//                   </React.Fragment>
//                 ))}
//               </div>
//             </div>

//             {loading ? (
//               <div className="flex justify-center items-center py-20">
//                 <div className="relative">
//                   <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200"></div>
//                   <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent absolute top-0"></div>
//                 </div>
//               </div>
//             ) : cartItems.length === 0 && currentStep === "carrito" ? (
//               <div className="text-center py-20">
//                 <div className="bg-white rounded-2xl shadow-xl p-12 max-w-md mx-auto">
//                   <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-6">
//                     <CartIcon size={48} className="text-blue-600" />
//                   </div>
//                   <h2 className="text-2xl font-bold text-gray-900 mb-3">
//                     Tu carrito está vacío
//                   </h2>
//                   <p className="text-gray-600 mb-8">
//                     Descubre nuestros increíbles productos y ofertas especiales
//                   </p>
//                   <button
//                     onClick={() => (window.location.href = "/productos")}
//                     className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-200"
//                   >
//                     Explorar productos
//                   </button>
//                 </div>
//               </div>
//             ) : (
//               <>
//                 {/* Ventana del Carrito */}
//                 {currentStep === "carrito" && (
//                   <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
//                     {/* Columna izquierda - Productos */}
//                     <div className="lg:w-2/3 space-y-6">
//                       <div className="bg-white rounded-2xl shadow-lg p-6">
//                         <div className="flex items-center justify-between mb-6">
//                           <h2 className="text-2xl font-bold text-gray-900">
//                             Productos ({cartItems.length})
//                           </h2>
//                           <div className="flex items-center text-sm text-gray-500">
//                             <Truck size={16} className="mr-2" />
//                             Envío gratis en pedidos +{formatPrice(1000)}
//                           </div>
//                         </div>

//                         {/* Productos del carrito */}
//                         {cartItems.map((item) => (
//                           <div
//                             key={item.id}
//                             className="group bg-gradient-to-r from-white to-gray-50 border border-gray-200 rounded-2xl p-6 mb-4 hover:shadow-lg transition-all duration-300 hover:border-blue-200"
//                           >
//                             <div className="flex flex-col sm:flex-row gap-6">
//                               <div className="relative w-40 h-40 flex-shrink-0">
//                                 <img
//                                   src={item.imagen}
//                                   alt={item.nombre}
//                                   className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
//                                 />
//                                 <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
//                                   -{item.discount}%
//                                 </div>
//                               </div>

//                               <div className="flex-grow space-y-4">
//                                 <div className="flex justify-between items-start">
//                                   <div>
//                                     <h3 className="font-bold text-xl text-gray-900 mb-2">
//                                       {item.nombre}
//                                     </h3>
//                                     <p className="text-gray-600 mb-3">
//                                       {item.descripcion}
//                                     </p>

//                                     {/* Rating */}
//                                     <div className="flex items-center space-x-2 mb-3">
//                                       <div className="flex items-center">
//                                         {[...Array(5)].map((_, i) => (
//                                           <Star
//                                             key={i}
//                                             size={16}
//                                             className={`${
//                                               i < Math.floor(item.rating)
//                                                 ? "text-yellow-400 fill-current"
//                                                 : "text-gray-300"
//                                             }`}
//                                           />
//                                         ))}
//                                       </div>
//                                       <span className="text-sm text-gray-600">
//                                         {item.rating} (
//                                         {item.reviews.toLocaleString()} reseñas)
//                                       </span>
//                                     </div>
//                                   </div>

//                                   <div className="text-right">
//                                     <div className="text-2xl font-bold text-gray-900">
//                                       {formatPrice(
//                                         item.precioDescuento || item.precio
//                                       )}
//                                     </div>
//                                     <div className="flex items-center space-x-2 mt-1">
//                                       <span className="text-gray-500 line-through text-sm">
//                                         {formatPrice(item.precio)}
//                                       </span>
//                                       <span className="bg-gradient-to-r from-red-500 to-red-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
//                                         -{item.discount}%
//                                       </span>
//                                     </div>
//                                   </div>
//                                 </div>

//                                 {/* Controles de cantidad */}
//                                 <div className="flex items-center justify-between">
//                                   <div className="flex items-center space-x-3">
//                                     <div className="flex items-center border border-gray-300 rounded-lg">
//                                       <button
//                                         onClick={() =>
//                                           actualizarCantidad(
//                                             item.id,
//                                             item.cantidad - 1
//                                           )
//                                         }
//                                         className="p-2 hover:bg-gray-100 rounded-l-lg"
//                                       >
//                                         <Minus size={16} />
//                                       </button>
//                                       <span className="px-4 py-2 font-semibold">
//                                         {item.cantidad}
//                                       </span>
//                                       <button
//                                         onClick={() =>
//                                           actualizarCantidad(
//                                             item.id,
//                                             item.cantidad + 1
//                                           )
//                                         }
//                                         className="p-2 hover:bg-gray-100 rounded-r-lg"
//                                       >
//                                         <Plus size={16} />
//                                       </button>
//                                     </div>
//                                     <span className="text-sm text-gray-500">
//                                       {item.stock} disponibles
//                                     </span>
//                                   </div>

//                                   <div className="flex items-center space-x-3">
//                                     <button
//                                       onClick={() => saveForLater(item.id)}
//                                       className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
//                                     >
//                                       <Heart size={16} className="mr-1" />
//                                       Guardar
//                                     </button>
//                                     <button
//                                       onClick={() => eliminarProducto(item.id)}
//                                       className="flex items-center text-red-600 hover:text-red-800 text-sm font-medium transition-colors"
//                                     >
//                                       <Trash2 size={16} className="mr-1" />
//                                       Eliminar
//                                     </button>
//                                     <button
//                                       onClick={() => buyNow(item.id)}
//                                       className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 transform hover:scale-105"
//                                     >
//                                       Comprar Ahora
//                                     </button>
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         ))}

//                         {/* Dirección de envío */}
//                         <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 mt-6">
//                           <div className="flex items-center justify-between">
//                             <div>
//                               <h3 className="font-bold text-lg text-gray-900 mb-2 flex items-center">
//                                 <MapPin
//                                   className="mr-2 text-blue-600"
//                                   size={20}
//                                 />
//                                 Dirección de envío
//                               </h3>
//                               <p className="text-gray-700">
//                                 {direccion.calle}, {direccion.ciudad},{" "}
//                                 {direccion.estado} {direccion.codigoPostal}
//                               </p>
//                               <div className="flex items-center mt-2 text-sm text-green-600">
//                                 <Clock size={16} className="mr-1" />
//                                 Entrega estimada: 3-5 días hábiles
//                               </div>
//                             </div>
//                             <button
//                               onClick={openAddressModal}
//                               className="bg-white text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white px-4 py-2 rounded-lg font-medium transition-all duration-300"
//                             >
//                               Cambiar
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Columna derecha */}
//                     <div className="lg:w-1/3">
//                       <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-4">
//                         <h3 className="font-bold text-2xl text-gray-900 mb-6">
//                           Resumen del pedido
//                         </h3>

//                         <div className="space-y-4 mb-6">
//                           <div className="flex items-center justify-between text-gray-600">
//                             <span>
//                               Subtotal ({cartItems.length} productos):
//                             </span>
//                             <span className="font-semibold">
//                               {formatPrice(calcularTotales().subtotal)}
//                             </span>
//                           </div>

//                           <div className="flex items-center justify-between">
//                             <span className="text-gray-600">Envío:</span>
//                             <div className="text-right">
//                               <span className="text-green-600 font-semibold">
//                                 {formatPrice(calcularTotales().envio)}
//                               </span>
//                               {calcularTotales().envio === 0 && (
//                                 <div className="text-xs text-gray-500">
//                                   Ahorraste {formatPrice(99)}
//                                 </div>
//                               )}
//                             </div>
//                           </div>

//                           <div className="flex items-center justify-between">
//                             <span className="text-gray-600">IVA (16%):</span>
//                             <span className="font-semibold">
//                               {formatPrice(calcularTotales().iva)}
//                             </span>
//                           </div>

//                           {calcularTotales().descuento > 0 && (
//                             <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-3">
//                               <div className="flex items-center">
//                                 <Gift
//                                   size={16}
//                                   className="text-green-600 mr-2"
//                                 />
//                                 <span className="text-sm text-green-700">
//                                   ¡Descuento aplicado! Ahorraste{" "}
//                                   {formatPrice(calcularTotales().descuento)}
//                                 </span>
//                               </div>
//                             </div>
//                           )}

//                           <div className="border-t border-gray-200 pt-4">
//                             <div className="flex justify-between items-center">
//                               <span className="font-bold text-lg">Total:</span>
//                               <span className="font-bold text-2xl text-gray-900">
//                                 {formatPrice(calcularTotales().total)}
//                               </span>
//                             </div>
//                             <div className="text-sm text-gray-500 mt-1">
//                               Incluye impuestos
//                             </div>
//                           </div>
//                         </div>

//                         <button
//                           onClick={() => setCurrentStep("envio")}
//                           className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
//                         >
//                           Proceder al pago
//                         </button>

//                         <div className="flex items-center justify-center mt-4 text-xs text-gray-500">
//                           <Shield size={14} className="mr-2" />
//                           Pago 100% seguro con encriptación SSL
//                         </div>

//                         {/* Sección de Comprar ahora mejorada */}
//                         <div className="mt-8 border-t pt-6">
//                           <h4 className="font-bold text-lg mb-4 flex items-center">
//                             <Tag size={18} className="mr-2 text-blue-600" />
//                             Comprar ahora
//                           </h4>
//                           <div className="space-y-4">
//                             {cartItems.slice(0, 2).map((item) => (
//                               <div
//                                 key={item.id}
//                                 className="flex justify-between items-center bg-gray-50 hover:bg-gray-100 rounded-lg p-3 transition-colors"
//                               >
//                                 <div>
//                                   <p className="font-medium">{item.nombre}</p>
//                                   <div className="flex items-center">
//                                     <p className="text-sm font-bold text-gray-800 mr-2">
//                                       {formatPrice(
//                                         item.precioDescuento || item.precio
//                                       )}
//                                     </p>
//                                     {item.discount > 0 && (
//                                       <span className="text-xs line-through text-gray-400">
//                                         {formatPrice(item.precio)}
//                                       </span>
//                                     )}
//                                   </div>
//                                 </div>
//                                 <button
//                                   onClick={() => buyNow(item.id)}
//                                   className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 font-medium px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-all"
//                                 >
//                                   Comprar ahora
//                                 </button>
//                               </div>
//                             ))}
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {/* Ventana de Envío */}
//                 {currentStep === "envio" && (
//                   <VentanaEnvio
//                     direccion={direccion}
//                     setDireccion={setDireccion}
//                     opcionesEnvio={opcionesEnvio}
//                     opcionEnvioSeleccionada={opcionEnvioSeleccionada}
//                     setOpcionEnvioSeleccionada={setOpcionEnvioSeleccionada}
//                     cartItems={cartItems}
//                     actualizarCantidad={actualizarCantidad}
//                     eliminarProducto={eliminarProducto}
//                     setCurrentStep={setCurrentStep}
//                   />
//                 )}

//                 {/* Ventana de Pago */}
//                 {currentStep === "pago" && (
//                   <VentanaPago
//                     metodoPago={metodoPago}
//                     setMetodoPago={setMetodoPago}
//                     codigoDescuento={codigoDescuento}
//                     setCodigoDescuento={setCodigoDescuento}
//                     aplicarDescuento={aplicarDescuento}
//                     terminosAceptados={terminosAceptados}
//                     setTerminosAceptados={setTerminosAceptados}
//                     direccion={direccion}
//                     opcionesEnvio={opcionesEnvio}
//                     opcionEnvioSeleccionada={opcionEnvioSeleccionada}
//                     calcularTotales={calcularTotales}
//                     finalizarCompra={finalizarCompra}
//                     loading={loading}
//                     setCurrentStep={setCurrentStep}
//                   />
//                 )}
//               </>
//             )}

//             {/* Modal de Direcciones */}
//             {showAddressModal && (
//               <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//                 <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//                   <div className="p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
//                     <div className="flex items-center justify-between">
//                       <h2 className="text-xl font-bold text-gray-900 flex items-center">
//                         <MapPin className="mr-2 text-blue-600" />
//                         Mis direcciones
//                       </h2>
//                       <button
//                         onClick={closeAddressModal}
//                         className="text-gray-400 hover:text-gray-600 transition-colors"
//                       >
//                         <X size={24} />
//                       </button>
//                     </div>
//                   </div>

//                   <div className="p-6">
//                     {/* Direcciones guardadas */}
//                     <div className="mb-8">
//                       <h3 className="font-medium text-gray-800 mb-4">
//                         Direcciones guardadas
//                       </h3>
//                       <div className="space-y-3">
//                         {savedAddresses.map((address) => (
//                           <div
//                             key={address.id}
//                             className={`border rounded-xl p-4 cursor-pointer transition-all ${
//                               address.street === direccion.calle &&
//                               address.city === direccion.ciudad
//                                 ? "border-blue-500 bg-blue-50"
//                                 : "border-gray-200 hover:border-gray-300"
//                             }`}
//                             onClick={() => selectAddress(address)}
//                           >
//                             <div className="flex items-start justify-between">
//                               <div className="flex-1">
//                                 <div className="flex items-center mb-1">
//                                   <p className="font-medium text-gray-800">
//                                     {address.street}
//                                   </p>
//                                   {address.isDefault && (
//                                     <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
//                                       Predeterminada
//                                     </span>
//                                   )}
//                                 </div>
//                                 <p className="text-sm text-gray-600">
//                                   {address.city}, {address.state}{" "}
//                                   {address.zipCode}
//                                 </p>
//                                 <p className="text-sm text-gray-500 mt-1">
//                                   {address.country}
//                                 </p>
//                               </div>
//                               <button
//                                 onClick={(e) => {
//                                   e.stopPropagation();
//                                   deleteAddress(address.id);
//                                 }}
//                                 className="text-red-500 hover:text-red-700 p-1 transition-colors"
//                               >
//                                 <Trash2 size={18} />
//                               </button>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>

//                     {/* Agregar nueva dirección */}
//                     <div className="border-t pt-6">
//                       <div className="flex items-center justify-between mb-4">
//                         <h3 className="font-medium text-gray-800">
//                           Agregar nueva dirección
//                         </h3>
//                         <div>
//                           <button
//                             onClick={() =>
//                               setIsEditingAddress(!isEditingAddress)
//                             }
//                             className={`flex items-center text-sm ${
//                               isEditingAddress
//                                 ? "text-gray-600 hover:text-gray-800"
//                                 : "text-blue-600 hover:text-blue-800"
//                             }`}
//                           >
//                             {isEditingAddress ? (
//                               <>
//                                 <X size={16} className="mr-1" />
//                                 Cancelar
//                               </>
//                             ) : (
//                               <>
//                                 <Plus size={16} className="mr-1" />
//                                 Agregar
//                               </>
//                             )}
//                           </button>
//                         </div>
//                       </div>

//                       {isEditingAddress && (
//                         <div className="space-y-4 animate">
//                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                             <div>
//                               <label className="block text-sm font-medium text-gray-700 mb-1">
//                                 Calle y número
//                               </label>
//                               <input
//                                 type="text"
//                                 value={newAddress.street}
//                                 onChange={(e) =>
//                                   setNewAddress({
//                                     ...newAddress,
//                                     street: e.target.value,
//                                   })
//                                 }
//                                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                                 placeholder="Av. Ejemplo 123"
//                               />
//                             </div>
//                             <div>
//                               <label className="block text-sm font-medium text-gray-700 mb-1">
//                                 Ciudad
//                               </label>
//                               <input
//                                 type="text"
//                                 value={newAddress.city}
//                                 onChange={(e) =>
//                                   setNewAddress({
//                                     ...newAddress,
//                                     city: e.target.value,
//                                   })
//                                 }
//                                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                 placeholder="Culiacán"
//                               />
//                             </div>
//                             <div>
//                               <label className="block text-sm font-medium text-gray-700 mb-1">
//                                 Estado
//                               </label>
//                               <input
//                                 type="text"
//                                 value={newAddress.state}
//                                 onChange={(e) =>
//                                   setNewAddress({
//                                     ...newAddress,
//                                     state: e.target.value,
//                                   })
//                                 }
//                                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                 placeholder="Sinaloa"
//                               />
//                             </div>
//                             <div>
//                               <label className="block text-sm font-medium text-gray-700 mb-1">
//                                 Código Postal
//                               </label>
//                               <input
//                                 type="text"
//                                 value={newAddress.zipCode}
//                                 onChange={(e) =>
//                                   setNewAddress({
//                                     ...newAddress,
//                                     zipCode: e.target.value,
//                                   })
//                                 }
//                                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                 placeholder="81893"
//                               />
//                             </div>
//                           </div>

//                           <div className="flex items-center">
//                             <input
//                               type="checkbox"
//                               id="isDefault"
//                               checked={newAddress.isDefault}
//                               onChange={(e) =>
//                                 setNewAddress({
//                                   ...newAddress,
//                                   isDefault: e.target.checked,
//                                 })
//                               }
//                               className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                             />
//                             <label
//                               htmlFor="isDefault"
//                               className="ml-2 block text-sm text-gray-700"
//                             >
//                               Establecer como dirección predeterminada
//                             </label>
//                           </div>

//                           <div className="flex gap-3 pt-4">
//                             <button
//                               onClick={saveNewAddress}
//                               className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
//                             >
//                               <div className="flex items-center justify-center">
//                                 <Check size={18} />
//                                 <span className="ml-2">Guardar dirección</span>
//                               </div>
//                             </button>
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </>
//         )}
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default CarritoCompras;

import React, { useState, useEffect } from "react";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingCart as CartIcon,
  ChevronRight,
  MapPin,
  Edit3,
  Check,
  X,
  Star,
  Truck,
  Shield,
  ArrowLeft,
  Heart,
  Gift,
  Tag,
  Clock,
} from "lucide-react";
import Header from "../components/Heaader";
import Footer from "../components/Footer";
import CompraExitosa from "../pages/CompraExitosa";
import VentanaEnvio from "../pages/VentanaEnvio";
import VentanaPago from "../pages/VentanaPago";
import { useCurrency } from "../CurrencyContext"; // Importamos el contexto de moneda

const CarritoCompras = () => {
  // Obtenemos el contexto de moneda
  const { currency, conversionRate } = useCurrency();
  console.log("Currency:", currency, "Conversion Rate:", conversionRate); // Debug log to verify values

  // *** INTERRUPTOR MANUAL PARA TESTING ***
  const [hasItems, setHasItems] = useState(true);

  // Estados principales
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState("carrito");
  const [showSuccess, setShowSuccess] = useState(false);

  // Estados para información de envío
  const [direccion, setDireccion] = useState({
    calle: "Calle Constitución",
    ciudad: "Culiacán",
    estado: "Sinaloa",
    codigoPostal: "81893",
    pais: "México",
  });

  // Estados para gestión de direcciones
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "México",
    isDefault: false,
  });

  // Estados para pago
  const [metodoPago, setMetodoPago] = useState("tarjeta");
  const [codigoDescuento, setCodigoDescuento] = useState("");
  const [terminosAceptados, setTerminosAceptados] = useState(false);

  // Opciones de envío
  const opcionesEnvio = [
    { id: "estandar", nombre: "Envío Estándar", precio: 99, dias: "3-5 días" },
    { id: "express", nombre: "Envío Express", precio: 199, dias: "1-2 días" },
  ];
  const [opcionEnvioSeleccionada, setOpcionEnvioSeleccionada] =
    useState("estandar");

  // Simular carga inicial del carrito
  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      try {
        const id = localStorage.getItem("idusuario")
        const response = await fetch(`http://localhost:3001/api/carrito?userId=${id}`,{
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Error al cargar el carrito");
        }

        const data = await response.json();

        const datosprocesados = data.map(item => ({
          ...item,
          precio: parseFloat(item.precio), // convierte el string a número decimal
        }));
        console.log("Datos del carrito:",datosprocesados );
        
        setCartItems(datosprocesados);

        // Datos de ejemplo para direcciones
        setSavedAddresses([
          {
            id: 1,
            street: "Calle Constitución 123",
            city: "Culiacán",
            state: "Sinaloa",
            zipCode: "81893",
            country: "México",
            isDefault: true,
          },
          {
            id: 2,
            street: "Av. Álvaro Obregón 456",
            city: "Culiacán",
            state: "Sinaloa",
            zipCode: "80020",
            country: "México",
            isDefault: false,
          },
        ]);
      } catch (error) {
        console.error("Error al cargar carrito:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [hasItems]);

  // Funciones del carrito
  const actualizarCantidad = (id, nuevaCantidad) => {
    console.log("Actualizando cantidad de producto:", id, "Nueva cantidad:", nuevaCantidad);

    try{
      const idusuario = localStorage.getItem("idusuario")
      const response = fetch(`http://localhost:3001/api/carrito/${id}?userId=${idusuario}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ cantidad: nuevaCantidad }),
      });
    }catch (error) {
      console.error("Error al actualizar cantidad:", error);
    }
  };

  const eliminarProducto = (id) => {
    const idusuario = localStorage.getItem("idusuario")

    try {
      const response = fetch(`http://localhost:3001/api/carrito/${id}?userId=${idusuario}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) {
        console.error("Error al eliminar producto del carrito");
        return;
      }
    } catch (error) {
      console.error("Error al eliminar producto del carrito:", error);
    }
  };

  const saveForLater = (id) => {
    console.log("Producto guardado para después:", id);
  };

  const buyNow = (id) => {
    // Directly proceed to the shipping step for individual item purchase
    setCurrentStep("envio");
  };

  // Función para formatear precios según la moneda
  const formatPrice = (price) => {
    const rate =
      typeof conversionRate === "number" && conversionRate > 0
        ? conversionRate
        : 1;
    const convertedPrice = typeof price === "number" ? price * rate : 0;
    return currency === "USD"
      ? `US$${convertedPrice.toFixed(2)}`
      : currency === "MXN"
      ? `$${convertedPrice.toFixed(2)}`
      : `${convertedPrice.toFixed(2)} ${currency}`; // Fallback for other currencies
  };

  // Calcular totales
  const calcularTotales = () => {
    // Use a fallback conversion rate of 1 if conversionRate is invalid
    const rate =
      typeof conversionRate === "number" && conversionRate > 0
        ? conversionRate
        : 1;

    // Calcular subtotal usando precioDescuento (o precio si no hay descuento)
    const subtotal = cartItems.reduce(
      (sum, item) =>
        sum + (item.precioDescuento || item.precio) * item.cantidad * rate,
      0
    );

    // Ajustar costo de envío según la moneda
    const envio =
      subtotal >= 1000 * rate
        ? 0
        : opcionesEnvio.find((op) => op.id === opcionEnvioSeleccionada).precio *
          rate;

    // Calcular IVA (16%)
    const iva = subtotal * 0.16;

    // Aplicar descuento si aplica
    const descuento = codigoDescuento === "DESCUENTO10" ? subtotal * 0.1 : 0;

    // Calcular total
    const total = subtotal + envio + iva - descuento;

    return { subtotal, envio, iva, descuento, total };
  };

  // Función para aplicar descuento
  const aplicarDescuento = () => {
    if (codigoDescuento === "DESCUENTO10") {
      alert("Descuento del 10% aplicado!");
    } else {
      alert("Código de descuento no válido");
    }
  };

  // Funciones para gestión de direcciones
  const openAddressModal = () => {
    setShowAddressModal(true);
  };

  const closeAddressModal = () => {
    setShowAddressModal(false);
    setIsEditingAddress(false);
    setNewAddress({
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "México",
      isDefault: false,
    });
  };

  const selectAddress = (address) => {
    if (address.isDefault) {
      setSavedAddresses((prev) =>
        prev.map((addr) => ({ ...addr, isDefault: addr.id === address.id }))
      );
    }
    setDireccion({
      calle: address.street,
      ciudad: address.city,
      estado: address.state,
      codigoPostal: address.zipCode,
      pais: address.country,
    });
    closeAddressModal();
  };

  const saveNewAddress = () => {
    if (!newAddress.street || !newAddress.city || !newAddress.zipCode) return;

    const addressToSave = {
      ...newAddress,
      id: Date.now(),
    };

    if (addressToSave.isDefault) {
      setSavedAddresses((prev) =>
        prev.map((addr) => ({ ...addr, isDefault: false }))
      );
    }

    setSavedAddresses((prev) => [...prev, addressToSave]);

    if (addressToSave.isDefault) {
      setDireccion({
        calle: addressToSave.street,
        ciudad: addressToSave.city,
        estado: addressToSave.state,
        codigoPostal: addressToSave.zipCode,
        pais: addressToSave.country,
      });
    }

    closeAddressModal();
  };

  const deleteAddress = (addressId) => {
    setSavedAddresses((prev) => prev.filter((addr) => addr.id !== addressId));
    if (savedAddresses.find((addr) => addr.id === addressId)?.isDefault) {
      setSavedAddresses((prev) =>
        prev.length > 0
          ? prev.map((addr, index) => ({
              ...addr,
              isDefault: index === 0,
            }))
          : prev
      );
    }
  };

  const finalizarCompra = async () => {
    if (!terminosAceptados) {
      alert("Debes aceptar los términos y condiciones");
      return;
    }

    setLoading(true);
    try {
      const idusuario = localStorage.getItem("idusuario");
      const response = await fetch(`http://localhost:3001/api/ventas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          id_usuario: idusuario,
          productos: cartItems.map((item) => ({
            id_producto: item.id_producto,
            cantidad: item.cantidad,
            precio: item.precioDescuento || item.precio,
          })),
          metodo_pago: metodoPago,
          direccion_envio: direccion,
          opcion_envio: opcionEnvioSeleccionada,
        }),
      });
      if (!response.ok) {
        throw new Error("Error al procesar el pago");
      }
      setLoading(false);
      setShowSuccess(true);
    } catch (error) {
      console.error("Error al finalizar compra:", error);
      alert("Ocurrió un error al procesar tu pago");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <Header />
      <main className="container mx-auto py-8 px-4">
        {showSuccess ? (
          <CompraExitosa
            metodoPago={metodoPago}
            calcularTotales={calcularTotales}
            setShowSuccess={setShowSuccess}
            setCurrentStep={setCurrentStep}
          />
        ) : (
          <>
            {/* Header mejorado con indicador de pasos */}
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold text-gray-900">
                {currentStep === "carrito"
                  ? "Mi Carrito"
                  : currentStep === "envio"
                  ? "Información de Envío"
                  : "Método de Pago"}
              </h1>

              {/* Indicador de pasos */}
              <div className="flex items-center space-x-4 bg-white rounded-full px-6 py-3 shadow-lg">
                {["carrito", "envio", "pago"].map((step, index) => (
                  <React.Fragment key={step}>
                    <div
                      className={`flex items-center transition-all duration-300 ${
                        currentStep === step
                          ? "text-blue-600 font-semibold scale-110"
                          : "text-gray-400"
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 transition-all duration-300 ${
                          currentStep === step
                            ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                            : index <
                              ["carrito", "envio", "pago"].indexOf(currentStep)
                            ? "bg-green-500 text-white"
                            : "bg-gray-200"
                        }`}
                      >
                        {index <
                        ["carrito", "envio", "pago"].indexOf(currentStep) ? (
                          <Check size={16} />
                        ) : (
                          index + 1
                        )}
                      </div>
                      <span className="hidden md:block">
                        {step.charAt(0).toUpperCase() + step.slice(1)}
                      </span>
                    </div>
                    {index < 2 && (
                      <ChevronRight
                        className="text-gray-300 transition-colors"
                        size={20}
                      />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="relative">
                  <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200"></div>
                  <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent absolute top-0"></div>
                </div>
              </div>
            ) : cartItems.length === 0 && currentStep === "carrito" ? (
              <div className="text-center py-20">
                <div className="bg-white rounded-2xl shadow-xl p-12 max-w-md mx-auto">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CartIcon size={48} className="text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">
                    Tu carrito está vacío
                  </h2>
                  <p className="text-gray-600 mb-8">
                    Descubre nuestros increíbles productos y ofertas especiales
                  </p>
                  <button
                    onClick={() => (window.location.href = "/productos")}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-200"
                  >
                    Explorar productos
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Ventana del Carrito */}
                {currentStep === "carrito" && (
                  <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
                    {/* Columna izquierda - Productos */}
                    <div className="lg:w-2/3 space-y-6">
                      <div className="bg-white rounded-2xl shadow-lg p-6">
                        <div className="flex items-center justify-between mb-6">
                          <h2 className="text-2xl font-bold text-gray-900">
                            Productos ({cartItems.length})
                          </h2>
                          <div className="flex items-center text-sm text-gray-500">
                            <Truck size={16} className="mr-2" />
                            Envío gratis en pedidos +{formatPrice(1000)}
                          </div>
                        </div>

                        {/* Productos del carrito */}
                        {cartItems.map((item) => (
                          <div
                            key={item.id_carrito}
                            className="group bg-gradient-to-r from-white to-gray-50 border border-gray-200 rounded-2xl p-6 mb-4 hover:shadow-lg transition-all duration-300 hover:border-blue-200"
                          >
                            <div className="flex flex-col sm:flex-row gap-6">
                              <div className="relative w-40 h-40 flex-shrink-0">
                                <img
                                  src={item.imagen}
                                  alt={item.nombre}
                                  className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                  -{item.discount}%
                                </div>
                              </div>

                              <div className="flex-grow space-y-4">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h3 className="font-bold text-xl text-gray-900 mb-2">
                                      {item.nombre}
                                    </h3>
                                    <p className="text-gray-600 mb-3">
                                      {item.descripcion}
                                    </p>
                                  </div>

                                  <div className="text-right">
                                    <div className="text-2xl font-bold text-gray-900">
                                      {formatPrice(
                                        item.precio
                                      )}
                                    </div>
                                    <div className="flex items-center space-x-2 mt-1">
                                      <span className="text-gray-500 line-through text-sm">
                                        {formatPrice(item.precio)}
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                {/* Controles de cantidad */}
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-3">
                                    <div className="flex items-center border border-gray-300 rounded-lg">
                                      {item.cantidad > 1 ? (
                                      <button
                                        onClick={() =>
                                          actualizarCantidad(
                                            item.id_carrito,
                                            item.cantidad - 1
                                          )
                                        }
                                        className="p-2 hover:bg-gray-100 rounded-l-lg"
                                      >
                                        <Minus size={16} />
                                      </button>
                                      ) : null}
                                      <span className="px-4 py-2 font-semibold">
                                        {item.cantidad}
                                      </span>
                                      <button
                                        onClick={() =>
                                          actualizarCantidad(
                                            item.id_carrito,
                                            item.cantidad + 1
                                          )
                                        }
                                        className="p-2 hover:bg-gray-100 rounded-r-lg"
                                      >
                                        <Plus size={16} />
                                      </button>
                                    </div>
                                  </div>

                                  <div className="flex items-center space-x-3">
                                    <button
                                      onClick={() => saveForLater(item.id)}
                                      className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
                                    >
                                      <Heart size={16} className="mr-1" />
                                      Guardar
                                    </button>
                                    <button
                                      onClick={() => eliminarProducto(item.id_carrito)}
                                      className="flex items-center text-red-600 hover:text-red-800 text-sm font-medium transition-colors"
                                    >
                                      <Trash2 size={16} className="mr-1" />
                                      Eliminar
                                    </button>
                                    <button
                                      onClick={() => buyNow(item.id)}
                                      className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 transform hover:scale-105"
                                    >
                                      Comprar Ahora
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}

                        {/* Dirección de envío */}
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 mt-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-bold text-lg text-gray-900 mb-2 flex items-center">
                                <MapPin
                                  className="mr-2 text-blue-600"
                                  size={20}
                                />
                                Dirección de envío
                              </h3>
                              <p className="text-gray-700">
                                {direccion.calle}, {direccion.ciudad},{" "}
                                {direccion.estado} {direccion.codigoPostal}
                              </p>
                              <div className="flex items-center mt-2 text-sm text-green-600">
                                <Clock size={16} className="mr-1" />
                                Entrega estimada: 3-5 días hábiles
                              </div>
                            </div>
                            <button
                              onClick={openAddressModal}
                              className="bg-white text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white px-4 py-2 rounded-lg font-medium transition-all duration-300"
                            >
                              Cambiar
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Columna derecha */}
                    <div className="lg:w-1/3">
                      <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-4">
                        <h3 className="font-bold text-2xl text-gray-900 mb-6">
                          Resumen del pedido
                        </h3>

                        <div className="space-y-4 mb-6">
                          <div className="flex items-center justify-between text-gray-600">
                            <span>
                              Subtotal ({cartItems.length} productos):
                            </span>
                            <span className="font-semibold">
                              {formatPrice(calcularTotales().subtotal)}
                            </span>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Envío:</span>
                            <div className="text-right">
                              <span className="text-green-600 font-semibold">
                                {formatPrice(calcularTotales().envio)}
                              </span>
                              {calcularTotales().envio === 0 && (
                                <div className="text-xs text-gray-500">
                                  Ahorraste {formatPrice(99)}
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">IVA (16%):</span>
                            <span className="font-semibold">
                              {formatPrice(calcularTotales().iva)}
                            </span>
                          </div>

                          {calcularTotales().descuento > 0 && (
                            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-3">
                              <div className="flex items-center">
                                <Gift
                                  size={16}
                                  className="text-green-600 mr-2"
                                />
                                <span className="text-sm text-green-700">
                                  ¡Descuento aplicado! Ahorraste{" "}
                                  {formatPrice(calcularTotales().descuento)}
                                </span>
                              </div>
                            </div>
                          )}

                          <div className="border-t border-gray-200 pt-4">
                            <div className="flex justify-between items-center">
                              <span className="font-bold text-lg">Total:</span>
                              <span className="font-bold text-2xl text-gray-900">
                                {formatPrice(calcularTotales().total)}
                              </span>
                            </div>
                            <div className="text-sm text-gray-500 mt-1">
                              Incluye impuestos
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => setCurrentStep("envio")} // Proceed to shipping step
                          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
                        >
                          Proceder al pago
                        </button>

                        <div className="flex items-center justify-center mt-4 text-xs text-gray-500">
                          <Shield size={14} className="mr-2" />
                          Pago 100% seguro con encriptación SSL
                        </div>

                        {/* Sección de Comprar ahora mejorada */}
                        <div className="mt-8 border-t pt-6">
                          <h4 className="font-bold text-lg mb-4 flex items-center">
                            <Tag size={18} className="mr-2 text-blue-600" />
                            Comprar ahora
                          </h4>
                          <div className="space-y-4">
                            {cartItems.slice(0, 2).map((item) => (
                              <div
                                key={item.id}
                                className="flex justify-between items-center bg-gray-50 hover:bg-gray-100 rounded-lg p-3 transition-colors"
                              >
                                <div>
                                  <p className="font-medium">{item.nombre}</p>
                                  <div className="flex items-center">
                                    <p className="text-sm font-bold text-gray-800 mr-2">
                                      {formatPrice(
                                        item.precioDescuento || item.precio
                                      )}
                                    </p>
                                    {item.discount > 0 && (
                                      <span className="text-xs line-through text-gray-400">
                                        {formatPrice(item.precio)}
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <button
                                  onClick={() => buyNow(item.id)}
                                  className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 font-medium px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-all"
                                >
                                  Comprar ahora
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Ventana de Envío */}
                {currentStep === "envio" && (
                  <VentanaEnvio
                    direccion={direccion}
                    setDireccion={setDireccion}
                    opcionesEnvio={opcionesEnvio}
                    opcionEnvioSeleccionada={opcionEnvioSeleccionada}
                    setOpcionEnvioSeleccionada={setOpcionEnvioSeleccionada}
                    cartItems={cartItems}
                    actualizarCantidad={actualizarCantidad}
                    eliminarProducto={eliminarProducto}
                    setCurrentStep={setCurrentStep}
                  />
                )}

                {/* Ventana de Pago */}
                {currentStep === "pago" && (
                  <VentanaPago
                    metodoPago={metodoPago}
                    setMetodoPago={setMetodoPago}
                    codigoDescuento={codigoDescuento}
                    setCodigoDescuento={setCodigoDescuento}
                    aplicarDescuento={aplicarDescuento}
                    terminosAceptados={terminosAceptados}
                    setTerminosAceptados={setTerminosAceptados}
                    direccion={direccion}
                    opcionesEnvio={opcionesEnvio}
                    opcionEnvioSeleccionada={opcionEnvioSeleccionada}
                    calcularTotales={calcularTotales}
                    finalizarCompra={finalizarCompra}
                    loading={loading}
                    setCurrentStep={setCurrentStep}
                  />
                )}
              </>
            )}

            {/* Modal de Direcciones */}
            {showAddressModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                  <div className="p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-bold text-gray-900 flex items-center">
                        <MapPin className="mr-2 text-blue-600" />
                        Mis direcciones
                      </h2>
                      <button
                        onClick={closeAddressModal}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <X size={24} />
                      </button>
                    </div>
                  </div>

                  <div className="p-6">
                    {/* Direcciones guardadas */}
                    <div className="mb-8">
                      <h3 className="font-medium text-gray-800 mb-4">
                        Direcciones guardadas
                      </h3>
                      <div className="space-y-3">
                        {savedAddresses.map((address) => (
                          <div
                            key={address.id}
                            className={`border rounded-xl p-4 cursor-pointer transition-all ${
                              address.street === direccion.calle &&
                              address.city === direccion.ciudad
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                            onClick={() => selectAddress(address)}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center mb-1">
                                  <p className="font-medium text-gray-800">
                                    {address.street}
                                  </p>
                                  {address.isDefault && (
                                    <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                                      Predeterminada
                                    </span>
                                  )}
                                </div>
                                <p className="text-sm text-gray-600">
                                  {address.city}, {address.state}{" "}
                                  {address.zipCode}
                                </p>
                                <p className="text-sm text-gray-500 mt-1">
                                  {address.country}
                                </p>
                              </div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteAddress(address.id);
                                }}
                                className="text-red-500 hover:text-red-700 p-1 transition-colors"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Agregar nueva dirección */}
                    <div className="border-t pt-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-medium text-gray-800">
                          Agregar nueva dirección
                        </h3>
                        <div>
                          <button
                            onClick={() =>
                              setIsEditingAddress(!isEditingAddress)
                            }
                            className={`flex items-center text-sm ${
                              isEditingAddress
                                ? "text-gray-600 hover:text-gray-800"
                                : "text-blue-600 hover:text-blue-800"
                            }`}
                          >
                            {isEditingAddress ? (
                              <>
                                <X size={16} className="mr-1" />
                                Cancelar
                              </>
                            ) : (
                              <>
                                <Plus size={16} className="mr-1" />
                                Agregar
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                      {isEditingAddress && (
                        <div className="space-y-4 animate">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Calle y número
                              </label>
                              <input
                                type="text"
                                value={newAddress.street}
                                onChange={(e) =>
                                  setNewAddress({
                                    ...newAddress,
                                    street: e.target.value,
                                  })
                                }
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="Av. Ejemplo 123"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Ciudad
                              </label>
                              <input
                                type="text"
                                value={newAddress.city}
                                onChange={(e) =>
                                  setNewAddress({
                                    ...newAddress,
                                    city: e.target.value,
                                  })
                                }
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Culiacán"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Estado
                              </label>
                              <input
                                type="text"
                                value={newAddress.state}
                                onChange={(e) =>
                                  setNewAddress({
                                    ...newAddress,
                                    state: e.target.value,
                                  })
                                }
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Sinaloa"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Código Postal
                              </label>
                              <input
                                type="text"
                                value={newAddress.zipCode}
                                onChange={(e) =>
                                  setNewAddress({
                                    ...newAddress,
                                    zipCode: e.target.value,
                                  })
                                }
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="81893"
                              />
                            </div>
                          </div>

                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id="isDefault"
                              checked={newAddress.isDefault}
                              onChange={(e) =>
                                setNewAddress({
                                  ...newAddress,
                                  isDefault: e.target.checked,
                                })
                              }
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label
                              htmlFor="isDefault"
                              className="ml-2 block text-sm text-gray-700"
                            >
                              Establecer como dirección predeterminada
                            </label>
                          </div>

                          <div className="flex gap-3 pt-4">
                            <button
                              onClick={saveNewAddress}
                              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
                            >
                              <div className="flex items-center justify-center">
                                <Check size={18} />
                                <span className="ml-2">Guardar dirección</span>
                              </div>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CarritoCompras;
