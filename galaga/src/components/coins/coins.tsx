import React, { useEffect } from "react";

import Action from "../../Context/gameReducer";
import Coin from "../../model/coin";
import GameActions from "../../model/gameActions.enum";
import styles from "./coins.module.scss";

interface CoinsProps {
  coins: Coin[];
  dispatch: React.Dispatch<Action<GameActions, any>>;
  skin: string;
  paused: boolean;
}
function Coins({ coins, dispatch, skin, paused }: CoinsProps) {
  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      dispatch({ type: GameActions.MoveCoins });
    }, 50);

    return () => clearInterval(interval);
  }, [coins.length, dispatch, paused]);

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
            backgroundImage: `url(${skin})`,
          }}
        ></div>
      ))}
    </>
  );
}

export default React.memo(Coins);
