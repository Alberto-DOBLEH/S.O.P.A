import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ searchTerm, onSearchTermChange, onSearchSubmit }) => (
  <div className="flex-1 max-w-xl mx-4">
    <form onSubmit={onSearchSubmit} className="relative">
      <input
        type="text"
        placeholder="Buscar productos, marcas..."
        className="w-full px-4 py-2 pl-10 pr-16 bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 text-sm placeholder-gray-400"
        value={searchTerm}
        onChange={(e) => onSearchTermChange(e.target.value)}
      />
      <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
      <button
        type="submit"
        className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm hover:bg-blue-600 transition-all"
      >
        Buscar
      </button>
    </form>
  </div>
);

export default SearchBar;
