// src/components/HowToUseView.jsx

import React from "react";
import BoothButton from "./BoothButton";

function HowToUseView({ onNavigate }) {
  return (
    <div className="text-booth-cream text-left space-y-4">
      <h2 className="font-display text-3xl text-booth-cream text-center mb-4">
        How To Use
      </h2>

      <ol className="list-decimal list-inside space-y-4 font-title text-base font-normal">
        <li>
          <span className="font-bold text-booth-cream">
            Start Your Session:
          </span>{" "}
          Click the 'Start' button on the main screen to begin the experience.
        </li>
        <li>
          <span className="font-bold text-booth-cream">Strike a Pose:</span>{" "}
          Select your camera and a timer. Hit 'Capture' to take up to four
          photos. You can always hit 'Retake' to start over.
        </li>
        <li>
          <span className="font-bold text-booth-cream">Add Some Flair:</span> On
          the next screen, apply a fun filter like B&W, Film, or Pop to give
          your photos a unique vibe.
        </li>
        <li>
          <span className="font-bold text-booth-cream">Frame Your Moment:</span>{" "}
          Choose one of our custom frames to create your final, beautiful photo
          strip.
        </li>
        <li>
          <span className="font-bold text-booth-cream">Download & Share:</span>{" "}
          Hit the 'Download' button to save your masterpiece to your device and
          share it with the world!
        </li>
      </ol>

      <div className="pt-4">
        <BoothButton onClick={() => onNavigate("landing")}>Back</BoothButton>
      </div>
    </div>
  );
}

export default HowToUseView;
