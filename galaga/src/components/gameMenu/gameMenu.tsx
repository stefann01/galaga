import React from "react";
import styles from "./gameMenu.module.scss";
import Settings from "../settings/settings";
import Help from "../help/help";

interface GameMenuProps {
  onPlay: (play: boolean) => void;
  onClickSettingsButton: CallableFunction;
  showSettings: boolean;
  onClickHelpButton: CallableFunction;
  showHelp: boolean;
}
export default function GameMenu({
  onPlay,
  onClickSettingsButton,
  onClickHelpButton,
  showSettings,
  showHelp,
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

        {/* <br />

        <button
          className={styles.helpButton}
          onClick={() => onClickSettingsButton(true)}
        >
          <h2 className={styles.buttonsText}> Settings </h2>
        </button> */}

        <br />

        <button
          className={styles.helpButton}
          onClick={() => {
            onClickHelpButton(true);
          }}
        >
          <h2 className={styles.buttonsText}> How to play </h2>
        </button>
      </div>
      <div
        className={styles.modal}
        style={{ display: showSettings ? "block" : "none" }}
      >
        <Settings onClose={() => onClickSettingsButton(false)} />
      </div>
      <div
        className={styles.modal}
        style={{ display: showHelp ? "block" : "none" }}
      >
        <Help onClose={() => onClickHelpButton(false)} />
      </div>
      {!showHelp && !showSettings ? (
        <footer className={styles.footer}>
          <p>
            Developed & brought to you with <span> ❤️</span> by{" "}
            <b> Mares Stefan </b> & <b> Mares Gabriel </b> ©2022 - All rights
            reserved
          </p>
        </footer>
      ) : (
        <></>
      )}
    </div>
  );
}
