import React from "react";
import {
  CreditCard,
  ArrowLeft,
  Home,
  Truck,
  Package,
  CheckCircle,
  ChevronDown,
} from "lucide-react";

const VentanaPago = ({
  metodoPago,
  setMetodoPago,
  codigoDescuento,
  setCodigoDescuento,
  aplicarDescuento,
  terminosAceptados,
  setTerminosAceptados,
  direccion,
  opcionesEnvio,
  opcionEnvioSeleccionada,
  calcularTotales,
  finalizarCompra,
  loading,
  setCurrentStep,
}) => {
  // 🔥 API ENDPOINT: POST /api/pagos/procesar (para procesar el pago)
  // 🔥 API ENDPOINT: POST /api/descuentos/aplicar (para aplicar códigos de descuento)
  // 🔥 API ENDPOINT: GET /api/metodos-pago (para obtener métodos de pago disponibles)

  const { subtotal, envio, iva, descuento, total } = calcularTotales();

  // Calcular fecha de entrega estimada
  const fechaEntrega = new Date();
  fechaEntrega.setDate(
    fechaEntrega.getDate() + (opcionEnvioSeleccionada === "express" ? 2 : 5)
  );

  // Función para formatear la dirección
  const formatearDireccion = () => {
    if (!direccion) return "No se ha especificado dirección";

    const partes = [];
    if (direccion.calle) partes.push(direccion.calle);
    if (direccion.ciudad) partes.push(direccion.ciudad);
    if (direccion.estado) partes.push(direccion.estado);
    if (direccion.codigoPostal) partes.push(direccion.codigoPostal);
    if (direccion.pais) partes.push(direccion.pais);

    return partes.join(", ") || "Dirección incompleta";
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <CreditCard className="mr-2" />
        Método de Pago
      </h2>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Columna izquierda - Métodos de pago */}
        <div>
          <h3 className="font-medium mb-4 text-lg">Información de pago</h3>
          <div className="space-y-4">
            {/* Tarjeta de crédito/débito */}
            <div className="border rounded-lg overflow-hidden">
              <div
                className="p-3 border-b bg-gray-50 flex items-center cursor-pointer"
                onClick={() => setMetodoPago("tarjeta")}
              >
                <input
                  type="radio"
                  id="tarjeta"
                  name="pago"
                  checked={metodoPago === "tarjeta"}
                  onChange={() => setMetodoPago("tarjeta")}
                  className="mr-3"
                />
                <label
                  htmlFor="tarjeta"
                  className="font-medium flex-1 cursor-pointer"
                >
                  Tarjeta de crédito/débito
                </label>
                <ChevronDown
                  size={20}
                  className={`transform transition-transform ${
                    metodoPago === "tarjeta" ? "rotate-180" : ""
                  }`}
                />
              </div>
              {metodoPago === "tarjeta" && (
                <div className="p-4 space-y-4">
                  <div>
                    <label className="block mb-1 text-sm text-gray-600">
                      Número de tarjeta *
                    </label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      maxLength="19"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-1 text-sm text-gray-600">
                        Fecha de expiración *
                      </label>
                      <input
                        type="text"
                        placeholder="MM/AA"
                        className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        maxLength="5"
                      />
                    </div>
                    <div>
                      <label className="block mb-1 text-sm text-gray-600">
                        CVV *
                      </label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        maxLength="4"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block mb-1 text-sm text-gray-600">
                      Nombre del titular *
                    </label>
                    <input
                      type="text"
                      placeholder="Juan Pérez"
                      className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* PayPal */}
            <div className="border rounded-lg overflow-hidden">
              <div
                className="p-3 border-b bg-gray-50 flex items-center cursor-pointer"
                onClick={() => setMetodoPago("paypal")}
              >
                <input
                  type="radio"
                  id="paypal"
                  name="pago"
                  checked={metodoPago === "paypal"}
                  onChange={() => setMetodoPago("paypal")}
                  className="mr-3"
                />
                <label
                  htmlFor="paypal"
                  className="font-medium flex-1 cursor-pointer"
                >
                  PayPal
                </label>
                <ChevronDown
                  size={20}
                  className={`transform transition-transform ${
                    metodoPago === "paypal" ? "rotate-180" : ""
                  }`}
                />
              </div>
              {metodoPago === "paypal" && (
                <div className="p-4">
                  <p className="text-sm text-gray-600 mb-3">
                    Serás redirigido a PayPal para completar tu pago de forma
                    segura.
                  </p>
                  <div className="bg-blue-50 p-3 rounded border border-blue-200">
                    <p className="text-sm text-blue-700">
                      💡 PayPal protege tu información financiera
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Transferencia bancaria */}
            <div className="border rounded-lg overflow-hidden">
              <div
                className="p-3 border-b bg-gray-50 flex items-center cursor-pointer"
                onClick={() => setMetodoPago("transferencia")}
              >
                <input
                  type="radio"
                  id="transferencia"
                  name="pago"
                  checked={metodoPago === "transferencia"}
                  onChange={() => setMetodoPago("transferencia")}
                  className="mr-3"
                />
                <label
                  htmlFor="transferencia"
                  className="font-medium flex-1 cursor-pointer"
                >
                  Transferencia bancaria
                </label>
                <ChevronDown
                  size={20}
                  className={`transform transition-transform ${
                    metodoPago === "transferencia" ? "rotate-180" : ""
                  }`}
                />
              </div>
              {metodoPago === "transferencia" && (
                <div className="p-4">
                  <p className="text-sm text-gray-600 mb-3">
                    Recibirás los datos bancarios por email para realizar la
                    transferencia.
                  </p>
                  <div className="bg-yellow-50 p-3 rounded border border-yellow-200">
                    <p className="text-sm text-yellow-700">
                      ⏰ El pedido se procesará una vez confirmado el pago (1-2
                      días hábiles)
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Código de descuento */}
          <div className="mt-6">
            <h4 className="font-medium mb-3">Código de descuento</h4>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Ingresa tu código"
                value={codigoDescuento}
                onChange={(e) => setCodigoDescuento(e.target.value)}
                className="flex-1 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={aplicarDescuento}
                className="px-4 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Aplicar
              </button>
            </div>
          </div>
        </div>

        {/* Columna derecha - Resumen del pedido */}
        <div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium mb-4 text-lg">Resumen del pedido</h3>

            {/* Dirección de envío */}
            <div className="mb-4 p-3 bg-white rounded border">
              <div className="flex items-center mb-2">
                <Home size={16} className="mr-2 text-gray-600" />
                <span className="font-medium text-sm">Dirección de envío</span>
              </div>
              <p className="text-sm text-gray-700">{formatearDireccion()}</p>
            </div>

            {/* Método de envío */}
            <div className="mb-4 p-3 bg-white rounded border">
              <div className="flex items-center mb-2">
                <Truck size={16} className="mr-2 text-gray-600" />
                <span className="font-medium text-sm">Método de envío</span>
              </div>
              <p className="text-sm text-gray-700">
                {opcionEnvioSeleccionada === "express"
                  ? "Express (1-2 días)"
                  : "Estándar (3-5 días)"}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Entrega estimada: {fechaEntrega.toLocaleDateString()}
              </p>
            </div>

            {/* Desglose de precios */}
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Envío:</span>
                <span>${envio.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>IVA:</span>
                <span>${iva.toFixed(2)}</span>
              </div>
              {descuento > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Descuento:</span>
                  <span>-${descuento.toFixed(2)}</span>
                </div>
              )}
              <hr className="my-2" />
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Términos y condiciones */}
            <div className="mb-4">
              <label className="flex items-start cursor-pointer">
                <input
                  type="checkbox"
                  checked={terminosAceptados}
                  onChange={(e) => setTerminosAceptados(e.target.checked)}
                  className="mr-2 mt-1"
                />
                <span className="text-sm text-gray-700">
                  Acepto los{" "}
                  <a href="#" className="text-blue-500 hover:underline">
                    términos y condiciones
                  </a>{" "}
                  y la{" "}
                  <a href="#" className="text-blue-500 hover:underline">
                    política de privacidad
                  </a>
                </span>
              </label>
            </div>

            {/* Botones de acción */}
            <div className="space-y-3">
              <button
                onClick={finalizarCompra}
                disabled={!terminosAceptados || loading}
                className="w-full bg-green-500 text-white py-3 rounded-lg font-medium hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                ) : (
                  <CheckCircle size={20} className="mr-2" />
                )}
                {loading ? "Procesando..." : "Finalizar compra"}
              </button>

              <button
                onClick={() => setCurrentStep(2)}
                className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors flex items-center justify-center"
              >
                <ArrowLeft size={20} className="mr-2" />
                Volver al envío
              </button>
            </div>

            {/* Información de seguridad */}
            <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
              <div className="flex items-center mb-2">
                <Package size={16} className="mr-2 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">
                  Compra segura
                </span>
              </div>
              <p className="text-xs text-blue-700">
                Tu información de pago está protegida con encriptación SSL de
                256 bits
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VentanaPago;
