import { useReducer, useState } from "react";

import styles from "./App.module.scss";
import BulletsComponent from "./components/bullets/bullets";
import Coins from "./components/coins/coins";
import Enemies from "./components/enemies/enemies";
import EnemyBullets from "./components/enemyBullets/enemyBullets";
import RocketComp from "./components/rocket";
import Score from "./components/score/score";
import {
  gameReducer,
  GameReducerState,
  OVERHEAD_LIMIT,
} from "./Context/gameReducer";
import Coin from "./model/coin";
import Enemy from "./model/enemy";
import Rocket from "./model/rocket";

function getLine(numberOfEnemies: number, enemySize: number, yOfLine: number) {
  const enemies: Enemy[] = [];

  const marginDistanceWidth = 100;
  const canvasLeftMargin = marginDistanceWidth;
  const canvasRightMargin = window.innerWidth - marginDistanceWidth;
  const canvasDistance = canvasRightMargin - canvasLeftMargin;
  const spaceBetweenAliens = canvasDistance / (numberOfEnemies - 1);

  let current = canvasLeftMargin;
  for (let i = 0; i < numberOfEnemies; i++) {
    enemies.push(
      new Enemy(current - enemySize / 2, yOfLine, enemySize, enemySize)
    );
    current += spaceBetweenAliens;
  }

  return enemies;
}

function enemyGenerator() {
  let enemies: Enemy[] = [];

  const enemySize = (4 / 100) * window.innerWidth;

  enemies = [
    ...getLine(10, enemySize, 100),
    ...getLine(10, enemySize, 100 + enemySize + 20),
    ...getLine(10, enemySize, 100 + 2 * (enemySize + 20)),
  ];

  return enemies;
}

function App() {
  const [play, setPlay] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [state, dispatch] = useReducer(gameReducer, {
    rocket: new Rocket(
      window.innerWidth / 2,
      window.innerHeight - 150,
      1,
      100,
      150
    ),
    bullets: [],
    enemyBullets: [],
    enemies: enemyGenerator(),
    pressedKeys: new Set<number>(),
    score: 0,
    isGameOver: false,
    isOverHead: false,
    coins: new Array<Coin>(),
    candies: 0,
    lives: 10,
  } as GameReducerState);

  return (
    <>
      {play && (
        <div className={styles.container}>
          <Score
            lives={state.lives}
            score={state.score}
            candies={state.candies}
            overheadPercentage={(state.bullets.length / OVERHEAD_LIMIT) * 100}
          />
          <RocketComp
            // setGameOver={(isGameOver) => {
            //   setGameOver(isGameOver);
            //   setPlay(false);
            // }}
            dispatch={dispatch}
            rocket={state.rocket}
          />
          <BulletsComponent bullets={state.bullets} dispatch={dispatch} />
          <Enemies enemies={state.enemies} />
          <EnemyBullets enemyBullets={state.enemyBullets} dispatch={dispatch} />
          <Coins coins={state.coins} dispatch={dispatch} />
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

export default App;
