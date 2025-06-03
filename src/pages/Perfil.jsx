// import React, { useState, useEffect } from "react";
// import {
//   User,
//   Mail,
//   MapPin,
//   Edit3,
//   Package,
//   ChevronRight,
//   Check,
//   X,
// } from "lucide-react";
// import Header from "../components/Heaader";
// import Footer from "../components/Footer";

// const Perfil = () => {
//   // Estados para la información del usuario
//   const [userInfo, setUserInfo] = useState({
//     nombre: "Juan Pérez", // Valor por defecto para simular datos iniciales
//     correo: "juan.perez@example.com", // Correo inicial simulado
//     fotoPerfil:
//       "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop", // URL de imagen genérica
//     direccionPrincipal: {
//       calle: "Calle Constitución 123",
//       ciudad: "Culiacán",
//       estado: "Sinaloa",
//       codigoPostal: "81893",
//       pais: "México",
//     }, // Dirección inicial simulada
//   });
//   // Estado para el historial de pedidos
//   const [pedidos, setPedidos] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [editUserInfo, setEditUserInfo] = useState(userInfo);
//   const [showEditModal, setShowEditModal] = useState(false);
//   // Simular carga de datos del usuario y pedidos
//   useEffect(() => {
//     const fetchUserData = async () => {
//       setLoading(true);
//       try {
//         // 🔥 API ENDPOINT: GET /api/usuario/perfil
//         // Simulamos la respuesta de la API con datos estáticos
//         setUserInfo({
//           nombre: "Juan Pérez",
//           correo: "juan.perez@example.com",
//           fotoPerfil:
//             "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
//           direccionPrincipal: {
//             calle: "Calle Constitución 123",
//             ciudad: "Culiacán",
//             estado: "Sinaloa",
//             codigoPostal: "81893",
//             pais: "México",
//           },
//         });

//         // 🔥 API ENDPOINT: GET /api/pedidos/usuario
//         // Simulamos el historial de pedidos
//         setPedidos([
//           {
//             id: 1,
//             fecha: "2025-05-20",
//             total: 1803,
//             estado: "Entregado",
//             productos: [
//               { nombre: "Auriculares Bluetooth Premium", cantidad: 1 },
//               { nombre: "Tablet Android Pro", cantidad: 1 },
//             ],
//           },
//           {
//             id: 2,
//             fecha: "2025-05-15",
//             total: 999,
//             estado: "En camino",
//             productos: [{ nombre: "Tablet Android Pro", cantidad: 1 }],
//           },
//         ]);
//       } catch (error) {
//         console.error("Error al cargar datos del perfil:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserData();
//   }, []);

//   // Función para manejar la edición del perfil (simulada)
//   const abrirModalEdicion = () => {
//     setEditUserInfo(userInfo);
//     setShowEditModal(true);
//   };

//   const cerrarModalEdicion = () => {
//     setShowEditModal(false);
//   };

//   const manejarCambio = (e) => {
//     const { name, value } = e.target;
//     if (name.startsWith("direccionPrincipal.")) {
//       const field = name.split(".")[1];
//       setEditUserInfo({
//         ...editUserInfo,
//         direccionPrincipal: {
//           ...editUserInfo.direccionPrincipal,
//           [field]: value,
//         },
//       });
//     } else {
//       setEditUserInfo({
//         ...editUserInfo,
//         [name]: value,
//       });
//     }
//   };
//   const guardarCambios = async () => {
//     if (!editUserInfo.nombre.trim()) {
//       alert("El nombre no puede estar vacío."); // Validación básica
//       return;
//     }
//     if (
//       !editUserInfo.correo.includes("@") ||
//       !editUserInfo.correo.includes(".")
//     ) {
//       alert("Por favor, ingresa un correo válido."); // Validación de correo
//       return;
//     }
//     if (
//       !editUserInfo.direccionPrincipal.calle.trim() ||
//       !editUserInfo.direccionPrincipal.ciudad.trim() ||
//       !editUserInfo.direccionPrincipal.estado.trim() ||
//       !editUserInfo.direccionPrincipal.codigoPostal.trim() ||
//       !editUserInfo.direccionPrincipal.pais.trim()
//     ) {
//       alert("Todos los campos de la dirección son obligatorios."); // Validación de dirección
//       return;
//     }

