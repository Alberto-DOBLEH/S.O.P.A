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
