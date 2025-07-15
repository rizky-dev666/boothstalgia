// src/components/LandingPage.jsx

import React from "react";
import { motion } from "framer-motion";
import BoothButton from "./BoothButton";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      straggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

function LandingPage({ onNavigate }) {
  const handleStartClick = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach((track) => track.stop());
      onNavigate("camera");
    } catch (err) {
      console.error("Camera access denied:", err);
      const alertMessage =
        "Akses kamera ditolak.\n\n" +
        "Silakan berikan izin kamera di pengaturan browser Anda untuk melanjutkan.\n\n" +
        "Di iPhone: Pengaturan > Safari > Kamera\n" +
        "Di browser lain: Klik ikon gembok (🔒) di sebelah URL.";
      alert(alertMessage);
    }
  };

  return (
    <motion.div
      className="flex flex-col items-center text-center text-booth-bg"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h2 className="font-title text-3xl" variants={itemVariants}>
        Welcome to
      </motion.h2>
      <motion.h1 className="font-display text-4xl mb-8" variants={itemVariants}>
        BOOTHSTALGIA
      </motion.h1>

      <motion.div className="w-full space-y-4" variants={itemVariants}>
        <BoothButton onClick={handleStartClick}>Start</BoothButton>
        <BoothButton onClick={() => onNavigate("about")}>About</BoothButton>
        <BoothButton onClick={() => onNavigate("how-to-use")}>
          How To Use
        </BoothButton>
      </motion.div>
    </motion.div>
  );
}

export default LandingPage;
