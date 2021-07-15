import React, { useState } from "react";

import styles from "./App.module.scss";
import Bullets from "./components/bullets/bullets";
import Enemies from "./components/enemies/enemies";
import EnemyBullets from "./components/enemyBullets/enemyBullets";
import Rocket from "./components/rocket";
import { useGameContext } from "./Context/gameProvider";

function App() {
  const [play, setPlay] = useState(false);

  // console.log("App render");
  const { score } = useGameContext();
  return (
    <>
      {play && (
        <div className={styles.container}>
          <div>
            <h1 style={{ color: "white" }}>Score: {score}</h1>
          </div>
          <Rocket />
          <Bullets />
          <Enemies />
          <EnemyBullets />
        </div>
      )}
      {!play && (
        <div className={styles.menuContainer}>
          <button onClick={() => setPlay(true)} className={styles.playBtn}>
            Play
          </button>
        </div>
      )}
    </>
  );
}

export default React.memo(App);
