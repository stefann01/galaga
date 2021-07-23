import React from "react";
import { useGameContext } from "../../Context/gameProvider";
import styles from "./score.module.scss";

export default function Score() {
  const { score, candies } = useGameContext();

  return (
    <div>
      <h1 className={styles.score}>Score: {score}</h1>
      <h1 className={styles.score}>Candies: {candies}</h1>
    </div>
  );
}
