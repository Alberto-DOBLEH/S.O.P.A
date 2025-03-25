import React from "react";

const Card = ({ children, className = "" }) => {
  return (
    <div
      className={`relative w-full max-w-lg p-10 bg-white border border-gray-300 shadow-lg ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
