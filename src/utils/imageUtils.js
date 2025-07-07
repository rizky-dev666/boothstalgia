// src/utils/imageUtils.js

// Gunakan 'export' agar fungsi ini bisa digunakan di file lain
export const downloadImage = (dataUrl) => {
  // Pastikan dataUrl tidak kosong
  if (!dataUrl) {
    console.error("Tidak ada data gambar untuk diunduh.");
    return;
  }

  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = "boothstalgia-result.png"; // Nama file yang akan diunduh

  // Perintah ini 'disembunyikan' dari pengguna
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
