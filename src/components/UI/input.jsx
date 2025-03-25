import React from "react";

const Input = ({ label, type = "text", value, onChange, ...props }) => {
  return (
    <div className="mb-4">
      <label className="block mb-2 text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border-b border-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
        {...props}
      />
    </div>
  );
};

export default Input;