//     try {
//       // 🔥 API ENDPOINT: PUT /api/usuario/perfil
//       setUserInfo(editUserInfo); // Actualizamos el estado principal
//       alert("Perfil actualizado con éxito!");
//       cerrarModalEdicion(); // Cerramos el modal tras éxito
//     } catch (error) {
//       console.error("Error al guardar los cambios:", error);
//       alert("Ocurrió un error al guardar los cambios.");
//     }
//   };
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
//       {/* **Por qué min-h-screen y bg-gradient-to-br?**
//       - min-h-screen asegura que el fondo cubra toda la altura de la pantalla.
//       - El degradado (from-gray-50 via-blue-50 to-indigo-50) mantiene consistencia con CarritoCompras y la imagen, ofreciendo un fondo suave y profesional. */}
//       <Header />

//       <main className="container mx-auto py-8 px-4">
//         {/* **Por qué container mx-auto py-8 px-4?**
//         - container centra el contenido con márgenes automáticos.
//         - py-8 y px-4 añaden padding vertical y horizontal para un espaciado cómodo. */}
//         {loading ? (
//           <div className="flex justify-center items-center py-20">
//             {/* **Por qué flex justify-center items-center py-20?**
//             - Centra el spinner tanto horizontal como verticalmente.
//             - py-20 da espacio suficiente para que el spinner sea visible durante la carga. */}
//             <div className="relative">
//               <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200"></div>
//               <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent absolute top-0"></div>
//             </div>
//           </div>
//         ) : (
//           <div className="max-w-5xl mx-auto">
//             {/* **Por qué max-w-5xl mx-auto?**
//             - Limita el ancho máximo para un diseño limpio y responsivo. */}
//             <div className="flex items-center justify-between mb-8">
//               {/* **Por qué flex items-center justify-between mb-8?**
//               - Alinea el título y el botón en una fila, centrados verticalmente, con espacio entre ellos.
//               - mb-8 añade margen inferior para separar secciones. */}
//               <h1 className="text-3xl font-bold text-gray-900">Mi Perfil</h1>
//               <button
//                 onClick={abrirModalEdicion}
//                 className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2 rounded-lg font-medium flex items-center transition-all duration-300 transform hover:scale-105 shadow-lg"
//               >
//                 {/* **Por qué bg-gradient-to-r y hover effects?**
//                 - El degradado azul (from-blue-600 to-blue-700) es consistente con los botones de acción en CarritoCompras.
//                 - hover:from-blue-700 hover:to-blue-800 y hover:scale-105 añaden interactividad y feedback visual.
//                 - shadow-lg da profundidad. */}
//                 <Edit3 size={18} className="mr-2" />
//                 Editar Perfil
//               </button>
//             </div>

//             {/* Información del usuario */}
//             <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
//               {/* **Por qué bg-white rounded-2xl shadow-lg p-6 mb-6?**
//               - bg-white con rounded-2xl y shadow-lg crea un panel elegante y moderno.
//               - p-6 añade padding interno, mb-6 separa del siguiente bloque. */}
//               <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
//                 {/* **Por qué flex flex-col md:flex-row items-center md:items-start gap-6?**
//                 - En pantallas pequeñas (mobile), apila los elementos; en medianas (md), los alinea horizontalmente.
//                 - items-center alinea verticalmente en mobile, md:items-start ajusta en desktop.
//                 - gap-6 da espacio entre elementos. */}
//                 <div className="relative w-32 h-32 flex-shrink-0">
//                   {/* **Por qué w-32 h-32 flex-shrink-0?**
//                   - Define un tamaño fijo para la foto (128px) y evita que se encoja. */}
//                   <img
//                     src={userInfo.fotoPerfil}
//                     alt="Foto de perfil"
//                     className="w-full h-full object-cover rounded-full border-4 border-blue-200"
//                   />
//                   {/* **Por qué object-cover rounded-full border-4 border-blue-200?**
//                   - object-cover asegura que la imagen llene el contenedor manteniendo proporciones.
//                   - rounded-full hace la foto circular, border-4 border-blue-200 añade un borde estilizado. */}
//                 </div>

