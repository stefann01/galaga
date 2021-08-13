import Alien from "../../assets/icons/Monstrulet2.2.svg";
import Action from "../../Context/gameReducer";
import Enemy from "../../model/enemy";
import GameActions from "../../model/gameActions.enum";
import styles from "./enemies.module.scss";
import React, { useEffect } from "react";

interface EnemiesProps {
  enemies: Enemy[];
  dispatch: React.Dispatch<Action<GameActions, any>>;
}

const Enemies = React.memo(
  ({ enemies, dispatch }: EnemiesProps) => {
    console.log("Enemies render");

    useEffect(() => {
      const interval = setInterval(() => {
        if (enemies.length) {
          dispatch({ type: GameActions.MoveEnemies });
        }
      }, 1000);

      return () => clearInterval(interval);
    }, [enemies.length, dispatch]);

    return (
      <>
        {enemies.map((enemy, index) => (
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
            src={Alien}
          />
        ))}
      </>
    );
  },
  (prevProps, nextProps) => {
    if (
      JSON.stringify(prevProps.enemies) === JSON.stringify(nextProps.enemies)
    ) {
      return true;
    }
    return false;
  }
);

export default Enemies;
