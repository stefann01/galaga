import React from "react";

import Alien from "../../assets/icons/ari_alien.svg";
import { useGameContext } from "../../Context/gameProvider";
import styles from "./enemies.module.scss";

export default function Enemies() {
  const { enemies } = useGameContext();

  return <EnemiesComp enemies={enemies} />;
}

const EnemiesComp = React.memo(
  ({ enemies }: any) => {
    // console.log("Enemies render");
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
    if (prevProps.enemies.length === nextProps.enemies.length) {
      return true;
    }
    return false;
  }
);
