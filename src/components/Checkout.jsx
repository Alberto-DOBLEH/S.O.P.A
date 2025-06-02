import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import VentanaEnvio from "../pages/VentanaEnvio";
import VentanaPago from "../pages/VentanaPago";
import CompraExitosa from "../pages/CompraExitosa";
import Header from "./Heaader";
import Footer from "./Footer";

const Checkout = () => {
  // Move all hooks to the top
  const { state: locationState } = useLocation();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(
    locationState?.modoCompraRapida ? "envio" : "carrito"
  );
  const [showSuccess, setShowSuccess] = useState(false);
  const [direccion, setDireccion] = useState({
    calle: "",
    ciudad: "",
    estado: "",
    codigoPostal: "",
    pais: "",
    instrucciones: "",
  });
  const [opcionEnvioSeleccionada, setOpcionEnvioSeleccionada] =
    useState("estandar");
  const [metodoPago, setMetodoPago] = useState("tarjeta");
  const [codigoDescuento, setCodigoDescuento] = useState("");
  const [descuentoAplicado, setDescuentoAplicado] = useState(false);
  const [terminosAceptados, setTerminosAceptados] = useState(false);
  const [loading, setLoading] = useState(false);

  // Handle the early return logic using state or conditional rendering
  if (!locationState || !locationState.productos) {
    return (
      <div className="container mx-auto px-4 text-center py-20">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Error: No hay productos para procesar
        </h2>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
        >
          Volver al inicio
        </button>
      </div>
    );
  }

  const { productos, modoCompraRapida } = locationState;

  const opcionesEnvio = [
    { id: "estandar", nombre: "Envío Estándar", precio: 99, dias: "3-5 días" },
    { id: "express", nombre: "Envío Express", precio: 199, dias: "1-2 días" },
  ];

  const finalizarCompra = async () => {
    if (!terminosAceptados) {
      alert("Debes aceptar los términos y condiciones");
      return;
    }

    setLoading(true);
    try {
      setTimeout(() => {
        setShowSuccess(true);
        setLoading(false);
      }, 1500);
    } catch (error) {
      console.error("Error al finalizar compra:", error);
      alert("Ocurrió un error al procesar tu pago");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="py-8">
        {showSuccess ? (
          <CompraExitosa
            metodoPago={metodoPago}
            calcularTotales={() => {
              const subtotal = productos.reduce(
                (sum, item) =>
                  sum + (item.precioDescuento || item.precio) * item.cantidad,
                0
              );
              const envio =
                subtotal >= 1000
                  ? 0
                  : opcionesEnvio.find(
                      (op) => op.id === opcionEnvioSeleccionada
                    ).precio;
              const iva = subtotal * 0.16;
              const descuento = descuentoAplicado ? subtotal * 0.1 : 0;
              const total = subtotal + envio + iva - descuento;
              return { subtotal, envio, iva, descuento, total };
            }}
            setShowSuccess={setShowSuccess}
            setCurrentStep={setCurrentStep}
          />
        ) : (
          <>
            {currentStep === "envio" && (
              <VentanaEnvio
                direccion={direccion}
                setDireccion={setDireccion}
                opcionesEnvio={opcionesEnvio}
                opcionEnvioSeleccionada={opcionEnvioSeleccionada}
                setOpcionEnvioSeleccionada={setOpcionEnvioSeleccionada}
                cartItems={productos}
                setCurrentStep={setCurrentStep}
              />
            )}
            {currentStep === "pago" && (
              <VentanaPago
                metodoPago={metodoPago}
                setMetodoPago={setMetodoPago}
                codigoDescuento={codigoDescuento}
                setCodigoDescuento={setCodigoDescuento}
                aplicarDescuento={() => {
                  if (codigoDescuento === "DESCUENTO10") {
                    setDescuentoAplicado(true);
                    alert("Descuento del 10% aplicado!");
                  } else {
                    alert("Código de descuento no válido");
                  }
                }}
                terminosAceptados={terminosAceptados}
                setTerminosAceptados={setTerminosAceptados}
                direccion={direccion}
                opcionesEnvio={opcionesEnvio}
                opcionEnvioSeleccionada={opcionEnvioSeleccionada}
                calcularTotales={() => {
                  const subtotal = productos.reduce(
                    (sum, item) =>
                      sum +
                      (item.precioDescuento || item.precio) * item.cantidad,
                    0
                  );
                  const envio =
                    subtotal >= 1000
                      ? 0
                      : opcionesEnvio.find(
                          (op) => op.id === opcionEnvioSeleccionada
                        ).precio;
                  const iva = subtotal * 0.16;
                  const descuento = descuentoAplicado ? subtotal * 0.1 : 0;
                  const total = subtotal + envio + iva - descuento;
                  return { subtotal, envio, iva, descuento, total };
                }}
                finalizarCompra={finalizarCompra}
                loading={loading}
                setCurrentStep={setCurrentStep}
              />
            )}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
