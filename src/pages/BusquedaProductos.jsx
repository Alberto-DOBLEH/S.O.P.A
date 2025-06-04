// import React, { useState, useMemo, useEffect } from "react";
// import { ChevronDown, Filter, Star, X } from "lucide-react";
// import { useLocation, useNavigate, Link } from "react-router-dom";
// import Categorias from "../components/Categorias";
// import Header from "../components/Heaader";
// import Footer from "../components/Footer";
// import { useCurrency } from "../CurrencyContext";
// import { parse } from "dotenv";

// const BusquedaProducto = () => {
//   const { currency, conversionRate } = useCurrency();
//   const [selectedFilters, setSelectedFilters] = useState({
//     brands: [],
//     productTypes: [],
//     priceRanges: [],
//     categories: [],
//   });
//   const [priceRange, setPriceRange] = useState({ min: "", max: "" });
//   const [sortBy, setSortBy] = useState("");
//   const [showMobileFilters, setShowMobileFilters] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);
//   const categoryParam = searchParams.get("category") || "";
//   const searchQuery = searchParams.get("q") || "";
//   const [categoryFilter, setCategoryFilter] = useState(categoryParam);
//   const [searchFilter, setSearchFilter] = useState(searchQuery);
//   const [allProducts, setAllProducts] = useState([]);

//   const fetchProducts = async () => {
//     setIsLoading(true);
//     try {
//       const response = await fetch(`http://localhost:3001/api/productos`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//       if (!response.ok) {
//         throw new Error("Error al obtener productos, tilín");
//       }
//       const data = await response.json();

//       console.log("Datos obtenidos de la API:", data);
//       const mappedProducts = data.map((product) => ({
//         id: product.id_producto,
//         title: product.nombre,
//         brand: product.marca || "Genérico",
//         type: product.categoría.split(" ")[0].toLowerCase(), // Derivado de categoría
//         category: product.categoría,
//         categoryColor: product.color
//           ? `bg-${product.color.toLowerCase()}-500`
//           : "bg-gray-500",
//         price: parseFloat(product.precio),
//         originalPrice: product.precio_original
//           ? parseFloat(product.precio_original)
//           : null,
//         discount: product.descuento || 0,
//         rating: parseFloat(product.reseñas) || 0,
//         reviewCount: parseInt(product.conteo_reseñas) || 0,
//         image: product.imagen,
//         stock: parseInt(product.stock) || 0,
//         description: product.descripción || "Sin descripción, tilín",
//         quantity: parseInt(product.conteo_ventas) || 1,
//         numeroVentas: parseInt(product.conteo_vendidos) || 0,
//         condicion: product.NU || "Nuevo",
//       }));
//       setAllProducts(mappedProducts);
//     } catch (error) {
//       console.error("Error fetching products from API:", error);
//       const mockProducts = [
//         {
//           id_producto: 1,
//           nombre: "Zapatillas Nike Air Max",
//           descripción: "Zapatillas cómodas y estilizadas, tilín",
//           marca: "Nike",
//           categoría: "MODA Calzado",
//           color: "Red",
//           precio: 1299,
//           precio_original: 1599,
//           descuento: 19,
//           reseñas: 4.5,
//           conteo_reseñas: 850,
//           imagen: "👟",
//           stock: 15,
//           conteo_vendidos: 1200,
//           NU: "Nuevo",
//         },
//         {
//           id_producto: 2,
//           nombre: "Sartén Antiadherente Tefal",
//           descripción: "Ideal para cocinar sin complicaciones, tilín",
//           marca: "Tefal",
//           categoría: "HOGAR Cocina",
//           color: "Black",
//           precio: 599,
//           precio_original: 799,
//           descuento: 25,
//           reseñas: 4.2,
//           conteo_reseñas: 320,
//           imagen: "🍳",
//           stock: 20,
//           conteo_vendidos: 500,
//           NU: "Nuevo",
//         },
//       ];
//       const mappedMock = mockProducts.map((product) => ({
//         id: product.id_producto,
//         title: product.nombre,
//         brand: product.marca || "Genérico",
//         type: product.categoría.split(" ")[0].toLowerCase(),
//         category: product.categoría,
//         categoryColor: product.color
//           ? `bg-${product.color.toLowerCase()}-500`
//           : "bg-gray-500",
//         price: parseFloat(product.precio),
//         originalPrice: product.precio_original
//           ? parseFloat(product.precio_original)
//           : null,
//         discount: product.descuento || 0,
//         rating: parseFloat(product.reseñas) || 0,
//         reviewCount: parseInt(product.conteo_reseñas) || 0,
//         image: product.imagen,
//         stock: parseInt(product.stock) || 0,
//         description: product.descripción || "Sin descripción, tilín",
//         quantity: 1,
//         numeroVentas: parseInt(product.conteo_vendidos) || 0,
//         condicion: product.NU || "Nuevo",
//       }));
//       setAllProducts(mappedMock);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   useEffect(() => {
//     setCategoryFilter(categoryParam);
//     setSearchFilter(searchQuery);
//   }, [location.search]);

