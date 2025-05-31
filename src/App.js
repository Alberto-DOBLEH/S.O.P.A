import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Perfil from "./pages/Perfil";
import CarritoCompras from "./pages/CarritoCompras";
import ListaDeseos from "./pages/ListaDeseos";
import ListaCompras from "./pages/ListaCompras";
import ListaProductos from "./pages/ListaProductos";
import Ayuda from "./pages/Ayuda";
import Configuracion from "./pages/Configuracion";
import ContraNueva from "./pages/ContraNueva";
import Tarjeta from "./pages/Tarjeta";
import Venta from "./pages/Venta";
import VentaArticulo from "./pages/VentaArticulo";
import VentaCarro from "./pages/VentaCarro";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthContext";
import RutaPrivada from "./components/RutaPrivada";
import ZonaPrivada from "./pages/ZonaPrivada";
import VerArticulo from "./pages/VerArticulo";
// Comenta temporalmente estas importaciones si no existen aún
// import Notificaciones from "./pages/Notificaciones";
// import HistorialCompras from "./pages/HistorialCompras";
// import PedidosActivos from "./pages/PedidosActivos";
// import Cupones from "./pages/Cupones";
// import Privacidad from "./pages/Privacidad";
// import Soporte from "./pages/Soporte";
// import BuscarResultados from "./pages/BuscarResultados";
import ScrollToTop from "./components/ScrollToTop";
import BusquedaProducto from "./pages/BusquedaProductos";
import ComprarYa from "./pages/ComprarYa";
import { CurrencyProvider } from "./CurrencyContext";
const MODO_DESARROLLO = true; // Cambia a false para volver a proteger

function App() {
  return (
    <AuthProvider>
      <CurrencyProvider>
        {" "}
        {/* Envuelve todo en CurrencyProvider */}
        <Router>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/contra-nueva" element={<ContraNueva />} />
            <Route path="/productos" element={<ListaProductos />} />
            <Route path="/ayuda" element={<Ayuda />} />
            <Route path="/VerArticulo/:id" element={<VerArticulo />} />
            <Route path="/buscar" element={<BusquedaProducto />} />
            <Route path="/ComprarYa/:id" element={<ComprarYa />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/configuracion" element={<Configuracion />} />
            <Route
              path="/tarjeta"
              element={
                <RutaPrivada>
                  <Tarjeta />
                </RutaPrivada>
              }
            />
            <Route
              path="/carrito"
              element={
                MODO_DESARROLLO ? (
                  <CarritoCompras />
                ) : (
                  <RutaPrivada>
                    <CarritoCompras />
                  </RutaPrivada>
                )
              }
            />
            <Route
              path="/lista-deseos"
              element={
                <RutaPrivada>
                  <ListaDeseos />
                </RutaPrivada>
              }
            />
            <Route
              path="/lista-compras"
              element={
                <RutaPrivada>
                  <ListaCompras />
                </RutaPrivada>
              }
            />
            <Route
              path="/venta-carro"
              element={
                <RutaPrivada>
                  <VentaCarro />
                </RutaPrivada>
              }
            />
            <Route
              path="/venta"
              element={
                MODO_DESARROLLO ? (
                  <VentaArticulo />
                ) : (
                  <RutaPrivada>
                    <VentaArticulo />
                  </RutaPrivada>
                )
              }
            />
            <Route
              path="/zona"
              element={
                <RutaPrivada>
                  <ZonaPrivada />
                </RutaPrivada>
              }
            />
            <Route path="*" element={<div>Página no encontrada</div>} />
          </Routes>
          <ToastContainer
            position="bottom-center"
            autoClose={750}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            pauseOnHover
            draggable
            theme="colored"
          />
        </Router>
      </CurrencyProvider>
    </AuthProvider>
  );
}

export default App;
