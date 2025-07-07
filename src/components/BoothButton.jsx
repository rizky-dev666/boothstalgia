// src/components/BoothButton.jsx

import React from "react";
// Kita tidak lagi memerlukan tailwind-merge untuk solusi ini
// import { twMerge } from "tailwind-merge";

const BoothButton = ({
  onClick,
  children,
  className = "",
  disabled = false,
  // 1. Tambahkan prop baru 'textSize' dengan nilai default 'text-xl'
  textSize = "text-xl",
}) => {
  // 2. Gabungkan kelas-kelasnya. Perhatikan 'textSize' sekarang menjadi variabel.
  const buttonClasses = `
    w-full bg-booth-btn text-booth-brown font-bold py-2 px-4 rounded-xl 
    border-b-2 border-booth-btn-shadow shadow-booth-button 
    active:translate-y-1 active:shadow-none transition-all 
    disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:translate-y-1
    ${textSize} ${className}
  `;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      // Bersihkan spasi berlebih dari string kelas
      className={buttonClasses.replace(/\s+/g, " ").trim()}
    >
      {children}
    </button>
  );
};

export default BoothButton;