//   const formatPrice = (price) => {
//     const rate =
//       typeof conversionRate === "number" && conversionRate > 0
//         ? conversionRate
//         : 1;
//     const convertedPrice = typeof price === "number" ? price * rate : 0;
//     return currency === "USD"
//       ? `US$${convertedPrice.toFixed(2)}`
//       : currency === "EUR"
//       ? `€${convertedPrice.toFixed(2)}`
//       : currency === "COP"
//       ? `COP$${convertedPrice.toFixed(2)}`
//       : `$${convertedPrice.toFixed(2)}`;
//   };

//   const filterOptions = useMemo(() => {
//     const rate =
//       typeof conversionRate === "number" && conversionRate > 0
//         ? conversionRate
//         : 1;
//     return {
//       brands: [
//         { id: "nike", name: "Nike", count: 45 },
//         { id: "tefal", name: "Tefal", count: 20 },
//         { id: "lego", name: "LEGO", count: 30 },
//       ],
//       productTypes: [
//         { id: "moda", name: "Moda", count: 70 },
//         { id: "hogar", name: "Hogar", count: 50 },
//         { id: "juguetes", name: "Juguetes", count: 60 },
//       ],
//       priceRanges: [
//         {
//           id: "range1",
//           name: `${formatPrice(100)} - ${formatPrice(500)}`,
//           count: 60,
//           min: 100,
//           max: 500,
//         },
//         {
//           id: "range2",
//           name: `${formatPrice(500)} - ${formatPrice(1000)}`,
//           count: 45,
//           min: 500,
//           max: 1000,
//         },
//         {
//           id: "range3",
//           name: `${formatPrice(1000)} - ${formatPrice(2000)}`,
//           count: 30,
//           min: 1000,
//           max: 2000,
//         },
//         {
//           id: "range4",
//           name: `${formatPrice(2000)}+`,
//           count: 15,
//           min: 2000,
//           max: 999999,
//         },
//       ],
//       categories: [
//         { id: "moda", name: "Moda", count: 150 },
//         { id: "hogar", name: "Hogar", count: 90 },
//         { id: "juguetes", name: "Juguetes", count: 70 },
//       ],
//     };
//   }, [currency, conversionRate]);

//   const handleFilterChange = (category, filterId) => {
//     setSelectedFilters((prev) => ({
//       ...prev,
//       [category]: prev[category].includes(filterId)
//         ? prev[category].filter((id) => id !== filterId)
//         : [...prev[category], filterId],
//     }));
//   };

