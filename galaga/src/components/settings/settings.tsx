import React, { useState } from "react";
import styles from "./settings.module.scss";
import Dropdown from "../common/dropdown/dropdown";

interface SettingsProps {
  onClose: CallableFunction;
}

export default function Settings({ onClose }: SettingsProps) {
  const [selectedTheme, setSelectedTheme] = useState("Minecraft");
  const [isFullScreen, setIsFullScreen] = useState(false);

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
    if (isFullScreen) {
      window.document.exitFullscreen();
      return;
    }
    window.document.documentElement.requestFullscreen();
  };

  return (
    <div className={styles.settingsContainer}>
      <div className={styles.settingsContent}>
        <h1>Settings</h1>
        <div className={styles.dropdownContainer}>
          <span className={styles.title}>Theme</span>
          <Dropdown
            items={["Minecraft", "Rainbow (soon)", "Pokemon (soon)"]}
            onItemClick={(theme: string) => {
              setSelectedTheme(theme);
            }}
            selectedItem={selectedTheme}
          />
          <button
            onClick={toggleFullScreen}
            className={styles.fullscreenButton}
          >
            <h3>Fullscreen</h3>
          </button>
          <button
            className={styles.closeButton}
            onClick={() => {
              onClose();
            }}
          >
            <h3>Back</h3>
          </button>
        </div>
      </div>
    </div>
  );
}
