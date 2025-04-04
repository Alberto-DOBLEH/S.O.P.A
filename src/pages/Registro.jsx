import React, { useState } from "react";
import Button from "../components/UI/Button";
import Input from "../components/UI/input";
import Card from "../components/Layout/Card";
import backgroundImage from "../assets/imagenes/Logo-Completo.png";

const Registro = ({ onClose }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [countryCode, setCountryCode] = useState("+52");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    console.log("Registro con:", {
      username,
      password,
      countryCode,
      phoneNumber,
    });
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
          <h1 className="text-3xl font-bold text-center mb-6">REGISTRO</h1>
          <form onSubmit={handleSubmit}>
            <Input
              placeholder="Usuario..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-4 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 opacity-75"
            />
            <Input
              placeholder="Contraseña..."
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 opacity-75"
            />
            <Input
              placeholder="Confirmar Contraseña..."
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-4 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 opacity-75"
            />

            <div className="flex gap-2 mt-2">
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="w-[150px] h-[70px] p-4 text-md border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 opacity-75"
              >
                <option value="+52">+52 (México)</option>
                <option value="+54">+54 (Argentina)</option>
                <option value="+1">+1 (EE.UU.)</option>
                <option value="+34">+34 (España)</option>
              </select>
              <Input
                placeholder="Número..."
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full p-4 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 opacity-75"
              />
            </div>

            <div className="flex justify-center mt-6 ">
              <Button
                type="submit"
                className="hover:bg-cyan-300 transition-transform duration-200 "
              >
                Registrarse
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default Registro;
