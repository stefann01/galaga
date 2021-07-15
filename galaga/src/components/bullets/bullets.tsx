import React, { useEffect } from "react";
import { useGameContext } from "../../Context/gameProvider";
import Bullet from "../../model/bullet";
import GameActions from "../../model/gameActions.enum";
import styles from "./bullets.module.scss";

function Bullets() {
  const { bullets, dispatch } = useGameContext();
  // console.log("Bullets render");

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ type: GameActions.MoveBullets });
    }, 20);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {bullets.map((bullet, index) => (
        <div
          key={index}
          className={styles.bullet}
          style={{
            left: bullet.x + 45,
            top: bullet.y,
          }}
        ></div>
      ))}
    </>
  );
}

export default React.memo(Bullets);
