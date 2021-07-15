import React, { useEffect } from "react";
import { useGameContext } from "../../Context/gameProvider";
import Bullet from "../../model/bullet";
import Enemy from "../../model/enemy";
import GameActions from "../../model/gameActions.enum";
import styles from "./enemyBullets.module.scss";
export default function EnemyBullets() {
  const { enemyBullets, dispatch } = useGameContext();
  // console.log("Enemy Bullets render");

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < Enemy.enemyShootProbability) {
        dispatch({ type: GameActions.AddEnemyBullet });
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ type: GameActions.MoveEnemyBullet });
    }, 20);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {enemyBullets.map((bullet, index) => (
        <div
          key={index}
          className={styles.bullet}
          style={{
            left: bullet.x,
            top: bullet.y,
          }}
        ></div>
      ))}
    </>
  );
}
