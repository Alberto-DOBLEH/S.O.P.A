import React, { useState } from "react";
import Header from "../components/Layout/Header";
import Button from "../components/UI/Button";
import Input from "../components/UI/input";
import Card from "../components/Layout/Card";
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

    toast.success("Artículo publicado con éxito");
    console.log({ titulo, precio, estado, descripcion, tipo, envio, categoria });
  };

  return (
    <>
      <Header onLoginClick={() => toast.info("Inicia sesión")} />

      <div className="flex flex-col items-center bg-[#f0f8ff] min-h-screen px-4 py-8">
        <Card className="w-full max-w-7xl shadow-lg bg-white p-6">
          <h2 className="text-2xl font-bold text-center mb-6">Publicar artículo</h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Sección izquierda */}
            <div className="space-y-4">
              <label className="block">
                <span className="font-semibold">Añadir fotos</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImagenChange}
                  className="w-full mt-1 p-2 border rounded-md"
                />
              </label>

              <Input placeholder="Título" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
              <Input placeholder="Precio" type="number" value={precio} onChange={(e) => setPrecio(e.target.value)} />

              <select
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                className="w-full border p-3 rounded-md"
              >
                <option value="">Categoría</option>
                <option value="electronica">Electrónica</option>
                <option value="hogar">Hogar</option>
                <option value="ropa">Ropa</option>
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
                <option value="no">Sin envío</option>
              </select>
            </div>

            {/* Sección central - Vista previa */}
            <div className="col-span-1 lg:col-span-1 bg-yellow-100 border border-black flex items-center justify-center min-h-[400px]">
              {preview ? (
                <img src={preview} alt="Vista previa" className="object-contain h-full max-h-[400px]" />
              ) : (
                <p className="text-center text-lg font-medium text-gray-600">Vista previa de las imágenes</p>
              )}
            </div>

            {/* Sección derecha - Descripción */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Detalles del artículo</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700">Descripción</label>
                <textarea
                  placeholder="Describe el artículo..."
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  className="w-full p-3 border rounded-md resize-none h-32"
                ></textarea>
              </div>

              <div className="pt-4">
                <Button type="submit" className="w-full">
                  Publicar
                </Button>
              </div>
            </div>
          </form>
        </Card>
      </div>
    </>
  );
};

export default VentaArticulo;
