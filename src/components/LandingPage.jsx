import React from "react";
import BoothButton from "./BoothButton"; // Impor BoothButton yang sudah ada

function LandingPage({ onNavigate }) {
  // 1. Buat fungsi baru untuk menangani klik pada tombol Start
  const handleStartClick = () => {
    // 2. Tampilkan alert dengan pesan yang Anda inginkan
    const alertMessage =
      "Tips:\n\n" +
      "Jika kamera tidak muncul setelah ini, periksa izin browser Anda:\n\n" +
      "1. Klik ikon gembok (🔒) di sebelah alamat URL.\n" +
      "2. Pilih 'Setelan Situs' (Site settings).\n" +
      "3. Cari 'Kamera' dan ubah izinnya menjadi 'Izinkan' (Allow).\n" +
      "4. Muat ulang halaman jika perlu.";

    alert(alertMessage);

    // 3. Setelah pengguna menekan OK pada alert, lanjutkan ke halaman kamera
    onNavigate("camera");
  };

  return (
    <div className="flex flex-col items-center text-center text-booth-bg">
      <h2 className="font-title text-3xl">Welcome to</h2>
      <h1 className="font-display text-4xl mb-8">BOOTHSTALGIA</h1>

      <div className="w-full space-y-4">
        {/* 4. Gunakan fungsi handleStartClick untuk tombol Start */}
        <BoothButton onClick={handleStartClick}>Start</BoothButton>
        <BoothButton onClick={() => onNavigate("about")}>About</BoothButton>
        <BoothButton onClick={() => onNavigate("how-to-use")}>
          How To Use
        </BoothButton>
      </div>
    </div>
  );
}

export default LandingPage;
