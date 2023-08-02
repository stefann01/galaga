import styles from "./pauseContent.module.scss";

interface PauseContentProps {
  level: number;
  coins: number;
  lives: number;
  score: number;
  theme: string;
  gameMuted: boolean;
  onResume: () => void;
  onQuit: () => void;
  onMute: () => void;
}
function PauseContent({
  level,
  coins,
  lives,
  score,
  gameMuted,
  theme,
  onResume,
  onQuit,
  onMute,
}: PauseContentProps) {
  return (
    <div className={styles.content}>
      <div className={styles.row}>
        <p>Current level: {level}</p>
        <p>Score: {score}</p>
      </div>
      <div className={styles.row}>
        <p>Coins: {coins}</p>
        <p>Theme: {theme}</p>
      </div>
      <div></div>
      <div className={styles.buttons}>
        <button>Resume</button>
        <button>Quit</button>
      </div>
    </div>
  );
}

export default PauseContent;
