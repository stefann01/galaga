import React from "react";

import Alien from "../../assets/icons/Monstrulet2.2.svg";
import Enemy from "../../model/enemy";
import styles from "./enemies.module.scss";

interface EnemiesProps {
  enemies: Enemy[];
}

const Enemies = React.memo(
  ({ enemies }: EnemiesProps) => {
    console.log("Enemies render");
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
