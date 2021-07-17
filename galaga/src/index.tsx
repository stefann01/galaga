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
  let numberOfEnemies = 10;

  for (let i = 1; i <= numberOfEnemies; ++i) {
    for (let j = 1; j <= numberOfEnemies; ++j) {
      enemies.push(new Enemy(j * 30, i * 60, 30, 30));
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
// to log results (for example: reportWebVitals())
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
