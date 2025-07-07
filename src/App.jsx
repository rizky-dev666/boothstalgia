// src/App.jsx

import { useState } from "react";
import LandingPage from "./components/LandingPage";
import CameraView from "./components/CameraView";
import ChooseFilter from "./components/ChooseFilter";
import ChooseFrame from "./components/ChooseFrame";
import DownloadModal from "./components/DownloadModal";
import logo from "./assets/boothstalgia.png";
import AboutView from "./components/AboutView";
import HowToUseView from "./components/HowToUseView";

function App() {
  const [currentView, setCurrentView] = useState("landing");
  const [capturedPhotos, setCapturedPhotos] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(""); // Default: tidak ada filter
  const [selectedFrame, setSelectedFrame] = useState(null); // <-- State baru untuk frame
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false); // <-- State untuk modal

  const getTitle = () => {
    // ... (fungsi ini tidak berubah)
    if (currentView === "camera") return "Take Photo";
    if (currentView === "filter") return "Choose Filter";
    if (currentView === "frame") return "Choose Frame";
    if (currentView === "about") return "About";
    if (currentView === "how-to-use") return "How To Use";
    return "Boothstalgia";
  };

  // Fungsi untuk mereset semua dari awal
  const handleReset = () => {
    setCapturedPhotos([]);
    setSelectedFilter("");
    setSelectedFrame(null);
    setIsDownloadModalOpen(false);
    setCurrentView("landing");
  };

  const renderView = () => {
    switch (currentView) {
      case "landing":
        return <LandingPage onNavigate={setCurrentView} />;
      case "about": // <-- TAMBAHKAN INI
        return <AboutView onNavigate={setCurrentView} />;
      case "how-to-use": // <-- TAMBAHKAN INI
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
      case "frame": // <-- Tambahkan case untuk halaman frame
        return (
          <ChooseFrame
            photos={capturedPhotos}
            filter={selectedFilter}
            onNavigate={setCurrentView}
            selectedFrame={selectedFrame}
            setSelectedFrame={setSelectedFrame}
            openDownloadModal={() => setIsDownloadModalOpen(true)}
          />
        );
      default:
        return <LandingPage onNavigate={setCurrentView} />;
    }
  };

  return (
    <main className="bg-booth-bg min-h-screen w-full flex flex-col items-center justify-center p-4 font-display">
      {/* Conditionally render modal on top of everything */}
      {isDownloadModalOpen && <DownloadModal onClose={handleReset} />}

      {currentView === "landing" ? (
        <img src={logo} alt="Boothstalgia Logo" className="w-40 h-auto mb-5" />
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
  );
}

export default App;
