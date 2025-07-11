// src/components/MaintenanceView.jsx

import React from "react";

function MaintenanceView() {
  return (
    <div className="text-booth-cream text-center space-y-4">
      {/* Judul diubah dari text-3xl menjadi text-2xl */}
      <h1 className="font-display text-2xl">🛠️ Site under construction</h1>
      {/* Deskripsi diubah dari text-base menjadi text-sm */}
      <p className="font-title text-sm leading-relaxed font-normal">
        We are doing some updates. We will be back online soon!
      </p>
    </div>
  );
}

export default MaintenanceView;
