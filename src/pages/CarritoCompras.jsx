// import React, { useState, useEffect, useRef } from "react";
// import { FaShoppingCart, FaTimes, FaTrash, FaMinus, FaPlus } from "react-icons/fa";

// const CartItem = ({ item, onRemove, onUpdateQuantity }) => {
//   return (
//     <div className="flex items-center p-4 border-b border-gray-200">
//       <div className="w-16 h-16 bg-gray-100 rounded mr-4 overflow-hidden">
//         <img
//           src={item.image || "/api/placeholder/100/100"}
//           alt={item.name}
//           className="w-full h-full object-cover"
//         />
//       </div>

//       <div className="flex-1">
//         <h4 className="font-medium text-gray-800">{item.name}</h4>
//         <p className="text-sm text-gray-500">{item.description}</p>
//         <div className="flex items-center justify-between mt-2">
//           <div className="text-blue-600 font-medium">${item.price.toFixed(2)}</div>

//           <div className="flex items-center">
//             <button
//               onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
//               disabled={item.quantity <= 1}
//               className="p-1 rounded-full hover:bg-gray-100 disabled:opacity-50"
//             >
//               <FaMinus size={12} />
//             </button>

//             <span className="mx-2 w-6 text-center">{item.quantity}</span>

//             <button
//               onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
//               className="p-1 rounded-full hover:bg-gray-100"
//             >
//               <FaPlus size={12} />
//             </button>
//           </div>
//         </div>
//       </div>

//       <button
//         onClick={() => onRemove(item.id)}
//         className="ml-4 p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
//       >
//         <FaTrash size={16} />
//       </button>
//     </div>
//   );
// };

// const CartModal = ({ isOpen, onClose }) => {
//   const modalRef = useRef(null);
//   const [cartItems, setCartItems] = useState([
//     {
//       id: 1,
//       name: "Smartphone XYZ",
//       description: "128GB, Negro",
//       price: 399.99,
//       quantity: 1,
//       image: "/api/placeholder/100/100"
//     },
//     {
//       id: 2,
//       name: "Audífonos Bluetooth",
//       description: "Cancelación de ruido",
//       price: 89.99,
//       quantity: 1,
//       image: "/api/placeholder/100/100"
//     }
//   ]);

//   // Calcular total
//   const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
//   const shipping = 9.99;
//   const total = subtotal + shipping;

//   // Manejar click fuera del modal
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (modalRef.current && !modalRef.current.contains(event.target)) {
//         onClose();
//       }
//     };

//     if (isOpen) {
//       document.addEventListener('mousedown', handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [isOpen, onClose]);

//   // Impedir scroll cuando modal está abierto
//   useEffect(() => {
//     if (isOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'auto';
//     }

//     return () => {
//       document.body.style.overflow = 'auto';
//     };
//   }, [isOpen]);

//   // Handlers
//   const handleRemoveItem = (itemId) => {
//     setCartItems(cartItems.filter(item => item.id !== itemId));
//   };

//   const handleUpdateQuantity = (itemId, newQuantity) => {
//     if (newQuantity < 1) return;

//     setCartItems(cartItems.map(item =>
//       item.id === itemId ? {...item, quantity: newQuantity} : item
//     ));
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
//       <div
//         ref={modalRef}
//         className="bg-white w-full max-w-md h-full shadow-xl flex flex-col animate-slide-in-right"
//       >
//         {/* Header */}
//         <div className="flex items-center justify-between p-4 border-b border-gray-200">
//           <div className="flex items-center">
//             <FaShoppingCart className="text-blue-600 mr-2" size={20} />
//             <h2 className="text-xl font-semibold">Carrito de Compras</h2>
//           </div>
//           <button
//             onClick={onClose}
//             className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//           >
//             <FaTimes size={20} />
//           </button>
//         </div>

//         {/* Body */}
//         <div className="flex-1 overflow-y-auto">
//           {cartItems.length === 0 ? (
//             <div className="flex flex-col items-center justify-center h-full text-center p-8">
//               <FaShoppingCart size={64} className="text-gray-300 mb-4" />
//               <h3 className="text-xl font-medium text-gray-700 mb-2">Tu carrito está vacío</h3>
//               <p className="text-gray-500 mb-6">Agrega algunos productos para comenzar</p>
//               <button
//                 onClick={onClose}
//                 className="bg-[#123e9d] hover:bg-[#edf6f9] hover:text-black text-white px-6 py-2 rounded-lg transition-all duration-200"
//               >
//                 Explorar productos
//               </button>
//             </div>
//           ) : (
//             <div>
//               {cartItems.map(item => (
//                 <CartItem
//                   key={item.id}
//                   item={item}
//                   onRemove={handleRemoveItem}
//                   onUpdateQuantity={handleUpdateQuantity}
//                 />
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Footer */}
//         {cartItems.length > 0 && (
//           <div className="border-t border-gray-200 p-4 bg-gray-50">
//             <div className="flex justify-between mb-2">
//               <span className="text-gray-600">Subtotal</span>
//               <span className="font-medium">${subtotal.toFixed(2)}</span>
//             </div>
//             <div className="flex justify-between mb-4">
//               <span className="text-gray-600">Envío</span>
//               <span className="font-medium">${shipping.toFixed(2)}</span>
//             </div>
//             <div className="flex justify-between text-lg font-bold mb-6">
//               <span>Total</span>
//               <span>${total.toFixed(2)}</span>
//             </div>

//             <button className="w-full bg-[#123e9d] hover:bg-[#edf6f9] hover:text-black text-white py-3 rounded-lg font-medium transition-all duration-200 mb-2">
//               Proceder al pago
//             </button>
//             <button
//               onClick={onClose}
//               className="w-full bg-white border border-gray-300 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
//             >
//               Seguir comprando
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CartModal;

// Se hace la que no me conoce

// import React from "react";
// import { useNavigate } from "react-router-dom"; // Esta línea faltaba

// const CarritoCompras = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-bold mb-4">Carrito de Compras</h1>
//       <button
//         onClick={() => navigate(-1)}
//         className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//       >
//         Volver a la tienda
//       </button>
//       {/* Aquí puedes agregar el contenido de tu carrito */}
//     </div>
//   );
// };

// export default CarritoCompras;

import React from "react";
import { logoLetras } from "../assets/imagenes/imagenes";

const CarritoCompras = () => {
  return (
    <div className="min-h-screen bg-[#f4f6fc] p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-[#123e9d]">
          Mi Carrito de Compras
        </h1>

        <div className="flex flex-col items-center justify-center py-12">
          <p className="text-gray-500 mb-4">Tu carrito está vacío</p>
          <button
            className="bg-[#123e9d] text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            onClick={() => window.history.back()}
          >
            Regresar a comprar
          </button>
        </div>

        <footer className="mt-12 py-4 border-t flex justify-center">
          <img
            src={logoLetras}
            alt="SOAP Logo"
            className="w-[100px] hover:scale-110 transition-transform duration-200"
          />
        </footer>
      </div>
    </div>
  );
};

export default CarritoCompras;
