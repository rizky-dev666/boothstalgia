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
import MaintenanceView from "./components/MaintenanceView"; // <-- 1. Impor komponen baru

// --- SAKLAR MODE MAINTENANCE ---
// Ubah nilainya menjadi 'true' untuk mengaktifkan, atau 'false' untuk menonaktifkan.
const IS_MAINTENANCE_MODE = true;

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
    if (IS_MAINTENANCE_MODE) return; // Jangan jalankan musik saat maintenance
    const audio = audioRef.current;
    if (audio) {
      audio
        .play()
        .then(() => setIsMusicPlaying(true))
        .catch(() => setIsMusicPlaying(false));
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

  const handleResetToHome = () => {
    setCapturedPhotos([]);
    setSelectedFilter("");
    setSelectedFrame(null);
    setIsDownloadModalOpen(false);
    setFinalImage(null);
    setCurrentView("landing");
  };

  const closeDownloadModal = () => {
    setIsDownloadModalOpen(false);
  };

  const renderView = () => {
    // 2. Jika mode maintenance aktif, tampilkan hanya MaintenanceView
    if (IS_MAINTENANCE_MODE) {
      return <MaintenanceView />;
    }

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
        {!IS_MAINTENANCE_MODE && <audio ref={audioRef} src="/music.mp3" loop />}

        {!IS_MAINTENANCE_MODE && (
          <button
            onClick={toggleMusic}
            className="fixed top-4 right-4 bg-booth-brown text-booth-beige w-10 h-10 rounded-full flex items-center justify-center shadow-lg z-50 hover:opacity-80 transition-opacity"
            aria-label={isMusicPlaying ? "Pause music" : "Play music"}
          >
            {isMusicPlaying ? <FaPause size={16} /> : <FaPlay size={16} />}
          </button>
        )}

        {/* 3. Atur tampilan logo/judul berdasarkan mode */}
        {IS_MAINTENANCE_MODE || currentView === "landing" ? (
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

      {!IS_MAINTENANCE_MODE && isDownloadModalOpen && (
        <DownloadModal onClose={closeDownloadModal} finalImage={finalImage} />
      )}
    </>
  );
}

export default App;
