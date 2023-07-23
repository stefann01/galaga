import React, { useEffect } from "react";

import Action from "../Context/gameReducer";
import GameActions from "../model/gameActions.enum";
import Rocket from "../model/rocket";
import styles from "./rocket.module.scss";

interface RocketComponentProps {
  rocket: Rocket;
  dispatch: React.Dispatch<Action<GameActions, any>>;
  skin: string;
}

const RocketComp = React.memo(
  function RocketComponent({ rocket, dispatch, skin }: RocketComponentProps) {
    useEffect(() => {
      function setMousePosition(e) {
        dispatch({
          type: GameActions.Move,
          payload: { x: e.clientX, y: e.clientY },
        });
      }
      window.addEventListener("mousemove", setMousePosition);

      return () => window.removeEventListener("mousemove", setMousePosition);
    }, [dispatch]);

    useEffect(() => {
      const handleKeyDown = (e) => {
        if (e.keyCode === 32) {
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
      };

      const handleClick = () => {
        dispatch({ type: GameActions.Shoot });
      };

      window.addEventListener("click", handleClick);
      window.addEventListener("keyup", handleKeyDown);

      return () => {
        window.removeEventListener("click", handleKeyDown);
        window.removeEventListener("keyup", handleClick);
      };
    }, [dispatch]);

    return (
      <div
        className={styles.rocket}
        style={{
          left: rocket.x,
          top: rocket.y,
          width: rocket.width,
          height: rocket.height,
          background: `url(${skin}) no-repeat`,
          backgroundSize: "cover",
        }}
      ></div>
    );
  },
  (prevProps, nextProps) => {
    if (
      prevProps.rocket.x === nextProps.rocket.x &&
      prevProps.rocket.y === nextProps.rocket.y
    ) {
      return true;
    }
    return false;
  }
);

export default RocketComp;
