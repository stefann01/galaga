import React, { useState } from "react";

import styles from "./App.module.scss";
import Bullets from "./components/bullets/bullets";
import Coins from "./components/coins/coins";
import Enemies from "./components/enemies/enemies";
import EnemyBullets from "./components/enemyBullets/enemyBullets";
import OverHead from "./components/overHead/overHead";
import RocketContainer from "./components/rocket";
import Score from "./components/score/score";

function App() {
  const [play, setPlay] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  return (
    <>
      {play && (
        <div className={styles.container}>
          <Score />
          <RocketContainer
            setGameOver={(isGameOver) => {
              setGameOver(isGameOver);
              setPlay(false);
            }}
          />
          <Bullets />
          <Enemies />
          <OverHead width={200} />
          <EnemyBullets />
          <Coins />
        </div>
      )}
      {!play && (
        <>
          {gameOver ? (
            <h1>Game Over</h1>
          ) : (
            <div className={styles.menuContainer}>
              <div className={styles.buttons}>
                <button
                  className={styles.PlayButton}
                  onClick={() => {
                    setPlay(true);
                    setGameOver(false);
                  }}
                >
                  <h2 className={styles.buttonsText}> Play Game </h2>
                </button>

                <br />

                <button className={styles.HelpButton}>
                  <h2 className={styles.buttonsText}> Help </h2>
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default React.memo(App);
