import Action from "../../Context/gameReducer";
import Enemy from "../../model/enemy";
import GameActions from "../../model/gameActions.enum";
import styles from "./enemies.module.scss";
import React, { useEffect } from "react";
import { Theme } from "../../model/Theme";

interface EnemiesProps {
  enemies: Enemy[];
  theme: Theme;
  dispatch: React.Dispatch<Action<GameActions, any>>;
  paused: boolean;
}

const Enemies = React.memo(
  ({ theme, enemies, dispatch, paused }: EnemiesProps) => {
    useEffect(() => {
      if (paused) return;
      const interval = setInterval(() => {
        if (enemies.length) {
          dispatch({ type: GameActions.MoveEnemies });
        }
      }, 1000);

      return () => clearInterval(interval);
    }, [enemies.length, dispatch, paused]);

    useEffect(() => {
      if (enemies.length === 0 && !paused) {
        setTimeout(() => {
          dispatch({ type: GameActions.NextLevel });
        }, 2000);
      }
    }, [enemies.length, dispatch, paused]);

    return (
      <>
        {enemies.map((enemy, index) => {
          const enemyLifePercent = (enemy.lifePoints / enemy.maxLife) * 100;
          const enemyLifeColor =
            enemyLifePercent > 75
              ? "lightgreen"
              : enemyLifePercent > 50
              ? "yellow"
              : enemyLifePercent > 25
              ? "orange"
              : "red";

          return (
            <>
              {enemyLifePercent < 100 && (
                <div
                  className={styles.enemyLifeBar}
                  style={{
                    left: enemy.x,
                    top: enemy.y - 10,
                    background: enemyLifeColor,
                    width: enemy.width,
                  }}
                ></div>
              )}
              <img
                key={index}
                alt={`Enemy${index}`}
                className={styles.enemy}
                style={{
                  left: enemy.x,
                  top: enemy.y,
                  width: enemy.width,
                  height: enemy.height,
                }}
                src={`${theme.enemies[theme.currentEnemy].skin}`}
              />
            </>
          );
        })}
      </>
    );
  },
  (prevProps, nextProps) => {
    if (
      JSON.stringify(prevProps.enemies) === JSON.stringify(nextProps.enemies) &&
      prevProps.paused === nextProps.paused
    ) {
      return true;
    }
    return false;
  }
);

export default Enemies;