//                 <div className="flex-grow space-y-4">
//                   <div>
//                     <h2 className="text-2xl font-bold text-gray-900 flex items-center">
//                       <User size={24} className="mr-2 text-blue-600" />
//                       {userInfo.nombre}
//                     </h2>
//                   </div>
//                   <div className="flex items-center text-gray-600">
//                     <Mail size={20} className="mr-2 text-blue-600" />
//                     <p>{userInfo.correo}</p>
//                   </div>
//                   <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4">
//                     {/* **Por qué bg-gradient-to-r from-blue-50 to-indigo-50?**
//                     - Mantiene la coherencia con el estilo de dirección en CarritoCompras. */}
//                     <h3 className="font-bold text-lg text-gray-900 mb-2 flex items-center">
//                       <MapPin className="mr-2 text-blue-600" size={20} />
//                       Dirección Principal
//                     </h3>
//                     <p className="text-gray-700">
//                       {userInfo.direccionPrincipal.calle},{" "}
//                       {userInfo.direccionPrincipal.ciudad},{" "}
//                       {userInfo.direccionPrincipal.estado}{" "}
//                       {userInfo.direccionPrincipal.codigoPostal}
//                     </p>
//                     <p className="text-gray-600 mt-1">
//                       {userInfo.direccionPrincipal.pais}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Historial de pedidos */}
//             <div className="bg-white rounded-2xl shadow-lg p-6">
//               <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
//                 <Package size={24} className="mr-2 text-blue-600" />
//                 Historial de Pedidos
//               </h2>

//               {pedidos.length === 0 ? (
//                 <div className="text-center py-10">
//                   <p className="text-gray-600">No tienes pedidos recientes.</p>
//                 </div>
//               ) : (
//                 <div className="space-y-4">
//                   {pedidos.map((pedido) => (
//                     <div
//                       key={pedido.id}
//                       className="border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all duration-300 hover:border-blue-200"
//                     >
//                       {/* **Por qué hover:shadow-lg transition-all?**
//                       - Añade un efecto de sombra al pasar el ratón, mejorando la interactividad.
//                       - transition-all asegura animaciones suaves. */}
//                       <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
//                         <div className="mb-4 md:mb-0">
//                           <p className="font-medium text-gray-900">
//                             Pedido #{pedido.id} - {pedido.fecha}
//                           </p>
//                           <p className="text-gray-600">
//                             {pedido.productos
//                               .map(
//                                 (prod) => `${prod.nombre} (${prod.cantidad})`
//                               )
//                               .join(", ")}
//                           </p>
//                           <div className="flex items-center mt-2">
//                             <span
//                               className={`text-sm font-medium px-2 py-1 rounded-full ${
//                                 pedido.estado === "Entregado"
//                                   ? "bg-green-100 text-green-800"
//                                   : "bg-yellow-100 text-yellow-800"
//                               }`}
//                             >
//                               {/* **Por qué bg-green-100 o bg-yellow-100?**
//                               - Verde para "Entregado" indica éxito, amarillo para "En camino" indica progreso, consistente con CarritoCompras. */}
//                               {pedido.estado}
//                             </span>
//                           </div>
//                         </div>
//                         <div className="flex items-center space-x-3">
//                           <p className="font-bold text-gray-900">
//                             ${pedido.total.toFixed(2)}
//                           </p>
//                           <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105">
//                             Ver Detalles
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         )}

//         {/* Modal de edición */}
//         {showEditModal && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//             {/* **Por qué fixed inset-0 bg-black bg-opacity-50?**
//             - fixed y inset-0 cubre toda la pantalla, bg-opacity-50 crea un fondo oscuro semitransparente para enfocar el modal.
//             - z-50 asegura que esté por encima de otros elementos. */}
//             <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//               <div className="p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
//                 <div className="flex items-center justify-between">
//                   <h2 className="text-xl font-bold text-gray-900 flex items-center">
//                     <Edit3 className="mr-2 text-blue-600" size={20} />
//                     Editar Perfil
//                   </h2>
//                   <button
//                     onClick={cerrarModalEdicion}
//                     className="text-gray-400 hover:text-gray-600 transition-colors"
//                   >
//                     <X size={24} />
//                   </button>
//                 </div>
//               </div>

