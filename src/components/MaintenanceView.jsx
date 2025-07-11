import React from "react";
import logo from "../assets/boothstalgia.png";

function MaintenanceView() {
  return (
    <div className="text-booth-cream text-center space-y-4">
      <img
        src={logo}
        alt="Boothstalgia Logo"
        className="w-24 h-auto mx-auto mb-4"
      />
      <h1 className="font-display text-3xl">🛠️ Situs Sedang dalam Perbaikan</h1>
      <p className="font-title text-base leading-relaxed font-normal">
        Kami sedang melakukan beberapa pembaruan. Kami akan segera kembali
        online!
      </p>
    </div>
  );
}

export default MaintenanceView;
