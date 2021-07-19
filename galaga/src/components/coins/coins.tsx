import React, { useEffect } from "react";

import { useGameContext } from "../../Context/gameProvider";
import GameActions from "../../model/gameActions.enum";
import styles from "./coins.module.scss";

export default function Coins() {
  const { coins, dispatch } = useGameContext();

  useEffect(() => {
    const interval = setInterval(() => {
      if (coins.length) {
        dispatch({ type: GameActions.MoveCoins });
      }
    }, 20);

    return () => clearInterval(interval);
  }, [coins.length, dispatch]);

  return (
    <>
      {coins.map((coin, index) => (
        <div
          key={index}
          className={styles.coin}
          style={{
            left: coin.x,
            top: coin.y,
            width: coin.width,
            height: coin.height,
          }}
        ></div>
      ))}
    </>
  );
}
