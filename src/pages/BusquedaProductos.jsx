import React, { useState, useMemo, useEffect } from "react";
import { ChevronDown, Filter, Star, X } from "lucide-react";
import { useLocation, useNavigate, Link } from "react-router-dom";

// Array de categorías (deberías moverlo a un archivo aparte si es muy grande)
const CATEGORIES = [
  {
    icon: "🖱️",
    label: "Periféricos",
    categoryValue: "PERIFÉRICOS",
  },
  {
    icon: "🎮",
    label: "Gaming",
    categoryValue: "GAMING",
  },
  {
    icon: "💻",
    label: "Hardware",
    categoryValue: "HARDWARE",
  },
  {
    icon: "🏷️",
    label: "Ofertas",
    categoryValue: "OFERTAS",
  },
];

const BusquedaProducto = () => {
  // Estados
  const [selectedFilters, setSelectedFilters] = useState({
    brands: [],
    productTypes: [],
    priceRanges: [],
    connectivity: [],
  });
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [sortBy, setSortBy] = useState("");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryParam = searchParams.get("category") || "";
  const searchQuery = searchParams.get("q") || "";

  const [categoryFilter, setCategoryFilter] = useState(categoryParam);
  const [searchFilter, setSearchFilter] = useState(searchQuery);

  // Actualizar filtros cuando cambia la URL
  useEffect(() => {
    setCategoryFilter(categoryParam);
    setSearchFilter(searchQuery);
  }, [location.search]);

  // Sample products data
  const allProducts = [
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
    // ... (otros productos)
  ];

  // Filter options
  const filterOptions = {
    brands: [
      { id: "logitech", name: "Logitech", count: 47 },
      { id: "razer", name: "Razer", count: 23 },
      { id: "corsair", name: "Corsair", count: 31 },
    ],
    productTypes: [
      { id: "mouse", name: "Mouse", count: 89 },
      { id: "teclado", name: "Teclados", count: 67 },
      { id: "audifonos", name: "Audífonos", count: 54 },
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
    ],
    connectivity: [
      { id: "inalambrico", name: "Inalámbrico", count: 92 },
      { id: "usb", name: "USB", count: 156 },
    ],
  };

  // Handle filter changes
  const handleFilterChange = (category, filterId) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [category]: prev[category].includes(filterId)
        ? prev[category].filter((id) => id !== filterId)
        : [...prev[category], filterId],
    }));
  };

  // Filter products based on selected filters
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

    // Aplicar otros filtros (marcas, tipos, precios, etc.)
    // ... (resto de la lógica de filtrado)

    return filtered;
  }, [allProducts, categoryFilter, searchFilter, selectedFilters, priceRange]);

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedFilters({
      brands: [],
      productTypes: [],
      priceRanges: [],
      connectivity: [],
    });
    setPriceRange({ min: "", max: "" });
  };

  // Obtener nombre de categoría
  const getCategoryName = (categoryValue) => {
    const category = CATEGORIES.find(
      (cat) => cat.categoryValue.toLowerCase() === categoryValue.toLowerCase()
    );
    return category ? category.label : categoryValue;
  };

  // Filter Section Component
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

  // Product Card Component
  const ProductCard = ({ product }) => (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-4 cursor-pointer hover:-translate-y-1 transform transition-transform">
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
              className={`w-4 h-4 ${i < product.rating ? "fill-current" : ""}`}
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
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-7xl mx-auto">
          <nav className="text-sm text-gray-600">
            <Link to="/" className="text-blue-600 hover:underline">
              Inicio
            </Link>
            <span className="mx-2">›</span>
            <Link to="/categorias" className="text-blue-600 hover:underline">
              Categorías
            </Link>
            <span className="mx-2">›</span>
            <span className="font-medium text-gray-900">
              {getCategoryName(categoryFilter) || "Todos los productos"}
            </span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Mobile Filter Toggle */}
          <button
            className="lg:hidden fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg z-50"
            onClick={() => setShowMobileFilters(true)}
          >
            <Filter className="w-6 h-6" />
          </button>

          {/* Mobile Filter Overlay */}
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
                  {/* ... (otros filtros móviles) */}
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

          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <FilterSection
              title="Marcas"
              category="brands"
              options={filterOptions.brands}
            />
            {/* ... (otros filtros de escritorio) */}
            <button
              onClick={clearAllFilters}
              className="w-full mt-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            >
              Limpiar Filtros
            </button>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
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
              </select>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  No se encontraron productos con los filtros seleccionados.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Limpiar Filtros
                </button>
                <Link
                  to="/categorias"
                  className="mt-4 ml-4 px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                >
                  Ver todas las categorías
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusquedaProducto;
