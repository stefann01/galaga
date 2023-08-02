import Action from "../Context/gameReducer";
import GameActions from "../model/gameActions.enum";
import React, { useEffect } from "react";

export default function useGameMenuKeys(
  dispatch: React.Dispatch<Action<GameActions, any>>,
  paused: boolean,
  isGameStarted: boolean
) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!paused) {
        if (e.keyCode === 32) {
          console.log("space");
          //space
          dispatch({ type: GameActions.Shoot });
        }
        if (e.keyCode === 66) {
          //b
          dispatch({ type: GameActions.BuyLives });
        }
        if (e.keyCode === 70) {
          //f
          dispatch({ type: GameActions.IncreaseRocketPower });
        }
      }
      if (e.keyCode === 80 && isGameStarted) {
        //p
        dispatch({ type: GameActions.Pause });
      }
    };

    const handleClick = () => {
      if (paused) return;
      dispatch({ type: GameActions.Shoot });
    };

    window.addEventListener("click", handleClick);
    window.addEventListener("keyup", handleKeyDown);

    return () => {
      window.removeEventListener("click", handleClick);
      window.removeEventListener("keyup", handleKeyDown);
    };
  }, [dispatch, paused, isGameStarted]);
}
