// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   FaTag,
//   FaChevronRight,
//   FaShoppingCart,
//   FaClock,
//   FaStar,
//   FaFire,
// } from "react-icons/fa";
// import { useCurrency } from "../CurrencyContext";
// import { toast } from "react-toastify";

// const OfertasDestacadas = () => {
//   const navigate = useNavigate();
//   const [cargando, setCargando] = useState(true);
//   const { currency, formatPrice, getCurrencySymbol } = useCurrency();
//   const [OFERTAS, setOfertas] = useState([]);

//   const obtenerOfertas = async () => {
//   try {
//     const response = await fetch(`http://localhost:3001/api/productos`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//     });

//     if (!response.ok) {
//       throw new Error("Error al obtener ofertas");
//     }

//     const data = await response.json();

//     // Mezclar y tomar 4 productos aleatorios
//     const productosAleatorios = data
//       .sort(() => 0.5 - Math.random()) // Mezcla aleatoria
//       .slice(0, 4); // Toma los primeros 4

//     return productosAleatorios;

//     } catch (error) {
//       console.error("Error al cargar ofertas:", error);
//       return [];
//     }
//   };
//   useEffect(() => {
//     const cargarOfertas = async () => {
//       const ofertasCargadas = await obtenerOfertas();
//       setOfertas(ofertasCargadas);
//       console.log("Ofertas cargadas:", ofertasCargadas);
//       setCargando(false);
//     };
//     cargarOfertas();
//   }, []);

//   useEffect(() => {
//     // Simulación de carga de datos
//     setTimeout(() => {
//       setCargando(false);
//     }, 800);
//   }, []);

//   const verDetalleProducto = (productoId) => {
//     const producto = OFERTAS.find((p) => p.id === productoId);
//     if (!producto) {
//       console.error("Producto no encontrado");
//       return;
//     }
//     navigate(`/VerArticulo/${productoId}`, {
//       state: {
//         producto: {
//           id: producto.id,
//           titulo: producto.titulo,
//           precio: producto.precioOferta,
//           precioOriginal: producto.precioOriginal,
//           descuento: producto.descuento,
//           calificacion: producto.calificacion,
//           numCalificaciones: Math.floor(Math.random() * 1000) + 100, // Valor aleatorio para ejemplo
//           stock: producto.stock,
//           vendidoPor: "Tienda Oficial",
//           verificado: true,
//           envioGratis: producto.envioGratis,
//           full: true,
//           garantia: producto.garantia,
//           devolucion: producto.devolucion,
//           imagenes: producto.imagenes,
//           especificaciones: producto.especificaciones,
//           descripcion: producto.descripcion,
//           categoria: producto.categoria,
//         },
//       },
//     });
//   };

//   const agregarAlCarrito = (productoId) => {
//     const producto = OFERTAS.find((p) => p.id === productoId);
//     toast.success(`✅ ${producto.titulo} agregado al carrito`);
//   };

//   const EstrellaCalificacion = ({ calificacion }) => {
//     const calif = Math.round(calificacion * 10) / 10;
//     return (
//       <div className="flex items-center mb-2">
//         <div className="flex text-yellow-400 mr-1">
//           {[1, 2, 3, 4, 5].map((estrella) => (
//             <FaStar
//               key={estrella}
//               className={
//                 calif >= estrella
//                   ? "text-yellow-400"
//                   : calif >= estrella - 0.5
//                   ? "text-yellow-300"
//                   : "text-gray-300"
//               }
//               size={14}
//             />
//           ))}
//         </div>
//         <span className="text-sm text-gray-600">{calif}</span>
//       </div>
//     );
//   };

//   if (cargando) {
//     return (
//       <section className="py-2 bg-gradient-to-br rounded-2xl shadow-sm my-10">
//         <div className="container mx-auto px-4">
//           <div className="flex items-center justify-between mb-8">
//             <div className="flex items-center">
//               <div className="mr-4 bg-red-500 text-white p-2 rounded-lg">
//                 <FaTag size={24} />
//               </div>
//               <h2 className="text-2xl font-bold text-gray-800">
//                 OFERTAS DESTACADAS
//               </h2>
//             </div>
//           </div>
//           <div className="flex justify-center items-center py-20">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
//             <span className="ml-3 text-gray-600">Cargando ofertas...</span>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="py-2 bg-gradient-to-br rounded-2xl shadow-sm my-10">
//       <div className="container mx-auto px-4">
//         <div className="flex items-center justify-between mb-8">
//           <div className="flex items-center">
//             <div className="mr-4 bg-red-500 text-white p-2 rounded-lg">
//               <FaTag size={24} />
//             </div>
//             <h2 className="text-2xl font-bold text-gray-800">
//               OFERTAS DESTACADAS
//             </h2>
//           </div>
//           <button className="text-blue-600 font-medium hover:text-blue-800 flex items-center">
//             Ver todas <FaChevronRight className="ml-1" size={14} />
//           </button>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {OFERTAS.map((oferta) => (
//             <div
//               key={oferta.id_producto}
//               className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300"
//             >
//               <div
//                 className="relative cursor-pointer"
//                 onClick={() => verDetalleProducto(oferta.id_producto)}
//               >
//                 <span className="absolute top-3 left-3 bg-red-500 text-white text-sm font-bold px-2 py-1 rounded-lg z-10">
//                   -{oferta.descuento}%
//                 </span>
//                 {oferta.stock < 6 && (
//                   <span className="absolute top-3 right-3 bg-orange-500 text-white text-xs px-2 py-1 rounded-full z-10">
//                     ¡Solo {oferta.stock} disponibles!
//                   </span>
//                 )}
//                 <div className="h-48 overflow-hidden bg-gray-100 flex items-center justify-center">
//                   <img
//                     src={oferta.imagen}
//                     alt={oferta.titulo}
//                     className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
//                   />
//                 </div>
//               </div>

