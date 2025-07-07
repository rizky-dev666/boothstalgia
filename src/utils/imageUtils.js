// src/utils/imageUtils.js

export const downloadImage = (dataUrl, filename = "boothstalgia.png") => {
  if (!dataUrl) {
    console.error("Tidak ada data gambar untuk diunduh.");
    return;
  }

  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = filename; // Gunakan nama file yang diberikan

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
