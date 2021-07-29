import React, { useEffect } from "react";

import { useGameContext } from "../../Context/gameProvider";
import Enemy from "../../model/enemy";
import GameActions from "../../model/gameActions.enum";
import styles from "./enemyBullets.module.scss";

export default function EnemyBullets() {
  const { enemyBullets, dispatch } = useGameContext();
  // console.log("enemy bullet render");

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < Enemy.enemyShootProbability) {
        dispatch({ type: GameActions.AddEnemyBullet });
      }
    }, 500);

    return () => clearInterval(interval);
  }, [dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (enemyBullets.length) {
        dispatch({ type: GameActions.MoveEnemyBullet });
      }
    }, 15);

    return () => clearInterval(interval);
  }, [enemyBullets.length, dispatch]);

  return (
    <>
      {enemyBullets.length &&
        enemyBullets.map((bullet, index) => (
          <div
            key={index}
            className={styles.bullet}
            style={{
              left: bullet.x,
              top: bullet.y,
              width: bullet.width,
              height: bullet.height,
            }}
          ></div>
        ))}
    </>
  );
}
