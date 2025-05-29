// import React, { useState, useMemo, useEffect } from "react";
// import { ChevronDown, Filter, Star, X } from "lucide-react";
// import { useLocation, useNavigate, Link } from "react-router-dom";
// import Categorias from "../components/Categorias";
// import Header from "../components/Heaader";
// import Footer from "../components/Footer";
// const BusquedaProducto = () => {
//   // Estados
//   const [selectedFilters, setSelectedFilters] = useState({
//     brands: [],
//     productTypes: [],
//     priceRanges: [],
//     connectivity: [],
//   });
//   const [priceRange, setPriceRange] = useState({ min: "", max: "" });
//   const [sortBy, setSortBy] = useState("");
//   const [showMobileFilters, setShowMobileFilters] = useState(false);

//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);
//   const categoryParam = searchParams.get("category") || "";
//   const searchQuery = searchParams.get("q") || "";

//   const [categoryFilter, setCategoryFilter] = useState(categoryParam);
//   const [searchFilter, setSearchFilter] = useState(searchQuery);

//   // Actualizar filtros cuando cambia la URL
//   useEffect(() => {
//     setCategoryFilter(categoryParam);
//     setSearchFilter(searchQuery);
//   }, [location.search]);

//   // Sample products data
//   const allProducts = [
//     {
//       id: 1,
//       title: "Mouse Gaming Logitech G Pro X Superlight Inalámbrico RGB",
//       brand: "Logitech",
//       type: "Mouse",
//       category: "PERIFÉRICOS",
//       categoryColor: "bg-purple-500",
//       price: 1799,
//       originalPrice: 2199,
//       discount: 18,
//       rating: 5,
//       reviewCount: 1247,
//       image: "🖱️",
//       connectivity: "Inalámbrico",
//     },
//     {
//       id: 2,
//       title: "Teclado Mecánico Corsair K95 RGB Platinum",
//       brand: "Corsair",
//       type: "Teclado",
//       category: "PERIFÉRICOS",
//       categoryColor: "bg-purple-500",
//       price: 2499,
//       originalPrice: 2899,
//       discount: 14,
//       rating: 5,
//       reviewCount: 892,
//       image: "⌨️",
//       connectivity: "USB",
//     },
//     {
//       id: 3,
//       title: "Audífonos Gaming Razer BlackShark V2 Pro",
//       brand: "Razer",
//       type: "Audífonos",
//       category: "AUDIO",
//       categoryColor: "bg-blue-400",
//       price: 1999,
//       originalPrice: 2299,
//       discount: 13,
//       rating: 4,
//       reviewCount: 567,
//       image: "🎧",
//       connectivity: "Inalámbrico",
//     },
//     {
//       id: 4,
//       title: "Consola PlayStation 5 Standard Edition",
//       brand: "Sony",
//       type: "Consola",
//       category: "GAMING",
//       categoryColor: "bg-pink-500",
//       price: 12999,
//       originalPrice: 14999,
//       discount: 13,
//       rating: 5,
//       reviewCount: 2341,
//       image: "🎮",
//       connectivity: "WiFi",
//     },
//     {
//       id: 5,
//       title: "Laptop Gaming ASUS ROG Strix G15",
//       brand: "ASUS",
//       type: "Laptop",
//       category: "LAPTOPS",
//       categoryColor: "bg-indigo-500",
//       price: 25999,
//       originalPrice: 29999,
//       discount: 13,
//       rating: 4,
//       reviewCount: 423,
//       image: "💻",
//       connectivity: "WiFi",
//     },
//     // ... más productos si necesitas
//   ];

//   // Filter options
//   const filterOptions = {
//     brands: [
//       { id: "logitech", name: "Logitech", count: 47 },
//       { id: "razer", name: "Razer", count: 23 },
//       { id: "corsair", name: "Corsair", count: 31 },
//       { id: "sony", name: "Sony", count: 18 },
//       { id: "asus", name: "ASUS", count: 25 },
//     ],
//     productTypes: [
//       { id: "mouse", name: "Mouse", count: 89 },
//       { id: "teclado", name: "Teclados", count: 67 },
//       { id: "audifonos", name: "Audífonos", count: 54 },
//       { id: "consola", name: "Consolas", count: 32 },
//       { id: "laptop", name: "Laptops", count: 28 },
//     ],
//     priceRanges: [
//       { id: "range1", name: "$100 - $500", count: 43, min: 100, max: 500 },
//       { id: "range2", name: "$500 - $1,000", count: 67, min: 500, max: 1000 },
//       {
//         id: "range3",
//         name: "$1,000 - $2,000",
//         count: 38,
//         min: 1000,
//         max: 2000,
//       },
//       {
//         id: "range4",
//         name: "$2,000 - $5,000",
//         count: 24,
//         min: 2000,
//         max: 5000,
//       },
//       {
//         id: "range5",
//         name: "$5,000+",
//         count: 15,
//         min: 5000,
//         max: 999999,
//       },
//     ],
//     connectivity: [
//       { id: "inalambrico", name: "Inalámbrico", count: 92 },
//       { id: "usb", name: "USB", count: 156 },
//       { id: "wifi", name: "WiFi", count: 48 },
//     ],
//   };

