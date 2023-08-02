import React, { useEffect } from "react";

import Action from "../Context/gameReducer";
import GameActions from "../model/gameActions.enum";
import Rocket from "../model/rocket";
import styles from "./rocket.module.scss";

interface RocketComponentProps {
  rocket: Rocket;
  dispatch: React.Dispatch<Action<GameActions, any>>;
  skin: string;
  paused: boolean;
}

const RocketComp = React.memo(
  function RocketComponent({
    rocket,
    dispatch,
    skin,
    paused,
  }: RocketComponentProps) {
    useEffect(() => {
      function setMousePosition(e: MouseEvent) {
        if (paused) return;
        dispatch({
          type: GameActions.Move,
          payload: { x: e.clientX, y: e.clientY },
        });
      }

      window.addEventListener("mousemove", setMousePosition);

      return () => window.removeEventListener("mousemove", setMousePosition);
    }, [dispatch, paused]);

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
      prevProps.rocket.y === nextProps.rocket.y &&
      prevProps.paused === nextProps.paused
    ) {
      return true;
    }
    return false;
  }
);

export default RocketComp;
