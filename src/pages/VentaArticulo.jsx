import React, { useState } from "react";
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

    console.log({ titulo, precio, estado, descripcion, tipo, envio, categoria });
    toast.success("Artículo publicado con éxito");
  };

  return (
    <div className="flex justify-center items-start py-10 px-4 bg-[#f0f8ff] min-h-screen">
      <Card className="w-full max-w-3xl bg-white shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Publicar artículo</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col items-center">
            <input type="file" accept="image/*" onChange={handleImagenChange} className="mb-2" />
            {preview && <img src={preview} alt="Vista previa" className="w-40 h-40 object-cover rounded" />}
          </div>

          <Input placeholder="Título del artículo" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
          <Input placeholder="Precio" value={precio} type="number" onChange={(e) => setPrecio(e.target.value)} />

          <select
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="nuevo">Nuevo</option>
            <option value="usado">Usado</option>
          </select>

          <textarea
            placeholder="Descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="w-full p-3 border rounded-md resize-none h-24 focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>

          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="unico">Artículo único</option>
            <option value="multiple">Artículo múltiple</option>
          </select>

          <select
            value={envio}
            onChange={(e) => setEnvio(e.target.value)}
            className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="si">Incluye envío</option>
            <option value="no">Sin envío</option>
          </select>

          <Input placeholder="Categoría" value={categoria} onChange={(e) => setCategoria(e.target.value)} />

          <div className="flex justify-center">
            <Button type="submit">Publicar</Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default VentaArticulo;
