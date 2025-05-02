// import React from "react";
// import Login from "./pages/Login";
// import "./index.css";

// function App() {
//   return (
//     <div className="App">
//       <Login />
//     </div>
//   );
// }

// export default App;

// import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import MainPage from "./pages/MainPage";
// import Login from "./pages/Login";
// import CarritoCompras from "./pages/CarritoCompras";
// import "./index.css";

// function App() {
//   const [isLoginOpen, setIsLoginOpen] = useState(false);

//   const openLogin = () => setIsLoginOpen(true);
//   const closeLogin = () => setIsLoginOpen(false);

//   return (
//     <Router>
//       <div className="App">
//         <Routes>
//           <Route path="/" element={<MainPage onLoginClick={openLogin} />} />
//           <Route path="/carrito" element={<CarritoCompras />} />
//         </Routes>
//         {isLoginOpen && <Login onClose={closeLogin} />}
//       </div>
//     </Router>
//   );
// }

// export default App;
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
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



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
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login onClose={() => {}} />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/contra-nueva" element={<ContraNueva />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/tarjeta" element={<Tarjeta />} />
        <Route path="/carrito" element={<CarritoCompras />} />
        <Route path="/lista-deseos" element={<ListaDeseos />} />
        <Route path="/lista-compras" element={<ListaCompras />} />
        <Route path="/ayuda" element={<Ayuda />} />
        <Route path="/configuracion" element={<Configuracion />} />
        <Route path="/Venta" element={<Venta />} />
        <Route path="/VentaCarro" element={<VentaCarro />} />
        <Route path="/VentaArticulo" element={<VentaArticulo />} />
        <Route path="/productos" element={<ListaProductos />} />

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
  );
}

export default App;
