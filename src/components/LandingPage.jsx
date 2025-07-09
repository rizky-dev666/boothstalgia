// src/components/LandingPage.jsx

import React from "react";
import BoothButton from "./BoothButton"; // Pastikan impor ini ada

function LandingPage({ onNavigate }) {
  const handleStartClick = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach((track) => track.stop());
      onNavigate("camera");
    } catch (err) {
      console.error("Camera access denied:", err);
      const alertMessage =
        "Akses kamera ditolak.\n\n" +
        "Silakan berikan izin kamera di pengaturan browser Anda untuk melanjutkan.\n\n" +
        "Di iPhone: Pengaturan > Safari > Kamera\n" +
        "Di browser lain: Klik ikon gembok (🔒) di sebelah URL.";
      alert(alertMessage);
    }
  };

  return (
    <div className="flex flex-col items-center text-center text-booth-bg">
      <h2 className="font-title text-3xl">Welcome to</h2>
      <h1 className="font-display text-4xl mb-8">BOOTHSTALGIA</h1>

      <div className="w-full space-y-4">
        <BoothButton onClick={handleStartClick}>Start</BoothButton>
        <BoothButton onClick={() => onNavigate("about")}>About</BoothButton>
        {/* Baris di bawah ini telah diperbaiki */}
        <BoothButton onClick={() => onNavigate("how-to-use")}>
          How To Use
        </BoothButton>
      </div>
    </div>
  );
}

export default LandingPage;
