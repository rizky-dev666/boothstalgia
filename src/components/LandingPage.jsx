import React from "react";

// Tombol kustom yang akan kita gunakan di banyak tempat
const BoothButton = ({ onClick, children }) => (
  <button
    onClick={onClick}
    className="w-full bg-booth-btn text-booth-brown font-bold text-xl py-2 px-8 rounded-xl border-b-2 border-booth-btn-shadow shadow-booth-button active:translate-y-1 active:shadow-none transition-transform"
  >
    {children}
  </button>
);

function LandingPage({ onNavigate }) {
  return (
    <div className="flex flex-col items-center text-center text-booth-bg">
      <h2 className="font-title text-3xl">Welcome to</h2>
      <h1 className="font-display text-4xl mb-8">BOOTHSTALGIA</h1>

      <div className="w-full space-y-4">
        <BoothButton onClick={() => onNavigate("camera")}>Start</BoothButton>
        <BoothButton onClick={() => onNavigate("about")}>About</BoothButton>
        <BoothButton onClick={() => onNavigate("how-to-use")}>
          How To Use
        </BoothButton>
      </div>
    </div>
  );
}

export default LandingPage;
