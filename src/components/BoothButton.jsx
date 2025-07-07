// src/components/BoothButton.jsx
import React from "react";

const BoothButton = ({
  onClick,
  children,
  className = "",
  disabled = false,
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`w-full bg-booth-btn text-booth-brown font-bold text-xl py-2 px-4 rounded-xl border-b-2 border-booth-btn-shadow shadow-booth-button active:translate-y-1 active:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:translate-y-1 ${className}`}
  >
    {children}
  </button>
);

export default BoothButton;
