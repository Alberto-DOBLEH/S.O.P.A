// import React from "react";
// import Header from "../components/Heaader";
// import Footer from "../components/Footer";
// import { useNavigate } from "react-router-dom";
// import { FaClock } from "react-icons/fa"; // Ícono para "Coming Soon"
// import {
//   Cristina,
//   dobleh2023,
//   guillem,
//   Julia,
// } from "../assets/imagenes/imagenesslider";

// const Soporte = () => {
//   const navigate = useNavigate();

//   const autores = [
//     {
//       nombre: "Luis Alberto Hernandez Hernandez",
//       alias: "Dobhe H",
//       fotoPerfil: dobleh2023,
//       correo: "luis.alberto.hdez.hdez245@gmail.com",
//       github: "https://github.com/Alberto-DOBLEH",
//     },
//     {
//       nombre: "Guillermo Enrique Ayala Castro",
//       alias: "Guillem",
//       fotoPerfil: guillem,
//       correo: "guillermoayalawas@gmail.com",
//       github: "https://github.com/GuillermoEAC",
//     },
//     {
//       nombre: "Julio Cesar Lugo Franco",
//       alias: "Stepro",
//       fotoPerfil: Julia,
//       correo: "stepro61831@gmail.com",
//       github: "https://github.com/JulioCfy5",
//     },
//     {
//       nombre: "Cristhian Manuel Marquez Verdugo",
//       alias: "Furry facktos",
//       fotoPerfil: Cristina,
//       correo: "cristianverdugo965@gmail.com",
//       github: "https://github.com/cristhianM965",
//     },
//   ];

//   const navigateTo = {
//     home: () => navigate("/"),
//   };

//   const perfilAutor = {};

//   return (
//     <div className="bg-gray-50 min-h-screen flex flex-col">
//       <Header />

//       <Footer />
//     </div>
//   );
// };

// export default Soporte;
import React from "react";
import Header from "../components/Heaader";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { FaClock } from "react-icons/fa"; // Ícono para "Coming Soon"
import {
  Cristina,
  dobleh2023,
  guillem,
  Julia,
} from "../assets/imagenes/imagenesslider";

const Soporte = () => {
  const navigate = useNavigate();

  const autores = [
    {
      nombre: "Luis Alberto Hernandez Hernandez",
      alias: "Dobhe H",
      fotoPerfil: dobleh2023,
      correo: "luis.alberto.hdez.hdez245@gmail.com",
      github: "https://github.com/Alberto-DOBLEH",
    },
    {
      nombre: "Guillermo Enrique Ayala Castro",
      alias: "Guillem",
      fotoPerfil: guillem,
      correo: "guillermoayalawas@gmail.com",
      github: "https://github.com/GuillermoEAC",
    },
    {
      nombre: "Julio Cesar Lugo Franco",
      alias: "Stepro",
      fotoPerfil: Julia,
      correo: "stepro61831@gmail.com",
      github: "https://github.com/JulioCfy5",
    },
    {
      nombre: "Cristhian Manuel Marquez Verdugo",
      alias: "Furry facktos",
      fotoPerfil: Cristina,
      correo: "cristianverdugo965@gmail.com",
      github: "https://github.com/cristhianM965",
    },
  ];

  const navigateTo = {
    home: () => navigate("/"),
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8 flex-grow">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Soporte y Equipo, tilín
          </h1>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {autores.map((autor, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow duration-200 text-center"
            >
              <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                <img
                  src={autor.fotoPerfil}
                  alt={autor.alias}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">
                {autor.nombre}
              </h3>
              <p className="text-sm text-gray-600 mb-2">Alias: {autor.alias}</p>
              <p className="text-sm text-gray-500 mb-2">
                Correo:{" "}
                <a
                  href={`mailto:${autor.correo}`}
                  className="text-blue-600 hover:underline"
                >
                  {autor.correo}
                </a>
              </p>
              <p className="text-sm text-gray-500 mb-4">
                GitHub:{" "}
                <a
                  href={autor.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Perfil
                </a>
              </p>
            </div>
          ))}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Soporte;
