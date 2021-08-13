import React from "react";
import styles from "./gameMenu.module.scss";

interface GameMenuProps {
  onPlay: (play: boolean) => void;
}
export default function GameMenu({ onPlay }: GameMenuProps) {
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

        <button className={styles.helpButton}>
          <h2 className={styles.buttonsText}> Help </h2>
        </button>
      </div>
    </div>
  );
}
