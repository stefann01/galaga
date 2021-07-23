import React from "react";
import { useGameContext } from "../../Context/gameProvider";
import styles from "./score.module.scss";
import RocketLife from "../../assets/icons/GameRocketLife.svg";
import OverHead from "../overHead/overHead";

export default function Score() {
  const { score, lives, candies } = useGameContext();

  return (
    <div className={styles.container}>
      <div className={styles.livesDisplayer}>
        {[...Array(lives)].map((index) => {
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
        <OverHead width={200} />
      </div>

      <div className={styles.scoreDisplayer}>
        <p className={styles.text}>Score: {score}</p>
      </div>
    </div>
  );
}