//   const filteredProducts = useMemo(() => {
//     let filtered = allProducts;
//     if (categoryFilter) {
//       filtered = filtered.filter(
//         (product) =>
//           product.category.toLowerCase() === categoryFilter.toLowerCase()
//       );
//     }
//     if (searchFilter) {
//       const searchTerm = searchFilter.toLowerCase();
//       filtered = filtered.filter(
//         (product) =>
//           product.title.toLowerCase().includes(searchTerm) ||
//           product.brand.toLowerCase().includes(searchTerm) ||
//           product.type.toLowerCase().includes(searchTerm)
//       );
//     }
//     if (selectedFilters.brands.length > 0) {
//       filtered = filtered.filter((product) =>
//         selectedFilters.brands.includes(product.brand.toLowerCase())
//       );
//     }
//     if (selectedFilters.productTypes.length > 0) {
//       filtered = filtered.filter((product) =>
//         selectedFilters.productTypes.includes(product.type)
//       );
//     }
//     if (selectedFilters.priceRanges.length > 0) {
//       filtered = filtered.filter((product) =>
//         selectedFilters.priceRanges.some((rangeId) => {
//           const range = filterOptions.priceRanges.find((r) => r.id === rangeId);
//           return product.price >= range.min && product.price <= range.max;
//         })
//       );
//     }
//     if (selectedFilters.categories.length > 0) {
//       filtered = filtered.filter((product) =>
//         selectedFilters.categories.includes(
//           product.category.toLowerCase().split(" ")[0]
//         )
//       );
//     }
//     if (priceRange.min || priceRange.max) {
//       filtered = filtered.filter((product) => {
//         const rate =
//           typeof conversionRate === "number" && conversionRate > 0
//             ? conversionRate
//             : 1;
//         const min = priceRange.min ? parseFloat(priceRange.min) / rate : 0;
//         const max = priceRange.max ? parseFloat(priceRange.max) / rate : 999999;
//         return product.price >= min && product.price <= max;
//       });
//     }
//     if (sortBy) {
//       switch (sortBy) {
//         case "price-low":
//           filtered.sort((a, b) => a.price - b.price);
//           break;
//         case "price-high":
//           filtered.sort((a, b) => b.price - a.price);
//           break;
//         case "rating":
//           filtered.sort((a, b) => b.rating - a.rating);
//           break;
//         case "newest":
//           filtered.sort(
//             (a, b) => new Date(b.dateAdded) - new Date(a.dateAdded)
//           );
//           break;
//         default:
//           filtered.sort(
//             (a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount
//           );
//       }
//     }
//     return filtered;
//   }, [
//     allProducts,
//     categoryFilter,
//     searchFilter,
//     selectedFilters,
//     priceRange,
//     sortBy,
//     conversionRate,
//   ]);

//   const clearAllFilters = () => {
//     setSelectedFilters({
//       brands: [],
//       productTypes: [],
//       priceRanges: [],
//       categories: [],
//     });
//     setPriceRange({ min: "", max: "" });
//   };

//   const getCategoryName = (categoryValue) => {
//     const category = Categorias.find(
//       (cat) => cat.categoryValue.toLowerCase() === categoryValue.toLowerCase()
//     );
//     return category ? category.label : categoryValue;
//   };

//   const FilterSection = ({ title, category, options }) => (
//     <div className="bg-white rounded-xl shadow-sm mb-4">
//       <div className="p-3 border-b border-gray-200">
//         <h3 className="font-semibold text-gray-900 text-sm">{title}</h3>
//       </div>
//       <div className="p-3 space-y-2">
//         {options.map((option) => (
//           <label
//             key={option.id}
//             className="flex items-center cursor-pointer p-1 rounded hover:bg-gray-50"
//           >
//             <input
//               type="checkbox"
//               className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//               checked={selectedFilters[category].includes(option.id)}
//               onChange={() => handleFilterChange(category, option.id)}
//             />
//             <span className="ml-2 text-sm text-gray-700 flex-1">
//               {option.name}
//             </span>
//             <span className="text-xs text-gray-500">({option.count})</span>
//           </label>
//         ))}
//       </div>
//     </div>
//   );

//   const ProductCard = ({ product }) => (
//     <Link to={`/producto/${product.id}`} className="block">
//       <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-3 cursor-pointer hover:-translate-y-1 h-full">
//         <div className="w-full h-32 bg-gray-100 rounded-lg mb-2 flex items-center justify-center text-3xl">
//           {product.image}
//         </div>
//         <div
//           className={`inline-block px-2 py-1 rounded-full text-xs font-medium text-white mb-1 ${product.categoryColor}`}
//         >
//           {product.category}
//         </div>
//         <h3 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2 leading-tight">
//           {product.title}
//         </h3>
//         <div className="flex items-center mb-1">
//           <div className="flex text-yellow-400">
//             {[...Array(5)].map((_, i) => (
//               <Star
//                 key={i}
//                 className={`w-3 h-3 ${
//                   i < product.rating ? "fill-current" : ""
//                 }`}
//               />
//             ))}
//           </div>
//           <span className="text-xs text-gray-500 ml-1">
//             ({product.reviewCount.toLocaleString()})
//           </span>
//         </div>
//         <div className="flex items-center space-x-1">
//           {product.originalPrice && (
//             <span className="text-xs text-gray-500 line-through">
//               {formatPrice(product.originalPrice)}
//             </span>
//           )}
//           <span className="text-md font-bold text-blue-600">
//             {formatPrice(product.price)}
//           </span>
//           {product.discount > 0 && (
//             <span className="text-xs font-semibold text-red-600">
//               {product.discount}% OFF
//             </span>
//           )}
//           <span className="text-xs text-gray-500">
//             {product.condicion === "Nuevo" ? "Nuevo" : "Usado"}
//           </span>
//         </div>
//       </div>
//     </Link>
//   );

