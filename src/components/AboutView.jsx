// src/components/AboutView.jsx

import React from "react";
import BoothButton from "./BoothButton";

function AboutView({ onNavigate }) {
  return (
    <div className="text-booth-cream text-center space-y-4">
      <p className="font-title text-base leading-relaxed font-normal">
        Boothstalgia is a photo booth web app designed to capture your precious
        moments with a fun retro touch and full of nostalgia.
      </p>

      <p className="font-title text-base leading-relaxed font-normal">
        Choose your favorite frame, dress up as you please, and share your joy!
      </p>

      <hr className="border-t-2 border-booth-btn-shadow my-4" />

      <p className="font-title font-normal">
        This project was made with love and passion for learning to code.
      </p>
      <br></br>
      <p className="font-title text-base">
        Best wishes from the developer!
      </p>
      <p className="font-title text-lg">- kiroosevelt -</p>

      <div className="pt-4">
        <BoothButton onClick={() => onNavigate("landing")}>Back</BoothButton>
      </div>
    </div>
  );
}

export default AboutView;
