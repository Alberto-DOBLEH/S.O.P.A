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

import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Login from "./pages/Login";
import CarritoCompras from "./pages/CarritoCompras";
import "./index.css";

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const openLogin = () => setIsLoginOpen(true);
  const closeLogin = () => setIsLoginOpen(false);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainPage onLoginClick={openLogin} />} />
          <Route path="/carrito" element={<CarritoCompras />} />
          {/* Puedes agregar más rutas aquí según sea necesario */}
        </Routes>
        {isLoginOpen && <Login onClose={closeLogin} />}
      </div>
    </Router>
  );
}

export default App;
