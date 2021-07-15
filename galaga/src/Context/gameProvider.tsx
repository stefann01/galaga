import React, { useContext, useReducer } from "react";
import Bullet from "../model/bullet";
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
  } as GameReducerState);

  return (
    <GameContext.Provider
      value={{
        rocket: state.rocket,
        pressedKeys: state.pressedKeys,
        bullets: state.bullets,
        enemyBullets: state.enemyBullets,
        enemies: state.enemies,
        score: state.score,
        dispatch,
      }}
    >
      {props.children}
    </GameContext.Provider>
  );
}

export function useGameContext() {
  return useContext(GameContext);
}
