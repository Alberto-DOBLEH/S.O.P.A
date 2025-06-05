import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  MapPin,
  Edit3,
  Package,
  ChevronRight,
  Check,
  X,
} from "lucide-react";
import Header from "../components/Heaader";
import Footer from "../components/Footer";
import { backgroundImage } from "../assets/imagenes/imagenes";

const Perfil = () => {
  // Estados para la información del usuario
  const [userInfo, setUserInfo] = useState({
    nombre: "Juan Pérez",
    correo: "juan.perez@example.com",
    fotoPerfil:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    direccionPrincipal: {
      calle: "Calle Constitución 123",
      ciudad: "Culiacán",
      estado: "Sinaloa",
      codigoPostal: "81893",
      pais: "México",
    },
  });

  // Estado para el formulario de edición, incluyendo la imagen seleccionada
  const [editUserInfo, setEditUserInfo] = useState({
    ...userInfo,
    fotoPerfilFile: null,
  });
  const [showEditModal, setShowEditModal] = useState(false);
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);
  const [mostrarDetalle, setMostrarDetalle] = useState(false);


  // Estado para el historial de pedidos
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simular carga de datos
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const user = localStorage.getItem("usuario");
        const correo = localStorage.getItem("correo");
        setUserInfo({
          nombre: user,
          correo: correo,
          fotoPerfil:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
          direccionPrincipal: {
            calle: "Calle Constitución 123",
            ciudad: "Culiacán",
            estado: "Sinaloa",
            codigoPostal: "81893",
            pais: "México",
          },
        });
      } catch (error) {
        console.error("Error al cargar datos del perfil:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const cargarPedidos = async () => {
      try {
        const idusuario = localStorage.getItem("idusuario");
        const response = await fetch(
          `http://localhost:3001/api/ventas/usuario/${idusuario}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Error al cargar los pedidos");
        }

        const data = await response.json();
        console.log("Pedidos cargados:", data.length);
        console.log("Pedidos cargados:", data);

        const datosprocesados = data.map((item) => ({
          ...item,
          total: parseFloat(item.total), // convierte el string a número decimal
        }));

        setPedidos(datosprocesados);
      } catch (error) {
        console.error("Error al cargar los pedidos:", error);
      }
    };
    cargarPedidos();
  }, []);

  // Abrir el modal de edición
  const abrirModalEdicion = () => {
    setEditUserInfo({ ...userInfo, fotoPerfilFile: null }); // Reinicia el archivo al abrir
    setShowEditModal(true);
  };

  // Cerrar el modal de edición
  const cerrarModalEdicion = () => {
    setShowEditModal(false);
  };

  const getEstadoColor = (estado) => {
    switch (estado) {
      case "Pendiente":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Aprobado":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Camino":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "Entregado":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const verDetalle = (pedido) => {
    setPedidoSeleccionado(pedido);
    setMostrarDetalle(true);
  };

  const cerrarDetalle = () => {
    setMostrarDetalle(false);
    setPedidoSeleccionado(null);
  };

  // Manejar cambios en el formulario, incluyendo la imagen
  const manejarCambio = (e) => {
    const { name, value, files } = e.target;
    if (name === "fotoPerfilFile" && files && files[0]) {
      const file = files[0];
      const imageUrl = URL.createObjectURL(file); // Crea una URL temporal para previsualización
      setEditUserInfo({
        ...editUserInfo,
        fotoPerfil: imageUrl,
        fotoPerfilFile: file, // Guarda el archivo para posible subida
      });
    } else if (name.startsWith("direccionPrincipal.")) {
      const field = name.split(".")[1];
      setEditUserInfo({
        ...editUserInfo,
        direccionPrincipal: {
          ...editUserInfo.direccionPrincipal,
          [field]: value,
        },
      });
    } else {
      setEditUserInfo({
        ...editUserInfo,
        [name]: value,
      });
    }
  };

  // Guardar cambios
  const guardarCambios = async () => {
    if (!editUserInfo.nombre.trim()) {
      alert("El nombre no puede estar vacío.");
      return;
    }
    if (
      !editUserInfo.correo.includes("@") ||
      !editUserInfo.correo.includes(".")
    ) {
      alert("Por favor, ingresa un correo válido.");
      return;
    }
    if (
      !editUserInfo.direccionPrincipal.calle.trim() ||
      !editUserInfo.direccionPrincipal.ciudad.trim() ||
      !editUserInfo.direccionPrincipal.estado.trim() ||
      !editUserInfo.direccionPrincipal.codigoPostal.trim() ||
      !editUserInfo.direccionPrincipal.pais.trim()
    ) {
      alert("Todos los campos de la dirección son obligatorios.");
      return;
    }

    try {
      // Simulación: Si hay un archivo, usamos la URL temporal; de lo contrario, conservamos la URL original
      const updatedUserInfo = {
        ...editUserInfo,
        fotoPerfil: editUserInfo.fotoPerfilFile
          ? URL.createObjectURL(editUserInfo.fotoPerfilFile)
          : editUserInfo.fotoPerfil,
      };
      setUserInfo(updatedUserInfo);
      alert("Perfil actualizado con éxito!");
      cerrarModalEdicion();
    } catch (error) {
      console.error("Error al guardar los cambios:", error);
      alert("Ocurrió un error al guardar los cambios.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <div className="absolute inset-0 flex justify-center opacity-10 pointer-events-none">
        <img
          src={backgroundImage}
          alt="Flor decorativa de fondo"
          className="absolute left-0 w-1/3 md:w-1/4"
          loading="lazy"
        />
      </div>

      <Header />

      <main className="container mx-auto py-8 px-4">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200"></div>
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent absolute top-0"></div>
            </div>
          </div>
        ) : (
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Mi Perfil</h1>
              <button
                onClick={abrirModalEdicion}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2 rounded-lg font-medium flex items-center transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <Edit3 size={18} className="mr-2" />
                Editar Perfil
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="relative w-32 h-32 flex-shrink-0">
                  <img
                    src={userInfo.fotoPerfil}
                    alt="Foto de perfil"
                    className="w-full h-full object-cover rounded-full border-4 border-blue-200"
                  />
                </div>

                <div className="flex-grow space-y-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                      <User size={24} className="mr-2 text-blue-600" />
                      {userInfo.nombre}
                    </h2>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Mail size={20} className="mr-2 text-blue-600" />
                    {userInfo.correo === "" ? (
                      <p>{userInfo.correo}</p>
                    ) : (
                      <p>Ingrese un correo</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Package size={24} className="mr-2 text-blue-600" />
                Historial de Pedidos
              </h2>

              {pedidos.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-gray-600">No tienes pedidos recientes.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pedidos.map((pedido) => (
                    <div
                      key={pedido.id_venta}
                      className="border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all duration-300 hover:border-blue-200"
                    >
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                        <div className="mb-4 md:mb-0">
                          <p className="font-medium text-gray-900">
                            Pedido #{pedido.id_venta} - {pedido.fecha}
                          </p>
                          <p className="text-gray-600">
                            {pedido.productos
                              .map(
                                (prod) => `${prod.nombre} (${prod.cantidad})`
                              )
                              .join(", ")}
                          </p>
                          <div className="flex items-center mt-2">
                            {pedido.estado === "A" && ( 
                              <span
                                className={`px-4 py-2 rounded-full font-medium border ${getEstadoColor("Aprobado")}`}
                              >
                                Aprobado
                              </span>
                              )}
                              {pedido.estado === "P" && ( 
                              <span
                                className={`px-4 py-2 rounded-full font-medium border ${getEstadoColor("Pendiente")}`}
                              >
                                Pendiente
                              </span>
                              )}
                              {pedido.estado === "C" && ( 
                              <span
                                className={`px-4 py-2 rounded-full font-medium border ${getEstadoColor("Camino")}`}
                              >
                                En Camino
                              </span>
                              )}
                              {pedido.estado === "E" && ( 
                              <span
                                className={`px-4 py-2 rounded-full font-medium border ${getEstadoColor("Entregado")}`}
                              >
                                Entregado
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <p className="font-bold text-gray-900">
                            ${pedido.total.toFixed(2)}
                          </p>
                          <button 
                          onClick={() => verDetalle(pedido)}
                          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105"
                          >
                            Ver Detalles
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {showEditModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900 flex items-center">
                    <Edit3 className="mr-2 text-blue-600" size={20} />
                    Editar Perfil
                  </h2>
                  <button
                    onClick={cerrarModalEdicion}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-800">
                    Información Personal
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nombre
                      </label>
                      <input
                        type="text"
                        name="nombre"
                        value={editUserInfo.nombre}
                        onChange={manejarCambio}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                        placeholder="Tu nombre"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Correo Electrónico
                      </label>
                      <input
                        type="email"
                        name="correo"
                        value={editUserInfo.correo}
                        onChange={manejarCambio}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                        placeholder="tu.correo@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nueva Foto de Perfil
                      </label>
                      <input
                        type="file"
                        name="fotoPerfilFile"
                        accept="image/*"
                        onChange={manejarCambio}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                      />
                      {editUserInfo.fotoPerfil && (
                        <img
                          src={editUserInfo.fotoPerfil}
                          alt="Previsualización de perfil"
                          className="mt-2 w-32 h-32 object-cover rounded-full border-4 border-blue-200"
                        />
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={guardarCambios}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center transition-all duration-300"
                  >
                    <Check size={18} className="mr-2" />
                    Guardar Cambios
                  </button>
                  <button
                    onClick={cerrarModalEdicion}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-medium flex items-center justify-center transition-all duration-300"
                  >
                    <X size={18} className="mr-2" />
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Modal de detalle */}
          {mostrarDetalle && pedidoSeleccionado && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-gray-800">
                      Detalle del Pedido
                    </h3>
                    <button
                      onClick={cerrarDetalle}
                      className="text-gray-500 hover:text-gray-700 text-2xl"
                    >
                      ×
                    </button>
                  </div>
                </div>
    
                <div className="p-6 space-y-6">
                  {/* Info básica */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Número de Pedido
                      </label>
                      <p className="text-lg font-bold text-gray-800">
                        {pedidoSeleccionado.id_venta}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Fecha
                      </label>
                      <p className="text-lg text-gray-800">
                        {pedidoSeleccionado.fecha}
                      </p>
                    </div>
                  </div>
    
                  {/* Cliente */}
                  {pedidoSeleccionado.cliente && (
                    <div className="border-t pt-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <User className="w-5 h-5 text-blue-600" />
                        <h4 className="font-semibold text-gray-800">
                          Información del Cliente
                        </h4>
                      </div>
                      <p className="text-gray-700">{pedidoSeleccionado.cliente}</p>
                      <p className="text-gray-600">{pedidoSeleccionado.email}</p>
                    </div>
                  )}
    
                  {/* Dirección */}
                  {pedidoSeleccionado.direccion && (
                    <div className="border-t pt-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <MapPin className="w-5 h-5 text-blue-600" />
                        <h4 className="font-semibold text-gray-800">
                          Dirección de Entrega
                        </h4>
                      </div>
                      <p className="text-gray-700">
                        {pedidoSeleccionado.direccion}
                      </p>
                    </div>
                  )}
    
                  {/* Productos */}
                  <div className="border-t pt-4">
                    <div className="flex items-center space-x-3 mb-4">
                      <Package className="w-5 h-5 text-blue-600" />
                      <h4 className="font-semibold text-gray-800">Productos</h4>
                    </div>
                    <div className="space-y-3">
                      {pedidoSeleccionado.productos.map((producto, idx) => (
                        <div
                          key={idx}
                          className="flex justify-between items-center bg-gray-50 p-3 rounded-lg"
                        >
                          <div>
                            <p className="font-medium text-gray-800">
                              {producto.nombre}
                            </p>
                            <p className="text-sm text-gray-600">
                              Cantidad: {producto.cantidad}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-gray-800">
                              $
                              {(
                                producto.precio_unitario * producto.cantidad
                              ).toFixed(2)}
                            </p>
                            <p className="text-sm text-gray-600">
                              ${producto.precio_unitario.toFixed(2)} c/u
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
    
                  {/* Total */}
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-semibold text-gray-800">
                        Total del Pedido:
                      </span>
                      <span className="text-2xl font-bold text-blue-600">
                        ${pedidoSeleccionado.total.toFixed(2)}
                      </span>
                    </div>
                  </div>
    
                  {/* Estado */}
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-800">
                        Estado Actual:
                      </span>
                      {pedidoSeleccionado.estado === "A" && ( 
                      <span
                        className={`px-4 py-2 rounded-full font-medium border ${getEstadoColor("Aprobado")}`}
                      >
                        Aprobado
                      </span>
                      )}
                      {pedidoSeleccionado.estado === "P" && ( 
                      <span
                        className={`px-4 py-2 rounded-full font-medium border ${getEstadoColor("Pendiente")}`}
                      >
                        Pendiente
                      </span>
                      )}
                      {pedidoSeleccionado.estado === "C" && ( 
                      <span
                        className={`px-4 py-2 rounded-full font-medium border ${getEstadoColor("Camino")}`}
                      >
                        En Camino
                      </span>
                      )}
                      {pedidoSeleccionado.estado === "E" && ( 
                      <span
                        className={`px-4 py-2 rounded-full font-medium border ${getEstadoColor("Entregado")}`}
                      >
                        Entregado
                      </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
      </main>

      <Footer />
    </div>
  );
};

export default Perfil;
