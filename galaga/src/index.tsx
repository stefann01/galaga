import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { GameProvider } from "./Context/gameProvider";
import Enemy from "./model/enemy";
import Rocket from "./model/rocket";
import reportWebVitals from "./reportWebVitals";

import "./index.css";

function enemyGenerator() {
  const enemies: Enemy[] = [];
  const numberOfEnemies = 10;
  const min = 5;
  const max = window.innerWidth - 5;
  const enemyBreakpoint = 50; // (max - min) / numberOfEnemies;
  console.log(enemyBreakpoint);
  for (let i = 1; i <= numberOfEnemies * 2; i++) {
    for (let j = 1; j <= numberOfEnemies / 2; j++) {
      enemies.push(new Enemy(enemyBreakpoint * i, enemyBreakpoint * j, 20, 20));
    }
  }
  return enemies;
}

ReactDOM.render(
  <React.StrictMode>
    <GameProvider
      rocket={
        new Rocket(window.innerWidth / 2, window.innerHeight - 150, 1, 100, 150)
      }
      bullets={[]}
      enemies={enemyGenerator()}
    >
      <App />
    </GameProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