//               <div className="p-6 space-y-6">
//                 <div className="space-y-4">
//                   <h3 className="font-medium text-gray-800">
//                     Información Personal
//                   </h3>
//                   <div className="grid grid-cols-1 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Nombre
//                       </label>
//                       <input
//                         type="text"
//                         name="nombre"
//                         value={editUserInfo.nombre}
//                         onChange={manejarCambio}
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Correo Electrónico
//                       </label>
//                       <input
//                         type="email"
//                         name="correo"
//                         value={editUserInfo.correo}
//                         onChange={manejarCambio}
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         URL de la Foto de Perfil
//                       </label>
//                       <input
//                         type="text"
//                         name="fotoPerfil"
//                         value={editUserInfo.fotoPerfil}
//                         onChange={manejarCambio}
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 <div className="space-y-4">
//                   <h3 className="font-medium text-gray-800">
//                     Dirección Principal
//                   </h3>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Calle y Número
//                       </label>
//                       <input
//                         type="text"
//                         name="direccionPrincipal.calle"
//                         value={editUserInfo.direccionPrincipal.calle}
//                         onChange={manejarCambio}
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Ciudad
//                       </label>
//                       <input
//                         type="text"
//                         name="direccionPrincipal.ciudad"
//                         value={editUserInfo.direccionPrincipal.ciudad}
//                         onChange={manejarCambio}
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Estado
//                       </label>
//                       <input
//                         type="text"
//                         name="direccionPrincipal.estado"
//                         value={editUserInfo.direccionPrincipal.estado}
//                         onChange={manejarCambio}
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Código Postal
//                       </label>
//                       <input
//                         type="text"
//                         name="direccionPrincipal.codigoPostal"
//                         value={editUserInfo.direccionPrincipal.codigoPostal}
//                         onChange={manejarCambio}
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         País
//                       </label>
//                       <input
//                         type="text"
//                         name="direccionPrincipal.pais"
//                         value={editUserInfo.direccionPrincipal.pais}
//                         onChange={manejarCambio}
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex gap-3 pt-4">
//                   <button
//                     onClick={guardarCambios}
//                     className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center transition-all duration-300"
//                   >
//                     <Check size={18} className="mr-2" />
//                     Guardar Cambios
//                   </button>
//                   <button
//                     onClick={cerrarModalEdicion}
//                     className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-medium flex items-center justify-center transition-all duration-300"
//                   >
//                     <X size={18} className="mr-2" />
//                     Cancelar
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default Perfil;

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

  // Estado para el historial de pedidos
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simular carga de datos
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const user = localStorage.getItem("usuario");
        setUserInfo({
          nombre: user,
          correo: `${user}@example.com`,
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
                    <p>{userInfo.correo}</p>
                  </div>
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4">
                    <h3 className="font-bold text-lg text-gray-900 mb-2 flex items-center">
                      <MapPin className="mr-2 text-blue-600" size={20} />
                      Dirección Principal
                    </h3>
                    <p className="text-gray-700">
                      {userInfo.direccionPrincipal.calle},{" "}
                      {userInfo.direccionPrincipal.ciudad},{" "}
                      {userInfo.direccionPrincipal.estado}{" "}
                      {userInfo.direccionPrincipal.codigoPostal}
                    </p>
                    <p className="text-gray-600 mt-1">
                      {userInfo.direccionPrincipal.pais}
                    </p>
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
                            <span
                              className={`text-sm font-medium px-2 py-1 rounded-full ${
                                pedido.estado === "Aprobado"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {pedido.estado}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <p className="font-bold text-gray-900">
                            ${pedido.total.toFixed(2)}
                          </p>
                          <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105">
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

                <div className="space-y-4">
                  <h3 className="font-medium text-gray-800">
                    Dirección Principal
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Calle y Número
                      </label>
                      <input
                        type="text"
                        name="direccionPrincipal.calle"
                        value={editUserInfo.direccionPrincipal.calle}
                        onChange={manejarCambio}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                        placeholder="Calle y número"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Ciudad
                      </label>
                      <input
                        type="text"
                        name="direccionPrincipal.ciudad"
                        value={editUserInfo.direccionPrincipal.ciudad}
                        onChange={manejarCambio}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                        placeholder="Ciudad"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Estado
                      </label>
                      <input
                        type="text"
                        name="direccionPrincipal.estado"
                        value={editUserInfo.direccionPrincipal.estado}
                        onChange={manejarCambio}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                        placeholder="Estado"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Código Postal
                      </label>
                      <input
                        type="text"
                        name="direccionPrincipal.codigoPostal"
                        value={editUserInfo.direccionPrincipal.codigoPostal}
                        onChange={manejarCambio}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                        placeholder="Código postal"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        País
                      </label>
                      <input
                        type="text"
                        name="direccionPrincipal.pais"
                        value={editUserInfo.direccionPrincipal.pais}
                        onChange={manejarCambio}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                        placeholder="País"
                      />
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
      </main>

      <Footer />
    </div>
  );
};

export default Perfil;
