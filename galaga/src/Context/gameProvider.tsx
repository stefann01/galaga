import React, { useContext, useMemo, useReducer } from "react";

import Bullet from "../model/bullet";
import Coin from "../model/coin";
import GameContextModel from "../model/contextModel";
import Enemy from "../model/enemy";
import Rocket from "../model/rocket";
import { gameReducer, GameReducerState } from "./gameReducer";

interface GameContextProviderProps {
  rocket: Rocket;
  bullets: Bullet[];
  children: React.ReactNode;
  enemies: Enemy[];
}

export const GameContext = React.createContext({} as GameContextModel);

export function GameProvider(props: GameContextProviderProps) {
  const [state, dispatch] = useReducer(gameReducer, {
    rocket: props.rocket,
    bullets: props.bullets,
    enemyBullets: [],
    enemies: props.enemies,
    pressedKeys: new Set<number>(),
    score: 0,
    isGameOver: false,
    isOverHead: false,
    coins: new Array<Coin>(),
  } as GameReducerState);
  let value = useMemo(() => {
    return {
      rocket: state.rocket,
      pressedKeys: state.pressedKeys,
      bullets: state.bullets,
      enemyBullets: state.enemyBullets,
      enemies: state.enemies,
      score: state.score,
      isGameOver: state.isGameOver,
      coins: state.coins,
      isOverHead: state.isOverHead,
      dispatch,
    };
  }, [state]);

  return (
    <GameContext.Provider value={value}>{props.children}</GameContext.Provider>
  );
}

export function useGameContext() {
  return useContext(GameContext);
}
