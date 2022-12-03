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
  };
}

function App() {
  const [play, setPlay] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [theme] = useState(themeConfig.minecraftTheme);
  const [state, dispatch] = useReducer(gameReducer, getInitialState(theme));

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
          setShowSettings(false);
          setShowHelp(false);
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
          setShowSettings(false);
          setShowHelp(false);
          dispatch({ type: GameActions.PlayAgain });
        }}
      />
    );
  }

  return (
    <>
      {play && (
        <Background imgUrl={state.theme.background}>
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
            />
            <BulletsComponent bullets={state.bullets} dispatch={dispatch} />

            <Enemies
              enemies={state.enemies}
              dispatch={dispatch}
              theme={state.theme}
            />
            <EnemyBullets
              enemyBullets={state.enemyBullets}
              dispatch={dispatch}
              theme={state.theme}
            />
            <Coins
              coins={state.coins}
              dispatch={dispatch}
              skin={state.theme.coins.skin}
            />
          </div>
        </Background>
      )}

      <>
        {!play && (
          <GameMenu
            onPlay={() => setPlay(true)}
            onClickSettingsButton={setShowSettings}
            onClickHelpButton={setShowHelp}
            showHelp={showHelp}
            showSettings={showSettings}
          />
        )}
      </>
    </>
  );
}

export default App;
