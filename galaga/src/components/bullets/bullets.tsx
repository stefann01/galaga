import React, { useEffect } from "react";

import Action from "../../Context/gameReducer";
import Bullet from "../../model/bullet";
import GameActions from "../../model/gameActions.enum";
import styles from "./bullets.module.scss";

interface BulletsProps {
  bullets: Bullet[];
  dispatch: React.Dispatch<Action<GameActions, any>>;
}
function BulletsComponent({ bullets, dispatch }: BulletsProps) {
  useEffect(() => {
    const interval = setInterval(() => {
      if (bullets.length > 0) {
        dispatch({ type: GameActions.MoveBullets });
      }
    }, 5);

    return () => clearInterval(interval);
  }, [bullets.length, dispatch]);

  return (
    <>
      {bullets.length > 0 &&
        bullets.map((bullet, index) => {
          return (
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
          );
        })}
    </>
  );
}

export default React.memo(BulletsComponent);
