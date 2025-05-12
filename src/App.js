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

// Comenta temporalmente estas importaciones si no existen aún
// import Notificaciones from "./pages/Notificaciones";
// import HistorialCompras from "./pages/HistorialCompras";
// import PedidosActivos from "./pages/PedidosActivos";
// import Cupones from "./pages/Cupones";
// import Privacidad from "./pages/Privacidad";
// import Soporte from "./pages/Soporte";
// import BuscarResultados from "./pages/BuscarResultados";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<Login onClose={() => {}} />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/contra-nueva" element={<ContraNueva />} />
          <Route path="/productos" element={<ListaProductos />} />
          <Route path="/ayuda" element={<Ayuda />} />

          <Route
            path="/perfil"
            element={
              <RutaPrivada>
                <Perfil />
              </RutaPrivada>
            }
          />

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
              <RutaPrivada>
                <CarritoCompras />
              </RutaPrivada>
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
            path="/configuracion"
            element={
              <RutaPrivada>
                <Configuracion />
              </RutaPrivada>
            }
          />

          <Route
            path="/venta"
            element={
              <RutaPrivada>
                <Venta />
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
            path="/venta-articulo"
            element={
              <RutaPrivada>
                <VentaArticulo />
              </RutaPrivada>
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

          {/* Comenta temporalmente estas rutas si los componentes no existen */}
          {/* <Route path="/notificaciones" element={<Notificaciones />} />
        <Route path="/historial-compras" element={<HistorialCompras />} />
        <Route path="/pedidos-activos" element={<PedidosActivos />} />
        <Route path="/cupones" element={<Cupones />} />
        <Route path="/privacidad" element={<Privacidad />} />
        <Route path="/soporte" element={<Soporte />} />
        <Route path="/buscar" element={<BuscarResultados />} /> */}

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
    </AuthProvider>
  );
}

export default App;
