import React from "react";

import RocketLife from "../../assets/icons/GameRocketLife.svg";
import OverHead from "../overHead/overHead";
import styles from "./score.module.scss";

interface ScoreProps {
  lives: number;
  candies: number;
  score: number;
  overheadPercentage: number;
}

const Score = React.memo(
  function ScoreComponent({
    lives,
    candies,
    score,
    overheadPercentage,
  }: ScoreProps) {
    return (
      <div className={styles.container}>
        <div className={styles.livesDisplayer}>
          {lives > 0 &&
            [...Array(lives)].map((index) => {
              return (
                <div className={styles.life}>
                  <img src={RocketLife} alt={`life${index}`} />
                </div>
              );
            })}

          <p className={styles.text}>Candies:</p>
          <p className={styles.text}>{candies}</p>
        </div>

        <div className={styles.overheadContainer}>
          <OverHead width={200} overheadPercentage={overheadPercentage} />
        </div>

        <div className={styles.scoreDisplayer}>
          <p className={styles.text}>Score: {score}</p>
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => {
    if (
      prevProps.candies === nextProps.candies &&
      prevProps.overheadPercentage === nextProps.overheadPercentage &&
      prevProps.lives === nextProps.lives
    ) {
      return true;
    }
    return false;
  }
);

export default Score;
