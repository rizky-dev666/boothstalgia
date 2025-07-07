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
  const [selectedFilter, setSelectedFilter] = useState("");
  const [selectedFrame, setSelectedFrame] = useState(null);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);

  const getTitle = () => {
    if (currentView === "camera") return "Take Photo";
    if (currentView === "filter") return "Choose Filter";
    if (currentView === "frame") return "Choose Frame";
    if (currentView === "about") return "About";
    if (currentView === "how-to-use") return "How To Use";
    return "Boothstalgia";
  };

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
            openDownloadModal={() => setIsDownloadModalOpen(true)}
          />
        );
      default:
        return <LandingPage onNavigate={setCurrentView} />;
    }
  };

  return (
    // Gunakan React Fragment <> untuk membungkus semuanya
    <>
      <main className="bg-booth-bg min-h-screen w-full flex flex-col items-center justify-center p-4 font-display">
        {/* Modal TIDAK LAGI di sini */}

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

      {/* PINDAHKAN Modal ke sini, di luar <main> */}
      {isDownloadModalOpen && <DownloadModal onClose={handleReset} />}
    </>
  );
}

export default App;
