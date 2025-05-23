import React, { useState } from "react";
import SearchBar from "./SearchBar";
import NavMenu from "./NavMenu";
import CategoryMenu from "./CategoryMenu";
import Breadcrumbs from "./Breadcrumbs";
import { useNavigation } from "./utils/navigation";
import { useScrollControl } from "./hooks/useScrollControl";
import useHeaderVisibility from "./hooks/useHeaderVisibility";
import { logoCompleto } from "../../assets/imagenes/imagenes";
import { FaShoppingCart } from "react-icons/fa";

const Header = ({
  initialCartCount = 3,
  showBreadcrumbs = true,
  customNavItems = [],
  customCategories = [],
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cartCount, setCartCount] = useState(initialCartCount);
  const [showCategories, setShowCategories] = useState(false);

  const { navigateTo } = useNavigation();
  const { menuScrollRef, canScrollLeft, canScrollRight, scrollMenu } =
    useScrollControl();
  const { headerVisible } = useHeaderVisibility();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigateTo.search(searchTerm);
      setShowCategories(false);
    }
  };

  const toggleCategories = (e) => {
    e.stopPropagation();
    setShowCategories(!showCategories);
  };

  return (
    <header
      className={`w-full transition-transform duration-300 ${
        headerVisible ? "translate-y-0" : "-translate-y-full"
      }`}
      style={{ position: "sticky", top: 0, zIndex: 50 }}
    >
      {/* Top Bar */}
      <div className="bg-[#cae8ff] border-b border-blue-200 shadow-md w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-2">
            {/* Logo */}
            <div className="cursor-pointer" onClick={navigateTo.home}>
              <img src={logoCompleto} alt="Logo S.O.P.A" className="h-8" />
            </div>

            {/* Search Bar */}
            <SearchBar
              searchTerm={searchTerm}
              onSearchTermChange={setSearchTerm}
              onSearchSubmit={handleSearch}
            />

            {/* Cart */}
            <div className="text-center">
              <button
                onClick={navigateTo.carrito}
                className="bg-blue-600 p-2 rounded-full text-white hover:bg-blue-700 flex items-center justify-center relative"
                aria-label="Carrito de compras"
              >
                <FaShoppingCart className="text-lg" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <NavMenu
        menuScrollRef={menuScrollRef}
        canScrollLeft={canScrollLeft}
        canScrollRight={canScrollRight}
        scrollMenu={scrollMenu}
        toggleCategories={toggleCategories}
        customNavItems={customNavItems}
        navigateTo={navigateTo}
      />

      {/* Category Menu */}
      <CategoryMenu
        show={showCategories}
        onClose={() => setShowCategories(false)}
        customCategories={customCategories}
        navigateTo={navigateTo}
      />

      {/* Breadcrumbs */}
      {showBreadcrumbs && <Breadcrumbs navigateTo={navigateTo} />}
    </header>
  );
};

export default Header;
