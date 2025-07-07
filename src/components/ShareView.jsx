// src/components/ShareView.jsx

import React from "react";
import BoothButton from "./BoothButton";
import { FaTwitter, FaWhatsapp, FaInstagram } from "react-icons/fa6";

// Fungsi untuk mengubah data URL menjadi File
const dataURLtoFile = (dataurl, filename) => {
  let arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};

function ShareView({ finalImage }) {
  // finalImage adalah data URL dari canvas
  const shareText = "Check out the cool photos I made at Boothstalgia!";
  const appUrl = "https://boothstalgia.com"; // Ganti dengan URL aplikasi Anda

  const handleShare = async () => {
    const imageFile = dataURLtoFile(finalImage, "boothstalgia.png");
    if (navigator.share && navigator.canShare({ files: [imageFile] })) {
      try {
        await navigator.share({
          title: "Boothstalgia Photo",
          text: shareText,
          files: [imageFile],
        });
      } catch (error) {
        console.error("Gagal berbagi:", error);
      }
    } else {
      // Fallback untuk browser desktop
      alert(
        "Fitur berbagi tidak didukung di browser ini. Silakan gunakan tombol di bawah atau unduh gambarnya."
      );
    }
  };

  const handleInstagramShare = () => {
    alert(
      "Untuk berbagi ke Instagram, silakan unduh gambarnya terlebih dahulu, lalu unggah secara manual di aplikasi Instagram. Terima kasih!"
    );
  };

  return (
    <div className="text-center">
      <p className="font-bold text-md mb-4">Share your photos!</p>
      {navigator.share && (
        <BoothButton onClick={handleShare} textSize="text-md">
          Open Sharing Dialogue
        </BoothButton>
      )}
      <div className="flex justify-center gap-4 mt-4">
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
            shareText
          )}&url=${encodeURIComponent(appUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-2xl text-booth-brown hover:opacity-75"
        >
          <FaTwitter />
        </a>
        <a
          href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
            shareText + " " + appUrl
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-2xl text-booth-brown hover:opacity-75"
        >
          <FaWhatsapp />
        </a>
        {/* 3. Tambahkan tombol Instagram */}
        <button
          onClick={handleInstagramShare}
          className="text-2xl text-booth-brown hover:opacity-75"
          aria-label="Share on Instagram"
        >
          <FaInstagram />
        </button>
      </div>
      <p className="text-xs mt-2">
        Tips: Download images to share with your friends!
      </p>
    </div>
  );
}

export default ShareView;
