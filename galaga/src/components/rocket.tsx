import React, { useEffect } from "react";

import { useGameContext } from "../Context/gameProvider";
import GameActions from "../model/gameActions.enum";
import Rocket from "../model/rocket";
import styles from "./rocket.module.scss";

interface RocketContainerProps {
  setGameOver: (isGameOver: boolean) => void;
}

function RocketContainer({ setGameOver }: RocketContainerProps) {
  const { isGameOver, dispatch, rocket } = useGameContext();

  if (isGameOver) {
    setGameOver(true);
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.keyCode === 32) {
        dispatch({ type: GameActions.Shoot });
      }
    };

    window.addEventListener("keyup", handleKeyDown);

    return () => {
      window.removeEventListener("keyup", handleKeyDown);
    };
  }, [dispatch]);

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

  return <RocketComp rocket={rocket} />;
}

interface RocketComponentProps {
  rocket: Rocket;
}
const RocketComp = React.memo(
  function RocketComponent({ rocket }: RocketComponentProps) {
    console.log("Rocket render");

    return (
      <div
        className={styles.rocket}
        style={{
          left: rocket.x,
          top: rocket.y,
          width: rocket.width,
          height: rocket.height,
        }}
      ></div>
    );
  },
  (prevProps, nextProps) => {
    // console.log(`Prev: ${prevProps.rocket.x} <-> Next: ${nextProps.rocket.x}`);
    if (prevProps.rocket.x === nextProps.rocket.x) {
      return true;
    }
    return false;
  }
);

export default RocketContainer;
