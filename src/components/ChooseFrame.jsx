// src/components/ChooseFrame.jsx

import React, { useRef, useEffect } from "react";
import BoothButton from "./BoothButton";
import { downloadImage } from "../utils/imageUtils.js";

// 1. Impor semua gambar frame Anda
import frame1Src from "../assets/frames/Blue-Cute-Heart.png";
import frame2Src from "../assets/frames/Green-Dark-Green.png";
import frame3Src from "../assets/frames/Green-Light-Yellow.png";
import frame4Src from "../assets/frames/Neon-Green-Purple.png";

const frameOptions = [
  { id: "frame1", src: frame1Src },
  { id: "frame2", src: frame2Src },
  { id: "frame3", src: frame3Src },
  { id: "frame4", src: frame4Src },
];

// 2. Buat "Peta Layout" untuk setiap frame
const frameLayouts = {
  frame1: [
    { x: 330, y: 620, w: 1210, h: 700, radius: 20 },
    { x: 330, y: 1690, w: 1210, h: 700, radius: 20 },
    { x: 330, y: 2750, w: 1210, h: 700, radius: 20 },
    { x: 330, y: 3810, w: 1210, h: 700, radius: 20 },
  ],
  frame2: [
    { x: 325, y: 945, w: 1230, h: 710, radius: 20 },
    { x: 325, y: 1850, w: 1230, h: 710, radius: 20 },
    { x: 325, y: 2760, w: 1230, h: 710, radius: 20 },
    { x: 325, y: 3670, w: 1230, h: 710, radius: 20 },
  ],
  frame3: [
    { x: 325, y: 650, w: 1230, h: 710, radius: 20 },
    { x: 325, y: 1565, w: 1230, h: 710, radius: 20 },
    { x: 325, y: 2475, w: 1230, h: 710, radius: 20 },
    { x: 325, y: 3380, w: 1230, h: 710, radius: 20 },
  ],
  frame4: [
    { x: 325, y: 945, w: 1230, h: 710, radius: 20 },
    { x: 325, y: 1850, w: 1230, h: 710, radius: 20 },
    { x: 325, y: 2760, w: 1230, h: 710, radius: 20 },
    { x: 325, y: 3670, w: 1230, h: 710, radius: 20 },
  ],
};

// Fungsi bantuan untuk menggambar sudut tumpul
function drawRoundedImage(ctx, image, x, y, width, height, radius) {
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  ctx.clip();
  ctx.drawImage(image, x, y, width, height);
  ctx.restore();
}

// 1. Tambahkan 'gif' ke dalam props
function ChooseFrame({
  photos,
  gif,
  filter,
  onNavigate,
  selectedFrame,
  setSelectedFrame,
  openDownloadModal,
}) {
  const canvasRef = useRef(null);

  const getCanvasFilter = (filterClass) => {
    switch (filterClass) {
      case "grayscale":
        return "grayscale(100%)";
      case "brightness-125":
        return "brightness(125%)";
      case "sepia":
        return "sepia(100%)";
      case "saturate-150 contrast-125":
        return "saturate(150%) contrast(125%)";
      default:
        return "none";
    }
  };

  useEffect(() => {
    // 2. Jika mode GIF, jangan lakukan apa-apa pada kanvas
    if (gif) {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      return;
    }

    // --- LOGIKA ASLI ANDA UNTUK MENGGAMBAR FOTO (sudah benar) ---
    const canvas = canvasRef.current;
    if (!canvas || !selectedFrame || !photos || photos.length === 0) {
      if (canvas) {
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      return;
    }

    const photoPositions = frameLayouts[selectedFrame.id];
    if (!photoPositions) return;

    const ctx = canvas.getContext("2d");
    const loadImage = (src) =>
      new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = src;
        img.onload = () => resolve(img);
        img.onerror = reject;
      });

    Promise.all([
      loadImage(selectedFrame.src),
      ...photos.map((p) => loadImage(p)),
    ])
      .then(([frameImg, ...photoImgs]) => {
        canvas.width = frameImg.width;
        canvas.height = frameImg.height;
        ctx.drawImage(frameImg, 0, 0, canvas.width, canvas.height);
        ctx.filter = getCanvasFilter(filter);
        photoImgs.forEach((pImg, index) => {
          if (photoPositions[index]) {
            const pos = photoPositions[index];
            drawRoundedImage(ctx, pImg, pos.x, pos.y, pos.w, pos.h, pos.radius);
          }
        });
        ctx.filter = "none";
      })
      .catch((err) => console.error("Gagal memuat gambar:", err));
    // --- AKHIR DARI LOGIKA ASLI ANDA ---
  }, [photos, gif, filter, selectedFrame]);

  // 3. Modifikasi fungsi unduh
  const handleDownload = () => {
    if (gif) {
      // Jika mode GIF, unduh GIF-nya langsung
      downloadImage(gif, "boothstalgia.gif");
      openDownloadModal(gif);
    } else {
      // Jika mode foto, unduh dari kanvas seperti sebelumnya
      const dataUrl = canvasRef.current.toDataURL("image/png");
      downloadImage(dataUrl, "boothstalgia.png");
      openDownloadModal(dataUrl);
    }
  };

  return (
    <div className="flex flex-col text-white">
      {/* 4. Sembunyikan pilihan frame jika mode GIF */}
      {gif ? (
        <div className="text-center p-4 bg-gray-900 rounded-lg mb-4">
          <p className="font-title">
            Mode GIF tidak dapat digabung dengan frame. Silakan langsung unduh
            hasil Anda.
          </p>
        </div>
      ) : (
        <>
          <p className="font-bold text-lg mb-2">Choose Frame:</p>
          <div className="grid grid-cols-4 gap-2 mb-4">
            {frameOptions.map((frame) => (
              <button
                key={frame.id}
                onClick={() => setSelectedFrame(frame)}
                className={`rounded-lg transition-all ${
                  selectedFrame?.id === frame.id
                    ? "border-4 border-booth-btn"
                    : ""
                }`}
              >
                <img
                  src={frame.src}
                  alt={frame.id}
                  className="w-full h-auto rounded-md"
                />
              </button>
            ))}
          </div>
        </>
      )}

      <p className="font-bold text-lg mb-2">Preview:</p>
      <div className="w-full bg-gray-900 rounded-lg overflow-hidden flex justify-center items-center h-64">
        {/* 5. Tampilkan GIF atau Kanvas secara kondisional */}
        {gif ? (
          <img
            src={gif}
            alt="GIF Preview"
            className={`max-w-full max-h-full object-contain ${filter || ""}`}
          />
        ) : (
          <canvas
            ref={canvasRef}
            style={{ maxWidth: "100%", height: "auto" }}
          />
        )}
      </div>

      <div className="w-full space-y-3 mt-4">
        <BoothButton onClick={handleDownload} disabled={!gif && !selectedFrame}>
          Download
        </BoothButton>
        <BoothButton onClick={() => onNavigate("filter")}>Back</BoothButton>
      </div>
    </div>
  );
}

export default ChooseFrame;
