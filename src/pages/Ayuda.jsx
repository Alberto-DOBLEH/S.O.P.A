import React from "react";
import Header from "../components/Heaader";
import Footer from "../components/Footer";
import {
  backgroundImage,
  LoginVideo,
  VentaVideo,
  CompraVideo,
} from "../assets/imagenes/imagenes";

const Ayuda = () => {
  const videitos = [
    {
      titulo: "Video de como crear una cuenta",
      url: "https://www.youtube.com/watch?v=q-0KMO57wJc",
      thumbnail: LoginVideo,
    },
    {
      titulo: "Video de como comprar un producto",
      url: "https://youtu.be/xv2ynDSgzP0",
      thumbnail: CompraVideo,
    },
    {
      titulo: "Video de como poner un producto a la venta",
      url: "https://youtu.be/n6cVMzGs-Ho",
      thumbnail: VentaVideo,
    },
  ];

  return (
    <div className="min-h-screen bg-[#f4f6fc] relative text-[#484d45] max-w-screen overflow-x-hidden">
      <div className="absolute inset-0 flex justify-center opacity-10 pointer-events-none">
        <img
          src={backgroundImage}
          alt="Flor decorativa"
          className="absolute left-0 w-1/3 md:w-1/4"
        />
      </div>
      <Header />
      <main className="container mx-auto px-4 py-8 relative z-10">
        <h1 className="text-3xl text-center mb-8">
          ¿Necesitas Ayuda?... tal vez estos videos ayuden
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {videitos.map((video, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <a href={video.url} target="_blank" rel="noopener noreferrer">
                <div className="relative">
                  <img
                    src={video.thumbnail}
                    alt={video.titulo}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-10 transition-all">
                    <div className="bg-white bg-opacity-80 rounded-full p-3">
                      <svg
                        className="w-8 h-8 text-red-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-lg">{video.titulo}</h3>
                </div>
              </a>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Ayuda;
