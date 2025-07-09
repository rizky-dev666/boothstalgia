// src/App.jsx

import { useState, useEffect, useRef } from "react";
import LandingPage from "./components/LandingPage";
import CameraView from "./components/CameraView";
import ChooseFilter from "./components/ChooseFilter";
import ChooseFrame from "./components/ChooseFrame";
import DownloadModal from "./components/DownloadModal";
import logo from "./assets/boothstalgia.png";
import AboutView from "./components/AboutView";
import HowToUseView from "./components/HowToUseView";
import { FaPlay, FaPause } from "react-icons/fa";

function App() {
  const [currentView, setCurrentView] = useState("landing");
  const [capturedPhotos, setCapturedPhotos] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [selectedFrame, setSelectedFrame] = useState(null);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [finalImage, setFinalImage] = useState(null);

  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio
        .play()
        .then(() => {
          setIsMusicPlaying(true);
        })
        .catch((error) => {
          console.log("Autoplay music was blocked by the browser:", error);
          setIsMusicPlaying(false);
        });
    }
  }, []);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (isMusicPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsMusicPlaying(!isMusicPlaying);
  };

  const getTitle = () => {
    if (currentView === "camera") return "Take Photo";
    if (currentView === "filter") return "Choose Filter";
    if (currentView === "frame") return "Choose Frame";
    if (currentView === "about") return "About";
    if (currentView === "how-to-use") return "How To Use";
    return "Boothstalgia";
  };

  // Fungsi ini sekarang hanya untuk kembali ke landing page
  const handleResetToHome = () => {
    setCapturedPhotos([]);
    setSelectedFilter("");
    setSelectedFrame(null);
    setIsDownloadModalOpen(false);
    setFinalImage(null);
    setCurrentView("landing");
  };

  // 1. Buat fungsi baru HANYA untuk menutup modal
  const closeDownloadModal = () => {
    setIsDownloadModalOpen(false);
  };

  const renderView = () => {
    switch (currentView) {
      case "landing":
        return <LandingPage onNavigate={setCurrentView} />;
      case "about":
        return <AboutView onNavigate={setCurrentView} />;
      case "how-to-use":
        return <HowToUseView onNavigate={setCurrentView} />;
      case "camera":
        return (
          <CameraView
            onNavigate={setCurrentView}
            onCapture={setCapturedPhotos}
            currentPhotos={capturedPhotos}
          />
        );
      case "filter":
        return (
          <ChooseFilter
            photos={capturedPhotos}
            onNavigate={setCurrentView}
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
          />
        );
      case "frame":
        return (
          <ChooseFrame
            photos={capturedPhotos}
            filter={selectedFilter}
            onNavigate={setCurrentView}
            selectedFrame={selectedFrame}
            setSelectedFrame={setSelectedFrame}
            openDownloadModal={(dataUrl) => {
              setFinalImage(dataUrl);
              setIsDownloadModalOpen(true);
            }}
            // 2. Teruskan fungsi reset ke halaman ChooseFrame
            onGoHome={handleResetToHome}
          />
        );
      default:
        return <LandingPage onNavigate={setCurrentView} />;
    }
  };

  return (
    <>
      <main className="bg-booth-bg min-h-screen w-full flex flex-col items-center justify-center p-4 font-display">
        <audio ref={audioRef} src="/music.mp3" loop />

        <button
          onClick={toggleMusic}
          className="fixed top-4 right-4 bg-booth-brown text-booth-beige w-10 h-10 rounded-full flex items-center justify-center shadow-lg z-50 hover:opacity-80 transition-opacity"
          aria-label={isMusicPlaying ? "Pause music" : "Play music"}
        >
          {isMusicPlaying ? <FaPause size={16} /> : <FaPlay size={16} />}
        </button>

        {currentView === "landing" ? (
          <img
            src={logo}
            alt="Boothstalgia Logo"
            className="w-40 h-auto mb-5"
          />
        ) : (
          <h1 className="text-5xl font-title text-booth-brown drop-shadow-booth-title mb-4 text-center">
            {getTitle()}
          </h1>
        )}
        <div className="bg-booth-brown w-full max-w-sm rounded-3xl p-6 shadow-booth-container">
          {renderView()}
        </div>
        <p className="text-booth-brown mt-4">
          Made with love by <span className="font-bold">kiroosevelt</span>
        </p>
      </main>

      {/* 3. Gunakan fungsi closeDownloadModal untuk prop onClose */}
      {isDownloadModalOpen && (
        <DownloadModal onClose={closeDownloadModal} finalImage={finalImage} />
      )}
    </>
  );
}

export default App;
