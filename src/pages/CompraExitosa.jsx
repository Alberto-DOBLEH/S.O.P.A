import React from "react";
import { CheckCircle } from "lucide-react";

const CompraExitosa = ({
  metodoPago,
  calcularTotales,
  setShowSuccess,
  setCurrentStep,
}) => (
  <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto text-center">
    <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
      <CheckCircle className="text-green-600" size={32} />
    </div>
    <h2 className="text-2xl font-bold mb-2">¡Compra exitosa!</h2>
    <p className="text-gray-600 mb-6">
      Tu pedido ha sido procesado correctamente.
    </p>
    <p className="mb-6">
      Número de orden:{" "}
      <span className="font-medium">
        #ORD-{Math.floor(Math.random() * 1000000)}
      </span>
    </p>
    <div className="bg-gray-50 p-4 rounded-lg mb-6 text-left">
      <h3 className="font-medium mb-2">Resumen:</h3>
      <p className="text-sm">
        Fecha estimada de entrega:{" "}
        {new Date().toLocaleDateString("es-MX", {
          weekday: "long",
          day: "numeric",
          month: "long",
        })}
      </p>
      <p className="text-sm">
        Método de pago:{" "}
        {metodoPago === "tarjeta"
          ? "Tarjeta de crédito"
          : metodoPago === "paypal"
          ? "PayPal"
          : "Efectivo"}
      </p>
      <p className="text-sm font-bold mt-2">
        Total: $
        {calcularTotales().total.toLocaleString("es-MX", {
          minimumFractionDigits: 2,
        })}
      </p>
    </div>
    <button
      onClick={() => {
        setShowSuccess(false);
        setCurrentStep("carrito");
      }}
      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
    >
      Volver al inicio
    </button>
  </div>
);

export default CompraExitosa;
