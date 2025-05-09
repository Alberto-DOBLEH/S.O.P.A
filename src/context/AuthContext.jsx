import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("usuario");

    if (storedUser && storedUser !== "null" && storedUser !== "undefined") {
      try {
        setUsuario(JSON.parse(storedUser));
      } catch {
        setUsuario(null);
      }
    } else {
      setUsuario(null);
    }

    setCargando(false);
  }, []);

  const login = (user) => {
    setUsuario(user);
    localStorage.setItem("usuario", JSON.stringify(user));
    if (user.token) {
      localStorage.setItem("token", user.token);
    }
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem("usuario");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout, cargando }}>
      {!cargando && children}
    </AuthContext.Provider>
  );
};
