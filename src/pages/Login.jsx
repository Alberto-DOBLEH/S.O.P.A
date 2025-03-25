// // Importacion de modulos y dependencias
// import React, { useState } from "react";
// import Button from "../components/UI/Button";
// import Input from "../components/UI/input";
// import Card from "../components/Layout/Card";
// import backgroundImage from "../assets/imagenes/logo-completo.png";

// const Login = () => {
//   // Estado para manejar el nombre de usuario y la contraseña
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   // Función que se ejecuta al enviar el formulario
//   const handleSubmit = (e) => {
//     // e.preventDefault(): Evita que el formulario se envíe de la manera tradicional (recargando la página).
//     e.preventDefault();
//     console.log("Intento de login con:", { username, password });
//   };

//   return (
//     // Contenedor principal que centra el contenido en la pantalla
//     //flex: Hace que el contenedor sea un contenedor flexible, lo que permite el uso de propiedades de flexbox.
//     // items-center: Centra los elementos hijos verticalmente dentro del contenedor.
//     // justify-center: Centra los elementos hijos horizontalmente dentro del contenedor.
//     // min-h-screen: Establece la altura mínima del contenedor al 100% del viewport height (altura de la pantalla).
//     // bg-gray-100: Establece el color de fondo del contenedor a un gris claro.
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       {/* Componente Card que contiene el formulario de login  */}
//       {/* w-full: Establece el ancho del componente al 100% del contenedor padre.    */}
//       {/* max-w-md, sm:max-w-lg, md:max-w-xl, lg:max-w-2xl: Define el ancho máximo del
//         componente en diferentes breakpoints (puntos de ruptura) para hacerlo responsive. */}
//       <Card className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl bg-red-100">
//         {/* Imagen de fondo decorativa */}
//         {/* absolute: Posiciona el elemento de manera absoluta dentro del contenedor relativo más cercano.
//         inset-0: Establece la posición del elemento en los cuatro lados (arriba, derecha, abajo, izquierda) a 0, cubriendo todo el contenedor.
//         flex, items-center, justify-center: Centra la imagen tanto vertical como horizontalmente.
//         opacity-15: Establece la opacidad de la imagen al 15%. */}
//         <div className="absolute inset-0 flex items-center justify-center opacity-15">
//           <img
//             src={backgroundImage} // Usa la imagen importada -->
//             alt="Imagen decorativa de fondo"
//             className="w-3/4"
//           />
//         </div>
//         {/* relative z-10 es para que el contenido este por encima de otros elementos */}
//         <div className="relative z-10">
//           {/* Título del Formulario */}
//           {/* <div className="flex justify-center mb-6"></div> */}
//           <div className="flex justify-center mb-6">
//             <h1 className="text-3xl font-bold text-500">LOGIN</h1>
//           </div>

//           <form onSubmit={handleSubmit}>
//             <Input
//               placeholder="Usuario..."
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               className="w-full p-4 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 opacity-75"
//               //w-full: Establece el ancho del input al 100% del contenedor padre.
//               // p-4: Añade un padding de 1rem (16px) en todos los lados del input.
//               // text-lg: Establece el tamaño del texto a grande.
//               // border border-gray-300: Añade un borde con un color gris claro.
//               // rounded-md: Redondea las esquinas del input.
//               // focus:outline-none: Elimina el contorno predeterminado que aparece al enfocar el input.
//               // focus:ring-2 focus:ring-blue-500: Añade un anillo de enfoque azul alrededor del input cuando está enfocado.
//               // opacity-75: Establece la opacidad del input al 75%.
//             />

//             <Input
//               placeholder="******"
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full p-4 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 opacity-75"
//             />

//             {/* Enlaces adicioanles */}
//             <div className="flex justify-between mb-6 text-sm">
//               <a href="/" className="text-blue-600 hover:underline">
//                 ¿No tienes una cuenta?
//               </a>
//               {/* text-blue-600: Establece el color del texto a azul.
//             hover:underline: Añade un subrayado al texto cuando el usuario pasa el ratón por encima. */}
//               <a href="/" className="text-purple-600 hover:underline">
//                 Olvide mi contraseña
//               </a>
//             </div>
//             <div className="flex justify-center">
//               <Button type="submit">Entrar</Button>
//             </div>
//           </form>
//         </div>
//       </Card>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import Button from "../components/UI/Button";
import Input from "../components/UI/input";
import Card from "../components/Layout/Card";
import backgroundImage from "../assets/imagenes/logo-completo.png";

const Login = ({ onClose }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Intento de login con:", { username, password });
    // Aquí agregarías la lógica de autenticación
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <Card
        className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl bg-[#f8f6eb]
 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
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
              placeholder="Usuario..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-4 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 opacity-75"
            />

            <Input
              placeholder="******"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 opacity-75"
            />

            <div className="flex justify-between mb-6 text-sm">
              <a href="/" className="text-blue-600 hover:underline">
                ¿No tienes una cuenta?
              </a>
              <a href="/" className="text-purple-600 hover:underline">
                Olvide mi contraseña
              </a>
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

export default Login;
