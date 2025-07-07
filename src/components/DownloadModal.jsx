// src/components/DownloadModal.jsx

import React from "react";
import logo from "../assets/boothstalgia.png";
import ShareView from "./ShareView"; // Hanya impor ShareView

function DownloadModal({ onClose, finalImage }) {
  return (
    // Background overlay
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      {/* Modal Card */}
      <div className="bg-booth-beige rounded-3xl p-8 max-w-sm w-full text-center text-booth-brown relative">
        {/* Close Button */}
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
        <h2 className="font-display text-2xl mb-2">Download Started!</h2>
        <p className="font-title text-sm mb-4">
          Your moment has been captured with Boothstalgia!
        </p>

        {/* --- Bagian Berbagi --- */}
        {finalImage && (
          <>
            <hr className="border-t-2 border-booth-btn-shadow my-4" />
            {/* Hanya tampilkan komponen ShareView */}
            <ShareView finalImage={finalImage} />
          </>
        )}
      </div>
    </div>
  );
}

export default DownloadModal;
