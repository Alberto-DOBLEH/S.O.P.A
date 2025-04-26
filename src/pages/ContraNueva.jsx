import React, { useState } from "react";
import Button from "../components/UI/Button";
import Input from "../components/UI/input";
import Card from "../components/Layout/Card";
import backgroundImage from "../assets/imagenes/logo-completo.png";

const ContraNueva = ({ onClose }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [step, setStep] = useState(1);

  const handleSendCode = () => {
    if (!phoneNumber) {
      alert("Por favor, ingresa tu número de teléfono");
      return;
    }
    console.log("Enviando código a:", phoneNumber);
    setStep(2);
  };

  const handleVerifyCode = () => {
    if (code !== "123456") {
      // Simulación de código correcto
      alert("Código incorrecto");
      return;
    }
    setStep(3);
  };

  const handleResetPassword = () => {
    if (newPassword !== confirmNewPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    console.log("Nueva contraseña guardada para:", phoneNumber);
    alert("Tu contraseña ha sido cambiada con éxito");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <Card className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl bg-[#cae8ff] relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 z-50"
        >
          ✕
        </button>

        <div className="absolute inset-0 flex items-center justify-center opacity-15">
          <img src={backgroundImage} alt="Fondo" className="w-3/4" />
        </div>

        <div className="relative z-10 p-8">
          <h1 className="text-3xl font-bold text-center mb-6">
            Recuperar Contraseña
          </h1>

          {step === 1 && (
            <>
              <p className="text-center mb-4">
                Ingresa tu número de teléfono para recibir un código de
                verificación.
              </p>
              <Input
                placeholder="Número de teléfono"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full p-4 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 opacity-75"
              />
              <div className="flex justify-center mt-6">
                <Button onClick={handleSendCode}>Enviar Código</Button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <p className="text-center mb-4">
                Ingresa el código que recibiste por SMS.
              </p>
              <Input
                placeholder="Código de verificación"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-md"
              />
              <div className="flex justify-center mt-6">
                <Button onClick={handleVerifyCode}>Verificar Código</Button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <p className="text-center mb-4">Ingresa tu nueva contraseña.</p>
              <Input
                placeholder="Nueva Contraseña"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-md"
              />
              <Input
                placeholder="Confirmar Nueva Contraseña"
                type="password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-md mt-2"
              />
              <div className="flex justify-center mt-6">
                <Button onClick={handleResetPassword}>
                  Guardar Contraseña
                </Button>
              </div>
            </>
          )}
        </div>
      </Card>
    </div>
  );
};

export default ContraNueva;
