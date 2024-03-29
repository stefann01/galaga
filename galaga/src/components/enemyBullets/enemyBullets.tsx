import React, { useEffect } from "react";

import Action from "../../Context/gameReducer";
import Bullet from "../../model/bullet";
import GameActions from "../../model/gameActions.enum";
import { Theme } from "../../model/Theme";
import styles from "./enemyBullets.module.scss";

interface EnemyBulletsProps {
  dispatch: React.Dispatch<Action<GameActions, any>>;
  enemyBullets: Bullet[];
  theme: Theme;
  paused: boolean;
}
function EnemyBullets({
  enemyBullets,
  theme,
  dispatch,
  paused,
}: EnemyBulletsProps) {
  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      if (
        Math.random() < theme.enemies[theme.currentEnemy].shootingProbability
      ) {
        dispatch({ type: GameActions.AddEnemyBullet });
      }
    }, 500);

    return () => clearInterval(interval);
  }, [dispatch, theme.currentEnemy, theme.enemies, paused]);

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      if (enemyBullets.length) {
        dispatch({ type: GameActions.MoveEnemyBullet });
      }
    }, 10);

    return () => clearInterval(interval);
  }, [enemyBullets.length, dispatch, paused]);

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
              backgroundImage: `url(${
                theme.enemies[theme.currentEnemy].bullet
              })`,
            }}
          ></div>
        ))}
    </>
  );
}

export default React.memo(EnemyBullets);