//               <div
//                 className="p-4 cursor-pointer"
//                 onClick={() => verDetalleProducto(oferta.id_producto)}
//               >
//                 <div className="text-xs text-blue-600 font-medium mb-1">
//                   {oferta.categoria}
//                 </div>
//                 <h3 className="font-medium text-gray-800 mb-2 line-clamp-2 h-12 hover:text-blue-600 transition-colors">
//                   {oferta.nombre}
//                 </h3>
//                 <EstrellaCalificacion calificacion={oferta.calificacion} />
//                 <div className="flex items-end mb-3">
//                   <span className="text-xl font-bold text-gray-800 mr-2">
//                     {formatPrice(oferta.precio)}
//                   </span>
//                   <span className="text-sm text-gray-500 line-through">
//                     {formatPrice(oferta.precio)}
//                   </span>
//                 </div>
//                 <div className="flex items-center text-xs text-gray-500 mb-4">
//                   <FaClock className="mr-1" />
//                   <span>Termina en: {oferta.tiempoRestante}</span>
//                 </div>
//                 <button
//                   className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center"
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     agregarAlCarrito(oferta.id_producto);
//                   }}
//                 >
//                   <FaShoppingCart className="mr-2" />
//                   Agregar al carrito
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default OfertasDestacadas;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaTag,
  FaChevronRight,
  FaShoppingCart,
  FaClock,
  FaStar,
} from "react-icons/fa";
import { useCurrency } from "../CurrencyContext";
import { toast } from "react-toastify";