//   return (
//     <div className="bg-gray-50 min-h-screen">
//       <Header />
//       <div className="bg-white border-b border-gray-200 px-4 py-2">
//         <div className="max-w-7xl mx-auto">
//           <nav className="text-sm text-gray-600">
//             <Link to="/" className="text-blue-600 hover:underline">
//               Inicio
//             </Link>
//             <span className="mx-1">›</span>
//             <span className="font-medium text-gray-900">
//               {getCategoryName(categoryFilter) || "Todo lo que quieras, tilín"}
//             </span>
//           </nav>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 py-4">
//         {isLoading ? (
//           <div className="text-center py-10">
//             <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent mb-2"></div>
//             <p className="text-gray-600">Cargando productos</p>
//           </div>
//         ) : (
//           <div className="flex gap-4">
//             <button
//               className="lg:hidden fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg z-50"
//               onClick={() => setShowMobileFilters(true)}
//             >
//               <Filter className="w-6 h-6" />
//             </button>

//             {showMobileFilters && (
//               <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50">
//                 <div className="bg-white w-80 h-full overflow-y-auto">
//                   <div className="p-3 border-b border-gray-200 flex justify-between items-center">
//                     <h2 className="font-semibold text-lg">Filtros, tilín</h2>
//                     <button onClick={() => setShowMobileFilters(false)}>
//                       <X className="w-6 h-6" />
//                     </button>
//                   </div>
//                   <div className="p-3">
//                     <FilterSection
//                       title="Marcas"
//                       category="brands"
//                       options={filterOptions.brands}
//                     />
//                     <FilterSection
//                       title="Tipos de Producto"
//                       category="productTypes"
//                       options={filterOptions.productTypes}
//                     />
//                     <FilterSection
//                       title="Rangos de Precio"
//                       category="priceRanges"
//                       options={filterOptions.priceRanges}
//                     />
//                     <FilterSection
//                       title="Categorías"
//                       category="categories"
//                       options={filterOptions.categories}
//                     />
//                     <button
//                       onClick={clearAllFilters}
//                       className="w-full mt-2 px-3 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 text-sm"
//                     >
//                       Limpiar Filtros
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}

//             <div className="hidden lg:block w-80 flex-shrink-0">
//               <FilterSection
//                 title="Marcas"
//                 category="brands"
//                 options={filterOptions.brands}
//               />
//               <FilterSection
//                 title="Tipos de Producto"
//                 category="productTypes"
//                 options={filterOptions.productTypes}
//               />
//               <FilterSection
//                 title="Rangos de Precio"
//                 category="priceRanges"
//                 options={filterOptions.priceRanges}
//               />
//               <FilterSection
//                 title="Categorías"
//                 category="categories"
//                 options={filterOptions.categories}
//               />
//               <div className="bg-white rounded-xl shadow-sm mb-4">
//                 <div className="p-3 border-b border-gray-200">
//                   <h3 className="font-semibold text-gray-900 text-sm">
//                     Rango de Precio
//                   </h3>
//                 </div>
//                 <div className="p-3 space-y-2">
//                   <div className="flex space-x-2">
//                     <input
//                       type="number"
//                       placeholder="Mínimo"
//                       className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
//                       value={priceRange.min}
//                       onChange={(e) =>
//                         setPriceRange({ ...priceRange, min: e.target.value })
//                       }
//                     />
//                     <input
//                       type="number"
//                       placeholder="Máximo"
//                       className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
//                       value={priceRange.max}
//                       onChange={(e) =>
//                         setPriceRange({ ...priceRange, max: e.target.value })
//                       }
//                     />
//                   </div>
//                 </div>
//               </div>
//               <button
//                 onClick={clearAllFilters}
//                 className="w-full mt-2 px-3 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 text-sm"
//               >
//                 Limpiar Filtros
//               </button>
//             </div>

