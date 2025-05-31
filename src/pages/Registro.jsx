import React, { useState, useEffect } from "react";
import Button from "../components/UI/Button";
import Input from "../components/UI/input";
import Card from "../components/Layout/Card";
import backgroundImage from "../assets/imagenes/logo-completo.png";
import { toast } from "react-toastify";

const Registro = ({ onClose }) => {
  const [username, setUsername] = useState("");
  const [isUsernameTaken, setIsUsernameTaken] = useState(false);
  const [isPhoneTaken, setIsPhoneTaken] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [countryCode, setCountryCode] = useState("+52");
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    const verificarUsuario = async () => {
      if (!username) {
        setIsUsernameTaken(false);
        return;
      }
      try {
        const response = await fetch("http://localhost:3001/api/auth/verificar-usuario", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nombre: username })
        });
        const data = await response.json();
        setIsUsernameTaken(data.existe);
      } catch (err) {
        console.error("Error al verificar usuario:", err);
      }
    };
    verificarUsuario();
  }, [username]);

  useEffect(() => {
    const verificarTelefono = async () => {
      const fullPhone = countryCode + phoneNumber;
      if (!/^[0-9]{10}$/.test(phoneNumber)) {
        setIsPhoneTaken(false);
        return;
      }
      try {
        const response = await fetch("http://localhost:3001/api/auth/verificar-telefono", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ telefono: fullPhone })
        });
        const data = await response.json();
        setIsPhoneTaken(data.existe);
      } catch (err) {
        console.error("Error al verificar teléfono:", err);
      }
    };
    verificarTelefono();
  }, [phoneNumber, countryCode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.dismiss();

    if (!username || !password || !confirmPassword || !phoneNumber) {
      toast.error("Completa todos los campos", { toastId: "campos-vacios" });
      return;
    }

    if (isUsernameTaken) {
      toast.error("El nombre de usuario ya está en uso", { toastId: "usuario-existe" });
      return;
    }

    if (isPhoneTaken) {
      toast.error("El número de teléfono ya está registrado", { toastId: "telefono-existe" });
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Las contraseñas no coinciden", { toastId: "no-coincide" });
      return;
    }

    if (password.length < 8) {
      toast.error("La contraseña debe tener al menos 8 caracteres", { toastId: "clave-corta" });
      return;
    }

    if (!/^[0-9]{10}$/.test(phoneNumber)) {
      toast.error("El número debe tener exactamente 10 dígitos", { toastId: "telefono-invalido" });
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/auth/registro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: username,
          telefono: countryCode + phoneNumber,
          contraseña: password,
        }),
      });

      const data = await response.text();

      if (!response.ok) {
        toast.error(data, { toastId: "registro-error" });
      } else {
        toast.success(data, { toastId: "registro-ok" });
        onClose();
      }
    } catch (error) {
      console.error("Error al registrar:", error);
      toast.error("Hubo un error al registrar al usuario", { toastId: "registro-falla" });
    }
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
            {isUsernameTaken && (
              <p className="text-red-500 text-sm mt-1">El nombre de usuario ya está en uso.</p>
            )}

            <Input
              placeholder="Contraseña..."
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 opacity-75"
            />
            {password && password.length < 8 && (
              <p className="text-red-500 text-sm mt-1">La contraseña debe tener al menos 8 caracteres.</p>
            )}
            {password && !/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password) && (
              <p className="text-yellow-500 text-sm mt-1">Se recomienda incluir al menos un carácter especial.</p>
            )}

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
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, "");
                  setPhoneNumber(value);
                }}
                className="w-full p-4 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 opacity-75"
              />
            </div>
            {phoneNumber && phoneNumber.length !== 10 && (
              <p className="text-red-500 text-sm mt-1">Número no reconocido</p>
            )}
            {isPhoneTaken && (
              <p className="text-red-500 text-sm mt-1">Este número ya está registrado.</p>
            )}

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
