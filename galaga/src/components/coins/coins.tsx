import React, { useEffect } from "react";

import Action from "../../Context/gameReducer";
import Coin from "../../model/coin";
import GameActions from "../../model/gameActions.enum";
import styles from "./coins.module.scss";

interface CoinsProps {
  coins: Coin[];
  dispatch: React.Dispatch<Action<GameActions, any>>;
}
function Coins({ coins, dispatch }: CoinsProps) {
  useEffect(() => {
    const interval = setInterval(() => {
      if (coins.length) {
        dispatch({ type: GameActions.MoveCoins });
      }
    }, 10);

    return () => clearInterval(interval);
  }, [coins.length, dispatch]);

  return (
    <>
      {coins.map((coin, index) => (
        <div
          key={index}
          className={coin.isSpecial ? styles.specialCoin : styles.coin}
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

export default React.memo(Coins);
