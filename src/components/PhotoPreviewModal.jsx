// src/components/PhotoPreviewModal.jsx

import React from "react";

function PhotoPreviewModal({ imageUrl, onClose }) {
  if (!imageUrl) return null;

  return (
    // Background overlay
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
      onClick={onClose} // Menutup modal saat mengklik background
    >
      {/* Tombol Close di pojok kanan atas */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 bg-white text-black rounded-full w-8 h-8 font-bold text-xl z-50"
      >
        &times;
      </button>

      {/* Kontainer gambar untuk mencegah penutupan modal saat gambar diklik */}
      <div className="relative" onClick={(e) => e.stopPropagation()}>
        <img
          src={imageUrl}
          alt="Photo Preview"
          className="max-w-full max-h-[90vh] rounded-lg"
        />
      </div>
    </div>
  );
}

export default PhotoPreviewModal;