const OfertasDestacadas = () => {
  const navigate = useNavigate();
  const [cargando, setCargando] = useState(true);
  const [ofertas, setOfertas] = useState([]);
  const [error, setError] = useState(null);
  const { currency, formatPrice } = useCurrency();

  const obtenerOfertas = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/productos`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error al obtener ofertas, tilín");
      }

      const data = await response.json();
      const mappedProducts = data.map((product) => ({
        id: product.id_producto || product.id,
        title: product.nombre || product.title,
        brand: product.brand || "Genérico",
        type: product.type || "Producto",
        category: product.categoria || "Sin categoría",
        categoryColor: product.categoryColor || "bg-gray-500",
        price: parseFloat(product.precio),
        originalPrice: product.precioOriginal
          ? parseFloat(product.precioOriginal)
          : null,
        discount: product.descuento || 0,
        rating: product.calificacion || 0,
        reviewCount:
          product.numCalificaciones || Math.floor(Math.random() * 1000) + 100,
        image: product.imagen || "https://via.placeholder.com/150",
        connectivity: product.connectivity || null,
        description: product.descripcion || "Sin descripción, tilín",
        quantity: product.quantity || 1,
        stock: product.stock || 10,
        tiempoRestante: product.tiempoRestante || "Sin límite",
      }));

      const productosAleatorios = mappedProducts
        .sort(() => 0.5 - Math.random())
        .slice(0, 4);
      return productosAleatorios;
    } catch (error) {
      console.error("Error al cargar ofertas:", error);
      setError("Error al cargar ofertas, tilín");
      return [
        {
          id: 1,
          title: "Camiseta Adidas Original",
          brand: "Adidas",
          type: "Ropa",
          category: "MODA",
          categoryColor: "bg-red-500",
          price: 499,
          originalPrice: 699,
          discount: 29,
          rating: 4.3,
          reviewCount: 600,
          image: "👕",
          description: "Camiseta cómoda y estilosa, tilín",
          quantity: 1,
          stock: 8,
          tiempoRestante: "10h 15m",
        },
      ];
    }
  };

  useEffect(() => {
    const cargarOfertas = async () => {
      setCargando(true);
      const ofertasCargadas = await obtenerOfertas();
      setOfertas(ofertasCargadas);
      console.log("Ofertas cargadas:", ofertasCargadas);
      setCargando(false);
    };
    cargarOfertas();
  }, []);

  const verDetalleProducto = (productoId) => {
    const producto = ofertas.find((p) => p.id === productoId);
    if (!producto) {
      console.error("Producto no encontrado, tilín");
      return;
    }
    navigate(`/VerArticulo/${productoId}`, {
      state: {
        producto: {
          id: producto.id,
          title: producto.title,
          price: producto.price,
          originalPrice: producto.originalPrice,
          discount: producto.discount,
          rating: producto.rating,
          reviewCount: producto.reviewCount,
          stock: producto.stock,
          vendidoPor: "Tienda Oficial",
          verificado: true,
          envioGratis: true,
          full: true,
          garantia: "1 año",
          devolucion: "30 días",
          image: producto.image,
          connectivity: producto.connectivity,
          description: producto.description,
          category: producto.category,
        },
      },
    });
  };

  const agregarAlCarrito = (productoId) => {
    const producto = ofertas.find((p) => p.id === productoId);
    if (producto) {
      toast.success(`✅ ${producto.title} agregado al carrito, tilín`);
    }
  };

  const EstrellaCalificacion = ({ rating }) => {
    const calif = Math.round(rating * 10) / 10;
    return (
      <div className="flex items-center mb-2">
        <div className="flex text-yellow-400 mr-1">
          {[1, 2, 3, 4, 5].map((estrella) => (
            <FaStar
              key={estrella}
              className={
                calif >= estrella
                  ? "text-yellow-400"
                  : calif >= estrella - 0.5
                  ? "text-yellow-300"
                  : "text-gray-300"
              }
              size={14}
            />
          ))}
        </div>
        <span className="text-sm text-gray-600">{calif}</span>
      </div>
    );
  };

  if (cargando) {
    return (
      <section className="py-2 bg-gradient-to-br rounded-2xl shadow-sm my-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <div className="mr-4 bg-red-500 text-white p-2 rounded-lg">
                <FaTag size={24} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                OFERTAS SÚPER CHIDAS, TILÍN
              </h2>
            </div>
          </div>
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
            <span className="ml-3 text-gray-600">
              Cargando ofertitas, tilín...
            </span>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-2 bg-gradient-to-br rounded-2xl shadow-sm my-10">
        <div className="container mx-auto px-4">
          <p className="text-red-500">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-2 bg-gradient-to-br rounded-2xl shadow-sm my-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <div className="mr-4 bg-red-500 text-white p-2 rounded-lg">
              <FaTag size={24} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              OFERTAS SÚPER CHIDAS, TILÍN
            </h2>
          </div>
          <button className="text-blue-600 font-medium hover:text-blue-800 flex items-center">
            Ver todas las ofertitas{" "}
            <FaChevronRight className="ml-1" size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ofertas.map((oferta) => (
            <div
              key={oferta.id}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300"
            >
              <div
                className="relative cursor-pointer"
                onClick={() => verDetalleProducto(oferta.id)}
              >
                <span className="absolute top-3 left-3 bg-red-500 text-white text-sm font-bold px-2 py-1 rounded-lg z-10">
                  -{oferta.discount}% OFF
                </span>
                {oferta.stock < 6 && (
                  <span className="absolute top-3 right-3 bg-orange-500 text-white text-xs px-2 py-1 rounded-full z-10">
                    ¡Solo {oferta.stock} disponibles, tilín!
                  </span>
                )}
                <div className="h-48 overflow-hidden bg-gray-100 flex items-center justify-center">
                  <img
                    src={oferta.image}
                    alt={oferta.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>

              <div
                className="p-4 cursor-pointer"
                onClick={() => verDetalleProducto(oferta.id)}
              >
                <div className="text-xs text-blue-600 font-medium mb-1">
                  {oferta.category}
                </div>
                <h3 className="font-medium text-gray-800 mb-2 line-clamp-2 h-12 hover:text-blue-600 transition-colors">
                  {oferta.title}
                </h3>
                <EstrellaCalificacion rating={oferta.rating} />
                <div className="flex items-end mb-3">
                  <span className="text-xl font-bold text-gray-800 mr-2">
                    {formatPrice(oferta.price)}
                  </span>
                  {oferta.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      {formatPrice(oferta.originalPrice)}
                    </span>
                  )}
                </div>
                <div className="flex items-center text-xs text-gray-500 mb-4">
                  <FaClock className="mr-1" />
                  <span>Termina en: {oferta.tiempoRestante}</span>
                </div>
                <button
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    agregarAlCarrito(oferta.id);
                  }}
                >
                  <FaShoppingCart className="mr-2" />
                  Agregar al carrito, tilín
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OfertasDestacadas;
