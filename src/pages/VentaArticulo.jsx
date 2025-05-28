import React, { useState } from "react";
import Header from "../components/Layout/Header";
import Button from "../components/UI/Button";
import Input from "../components/UI/input";
import { toast } from "react-toastify";

const VentaArticulo = () => {
  const [imagen, setImagen] = useState(null);
  const [preview, setPreview] = useState(null);
  const [titulo, setTitulo] = useState("");
  const [precio, setPrecio] = useState("");
  const [estado, setEstado] = useState("nuevo");
  const [descripcion, setDescripcion] = useState("");
  const [tipo, setTipo] = useState("unico");
  const [envio, setEnvio] = useState("si");
  const [categoria, setCategoria] = useState("");

  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    setImagen(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!titulo || !precio || !descripcion || !categoria) {
      toast.error("Por favor completa todos los campos obligatorios");
      return;
    }

    // Aquí podrías enviar los datos a tu backend si ya tienes configurado
    console.log({ titulo, precio, estado, descripcion, tipo, envio, categoria });
    toast.success("Artículo publicado con éxito");
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center bg-[#eaf6ff] min-h-screen py-10 px-6">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-7xl p-6">
          <h2 className="text-2xl font-bold text-center mb-6">Publicar artículo</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Columna izquierda */}
            <div className="space-y-3">
              <label className="block font-semibold">Añadir fotos</label>
              <input type="file" accept="image/*" onChange={handleImagenChange} />

              <Input placeholder="Título" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
              <Input placeholder="Precio" value={precio} type="number" onChange={(e) => setPrecio(e.target.value)} />

              <select
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                className="w-full border p-3 rounded-md"
              >
                <option value="">Categoría</option>
                <option value="smartphones">Smartphones</option>
                <option value="laptops">Laptops</option>
                <option value="ropa">Ropa</option>
                <option value="hogar">Hogar</option>
              </select>

              <select
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
                className="w-full border p-3 rounded-md"
              >
                <option value="nuevo">Estado: Nuevo</option>
                <option value="usado">Estado: Usado</option>
              </select>

              <select
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                className="w-full border p-3 rounded-md"
              >
                <option value="unico">Artículo único</option>
                <option value="multiple">Artículo múltiple</option>
              </select>

              <select
                value={envio}
                onChange={(e) => setEnvio(e.target.value)}
                className="w-full border p-3 rounded-md"
              >
                <option value="si">Incluye envío</option>
                <option value="no">No incluye envío</option>
              </select>
            </div>

            {/* Columna central (Vista previa) */}
            <div className="flex justify-center items-center bg-yellow-100 border rounded-md h-[400px]">
              {preview ? (
                <img src={preview} alt="Vista previa" className="max-h-full max-w-full object-contain" />
              ) : (
                <p className="text-center text-gray-500">Vista previa de las imágenes</p>
              )}
            </div>

            {/* Columna derecha (resumen y publicar) */}
            <div className="flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">Detalles del artículo</h3>
                <label className="block text-sm font-medium mb-1">Descripción</label>
                <textarea
                  placeholder="Describe el artículo..."
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  className="w-full p-3 border rounded-md resize-none h-28"
                ></textarea>
              </div>

              <div className="mt-6 text-center">
                <Button type="submit">Publicar</Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default VentaArticulo;
