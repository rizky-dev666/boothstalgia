// src/components/DownloadModal.jsx

import React from "react";
import logo from "../assets/boothstalgia.png";

function DownloadModal({ onClose }) {
  return (
    // Latar belakang overlay
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      {/* Kartu Modal */}
      <div className="bg-booth-beige rounded-3xl p-8 max-w-sm w-full text-center text-booth-brown relative">
        {/* Tombol Close */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-booth-brown text-booth-beige rounded-full w-8 h-8 font-bold text-xl"
        >
          &times;
        </button>

        <img
          src={logo}
          alt="Boothstalgia Logo"
          className="w-24 h-auto mx-auto mb-4"
        />
        <h2 className="font-display text-2xl mb-2">
          Your download is starting...
        </h2>
        <p className="font-title text-sm">
          Your moment has been captured with Boothstalgia! Thank you and have a
          joyful day!
        </p>
      </div>
    </div>
  );
}

export default DownloadModal;
