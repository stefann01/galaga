import React from "react";
import styles from "./gameMenu.module.scss";
import Modal from "react-modal";
import Settings from "../settings/settings";

interface GameMenuProps {
  onPlay: (play: boolean) => void;
  onClickSettingsButton: CallableFunction;
  showSettings: boolean;
}
export default function GameMenu({
  onPlay,
  onClickSettingsButton,
  showSettings,
}: GameMenuProps) {
  return (
    <div className={styles.menuContainer}>
      <h1 className={styles.warningMessage}>Work still in progress... ☕</h1>
      <div className={styles.buttons}>
        <button
          className={styles.playButton}
          onClick={() => {
            onPlay(true);
          }}
        >
          <h2 className={styles.buttonsText}> Play Game </h2>
        </button>

        <br />

        <button
          className={styles.helpButton}
          onClick={() => onClickSettingsButton(true)}
        >
          <h2 className={styles.buttonsText}> Settings </h2>
        </button>

        <br />

        <button className={styles.helpButton}>
          <h2 className={styles.buttonsText}> Help </h2>
        </button>
      </div>
      <Modal isOpen={showSettings}>
        <Settings onClose={() => onClickSettingsButton(false)} />
      </Modal>
    </div>
  );
}
