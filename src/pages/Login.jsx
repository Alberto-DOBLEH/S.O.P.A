import React, { useState } from "react";
import Button from "../components/UI/Button";
import Input from "../components/UI/input";
import Card from "../components/Layout/Card";
import backgroundImage from "../assets/imagenes/logo-completo.png";
import Registro from "./Registro";
import ContraNueva from "./ContraNueva";
import { toast } from "react-toastify";

const Login = ({ onClose }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showRegistro, setShowRegistro] = useState(false);
  const [showContraNueva, setShowContraNueva] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.dismiss();

    if (!username || !password) {
      toast.error("Por favor completa todos los campos.", { toastId: "login-vacio" });
      return;
    }
    
    let data = {};
    try {
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usuario: username,
          contraseña: password,
        }),
      });

      
      try {
        data = await response.json();
      } catch (e) {
        data.mensaje = "Respuesta no válida del servidor";
      }


      if (response.ok) {
        toast.success("Inicio de sesión exitoso", { toastId: "login-exito" });
      
        console.log("Respuesta del backend:", data); // 🔍 Ver qué llega
      
        if (data.token && data.usuario) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("nombre", data.usuario.nombre);
        } else {
          throw new Error("Respuesta del backend incompleta");
        }
      
        onClose();
      } else {
        toast.error(data.mensaje || "Error al iniciar sesión", { toastId: "login-error" });
      }
      
    } catch (error) {
      console.error("Error al conectar:", error);
      toast.error("Error al conectar con el servidor", { toastId: "conexion-falla" });
    }
  };

  if (showRegistro) {
    return <Registro onClose={() => setShowRegistro(false)} />;
  }

  if (showContraNueva) {
    return <ContraNueva onClose={() => setShowContraNueva(false)} />;
  }

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
          <img
            src={backgroundImage}
            alt="Imagen decorativa de fondo"
            className="w-3/4"
          />
        </div>

        <div className="relative z-10 p-8">
          <div className="flex justify-center mb-6">
            <h1 className="text-3xl font-bold text-500">LOGIN</h1>
          </div>

          <form onSubmit={handleSubmit}>
            <Input
              placeholder="Usuario o Teléfono..."
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

            <div className="flex justify-between mb-6 text-sm">
              <button
                type="button"
                className="text-blue-600 hover:underline"
                onClick={() => setShowRegistro(true)}
              >
                ¿No tienes una cuenta?
              </button>
              <button
                type="button"
                className="text-purple-600 hover:underline"
                onClick={() => setShowContraNueva(true)}
              >
                Olvidé mi contraseña
              </button>
            </div>

            <div className="flex justify-center">
              <Button type="submit">Entrar</Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="p-2 bg-blue-500 text-white rounded"
      >
        Abrir Login
      </button>

      {isModalOpen && <Login onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default Login;
