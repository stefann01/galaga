import React, { useEffect } from "react";

import Action from "../../Context/gameReducer";
import Bullet from "../../model/bullet";
import Enemy from "../../model/enemy";
import GameActions from "../../model/gameActions.enum";
import { Theme } from "../../model/Theme";
import styles from "./enemyBullets.module.scss";

interface EnemyBulletsProps {
  dispatch: React.Dispatch<Action<GameActions, any>>;
  enemyBullets: Bullet[];
  theme: Theme;
}
function EnemyBullets({ enemyBullets, theme, dispatch }: EnemyBulletsProps) {
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
    }, 10);

    return () => clearInterval(interval);
  }, [enemyBullets.length, dispatch]);

  return (
    <>
      {enemyBullets.length > 0 &&
        enemyBullets.map((bullet, index) => (
          <div
            key={index}
            className={styles.bullet}
            style={{
              left: bullet.x,
              top: bullet.y,
              width: bullet.width,
              height: bullet.height,
              backgroundSize: "cover",
              backgroundImage: `url(${process.env.PUBLIC_URL}${
                theme.enemies[theme.currentEnemy].bullet
              })`,
            }}
          ></div>
        ))}
    </>
  );
}

export default React.memo(EnemyBullets);