//             <div className="flex-1">
//               <div className="bg-white rounded-xl shadow-sm p-3 mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
//                 <div className="text-gray-700 text-sm">
//                   <span className="font-semibold text-blue-600">
//                     1-{Math.min(24, filteredProducts.length)}
//                   </span>{" "}
//                   de{" "}
//                   <span className="font-semibold text-blue-600">
//                     {filteredProducts.length}
//                   </span>{" "}
//                   resultados para{" "}
//                   <strong>
//                     "
//                     {getCategoryName(categoryFilter) ||
//                       "Todo lo que quieras, tilín"}
//                     "
//                   </strong>
//                 </div>
//                 <select
//                   className="px-2 py-1 border border-gray-300 rounded-md text-sm bg-white"
//                   value={sortBy}
//                   onChange={(e) => setSortBy(e.target.value)}
//                 >
//                   <option value="featured">Ordenar por: Más chidos</option>
//                   <option value="price-low">Precio: de barato a caro</option>
//                   <option value="price-high">Precio: de caro a barato</option>
//                   <option value="rating">Mejor calificados</option>
//                   <option value="newest">Más nuevos</option>
//                 </select>
//               </div>

//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//                 {filteredProducts.map((product) => (
//                   <ProductCard key={product.id} product={product} />
//                 ))}
//               </div>

//               {filteredProducts.length === 0 && !isLoading && (
//                 <div className="text-center py-10">
//                   <div className="text-4xl mb-2">😔</div>
//                   <p className="text-gray-500 text-md mb-1">
//                     No encontramos nada con esos filtros
//                   </p>
//                   <p className="text-gray-400 text-sm mb-3">
//                     Cambia los filtros o busca otra cosa
//                   </p>
//                   <div className="flex flex-col sm:flex-row gap-2 justify-center">
//                     <button
//                       onClick={clearAllFilters}
//                       className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
//                     >
//                       Limpiar Filtros
//                     </button>
//                     <Link
//                       to="/categorias"
//                       className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors text-sm"
//                     >
//                       Ver todas las categorías
//                     </Link>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default BusquedaProducto;

import React, { useState, useMemo, useEffect } from "react";
import { ChevronDown, Filter, Star, X } from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import Categorias from "../components/Categorias";
import Header from "../components/Heaader"; // Note: Fix typo in import (Heaader -> Header)
import Footer from "../components/Footer";
import { useCurrency } from "../CurrencyContext";