//   // Handle filter changes
//   const handleFilterChange = (category, filterId) => {
//     setSelectedFilters((prev) => ({
//       ...prev,
//       [category]: prev[category].includes(filterId)
//         ? prev[category].filter((id) => id !== filterId)
//         : [...prev[category], filterId],
//     }));
//   };

//   // Filter products based on selected filters
//   const filteredProducts = useMemo(() => {
//     let filtered = allProducts;

//     // Filtro por categoría
//     if (categoryFilter) {
//       filtered = filtered.filter(
//         (product) =>
//           product.category.toLowerCase() === categoryFilter.toLowerCase()
//       );
//     }

//     // Filtro por búsqueda
//     if (searchFilter) {
//       const searchTerm = searchFilter.toLowerCase();
//       filtered = filtered.filter(
//         (product) =>
//           product.title.toLowerCase().includes(searchTerm) ||
//           product.brand.toLowerCase().includes(searchTerm) ||
//           product.type.toLowerCase().includes(searchTerm)
//       );
//     }

//     // Filtro por marcas
//     if (selectedFilters.brands.length > 0) {
//       filtered = filtered.filter((product) =>
//         selectedFilters.brands.includes(product.brand.toLowerCase())
//       );
//     }

//     // Filtro por tipos de producto
//     if (selectedFilters.productTypes.length > 0) {
//       filtered = filtered.filter((product) =>
//         selectedFilters.productTypes.includes(product.type.toLowerCase())
//       );
//     }

//     // Filtro por rangos de precio
//     if (selectedFilters.priceRanges.length > 0) {
//       filtered = filtered.filter((product) => {
//         return selectedFilters.priceRanges.some((rangeId) => {
//           const range = filterOptions.priceRanges.find((r) => r.id === rangeId);
//           return product.price >= range.min && product.price <= range.max;
//         });
//       });
//     }

//     // Filtro por conectividad
//     if (selectedFilters.connectivity.length > 0) {
//       filtered = filtered.filter((product) =>
//         selectedFilters.connectivity.includes(
//           product.connectivity.toLowerCase().replace("á", "a")
//         )
//       );
//     }

//     // Filtro por rango de precio personalizado
//     if (priceRange.min || priceRange.max) {
//       filtered = filtered.filter((product) => {
//         const min = priceRange.min ? parseInt(priceRange.min) : 0;
//         const max = priceRange.max ? parseInt(priceRange.max) : 999999;
//         return product.price >= min && product.price <= max;
//       });
//     }

//     return filtered;
//   }, [allProducts, categoryFilter, searchFilter, selectedFilters, priceRange]);

//   // Clear all filters
//   const clearAllFilters = () => {
//     setSelectedFilters({
//       brands: [],
//       productTypes: [],
//       priceRanges: [],
//       connectivity: [],
//     });
//     setPriceRange({ min: "", max: "" });
//   };

//   // Obtener nombre de categoría
//   const getCategoryName = (categoryValue) => {
//     const category = Categorias.find(
//       (cat) => cat.categoryValue.toLowerCase() === categoryValue.toLowerCase()
//     );
//     return category ? category.label : categoryValue;
//   };

//   // Filter Section Component
//   const FilterSection = ({ title, category, options }) => (
//     <div className="bg-white rounded-lg shadow-sm mb-4">
//       <div className="p-4 border-b border-gray-200">
//         <h3 className="font-semibold text-gray-900">{title}</h3>
//       </div>
//       <div className="p-4 space-y-3">
//         {options.map((option) => (
//           <label
//             key={option.id}
//             className="flex items-center cursor-pointer hover:bg-gray-50 p-1 rounded"
//           >
//             <input
//               type="checkbox"
//               className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//               checked={selectedFilters[category].includes(option.id)}
//               onChange={() => handleFilterChange(category, option.id)}
//             />
//             <span className="ml-3 text-sm text-gray-700 flex-1">
//               {option.name}
//             </span>
//             <span className="text-xs text-gray-500">({option.count})</span>
//           </label>
//         ))}
//       </div>
//     </div>
//   );

//   // Product Card Component
//   const ProductCard = ({ product }) => (
//     <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-4 cursor-pointer hover:-translate-y-1 transform transition-transform">
//       <div className="w-full h-48 bg-gray-100 rounded-lg mb-3 flex items-center justify-center text-4xl">
//         {product.image}
//       </div>
//       <div
//         className={`inline-block px-2 py-1 rounded-full text-xs font-medium text-white mb-2 ${product.categoryColor}`}
//       >
//         {product.category}
//       </div>
//       <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2 leading-tight">
//         {product.title}
//       </h3>
//       <div className="flex items-center mb-2">
//         <div className="flex text-yellow-400">
//           {[...Array(5)].map((_, i) => (
//             <Star
//               key={i}
//               className={`w-4 h-4 ${i < product.rating ? "fill-current" : ""}`}
//             />
//           ))}
//         </div>
//         <span className="text-xs text-gray-500 ml-2">
//           ({product.reviewCount.toLocaleString()})
//         </span>
//       </div>
//       <div className="flex items-center space-x-2">
//         {product.originalPrice && (
//           <span className="text-sm text-gray-500 line-through">
//             ${product.originalPrice.toLocaleString()}
//           </span>
//         )}
//         <span className="text-lg font-bold text-blue-600">
//           ${product.price.toLocaleString()}
//         </span>
//         {product.discount > 0 && (
//           <span className="text-xs font-semibold text-red-600">
//             {product.discount}% OFF
//           </span>
//         )}
//       </div>
//     </div>
//   );

