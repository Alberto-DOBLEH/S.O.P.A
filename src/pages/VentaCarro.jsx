import React, { useState } from "react";
import Header from "../components/Layout/Header";
import Button from "../components/UI/Button";
import Input from "../components/UI/input";
import { toast } from "react-toastify";
import Footer from "../components/Footer";
import { backgroundImage } from "../assets/imagenes/imagenes";
const VentaCarro = () => {
  const [imagen, setImagen] = useState(null);
  const [preview, setPreview] = useState(null);

  const [tipoVehiculo, setTipoVehiculo] = useState("");
  const [anio, setAnio] = useState("");
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [kilometraje, setKilometraje] = useState("");
  const [categoria, setCategoria] = useState("");
  const [colorInterior, setColorInterior] = useState("");
  const [colorExterior, setColorExterior] = useState("");
  const [estado, setEstado] = useState("nuevo");
  const [combustible, setCombustible] = useState("");
  const [transmision, setTransmision] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    setImagen(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!tipoVehiculo || !marca || !modelo || !descripcion) {
      toast.error("Por favor completa los campos obligatorios");
      return;
    }

    console.log({
      tipoVehiculo,
      anio,
      marca,
      modelo,
      kilometraje,
      categoria,
      colorInterior,
      colorExterior,
      estado,
      combustible,
      transmision,
      descripcion,
    });

    toast.success("Vehículo publicado con éxito");
  };

  return (
    <>
      <div className="absolute inset-0 flex justify-center opacity-10 pointer-events-none">
        <img
          src={backgroundImage}
          alt="Flor decorativa de fondo"
          className="absolute left-0 w-1/3 md:w-1/4"
          loading="lazy"
        />
      </div>

      <Header />
      <div className="flex flex-col items-center bg-[#eaf6ff] min-h-screen py-10 px-6">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-7xl p-6">
          <h2 className="text-2xl font-bold text-center mb-6">
            Publicar vehículo
          </h2>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* Columna izquierda */}
            <div className="space-y-3">
              <select
                value={tipoVehiculo}
                onChange={(e) => setTipoVehiculo(e.target.value)}
                className="w-full border p-3 rounded-md"
              >
                <option value="">Tipo Vehículo</option>
                <option value="auto">Auto</option>
                <option value="moto">Moto</option>
                <option value="camioneta">Camioneta</option>
              </select>

              <input
                type="file"
                accept="image/*"
                onChange={handleImagenChange}
              />

              <select
                value={anio}
                onChange={(e) => setAnio(e.target.value)}
                className="w-full border p-3 rounded-md"
              >
                <option value="">Año</option>
                {[...Array(30)].map((_, i) => {
                  const year = 2025 - i;
                  return (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  );
                })}
              </select>

              <Input
                placeholder="Marca"
                value={marca}
                onChange={(e) => setMarca(e.target.value)}
              />
              <Input
                placeholder="Modelo"
                value={modelo}
                onChange={(e) => setModelo(e.target.value)}
              />
              <Input
                placeholder="Kilometraje"
                value={kilometraje}
                onChange={(e) => setKilometraje(e.target.value)}
              />
              <Input
                placeholder="Categoría de vehículo"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
              />
              <Input
                placeholder="Color interior"
                value={colorInterior}
                onChange={(e) => setColorInterior(e.target.value)}
              />
              <Input
                placeholder="Color exterior"
                value={colorExterior}
                onChange={(e) => setColorExterior(e.target.value)}
              />

              <select
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
                className="w-full border p-3 rounded-md"
              >
                <option value="nuevo">Estado: Nuevo</option>
                <option value="usado">Estado: Usado</option>
              </select>

              <Input
                placeholder="Combustible"
                value={combustible}
                onChange={(e) => setCombustible(e.target.value)}
              />
              <Input
                placeholder="Transmisión"
                value={transmision}
                onChange={(e) => setTransmision(e.target.value)}
              />
            </div>

            {/* Columna central */}
            <div className="flex justify-center items-center bg-yellow-100 border rounded-md h-[500px]">
              {preview ? (
                <img
                  src={preview}
                  alt="Vista previa"
                  className="max-h-full max-w-full object-contain"
                />
              ) : (
                <p className="text-center text-gray-500">
                  Vista previa de las imágenes
                </p>
              )}
            </div>

            {/* Columna derecha */}
            <div className="flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Detalles del vehículo
                </h3>
                <label className="block text-sm font-medium mb-1">
                  Descripción
                </label>
                <textarea
                  placeholder="Describe el vehículo..."
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  className="w-full p-3 border rounded-md resize-none h-40"
                ></textarea>
              </div>

              <div className="mt-6 text-center">
                <Button type="submit">Publicar</Button>
              </div>
            </div>
          </form>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default VentaCarro;
