// import React from "react";
// import { CheckCircle } from "lucide-react";

// const CompraExitosa = ({
//   metodoPago,
//   calcularTotales,
//   setShowSuccess,
//   setCurrentStep,
// }) => (
//   <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto text-center">
//     <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
//       <CheckCircle className="text-green-600" size={32} />
//     </div>
//     <h2 className="text-2xl font-bold mb-2">¡Compra exitosa!</h2>
//     <p className="text-gray-600 mb-6">
//       Tu pedido ha sido procesado correctamente.
//     </p>
//     <p className="mb-6">
//       Número de orden:{" "}
//       <span className="font-medium">
//         #ORD-{Math.floor(Math.random() * 1000000)}
//       </span>
//     </p>
//     <div className="bg-gray-50 p-4 rounded-lg mb-6 text-left">
//       <h3 className="font-medium mb-2">Resumen:</h3>
//       <p className="text-sm">
//         Fecha estimada de entrega:{" "}
//         {new Date().toLocaleDateString("es-MX", {
//           weekday: "long",
//           day: "numeric",
//           month: "long",
//         })}
//       </p>
//       <p className="text-sm">
//         Método de pago:{" "}
//         {metodoPago === "tarjeta"
//           ? "Tarjeta de crédito"
//           : metodoPago === "paypal"
//           ? "PayPal"
//           : "Efectivo"}
//       </p>
//       <p className="text-sm font-bold mt-2">
//         Total: $
//         {calcularTotales().total.toLocaleString("es-MX", {
//           minimumFractionDigits: 2,
//         })}
//       </p>
//     </div>
//     <button
//       onClick={() => {
//         setShowSuccess(false);
//         setCurrentStep("carrito");
//       }}
//       className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
//     >
//       Volver al inicio
//     </button>
//   </div>
// );

// export default CompraExitosa;
// import React from "react";
// import { CheckCircle, Package, ArrowLeft } from "lucide-react";

// interface CompraExitosaProps {
//   metodoPago: string;
//   calcularTotales: () => any;
//   setShowSuccess: (show: boolean) => void;
//   setCurrentStep: (step: string) => void;
// }

// const CompraExitosa = ({
//   metodoPago,
//   calcularTotales,
//   setShowSuccess,
//   setCurrentStep,
// }: CompraExitosaProps) => {
//   const { total } = calcularTotales();
//   const numeroOrden = `ORD-${Math.floor(Math.random() * 1000000)}`;

//   const fechaEntrega = new Date();
//   fechaEntrega.setDate(fechaEntrega.getDate() + 5);

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//       <div className="max-w-2xl mx-auto px-4">
//         <div className="bg-white rounded-xl shadow-lg p-8 text-center">
//           {/* Icono de éxito */}
//           <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
//             <CheckCircle size={40} className="text-green-600" />
//           </div>

//           {/* Título */}
//           <h1 className="text-3xl font-bold text-gray-900 mb-4">
//             ¡Compra Exitosa!
//           </h1>

//           <p className="text-gray-600 mb-2">
//             Tu pedido ha sido procesado correctamente
//           </p>

//           <p className="text-lg font-medium text-gray-900 mb-8">
//             Número de orden:{" "}
//             <span className="text-blue-600">{numeroOrden}</span>
//           </p>

//           {/* Información del pedido */}
//           <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
//             <div className="flex items-center mb-4">
//               <Package size={20} className="text-blue-600 mr-2" />
//               <h3 className="font-semibold text-gray-900">
//                 Detalles del pedido
//               </h3>
//             </div>

//             <div className="space-y-2 text-sm">
//               <div className="flex justify-between">
//                 <span className="text-gray-600">
//                   Fecha estimada de entrega:
//                 </span>
//                 <span className="font-medium">
//                   {fechaEntrega.toLocaleDateString("es-MX", {
//                     weekday: "long",
//                     day: "numeric",
//                     month: "long",
//                   })}
//                 </span>
//               </div>

//               <div className="flex justify-between">
//                 <span className="text-gray-600">Método de pago:</span>
//                 <span className="font-medium">
//                   {metodoPago === "tarjeta"
//                     ? "Tarjeta de crédito"
//                     : metodoPago === "paypal"
//                     ? "PayPal"
//                     : "Transferencia bancaria"}
//                 </span>
//               </div>

//               <div className="flex justify-between pt-2 border-t">
//                 <span className="text-gray-900 font-semibold">
//                   Total pagado:
//                 </span>
//                 <span className="text-lg font-bold text-green-600">
//                   ${total.toFixed(2)}
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* Información adicional */}
//           <div className="bg-blue-50 rounded-lg p-4 mb-8">
//             <p className="text-sm text-blue-800">
//               📧 Recibirás un email de confirmación con los detalles de tu
//               pedido y el número de seguimiento.
//             </p>
//           </div>

//           {/* Botones de acción */}
//           <div className="flex flex-col sm:flex-row gap-3 justify-center">
//             <button
//               onClick={() => {
//                 setShowSuccess(false);
//                 setCurrentStep("carrito");
//               }}
//               className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium flex items-center justify-center"
//             >
//               Continuar Comprando
//             </button>

//             <button
//               onClick={() => (window.location.href = "/mis-pedidos")}
//               className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 rounded-lg font-medium flex items-center justify-center"
//             >
//               Ver mis pedidos
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CompraExitosa;

import React from "react";
import { CheckCircle } from "lucide-react";

// Componente para mostrar la pantalla de compra exitosa
const CompraExitosa = ({
  metodoPago,
  calcularTotales,
  setShowSuccess,
  setCurrentStep,
}) => {
  const { total } = calcularTotales();
  const numeroOrden = `ORD-${Math.floor(Math.random() * 1000000)}`;
  const fechaEntrega = new Date();
  fechaEntrega.setDate(fechaEntrega.getDate() + 5);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto text-center">
        {/* Icono de éxito */}
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={32} className="text-green-600" />
        </div>

        {/* Título */}
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          ¡Compra Exitosa!
        </h1>
        <p className="text-gray-600 mb-4">
          Tu pedido ha sido procesado correctamente.
        </p>

        {/* Información del pedido */}
        <p className="text-lg font-medium text-gray-800 mb-4">
          Número de orden: <span className="text-blue-600">{numeroOrden}</span>
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4 text-left">
          <p className="text-sm text-gray-600">
            Fecha estimada de entrega:{" "}
            {fechaEntrega.toLocaleDateString("es-MX", {
              weekday: "long",
              day: "numeric",
              month: "long",
            })}
          </p>
          <p className="text-sm text-gray-600">
            Método de pago:{" "}
            {metodoPago === "tarjeta"
              ? "Tarjeta de crédito"
              : metodoPago === "paypal"
              ? "PayPal"
              : "Transferencia bancaria"}
          </p>
          <p className="text-sm font-bold mt-2">
            Total pagado: ${total.toFixed(2)}
          </p>
        </div>

        {/* Botón para volver */}
        <button
          onClick={() => {
            setShowSuccess(false);
            setCurrentStep("carrito");
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg w-full"
        >
          Volver al inicio
        </button>
      </div>
    </div>
  );
};

export default CompraExitosa;
