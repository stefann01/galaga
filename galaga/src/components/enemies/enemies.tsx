import React, { useEffect } from "react";

import Alien from "../../assets/icons/alien.svg";
import { useGameContext } from "../../Context/gameProvider";
import GameActions from "../../model/gameActions.enum";
import styles from "./enemies.module.scss";

export default function Enemies() {
  const { enemies, dispatch } = useGameContext();
  // console.log("Enemies render");

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const x = Math.floor(Math.random() * window.innerWidth) + 1;
  //     const y = Math.floor((Math.random() * window.innerHeight) / 2) + 1;
  //     dispatch({ type: GameActions.AddEnemy, payload: { x, y } });
  //   }, 200);
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <>
      {enemies.map((enemy, index) => (
        <img
          key={index}
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
}