const BusquedaProducto = () => {
  const { currency, conversionRate } = useCurrency();
  const [selectedFilters, setSelectedFilters] = useState({
    brands: [],
    productTypes: [],
    priceRanges: [],
    categories: [],
  });
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [sortBy, setSortBy] = useState("");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryParam = searchParams.get("category") || "";
  const searchQuery = searchParams.get("q") || "";
  const [categoryFilter, setCategoryFilter] = useState(categoryParam);
  const [searchFilter, setSearchFilter] = useState(searchQuery);
  const [allProducts, setAllProducts] = useState([]);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:3001/api/productos`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) {
        throw new Error("Error al obtener productos, tilín");
      }
      const data = await response.json();

      console.log("Datos obtenidos de la API:", data);
      const mappedProducts = data.map((product) => ({
        id: product.id_producto,
        title: product.nombre,
        brand: product.marca || "Genérico",
        type: product.categoría.split(" ")[0].toLowerCase(),
        category: product.categoría,
        categoryColor: product.color
          ? `bg-${product.color.toLowerCase()}-500`
          : "bg-gray-500",
        price: parseFloat(product.precio),
        originalPrice: product.precio_original
          ? parseFloat(product.precio_original)
          : null,
        discount: product.descuento || 0,
        rating: parseFloat(product.reseñas) || 0,
        reviewCount: parseInt(product.conteo_reseñas) || 0,
        image: product.imagen,
        stock: parseInt(product.stock) || 0,
        description: product.descripción || "Sin descripción, tilín",
        quantity: parseInt(product.conteo_ventas) || 1,
        numeroVentas: parseInt(product.conteo_vendidos) || 0,
        condicion: product.NU || "Nuevo",
        vendedor: product.vendedor || "Vendedor Desconocido", // Added for VerArticulo
        verificado: product.verificado || false, // Added for VerArticulo
        envioGratis: product.envioGratis || false, // Added for VerArticulo
        garantia: product.garantia || "1 año", // Added for VerArticulo
        devolucion: product.devolucion || "30 días", // Added for VerArticulo
      }));
      setAllProducts(mappedProducts);
    } catch (error) {
      console.error("Error fetching products from API:", error);
      const mockProducts = [
        {
          id_producto: 1,
          nombre: "Zapatillas Nike Air Max",
          descripción: "Zapatillas cómodas y estilizadas, tilín",
          marca: "Nike",
          categoría: "MODA Calzado",
          color: "Red",
          precio: 1299,
          precio_original: 1599,
          descuento: 19,
          reseñas: 4.5,
          conteo_reseñas: 850,
          imagen: "👟",
          stock: 15,
          conteo_vendidos: 1200,
          NU: "Nuevo",
          vendedor: "Nike Oficial",
          verificado: true,
          envioGratis: true,
          garantia: "1 año",
          devolucion: "30 días",
        },
        {
          id_producto: 2,
          nombre: "Sartén Antiadherente Tefal",
          descripción: "Ideal para cocinar sin complicaciones, tilín",
          marca: "Tefal",
          categoría: "HOGAR Cocina",
          color: "Black",
          precio: 599,
          precio_original: 799,
          descuento: 25,
          reseñas: 4.2,
          conteo_reseñas: 320,
          imagen: "🍳",
          stock: 20,
          conteo_vendidos: 500,
          NU: "Nuevo",
          vendedor: "Tefal Store",
          verificado: true,
          envioGratis: false,
          garantia: "2 años",
          devolucion: "15 días",
        },
      ];
      const mappedMock = mockProducts.map((product) => ({
        id: product.id_producto,
        title: product.nombre,
        brand: product.marca || "Genérico",
        type: product.categoría.split(" ")[0].toLowerCase(),
        category: product.categoría,
        categoryColor: product.color
          ? `bg-${product.color.toLowerCase()}-500`
          : "bg-gray-500",
        price: parseFloat(product.precio),
        originalPrice: product.precio_original
          ? parseFloat(product.precio_original)
          : null,
        discount: product.descuento || 0,
        rating: parseFloat(product.reseñas) || 0,
        reviewCount: parseInt(product.conteo_reseñas) || 0,
        image: product.imagen,
        stock: parseInt(product.stock) || 0,
        description: product.descripción || "Sin descripción, tilín",
        quantity: 1,
        numeroVentas: parseInt(product.conteo_vendidos) || 0,
        condicion: product.NU || "Nuevo",
        vendedor: product.vendedor || "Vendedor Desconocido",
        verificado: product.verificado || false,
        envioGratis: product.envioGratis || false,
        garantia: product.garantia || "1 año",
        devolucion: product.devolucion || "30 días",
      }));
      setAllProducts(mappedMock);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    setCategoryFilter(categoryParam);
    setSearchFilter(searchQuery);
  }, [location.search]);

  const formatPrice = (price) => {
    const rate =
      typeof conversionRate === "number" && conversionRate > 0
        ? conversionRate
        : 1;
    const convertedPrice = typeof price === "number" ? price * rate : 0;
    return currency === "USD"
      ? `US$${convertedPrice.toFixed(2)}`
      : currency === "EUR"
      ? `€${convertedPrice.toFixed(2)}`
      : currency === "COP"
      ? `COP$${convertedPrice.toFixed(2)}`
      : `$${convertedPrice.toFixed(2)}`;
  };

  const filterOptions = useMemo(() => {
    const rate =
      typeof conversionRate === "number" && conversionRate > 0
        ? conversionRate
        : 1;
    return {
      brands: [
        { id: "nike", name: "Nike", count: 45 },
        { id: "tefal", name: "Tefal", count: 20 },
        { id: "lego", name: "LEGO", count: 30 },
      ],
      productTypes: [
        { id: "moda", name: "Moda", count: 70 },
        { id: "hogar", name: "Hogar", count: 50 },
        { id: "juguetes", name: "Juguetes", count: 60 },
      ],
      priceRanges: [
        {
          id: "range1",
          name: `${formatPrice(100)} - ${formatPrice(500)}`,
          count: 60,
          min: 100,
          max: 500,
        },
        {
          id: "range2",
          name: `${formatPrice(500)} - ${formatPrice(1000)}`,
          count: 45,
          min: 500,
          max: 1000,
        },
        {
          id: "range3",
          name: `${formatPrice(1000)} - ${formatPrice(2000)}`,
          count: 30,
          min: 1000,
          max: 2000,
        },
        {
          id: "range4",
          name: `${formatPrice(2000)}+`,
          count: 15,
          min: 2000,
          max: 999999,
        },
      ],
      categories: [
        { id: "moda", name: "Moda", count: 150 },
        { id: "hogar", name: "Hogar", count: 90 },
        { id: "juguetes", name: "Juguetes", count: 70 },
      ],
    };
  }, [currency, conversionRate]);

  const handleFilterChange = (category, filterId) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [category]: prev[category].includes(filterId)
        ? prev[category].filter((id) => id !== filterId)
        : [...prev[category], filterId],
    }));
  };

  const filteredProducts = useMemo(() => {
    let filtered = allProducts;
    if (categoryFilter) {
      filtered = filtered.filter(
        (product) =>
          product.category.toLowerCase() === categoryFilter.toLowerCase()
      );
    }
<<<<<<< HEAD
=======
    
>>>>>>> e88a89447fe69379f4017849387c03a14db379e7
    if (searchFilter) {
      const searchTerm = searchFilter.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(searchTerm) ||
          product.brand.toLowerCase().includes(searchTerm) ||
          product.type.toLowerCase().includes(searchTerm)
      );
    }
    if (selectedFilters.brands.length > 0) {
      filtered = filtered.filter((product) =>
        selectedFilters.brands.includes(product.brand.toLowerCase())
      );
    }
    if (selectedFilters.productTypes.length > 0) {
      filtered = filtered.filter((product) =>
        selectedFilters.productTypes.includes(product.type)
      );
    }
    if (selectedFilters.priceRanges.length > 0) {
      filtered = filtered.filter((product) =>
        selectedFilters.priceRanges.some((rangeId) => {
          const range = filterOptions.priceRanges.find((r) => r.id === rangeId);
          return product.price >= range.min && product.price <= range.max;
        })
      );
    }
    if (selectedFilters.categories.length > 0) {
      filtered = filtered.filter((product) =>
        selectedFilters.categories.includes(
          product.category.toLowerCase().split(" ")[0]
        )
      );
    }
    if (priceRange.min || priceRange.max) {
      filtered = filtered.filter((product) => {
        const rate =
          typeof conversionRate === "number" && conversionRate > 0
            ? conversionRate
            : 1;
        const min = priceRange.min ? parseFloat(priceRange.min) / rate : 0;
        const max = priceRange.max ? parseFloat(priceRange.max) / rate : 999999;
        return product.price >= min && product.price <= max;
      });
    }
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
          filtered.sort(
            (a, b) => new Date(b.dateAdded) - new Date(a.dateAdded)
          );
          break;
        default:
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
    conversionRate,
  ]);

  const clearAllFilters = () => {
    setSelectedFilters({
      brands: [],
      productTypes: [],
      priceRanges: [],
      categories: [],
    });

    setPriceRange({ min: "", max: "" });
  };

  const getCategoryName = (categoryValue) => {
    const category = Categorias.find(
      (cat) => cat.categoryValue.toLowerCase() === categoryValue.toLowerCase()
    );
    return category ? category.label : categoryValue;
  };

  const FilterSection = ({ title, category, options }) => (
    <div className="bg-white rounded-xl shadow-sm mb-4">
      <div className="p-3 border-b border-gray-200">
        <h3 className="font-semibold text-gray-900 text-sm">{title}</h3>
      </div>
      <div className="p-3 space-y-2">
        {options.map((option) => (
          <label
            key={option.id}
            className="flex items-center cursor-pointer p-1 rounded hover:bg-gray-50"
          >
            <input
              type="checkbox"
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              checked={selectedFilters[category].includes(option.id)}
              onChange={() => handleFilterChange(category, option.id)}
            />
            <span className="ml-2 text-sm text-gray-700 flex-1">
              {option.name}
            </span>
            <span className="text-xs text-gray-500">({option.count})</span>
          </label>
        ))}
      </div>
    </div>
  );  

  const ProductCard = ({ product }) => (
    <Link
      to={`/VerArticulo/${product.id}`}
      state={{
        producto: {
          id: product.id,
          title: product.title,
          price: product.price,
          originalPrice: product.originalPrice,
          discount: product.discount,
          rating: product.rating,
          reviewCount: product.reviewCount,
          stock: product.stock,
          vendidoPor: product.vendedor,
          verificado: product.verificado,
          envioGratis: product.envioGratis,
          full: false, // Adjust based on your requirements
          garantia: product.garantia,
          devolucion: product.devolucion,
          image: product.image,
          connectivity: product.connectivity || null,
          description: product.description,
          category: product.category,
        },
      }}
      className="block"
    >
      <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-3 cursor-pointer hover:-translate-y-1 h-full">
        <div className="w-full h-32 bg-gray-100 rounded-lg mb-2 flex items-center justify-center text-3xl">
          {product.image}
        </div>
        <div
          className={`inlinebytes-block px-2 py-1 rounded-full text-xs font-medium text-white mb-1 ${product.categoryColor}`}
        >
          {product.category}
        </div>
        <h3 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2 leading-tight">
          {product.title}
        </h3>
        <div className="flex items-center mb-1">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${
                  i < product.rating ? "fill-current" : ""
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-1">
            ({product.reviewCount.toLocaleString()})
          </span>
        </div>
        <div className="flex items-center space-x-1">
          {product.originalPrice && (
            <span className="text-xs text-gray-500 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
          <span className="text-md font-bold text-blue-600">
            {formatPrice(product.price)}
          </span>
          {product.discount > 0 && (
            <span className="text-xs font-semibold text-red-600">
              {product.discount}% OFF
            </span>
          )}
          <span className="text-xs text-gray-500">
            {product.condicion === "Nuevo" ? "Nuevo" : "Usado"}
          </span>
        </div>
      </div>
    </Link>
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <div className="bg-white border-b border-gray-200 px-4 py-2">
        <div className="max-w-7xl mx-auto">
          <nav className="text-sm text-gray-600">
            <Link to="/" className="text-blue-600 hover:underline">
              Inicio
            </Link>
            <span className="mx-1">›</span>
            <span className="font-medium text-gray-900">
              {getCategoryName(categoryFilter) || searchFilter ||"Todos los productos disponibles"}
            </span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-4">
        {isLoading ? (
          <div className="text-center py-10">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent mb-2"></div>
            <p className="text-gray-600">Cargando productos</p>
          </div>
        ) : (
          <div className="flex gap-4">
            <button
              className="lg:hidden fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg z-50"
              onClick={() => setShowMobileFilters(true)}
            >
              <Filter className="w-6 h-6" />
            </button>

            {showMobileFilters && (
              <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50">
                <div className="bg-white w-80 h-full overflow-y-auto">
                  <div className="p-3 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="font-semibold text-lg">Filtros, tilín</h2>
                    <button onClick={() => setShowMobileFilters(false)}>
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                  <div className="p-3">
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
                      title="Categorías"
                      category="categories"
                      options={filterOptions.categories}
                    />
                    <button
                      onClick={clearAllFilters}
                      className="w-full mt-2 px-3 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 text-sm"
                    >
                      Limpiar Filtros
                    </button>
                  </div>
                </div>
              </div>
            )}

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
                title="Categorías"
                category="categories"
                options={filterOptions.categories}
              />
              <div className="bg-white rounded-xl shadow-sm mb-4">
                <div className="p-3 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900 text-sm">
                    Rango de Precio
                  </h3>
                </div>
                <div className="p-3 space-y-2">
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      placeholder="Mínimo"
                      className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
                      value={priceRange.min}
                      onChange={(e) =>
                        setPriceRange({ ...priceRange, min: e.target.value })
                      }
                    />
                    <input
                      type="number"
                      placeholder="Máximo"
                      className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
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
                className="w-full mt-2 px-3 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 text-sm"
              >
                Limpiar Filtros
              </button>
            </div>

            <div className="flex-1">
              <div className="bg-white rounded-xl shadow-sm p-3 mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="text-gray-700 text-sm">
                  <span className="font-semibold text-blue-600">
                    1-{Math.min(24, filteredProducts.length)}
                  </span>{" "}
                  de{" "}
                  <span className="font-semibold text-blue-600">
                    {filteredProducts.length}
                  </span>{" "}
                  resultados para{" "}
                  <strong>
                    "
                    {getCategoryName(categoryFilter) || searchFilter ||"Todos los productos disponibles"}
                    "
                  </strong>
                </div>
                <select
                  className="px-2 py-1 border border-gray-300 rounded-md text-sm bg-white"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="featured">Ordenar por: Más chidos</option>
                  <option value="price-low">Precio: de barato a caro</option>
                  <option value="price-high">Precio: de caro a barato</option>
                  <option value="rating">Mejor calificados</option>
                  <option value="newest">Más nuevos</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {filteredProducts.length === 0 && !isLoading && (
                <div className="text-center py-10">
                  <div className="text-4xl mb-2">😔</div>
                  <p className="text-gray-500 text-md mb-1">
                    No encontramos nada con esos filtros
                  </p>
                  <p className="text-gray-400 text-sm mb-3">
                    Cambia los filtros o busca otra cosa
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2 justify-center">
                    <button
                      onClick={clearAllFilters}
                      className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
                    >
                      Limpiar Filtros
                    </button>
                    <Link
                      to="/categorias"
                      className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors text-sm"
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
