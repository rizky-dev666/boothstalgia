// src/components/CameraView.jsx

import React, { useState, useRef, useEffect, useCallback } from "react";
import BoothButton from "./BoothButton";
import GIF from "gif.js";

// Terima prop 'setGifResult' dari App.jsx untuk menyimpan hasil GIF
function CameraView({ onNavigate, onCapture, currentPhotos, setGifResult }) {
  const [selectedTimer, setSelectedTimer] = useState(3);
  const [countdown, setCountdown] = useState(null);
  const [videoDevices, setVideoDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState("");
  const [mode, setMode] = useState("photo"); // State baru: 'photo' atau 'gif'

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Efek untuk mendapatkan daftar kamera (tidak berubah)
  useEffect(() => {
    const getDevices = async () => {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const cameras = devices.filter((device) => device.kind === "videoinput");
      setVideoDevices(cameras);
      if (cameras.length > 0) {
        setSelectedDeviceId(cameras[0].deviceId);
      }
    };
    getDevices();
  }, []);

  // Efek untuk menyalakan kamera (tidak berubah)
  useEffect(() => {
    if (!selectedDeviceId) return;
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
    }
    const startCamera = async () => {
      try {
        const constraints = {
          video: {
            deviceId: { exact: selectedDeviceId },
            width: 1280,
            height: 720,
          },
        };
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing specific camera:", err);
        alert("Gagal mengakses kamera yang dipilih.");
      }
    };
    startCamera();
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, [selectedDeviceId]);

  // Logika untuk mengambil foto tunggal
  const handleCapturePhoto = useCallback(() => {
    if (currentPhotos.length >= 4) return;
    setCountdown(selectedTimer);
    const countdownInterval = setInterval(
      () => setCountdown((prev) => (prev > 1 ? prev - 1 : 0)),
      1000
    );

    setTimeout(() => {
      clearInterval(countdownInterval);
      const canvas = canvasRef.current;
      const video = videoRef.current;
      if (canvas && video && video.readyState === 4) {
        const context = canvas.getContext("2d");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.translate(canvas.width, 0);
        context.scale(-1, 1);
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        const dataUrl = canvas.toDataURL("image/jpeg");
        onCapture((prevPhotos) => [...prevPhotos, dataUrl]);
        context.setTransform(1, 0, 0, 1, 0, 0);
      }
      setCountdown(null);
    }, selectedTimer * 1000);
  }, [selectedTimer, currentPhotos.length, onCapture]);

  // Logika baru untuk merekam GIF
  const handleCaptureGif = useCallback(() => {
    const frames = [];
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const context = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    setCountdown("REC"); // Menampilkan status rekam

    const captureFrame = () => {
      context.translate(canvas.width, 0);
      context.scale(-1, 1);
      context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
      context.setTransform(1, 0, 0, 1, 0, 0);
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      frames.push(imageData);
    };

    const intervalId = setInterval(captureFrame, 100); // Ambil gambar setiap 100ms

    setTimeout(() => {
      clearInterval(intervalId);
      setCountdown(null); // Selesai merekam

      const gif = new GIF({
        workers: 2,
        quality: 10,
        // PASTIKAN file ini ada di folder /public
        workerScript: "/gif.worker.js",
      });

      frames.forEach((frame) => {
        gif.addFrame(frame, { delay: 100 });
      });

      gif.on("finished", (blob) => {
        const gifUrl = URL.createObjectURL(blob);
        setGifResult(gifUrl); // Simpan hasil GIF ke App state
        onCapture([]); // Kosongkan foto biasa jika ada
        onNavigate("filter"); // Langsung ke halaman filter
      });

      gif.render();
    }, 2000); // Total durasi rekam: 2 detik
  }, [videoRef, canvasRef, setGifResult, onNavigate, onCapture]);

  // Fungsi utama yang dipanggil tombol capture
  const handleCapture = () => {
    if (mode === "photo") {
      handleCapturePhoto();
    } else {
      handleCaptureGif();
    }
  };

  // Mengosongkan foto yang sudah diambil
  const handleRetake = useCallback(() => {
    onCapture([]);
  }, [onCapture]);

  return (
    <div className="flex flex-col text-white relative">
      {countdown !== null && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 rounded-lg">
          <h1 className="text-9xl font-bold">
            {countdown > 0 ? countdown : countdown === 0 ? "📸" : "REC"}
          </h1>
        </div>
      )}
      <div className="w-full bg-black h-48 rounded-lg mb-2 flex items-center justify-center text-gray-400 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full h-full object-cover -scale-x-100"
        />
      </div>
      <canvas ref={canvasRef} className="hidden" />

      {/* --- UI untuk Mode PHOTO --- */}
      {mode === "photo" && (
        <>
          <p className="font-bold text-lg mb-1">
            Result ({currentPhotos.length}/4):
          </p>
          <div className="grid grid-cols-4 gap-2 mb-4">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-full h-16 bg-gray-900 rounded-md overflow-hidden"
              >
                {currentPhotos[i] && (
                  <img
                    src={currentPhotos[i]}
                    alt={`Capture ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {/* --- Tombol Pindah Mode --- */}
      <p className="font-bold text-lg mb-2">Choose Mode:</p>
      <div className="grid grid-cols-2 gap-2 mb-4">
        <button
          onClick={() => setMode("photo")}
          className={`font-bold rounded-lg py-1 transition-colors ${
            mode === "photo"
              ? "bg-booth-btn-shadow text-white"
              : "bg-booth-btn text-booth-brown"
          }`}
        >
          Photo
        </button>
        <button
          onClick={() => setMode("gif")}
          className={`font-bold rounded-lg py-1 transition-colors ${
            mode === "gif"
              ? "bg-booth-btn-shadow text-white"
              : "bg-booth-btn text-booth-brown"
          }`}
        >
          GIF
        </button>
      </div>

      <p className="font-bold text-lg mb-2">Choose Camera:</p>
      <select
        value={selectedDeviceId}
        onChange={(e) => setSelectedDeviceId(e.target.value)}
        className="w-full p-2 rounded-lg bg-booth-btn text-booth-brown font-bold mb-4"
      >
        {videoDevices.map((device, index) => (
          <option key={device.deviceId} value={device.deviceId}>
            {device.label || `Camera ${index + 1}`}
          </option>
        ))}
      </select>

      {/* Timer hanya tampil di mode Photo */}
      {mode === "photo" && (
        <>
          <p className="font-bold text-lg mb-2">Choose Timer:</p>
          <div className="grid grid-cols-4 gap-2 mb-4">
            {[3, 5, 7, 10].map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTimer(t)}
                className={`font-bold rounded-lg py-1 transition-colors ${
                  selectedTimer === t
                    ? "bg-booth-btn-shadow text-white"
                    : "bg-booth-btn text-booth-brown"
                }`}
              >
                {t}s
              </button>
            ))}
          </div>
        </>
      )}

      <div className="w-full space-y-3">
        <BoothButton
          onClick={handleCapture}
          disabled={
            countdown !== null ||
            (mode === "photo" && currentPhotos.length >= 4)
          }
        >
          Capture
        </BoothButton>
        <BoothButton
          onClick={handleRetake}
          disabled={countdown !== null || mode === "gif"}
        >
          Retake
        </BoothButton>
        <BoothButton
          onClick={() => onNavigate("filter")}
          disabled={mode === "photo" && currentPhotos.length === 0}
        >
          Next
        </BoothButton>
      </div>
    </div>
  );
}

export default CameraView;
