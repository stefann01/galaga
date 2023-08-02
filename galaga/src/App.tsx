import { useEffect, useReducer, useState } from "react";

import styles from "./App.module.scss";
import BulletsComponent from "./components/bullets/bullets";
import Coins from "./components/coins/coins";
import Enemies from "./components/enemies/enemies";
import EnemyBullets from "./components/enemyBullets/enemyBullets";
import GameMenu from "./components/gameMenu/gameMenu";
import GameOver from "./components/gameOver/gameOver";
import GameWon from "./components/gameWon/gameWon";
import RocketComp from "./components/rocket";
import Score from "./components/score/score";
import Background from "./components/video/video";
import { themeConfig } from "./config/themeConfig";
import {
  gameReducer,
  GameReducerState,
  OVERHEAD_LIMIT,
} from "./Context/gameReducer";
import Coin from "./model/coin";
import GameActions from "./model/gameActions.enum";
import Rocket from "./model/rocket";
import { Theme } from "./model/Theme";
import EnemyGeneratorService from "./service/enemyGeneratorService";
import Modal from "./components/modal/modal";
import useGameMenuKeys from "./hooks/useGameMenuKeys";
import PauseContent from "./components/pauseContent/PauseContent";

export function getInitialState(theme: Theme): GameReducerState {
  return {
    level: 1,
    rocket: new Rocket(
      window.innerWidth / 2,
      window.innerHeight - 200,
      theme.rocket.width,
      theme.rocket.height
    ),
    bullets: [],
    enemyBullets: [],
    enemies: EnemyGeneratorService.getLevelEnemies(
      theme.enemies[theme.currentEnemy].lifePoints,
      theme.enemies[theme.currentEnemy].width,
      theme.enemies[theme.currentEnemy].height
    ),
    pressedKeys: new Set<number>(),
    score: 0,
    isGameOver: false,
    isGameWon: false,
    isOverHead: false,
    coins: new Array<Coin>(),
    candies: 0,
    lives: 5,
    playerHasWon: false,
    theme: theme,
    isGamePaused: false,
  };
}

function App() {
  const [play, setPlay] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [theme] = useState(themeConfig.minecraftTheme);
  const [state, dispatch] = useReducer(gameReducer, getInitialState(theme));
  useGameMenuKeys(dispatch, state.isGamePaused, true);

  useEffect(() => {
    if (state.isGameOver) {
      setGameOver(true);
      setPlay(false);
    }
  }, [state.isGameOver]);

  const playAgain = () => {
    setGameOver(false);
    setPlay(true);
    dispatch({ type: GameActions.PlayAgain });
  };

  if (gameOver) {
    return (
      <GameOver
        onPlayAgain={playAgain}
        onHome={() => {
          setPlay(false);
          setGameOver(false);
          dispatch({ type: GameActions.PlayAgain });
        }}
      />
    );
  }

  if (state.isGameWon) {
    return (
      <GameWon
        onHome={() => {
          setPlay(false);
          setGameOver(false);
          dispatch({ type: GameActions.PlayAgain });
        }}
      />
    );
  }

  return (
    <>
      {play && (
        <Background imgUrl={state.theme.background}>
          <p
            style={{
              color: "white",
              position: "absolute",
              top: "30%",
              left: "30%",
            }}
          >
            {state.bullets.length}
          </p>
          <div className={styles.container}>
            <Score
              lives={state.lives}
              score={state.score}
              candies={state.candies}
              overheadPercentage={(state.bullets.length / OVERHEAD_LIMIT) * 100}
              enemiesNumber={state.enemies.length}
              rocketPower={state.rocket.power}
              theme={state.theme}
            />
            <RocketComp
              dispatch={dispatch}
              rocket={state.rocket}
              skin={state.theme.rocket.skin}
              paused={state.isGamePaused}
            />
            <BulletsComponent
              bullets={state.bullets}
              dispatch={dispatch}
              paused={state.isGamePaused}
            />

            <Enemies
              enemies={state.enemies}
              dispatch={dispatch}
              theme={state.theme}
              paused={state.isGamePaused}
            />
            <EnemyBullets
              enemyBullets={state.enemyBullets}
              dispatch={dispatch}
              theme={state.theme}
              paused={state.isGamePaused}
            />
            <Coins
              paused={state.isGamePaused}
              coins={state.coins}
              dispatch={dispatch}
              skin={state.theme.coins.skin}
            />
          </div>
        </Background>
      )}

      <>{!play && <GameMenu onPlay={() => setPlay(true)} />}</>

      {state.isGamePaused && (
        <Modal
          isOpen={true}
          onClose={() => dispatch({ type: GameActions.Pause })}
          header="Game paused"
          width="420px"
          height="360px"
        >
          <PauseContent
            coins={state.coins.length}
            lives={state.lives}
            gameMuted={false}
            score={state.score}
            theme="minecraft"
            level={state.level}
            onMute={() => {}}
            onResume={() => dispatch({ type: GameActions.Pause })}
            onQuit={() => {
              setPlay(false);
              setGameOver(false);
              dispatch({ type: GameActions.PlayAgain });
            }}
          />
        </Modal>
      )}
    </>
  );
}

export default App;
