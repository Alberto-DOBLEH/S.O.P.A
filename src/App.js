/*import React from "react";
import Login from "./pages/Login";
import "./index.css";

function App() {
  return (
    <div className="App">
      <Login />
    </div>
  );
}

export default App;
*/

import React, { useState } from "react";
import MainPage from "./pages/MainPage";
import Login from "./pages/Login";
import "./index.css";

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const openLogin = () => setIsLoginOpen(true);
  const closeLogin = () => setIsLoginOpen(false);

  return (
    <div className="App">
      <MainPage onLoginClick={openLogin} />
      {isLoginOpen && <Login onClose={closeLogin} />}
    </div>
  );
}

export default App;
