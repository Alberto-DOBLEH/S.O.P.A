import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const RutaPrivada = ({ children }) => {
  const { usuario, cargando } = useContext(AuthContext);

  if (cargando) return null;

  return usuario ? children : <Navigate to="/login" replace />;
};

export default RutaPrivada;
