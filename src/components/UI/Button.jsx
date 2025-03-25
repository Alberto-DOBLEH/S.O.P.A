import React from "react";

const Button = ({ children, onClick, type = "button", className = "" }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`px-6 py-2 text-lg font-bold text-gray-700 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
