// src/components/ChooseFilter.jsx

import React from "react";
import BoothButton from "./BoothButton";

// Komponen sekarang menerima 'gif' sebagai prop dari App.jsx
function ChooseFilter({
  photos,
  gif,
  onNavigate,
  selectedFilter,
  setSelectedFilter,
}) {
  // Menentukan sumber gambar utama: utamakan GIF, jika tidak ada, gunakan foto pertama.
  const mainDisplaySrc =
    gif || (photos && photos.length > 0 ? photos[0] : null);

  const filters = [
    { name: "B&W", class: "grayscale" },
    { name: "Light", class: "brightness-125" },
    { name: "Film", class: "sepia" },
    { name: "Pop", class: "saturate-150 contrast-125" },
  ];

  // Jika tidak ada foto atau GIF, tampilkan pesan error
  if (!mainDisplaySrc) {
    return (
      <div className="text-white text-center">
        <p>Tidak ada foto atau GIF yang diambil. Silakan kembali.</p>
        <div className="mt-4">
          <BoothButton onClick={() => onNavigate("camera")}>
            Kembali ke Kamera
          </BoothButton>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col text-white">
      <p className="font-bold text-lg mb-1">Preview:</p>

      {/* Pratinjau Foto/GIF Utama */}
      <div className="w-full bg-black h-48 rounded-lg mb-2 flex items-center justify-center text-gray-400 overflow-hidden">
        <img
          src={mainDisplaySrc}
          alt="Preview"
          // Terapkan filter yang dipilih ke pratinjau
          className={`w-full h-full object-cover transition-all duration-300 ${
            selectedFilter || ""
          }`}
        />
      </div>

      {/* Sembunyikan thumbnail jika modenya adalah GIF */}
      {!gif && (
        <>
          <p className="font-bold text-lg mb-1">Result ({photos.length}/4):</p>
          <div className="grid grid-cols-4 gap-2 mb-4">
            {photos.map((photoSrc, index) => (
              <div
                key={index}
                className="w-full h-16 bg-gray-900 rounded-md overflow-hidden"
              >
                <img
                  src={photoSrc}
                  alt={`Capture ${index + 1}`}
                  className={`w-full h-full object-cover ${
                    selectedFilter || ""
                  }`}
                />
              </div>
            ))}
          </div>
        </>
      )}

      <p className="font-bold text-lg mb-2">Choose Filter:</p>
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
        <BoothButton onClick={() => onNavigate("frame")}>Next</BoothButton>
        <BoothButton onClick={() => setSelectedFilter("")}>
          Reset Filter
        </BoothButton>
        <BoothButton onClick={() => onNavigate("camera")}>Back</BoothButton>
      </div>
    </div>
  );
}

export default ChooseFilter;
