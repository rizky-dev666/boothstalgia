// src/components/CameraView.jsx

import React, { useState, useRef, useEffect, useCallback } from "react";
import BoothButton from "./BoothButton"; // <-- Impor tombol dari file terpisah

function CameraView({ onNavigate, onCapture, currentPhotos }) {
  const [selectedTimer, setSelectedTimer] = useState(3);
  const [countdown, setCountdown] = useState(null);
  const [videoDevices, setVideoDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState("");

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

  // Menggunakan useCallback untuk optimasi
  const handleCapture = useCallback(() => {
    if (currentPhotos.length >= 4) return;
    setCountdown(selectedTimer);
    const countdownInterval = setInterval(
      () => setCountdown((prev) => prev - 1),
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
        // Membalik kanvas secara horizontal sebelum menggambar jika video preview di-mirror
        context.translate(canvas.width, 0);
        context.scale(-1, 1);
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        const dataUrl = canvas.toDataURL("image/jpeg");
        onCapture((prevPhotos) => [...prevPhotos, dataUrl]);
        // Reset transform setelah menggambar
        context.setTransform(1, 0, 0, 1, 0, 0);
      }
      setCountdown(null);
    }, selectedTimer * 1000);
  }, [selectedTimer, currentPhotos, onCapture]);

  // Menggunakan useCallback untuk optimasi
  const handleRetake = useCallback(() => {
    onCapture([]);
  }, [onCapture]);

  return (
    <div className="flex flex-col text-white relative">
      {countdown !== null && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 rounded-lg">
          <h1 className="text-9xl font-bold">
            {countdown > 0 ? countdown : "📸"}
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
      <p className="font-bold text-lg mb-2">Choose Camera :</p>
      <select
        value={selectedDeviceId}
        onChange={(e) => setSelectedDeviceId(e.target.value)}
        className="w-full p-2 rounded-lg bg-booth-btn text-booth-brown font-bold mb-4"
      >
        {videoDevices.map((device) => (
          <option key={device.deviceId} value={device.deviceId}>
            {device.label || `Camera ${videoDevices.indexOf(device) + 1}`}
          </option>
        ))}
      </select>
      <p className="font-bold text-lg mb-2">Choose Timer :</p>
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
      <div className="w-full space-y-3">
        <BoothButton
          onClick={handleCapture}
          disabled={countdown !== null || currentPhotos.length >= 4}
        >
          Capture
        </BoothButton>
        <BoothButton onClick={handleRetake} disabled={countdown !== null}>
          Retake
        </BoothButton>
        <BoothButton
          onClick={() => onNavigate("filter")}
          disabled={currentPhotos.length === 0}
        >
          Next
        </BoothButton>
      </div>
    </div>
  );
}

export default CameraView;
