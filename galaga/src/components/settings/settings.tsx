import React, { useState } from "react";
import styles from "./settings.module.scss";
import Dropdown from "../common/dropdown/dropdown";

interface SettingsProps {
  onClose: CallableFunction;
}

export default function Settings({ onClose }: SettingsProps) {
  const [selectedTheme, setSelectedTheme] = useState("Minecraft");

  return (
    <div className={styles.settingsContainer}>
      <div className={styles.settingsContent}>
        <div className={styles.dropdownContainer}>
          <span className={styles.title}>Theme</span>
          <Dropdown
            items={["Minecraft", "Rainbow", "Pokemon"]}
            onItemClick={(theme: string) => {
              setSelectedTheme(theme);
            }}
            selectedItem={selectedTheme}
          />
        </div>
      </div>
    </div>
  );
}
