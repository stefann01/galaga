import React from "react";
import { useGameContext } from "../../Context/gameProvider";
import styles from "./score.module.scss";

export default function Score() {
  const { score } = useGameContext();

  return (
    <div>
      <h1 className={styles.score}>Score: {score}</h1>
    </div>
  );
}
