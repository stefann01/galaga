import React, { useEffect } from "react";

import { useGameContext } from "../../Context/gameProvider";
import GameActions from "../../model/gameActions.enum";
import styles from "./bullets.module.scss";

function Bullets() {
  const { bullets, dispatch } = useGameContext();

  console.log("bullets render");

  useEffect(() => {
    const interval = setInterval(() => {
      if (bullets.length > 0) {
        dispatch({ type: GameActions.MoveBullets });
      }
    }, 20);

    return () => clearInterval(interval);
  }, [bullets.length, dispatch]);

  return (
    <>
      {bullets.length > 0 &&
        bullets.map((bullet, index) => (
          <div
            key={index}
            className={styles.bullet}
            style={{
              left: bullet.x,
              top: bullet.y,
              width: bullet.width,
              height: bullet.height,
            }}
          ></div>
        ))}
    </>
  );
}

export default React.memo(Bullets);
