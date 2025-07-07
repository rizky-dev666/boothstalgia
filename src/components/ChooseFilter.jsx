// src/components/ChooseFilter.jsx

import React, { useState } from "react";

// Tombol kustom bisa diimpor atau didefinisikan ulang
const BoothButton = ({ onClick, children, className = "" }) => (
  <button
    onClick={onClick}
    className={`w-full bg-booth-btn text-booth-brown font-bold text-xl py-2 px-4 rounded-xl border-b-2 border-booth-btn-shadow shadow-booth-button active:translate-y-1 active:shadow-none transition-all ${className}`}
  >
    {children}
  </button>
);

// Menerima props dari App.jsx
function ChooseFilter({
  photos,
  onNavigate,
  selectedFilter,
  setSelectedFilter,
}) {
  // State lokal untuk menentukan foto mana yang sedang ditampilkan besar
  const [mainPhotoIndex, setMainPhotoIndex] = useState(0);

  // Daftar filter yang tersedia
  const filters = [
    { name: "B&W", class: "grayscale" },
    { name: "Light", class: "brightness-125" },
    { name: "Film", class: "sepia" },
    { name: "Pop", class: "saturate-150 contrast-125" },
  ];

  // Jika tidak ada foto, tampilkan pesan
  if (!photos || photos.length === 0) {
    return (
      <div className="text-white text-center">
        <p>No photos captured. Please go back.</p>
        <div className="mt-4">
          <BoothButton onClick={() => onNavigate("camera")}>
            Back to Camera
          </BoothButton>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col text-white">
      <p className="font-bold text-lg mb-1">Result :</p>

      {/* Pratinjau Foto Utama */}
      <div className="w-full bg-black h-48 rounded-lg mb-2 flex items-center justify-center text-gray-400 overflow-hidden">
        <img
          src={photos[mainPhotoIndex]}
          alt={`Preview ${mainPhotoIndex + 1}`}
          className={`w-full h-full object-cover transition-all duration-300 ${
            selectedFilter !== "none" ? selectedFilter : ""
          }`}
        />
      </div>

      {/* Thumbnail Foto-foto lainnya */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        {photos.map((photoSrc, index) => (
          <div
            key={index}
            className={`w-full h-16 bg-gray-900 rounded-md overflow-hidden cursor-pointer transition-all ${
              mainPhotoIndex === index ? "border-4 border-booth-btn" : ""
            }`}
            onClick={() => setMainPhotoIndex(index)}
          >
            <img
              src={photoSrc}
              alt={`Capture ${index + 1}`}
              className={`w-full h-full object-cover ${
                selectedFilter !== "none" ? selectedFilter : ""
              }`}
            />
          </div>
        ))}
      </div>

      <p className="font-bold text-lg mb-2">Choose Filter :</p>
      <div className="grid grid-cols-4 gap-2 mb-4">
        {filters.map((filter) => (
          <button
            key={filter.name}
            onClick={() => setSelectedFilter(filter.class)}
            className={`font-bold rounded-lg py-1 transition-colors ${
              selectedFilter === filter.class
                ? "bg-booth-btn-shadow text-white"
                : "bg-booth-btn text-booth-brown"
            }`}
          >
            {filter.name}
          </button>
        ))}
      </div>

      <div className="w-full space-y-3">
        {/* Tombol Next akan kita fungsikan nanti untuk ke halaman frame */}
        <BoothButton onClick={() => onNavigate("frame")}>Next</BoothButton>
        <BoothButton onClick={() => setSelectedFilter("none")}>
          Reset Filter
        </BoothButton>
        <BoothButton onClick={() => onNavigate("camera")}>Back</BoothButton>
      </div>
    </div>
  );
}

export default ChooseFilter;
