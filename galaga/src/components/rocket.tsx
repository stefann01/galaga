import React, { useEffect } from "react";

import { useGameContext } from "../Context/gameProvider";
import GameActions from "../model/gameActions.enum";
import styles from "./rocket.module.scss";

function Rocket() {
  const { rocket, dispatch } = useGameContext();

  useEffect(() => {
    function setMousePosition(e) {
      dispatch({
        type: GameActions.Move,
        payload: { x: e.clientX, y: e.clientY },
      });
    }
    window.addEventListener("mousemove", setMousePosition);

    return () => window.removeEventListener("mousemove", setMousePosition);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.keyCode === 32) {
        console.log("Shooting");
        dispatch({ type: GameActions.Shoot });
      }
    };

    window.addEventListener("click", handleKeyDown);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("click", handleKeyDown);
    };
  }, []);

  // console.log("Rocket render");

  return (
    <>
      <div
        className={styles.rocket}
        style={{
          left: rocket.x,
          top: rocket.y,
          width: rocket.width,
          height: rocket.height,
        }}
      ></div>
    </>
  );
}

export default React.memo(Rocket);