//   return (
//     <div className="bg-gray-50 min-h-screen">
//       <Header />
//       {/* Breadcrumb */}
//       <div className="bg-white border-b border-gray-200 px-4 py-3">
//         <div className="max-w-7xl mx-auto">
//           <nav className="text-sm text-gray-600">
//             <Link to="/" className="text-blue-600 hover:underline">
//               Inicio
//             </Link>
//             <span className="mx-2">›</span>
//             <span className="font-medium text-gray-900">
//               {getCategoryName(categoryFilter) || "Todos los productos"}
//             </span>
//           </nav>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 py-6">
//         <div className="flex gap-6">
//           {/* Mobile Filter Toggle */}
//           <button
//             className="lg:hidden fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg z-50"
//             onClick={() => setShowMobileFilters(true)}
//           >
//             <Filter className="w-6 h-6" />
//           </button>

//           {/* Mobile Filter Overlay */}
//           {showMobileFilters && (
//             <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50">
//               <div className="bg-white w-80 h-full overflow-y-auto">
//                 <div className="p-4 border-b border-gray-200 flex justify-between items-center">
//                   <h2 className="font-semibold text-lg">Filtros</h2>
//                   <button onClick={() => setShowMobileFilters(false)}>
//                     <X className="w-6 h-6" />
//                   </button>
//                 </div>
//                 <div className="p-4">
//                   <FilterSection
//                     title="Marcas"
//                     category="brands"
//                     options={filterOptions.brands}
//                   />
//                   <FilterSection
//                     title="Tipos de Producto"
//                     category="productTypes"
//                     options={filterOptions.productTypes}
//                   />
//                   <FilterSection
//                     title="Rangos de Precio"
//                     category="priceRanges"
//                     options={filterOptions.priceRanges}
//                   />
//                   <FilterSection
//                     title="Conectividad"
//                     category="connectivity"
//                     options={filterOptions.connectivity}
//                   />
//                   <button
//                     onClick={clearAllFilters}
//                     className="w-full mt-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
//                   >
//                     Limpiar Filtros
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Desktop Sidebar */}
//           <div className="hidden lg:block w-80 flex-shrink-0">
//             <FilterSection
//               title="Marcas"
//               category="brands"
//               options={filterOptions.brands}
//             />
//             <FilterSection
//               title="Tipos de Producto"
//               category="productTypes"
//               options={filterOptions.productTypes}
//             />
//             <FilterSection
//               title="Rangos de Precio"
//               category="priceRanges"
//               options={filterOptions.priceRanges}
//             />
//             <FilterSection
//               title="Conectividad"
//               category="connectivity"
//               options={filterOptions.connectivity}
//             />

//             {/* Filtro personalizado de precio */}
//             <div className="bg-white rounded-lg shadow-sm mb-4">
//               <div className="p-4 border-b border-gray-200">
//                 <h3 className="font-semibold text-gray-900">Rango de Precio</h3>
//               </div>
//               <div className="p-4 space-y-3">
//                 <div className="flex space-x-2">
//                   <input
//                     type="number"
//                     placeholder="Min"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
//                     value={priceRange.min}
//                     onChange={(e) =>
//                       setPriceRange({ ...priceRange, min: e.target.value })
//                     }
//                   />
//                   <input
//                     type="number"
//                     placeholder="Max"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
//                     value={priceRange.max}
//                     onChange={(e) =>
//                       setPriceRange({ ...priceRange, max: e.target.value })
//                     }
//                   />
//                 </div>
//               </div>
//             </div>

//             <button
//               onClick={clearAllFilters}
//               className="w-full mt-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
//             >
//               Limpiar Filtros
//             </button>
//           </div>

//           {/* Main Content */}
//           <div className="flex-1">
//             {/* Results Header */}
//             <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//               <div className="text-gray-700">
//                 <span className="font-semibold text-blue-600">
//                   1-{Math.min(24, filteredProducts.length)}
//                 </span>{" "}
//                 de{" "}
//                 <span className="font-semibold text-blue-600">
//                   {filteredProducts.length}
//                 </span>{" "}
//                 resultados para{" "}
//                 <strong>
//                   "{getCategoryName(categoryFilter) || "Todos los productos"}"
//                 </strong>
//               </div>
//               <select
//                 className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white"
//                 value={sortBy}
//                 onChange={(e) => setSortBy(e.target.value)}
//               >
//                 <option value="featured">Ordenar por: Destacados</option>
//                 <option value="price-low">Precio: menor a mayor</option>
//                 <option value="price-high">Precio: mayor a menor</option>
//                 <option value="rating">Mejor calificados</option>
//                 <option value="newest">Más recientes</option>
//               </select>
//             </div>

//             {/* Product Grid */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//               {filteredProducts.map((product) => (
//                 <ProductCard key={product.id} product={product} />
//               ))}
//             </div>

//             {filteredProducts.length === 0 && (
//               <div className="text-center py-12">
//                 <div className="text-6xl mb-4">😔</div>
//                 <p className="text-gray-500 text-lg mb-2">
//                   No se encontraron productos con los filtros seleccionados.
//                 </p>
//                 <p className="text-gray-400 text-sm mb-6">
//                   Intenta ajustar tus filtros o buscar algo diferente.
//                 </p>
//                 <div className="flex flex-col sm:flex-row gap-3 justify-center">
//                   <button
//                     onClick={clearAllFilters}
//                     className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
//                   >
//                     Limpiar Filtros
//                   </button>
//                   <Link
//                     to="/categorias"
//                     className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
//                   >
//                     Ver todas las categorías
//                   </Link>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default BusquedaProducto;

import React, { useState, useMemo, useEffect } from "react";
import { ChevronDown, Filter, Star, X } from "lucide-react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import Categorias from "../components/Categorias";
import Header from "../components/Heaader";
import Footer from "../components/Footer";

const BusquedaProducto = () => {
  // Estados para manejar los filtros seleccionados
  const [selectedFilters, setSelectedFilters] = useState({
    brands: [],
    productTypes: [],
    priceRanges: [],
    connectivity: [],
  });
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [sortBy, setSortBy] = useState("");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Estado para manejar carga de API

  // Obtener parámetros de la URL
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryParam = searchParams.get("category") || "";
  const searchQuery = searchParams.get("q") || "";

  const [categoryFilter, setCategoryFilter] = useState(categoryParam);
  const [searchFilter, setSearchFilter] = useState(searchQuery);

  // Datos de productos - ESTO DEBERÍA SER REEMPLAZADO POR LA LLAMADA A LA API
  const [allProducts, setAllProducts] = useState([]);

  // Función para obtener productos de la API
  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      // AQUÍ SE DEBE HACER LA LLAMADA A LA API
      // Ejemplo:
      // const response = await fetch('https://api.tutienda.com/productos');
      // const data = await response.json();
      // setAllProducts(data);

      // Datos de ejemplo mientras se implementa la API
      const mockProducts = [
        {
          id: 1,
          title: "Mouse Gaming Logitech G Pro X Superlight Inalámbrico RGB",
          brand: "Logitech",
          type: "Mouse",
          category: "PERIFÉRICOS",
          categoryColor: "bg-purple-500",
          price: 1799,
          originalPrice: 2199,
          discount: 18,
          rating: 5,
          reviewCount: 1247,
          image: "🖱️",
          connectivity: "Inalámbrico",
        },
        {
          id: 2,
          title: "Teclado Mecánico Corsair K95 RGB Platinum",
          brand: "Corsair",
          type: "Teclado",
          category: "PERIFÉRICOS",
          categoryColor: "bg-purple-500",
          price: 2499,
          originalPrice: 2899,
          discount: 14,
          rating: 5,
          reviewCount: 892,
          image: "⌨️",
          connectivity: "USB",
        },
        {
          id: 3,
          title: "Audífonos Gaming Razer BlackShark V2 Pro",
          brand: "Razer",
          type: "Audífonos",
          category: "AUDIO",
          categoryColor: "bg-blue-400",
          price: 1999,
          originalPrice: 2299,
          discount: 13,
          rating: 4,
          reviewCount: 567,
          image: "🎧",
          connectivity: "Inalámbrico",
        },
        {
          id: 4,
          title: "Consola PlayStation 5 Standard Edition",
          brand: "Sony",
          type: "Consola",
          category: "GAMING",
          categoryColor: "bg-pink-500",
          price: 12999,
          originalPrice: 14999,
          discount: 13,
          rating: 5,
          reviewCount: 2341,
          image: "🎮",
          connectivity: "WiFi",
        },
        {
          id: 5,
          title: "Laptop Gaming ASUS ROG Strix G15",
          brand: "ASUS",
          type: "Laptop",
          category: "LAPTOPS",
          categoryColor: "bg-indigo-500",
          price: 25999,
          originalPrice: 29999,
          discount: 13,
          rating: 4,
          reviewCount: 423,
          image: "💻",
          connectivity: "WiFi",
        },
        {
          id: 6,
          title: 'Monitor Gamer Samsung Odyssey G7 27" QHD 240Hz',
          brand: "Samsung",
          type: "Monitor",
          category: "MONITORES",
          categoryColor: "bg-green-500",
          price: 8999,
          originalPrice: 10999,
          discount: 18,
          rating: 5,
          reviewCount: 1562,
          image: "🖥️",
          connectivity: "HDMI/DisplayPort",
        },
        {
          id: 7,
          title: "Tarjeta Gráfica NVIDIA RTX 3080 Ti 12GB GDDR6X",
          brand: "NVIDIA",
          type: "Tarjeta Gráfica",
          category: "COMPONENTES",
          categoryColor: "bg-yellow-500",
          price: 18999,
          originalPrice: 21999,
          discount: 14,
          rating: 5,
          reviewCount: 784,
          image: "🎛️",
          connectivity: "PCIe",
        },
        {
          id: 8,
          title: "SSD Kingston NV1 1TB NVMe PCIe",
          brand: "Kingston",
          type: "Almacenamiento",
          category: "COMPONENTES",
          categoryColor: "bg-yellow-500",
          price: 1299,
          originalPrice: 1599,
          discount: 19,
          rating: 4,
          reviewCount: 432,
          image: "💾",
          connectivity: "NVMe",
        },
        {
          id: 9,
          title: "Silla Gamer Cougar Armor One RGB",
          brand: "Cougar",
          type: "Silla",
          category: "ACCESORIOS",
          categoryColor: "bg-red-500",
          price: 4999,
          originalPrice: 5999,
          discount: 17,
          rating: 4,
          reviewCount: 287,
          image: "🪑",
          connectivity: "N/A",
        },
        {
          id: 10,
          title: "Webcam Logitech C920 HD Pro 1080p",
          brand: "Logitech",
          type: "Webcam",
          category: "PERIFÉRICOS",
          categoryColor: "bg-purple-500",
          price: 1499,
          originalPrice: 1799,
          discount: 17,
          rating: 4,
          reviewCount: 653,
          image: "📷",
          connectivity: "USB",
        },
        {
          id: 11,
          title: "Router WiFi 6 ASUS RT-AX82U AX5400",
          brand: "ASUS",
          type: "Router",
          category: "REDES",
          categoryColor: "bg-teal-500",
          price: 3999,
          originalPrice: 4599,
          discount: 13,
          rating: 4,
          reviewCount: 321,
          image: "📡",
          connectivity: "WiFi/Ethernet",
        },
        {
          id: 12,
          title: "Micrófono HyperX QuadCast USB",
          brand: "HyperX",
          type: "Micrófono",
          category: "AUDIO",
          categoryColor: "bg-blue-400",
          price: 2499,
          originalPrice: 2999,
          discount: 17,
          rating: 5,
          reviewCount: 412,
          image: "🎤",
          connectivity: "USB",
        },
        {
          id: 13,
          title: "Mouse Razer DeathAdder V2 Mini",
          brand: "Razer",
          type: "Mouse",
          category: "PERIFÉRICOS",
          categoryColor: "bg-purple-500",
          price: 799,
          originalPrice: 999,
          discount: 20,
          rating: 4,
          reviewCount: 309,
          image: "🖱️",
          connectivity: "USB",
        },
        {
          id: 14,
          title: "Teclado Logitech MX Keys Inalámbrico",
          brand: "Logitech",
          type: "Teclado",
          category: "PERIFÉRICOS",
          categoryColor: "bg-purple-500",
          price: 1799,
          originalPrice: 2099,
          discount: 14,
          rating: 5,
          reviewCount: 948,
          image: "⌨️",
          connectivity: "Bluetooth/USB",
        },
        {
          id: 15,
          title: "Audífonos Sony WH-1000XM4",
          brand: "Sony",
          type: "Audífonos",
          category: "AUDIO",
          categoryColor: "bg-blue-400",
          price: 4999,
          originalPrice: 5999,
          discount: 17,
          rating: 5,
          reviewCount: 1823,
          image: "🎧",
          connectivity: "Bluetooth",
        },
        {
          id: 16,
          title: "Consola Nintendo Switch OLED Edition",
          brand: "Nintendo",
          type: "Consola",
          category: "GAMING",
          categoryColor: "bg-pink-500",
          price: 8499,
          originalPrice: 9499,
          discount: 11,
          rating: 5,
          reviewCount: 1765,
          image: "🎮",
          connectivity: "WiFi",
        },
        {
          id: 17,
          title: "Laptop Dell XPS 13 Touchscreen",
          brand: "Dell",
          type: "Laptop",
          category: "LAPTOPS",
          categoryColor: "bg-indigo-500",
          price: 30999,
          originalPrice: 33999,
          discount: 9,
          rating: 4,
          reviewCount: 533,
          image: "💻",
          connectivity: "WiFi",
        },
        {
          id: 18,
          title: "Monitor LG UltraGear 34'' Curvo QHD 160Hz",
          brand: "LG",
          type: "Monitor",
          category: "MONITORES",
          categoryColor: "bg-green-500",
          price: 10499,
          originalPrice: 12999,
          discount: 19,
          rating: 5,
          reviewCount: 684,
          image: "🖥️",
          connectivity: "HDMI/DisplayPort",
        },
        {
          id: 19,
          title: "Procesador AMD Ryzen 9 7900X",
          brand: "AMD",
          type: "Procesador",
          category: "COMPONENTES",
          categoryColor: "bg-yellow-500",
          price: 9999,
          originalPrice: 11999,
          discount: 17,
          rating: 5,
          reviewCount: 974,
          image: "🧠",
          connectivity: "AM5",
        },
        {
          id: 20,
          title: "Disco Duro Externo Seagate 2TB USB 3.0",
          brand: "Seagate",
          type: "Almacenamiento",
          category: "COMPONENTES",
          categoryColor: "bg-yellow-500",
          price: 1399,
          originalPrice: 1699,
          discount: 18,
          rating: 4,
          reviewCount: 502,
          image: "💽",
          connectivity: "USB 3.0",
        },
        {
          id: 21,
          title: "Silla Ergonómica Secretlab TITAN Evo 2022",
          brand: "Secretlab",
          type: "Silla",
          category: "ACCESORIOS",
          categoryColor: "bg-red-500",
          price: 11999,
          originalPrice: 13999,
          discount: 14,
          rating: 5,
          reviewCount: 628,
          image: "🪑",
          connectivity: "N/A",
        },
        {
          id: 22,
          title: "Webcam Razer Kiyo Pro Full HD HDR",
          brand: "Razer",
          type: "Webcam",
          category: "PERIFÉRICOS",
          categoryColor: "bg-purple-500",
          price: 2499,
          originalPrice: 2899,
          discount: 14,
          rating: 4,
          reviewCount: 342,
          image: "📷",
          connectivity: "USB",
        },
        {
          id: 23,
          title: "Router TP-Link Archer AX50 WiFi 6",
          brand: "TP-Link",
          type: "Router",
          category: "REDES",
          categoryColor: "bg-teal-500",
          price: 2799,
          originalPrice: 3199,
          discount: 13,
          rating: 4,
          reviewCount: 299,
          image: "📡",
          connectivity: "WiFi/Ethernet",
        },
        {
          id: 24,
          title: "Micrófono Blue Yeti X Profesional USB",
          brand: "Blue",
          type: "Micrófono",
          category: "AUDIO",
          categoryColor: "bg-blue-400",
          price: 3499,
          originalPrice: 3999,
          discount: 13,
          rating: 5,
          reviewCount: 728,
          image: "🎤",
          connectivity: "USB",
        },
      ];

      setAllProducts(mockProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Efecto para cargar productos al montar el componente
  useEffect(() => {
    fetchProducts();
  }, []);

  // Actualizar filtros cuando cambia la URL
  useEffect(() => {
    setCategoryFilter(categoryParam);
    setSearchFilter(searchQuery);
  }, [location.search]);

  // Opciones de filtros disponibles
  const filterOptions = {
    brands: [
      { id: "logitech", name: "Logitech", count: 47 },
      { id: "razer", name: "Razer", count: 23 },
      { id: "corsair", name: "Corsair", count: 31 },
      { id: "sony", name: "Sony", count: 18 },
      { id: "asus", name: "ASUS", count: 25 },
      { id: "samsung", name: "Samsung", count: 15 },
      { id: "nvidia", name: "NVIDIA", count: 12 },
      { id: "kingston", name: "Kingston", count: 19 },
      { id: "cougar", name: "Cougar", count: 8 },
      { id: "hyperx", name: "HyperX", count: 14 },
    ],
    productTypes: [
      { id: "mouse", name: "Mouse", count: 89 },
      { id: "teclado", name: "Teclados", count: 67 },
      { id: "audifonos", name: "Audífonos", count: 54 },
      { id: "consola", name: "Consolas", count: 32 },
      { id: "laptop", name: "Laptops", count: 28 },
      { id: "monitor", name: "Monitores", count: 23 },
      { id: "tarjeta gráfica", name: "Tarjetas Gráficas", count: 17 },
      { id: "almacenamiento", name: "Almacenamiento", count: 35 },
      { id: "silla", name: "Sillas", count: 12 },
      { id: "webcam", name: "Webcams", count: 19 },
      { id: "router", name: "Routers", count: 14 },
      { id: "micrófono", name: "Micrófonos", count: 21 },
    ],
    priceRanges: [
      { id: "range1", name: "$100 - $500", count: 43, min: 100, max: 500 },
      { id: "range2", name: "$500 - $1,000", count: 67, min: 500, max: 1000 },
      {
        id: "range3",
        name: "$1,000 - $2,000",
        count: 38,
        min: 1000,
        max: 2000,
      },
      {
        id: "range4",
        name: "$2,000 - $5,000",
        count: 24,
        min: 2000,
        max: 5000,
      },
      { id: "range5", name: "$5,000+", count: 15, min: 5000, max: 999999 },
    ],
    connectivity: [
      { id: "inalambrico", name: "Inalámbrico", count: 92 },
      { id: "usb", name: "USB", count: 156 },
      { id: "wifi", name: "WiFi", count: 48 },
      { id: "hdmi/displayport", name: "HDMI/DisplayPort", count: 32 },
      { id: "nvme", name: "NVMe", count: 18 },
      { id: "ethernet", name: "Ethernet", count: 27 },
    ],
  };

  // Manejar cambios en los filtros
  const handleFilterChange = (category, filterId) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [category]: prev[category].includes(filterId)
        ? prev[category].filter((id) => id !== filterId)
        : [...prev[category], filterId],
    }));
  };

  // Filtrar productos basado en los filtros seleccionados
  const filteredProducts = useMemo(() => {
    let filtered = allProducts;

    // Filtro por categoría
    if (categoryFilter) {
      filtered = filtered.filter(
        (product) =>
          product.category.toLowerCase() === categoryFilter.toLowerCase()
      );
    }

    // Filtro por búsqueda
    if (searchFilter) {
      const searchTerm = searchFilter.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(searchTerm) ||
          product.brand.toLowerCase().includes(searchTerm) ||
          product.type.toLowerCase().includes(searchTerm)
      );
    }

    // Filtro por marcas
    if (selectedFilters.brands.length > 0) {
      filtered = filtered.filter((product) =>
        selectedFilters.brands.includes(product.brand.toLowerCase())
      );
    }

    // Filtro por tipos de producto
    if (selectedFilters.productTypes.length > 0) {
      filtered = filtered.filter((product) =>
        selectedFilters.productTypes.includes(product.type.toLowerCase())
      );
    }

    // Filtro por rangos de precio
    if (selectedFilters.priceRanges.length > 0) {
      filtered = filtered.filter((product) => {
        return selectedFilters.priceRanges.some((rangeId) => {
          const range = filterOptions.priceRanges.find((r) => r.id === rangeId);
          return product.price >= range.min && product.price <= range.max;
        });
      });
    }

    // Filtro por conectividad
    if (selectedFilters.connectivity.length > 0) {
      filtered = filtered.filter((product) =>
        selectedFilters.connectivity.includes(
          product.connectivity.toLowerCase().replace("á", "a")
        )
      );
    }

    // Filtro por rango de precio personalizado
    if (priceRange.min || priceRange.max) {
      filtered = filtered.filter((product) => {
        const min = priceRange.min ? parseInt(priceRange.min) : 0;
        const max = priceRange.max ? parseInt(priceRange.max) : 999999;
        return product.price >= min && product.price <= max;
      });
    }

    // Ordenar productos
    if (sortBy) {
      switch (sortBy) {
        case "price-low":
          filtered.sort((a, b) => a.price - b.price);
          break;
        case "price-high":
          filtered.sort((a, b) => b.price - a.price);
          break;
        case "rating":
          filtered.sort((a, b) => b.rating - a.rating);
          break;
        case "newest":
          // Asumiendo que hay una propiedad 'dateAdded'
          filtered.sort(
            (a, b) => new Date(b.dateAdded) - new Date(a.dateAdded)
          );
          break;
        default:
          // Orden por defecto (destacados)
          filtered.sort(
            (a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount
          );
      }
    }

    return filtered;
  }, [
    allProducts,
    categoryFilter,
    searchFilter,
    selectedFilters,
    priceRange,
    sortBy,
  ]);

  // Limpiar todos los filtros
  const clearAllFilters = () => {
    setSelectedFilters({
      brands: [],
      productTypes: [],
      priceRanges: [],
      connectivity: [],
    });
    setPriceRange({ min: "", max: "" });
  };

  // Obtener nombre de categoría para mostrar
  const getCategoryName = (categoryValue) => {
    const category = Categorias.find(
      (cat) => cat.categoryValue.toLowerCase() === categoryValue.toLowerCase()
    );
    return category ? category.label : categoryValue;
  };

  // Componente de sección de filtro reutilizable
  const FilterSection = ({ title, category, options }) => (
    <div className="bg-white rounded-lg shadow-sm mb-4">
      <div className="p-4 border-b border-gray-200">
        <h3 className="font-semibold text-gray-900">{title}</h3>
      </div>
      <div className="p-4 space-y-3">
        {options.map((option) => (
          <label
            key={option.id}
            className="flex items-center cursor-pointer hover:bg-gray-50 p-1 rounded"
          >
            <input
              type="checkbox"
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              checked={selectedFilters[category].includes(option.id)}
              onChange={() => handleFilterChange(category, option.id)}
            />
            <span className="ml-3 text-sm text-gray-700 flex-1">
              {option.name}
            </span>
            <span className="text-xs text-gray-500">({option.count})</span>
          </label>
        ))}
      </div>
    </div>
  );

  // Componente de tarjeta de producto
  const ProductCard = ({ product }) => (
    <Link to={`/producto/${product.id}`} className="block">
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-4 cursor-pointer hover:-translate-y-1 transform transition-transform h-full">
        <div className="w-full h-48 bg-gray-100 rounded-lg mb-3 flex items-center justify-center text-4xl">
          {product.image}
        </div>
        <div
          className={`inline-block px-2 py-1 rounded-full text-xs font-medium text-white mb-2 ${product.categoryColor}`}
        >
          {product.category}
        </div>
        <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2 leading-tight">
          {product.title}
        </h3>
        <div className="flex items-center mb-2">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < product.rating ? "fill-current" : ""
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-2">
            ({product.reviewCount.toLocaleString()})
          </span>
        </div>
        <div className="flex items-center space-x-2">
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              ${product.originalPrice.toLocaleString()}
            </span>
          )}
          <span className="text-lg font-bold text-blue-600">
            ${product.price.toLocaleString()}
          </span>
          {product.discount > 0 && (
            <span className="text-xs font-semibold text-red-600">
              {product.discount}% OFF
            </span>
          )}
        </div>
      </div>
    </Link>
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      {/* Migas de pan */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-7xl mx-auto">
          <nav className="text-sm text-gray-600">
            <Link to="/" className="text-blue-600 hover:underline">
              Inicio
            </Link>
            <span className="mx-2">›</span>
            <span className="font-medium text-gray-900">
              {getCategoryName(categoryFilter) || "Todos los productos"}
            </span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent mb-4"></div>
            <p className="text-gray-600">Cargando productos...</p>
          </div>
        ) : (
          <div className="flex gap-6">
            {/* Botón para mostrar filtros en móvil */}
            <button
              className="lg:hidden fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg z-50"
              onClick={() => setShowMobileFilters(true)}
            >
              <Filter className="w-6 h-6" />
            </button>

            {/* Overlay de filtros para móvil */}
            {showMobileFilters && (
              <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50">
                <div className="bg-white w-80 h-full overflow-y-auto">
                  <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="font-semibold text-lg">Filtros</h2>
                    <button onClick={() => setShowMobileFilters(false)}>
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                  <div className="p-4">
                    <FilterSection
                      title="Marcas"
                      category="brands"
                      options={filterOptions.brands}
                    />
                    <FilterSection
                      title="Tipos de Producto"
                      category="productTypes"
                      options={filterOptions.productTypes}
                    />
                    <FilterSection
                      title="Rangos de Precio"
                      category="priceRanges"
                      options={filterOptions.priceRanges}
                    />
                    <FilterSection
                      title="Conectividad"
                      category="connectivity"
                      options={filterOptions.connectivity}
                    />
                    <button
                      onClick={clearAllFilters}
                      className="w-full mt-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                    >
                      Limpiar Filtros
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Sidebar para escritorio */}
            <div className="hidden lg:block w-80 flex-shrink-0">
              <FilterSection
                title="Marcas"
                category="brands"
                options={filterOptions.brands}
              />
              <FilterSection
                title="Tipos de Producto"
                category="productTypes"
                options={filterOptions.productTypes}
              />
              <FilterSection
                title="Rangos de Precio"
                category="priceRanges"
                options={filterOptions.priceRanges}
              />
              <FilterSection
                title="Conectividad"
                category="connectivity"
                options={filterOptions.connectivity}
              />

              {/* Filtro personalizado de precio */}
              <div className="bg-white rounded-lg shadow-sm mb-4">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900">
                    Rango de Precio
                  </h3>
                </div>
                <div className="p-4 space-y-3">
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      placeholder="Min"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      value={priceRange.min}
                      onChange={(e) =>
                        setPriceRange({ ...priceRange, min: e.target.value })
                      }
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      value={priceRange.max}
                      onChange={(e) =>
                        setPriceRange({ ...priceRange, max: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={clearAllFilters}
                className="w-full mt-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              >
                Limpiar Filtros
              </button>
            </div>

            {/* Contenido principal */}
            <div className="flex-1">
              {/* Encabezado de resultados */}
              <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="text-gray-700">
                  <span className="font-semibold text-blue-600">
                    1-{Math.min(24, filteredProducts.length)}
                  </span>{" "}
                  de{" "}
                  <span className="font-semibold text-blue-600">
                    {filteredProducts.length}
                  </span>{" "}
                  resultados para{" "}
                  <strong>
                    "{getCategoryName(categoryFilter) || "Todos los productos"}"
                  </strong>
                </div>
                <select
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="featured">Ordenar por: Destacados</option>
                  <option value="price-low">Precio: menor a mayor</option>
                  <option value="price-high">Precio: mayor a menor</option>
                  <option value="rating">Mejor calificados</option>
                  <option value="newest">Más recientes</option>
                </select>
              </div>

              {/* Grid de productos */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {filteredProducts.length === 0 && !isLoading && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">😔</div>
                  <p className="text-gray-500 text-lg mb-2">
                    No se encontraron productos con los filtros seleccionados.
                  </p>
                  <p className="text-gray-400 text-sm mb-6">
                    Intenta ajustar tus filtros o buscar algo diferente.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      onClick={clearAllFilters}
                      className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Limpiar Filtros
                    </button>
                    <Link
                      to="/categorias"
                      className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                    >
                      Ver todas las categorías
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default BusquedaProducto;
