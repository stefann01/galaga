// import { Howl } from "howler";

import { getInitialState } from "../App";
import Bullet from "../model/bullet";
import Coin from "../model/coin";
import Enemy from "../model/enemy";
import GameActions from "../model/gameActions.enum";
import Rocket from "../model/rocket";
import { Theme } from "../model/Theme";
import EnemyGeneratorService from "../service/enemyGeneratorService";

export const OVERHEAD_LIMIT = 5;
export const MAXIMUM_LIVES_POSSIBLE = 5;
export const LIFE_PRICE = 5;

export default class Action<T, P> {
  constructor(public type: T, public payload?: P) {}
}

export interface GameReducerState {
  level: number;
  rocket: Rocket;
  bullets: Bullet[];
  enemyBullets: Bullet[];
  pressedKeys: Set<number>;
  enemies: Enemy[];
  score: number;
  isGameOver: boolean;
  isGameWon: boolean;
  isOverHead: boolean;
  coins: Coin[];
  candies: number;
  lives: number;
  playerHasWon: boolean;
  theme: Theme;
}

export function gameReducer(
  state: GameReducerState,
  action: Action<GameActions, any>
) {
  debugger;
  switch (action.type) {
    case GameActions.PlayAgain:
      return getInitialState(state.theme);

    case GameActions.Move:
      const shipAndEnemiesCollided = state.enemies.some((enemy) => {
        return doOverlap(
          { x: state.rocket.x, y: state.rocket.y },
          {
            x: state.rocket.x + state.rocket.width,
            y: state.rocket.y + state.rocket.height,
          },
          { x: enemy.x, y: enemy.y },
          { x: enemy.x + enemy.width, y: enemy.y + enemy.height }
        );
      });
      return {
        ...state,
        rocket: {
          ...state.rocket,
          x: action.payload.x,
          y: action.payload.y,
        },
        isGameOver: false,
      };

    case GameActions.MoveEnemies:
      return {
        ...state,
        enemies: state.enemies.map((enemy) => {
          if (enemy.y > window.innerHeight) {
            return { ...enemy, y: 100 };
          }
          return { ...enemy, y: enemy.y + 10 };
        }),
      } as GameReducerState;

    case GameActions.IncreaseRocketPower:
      return {
        ...state,
        rocket:
          state.candies > Coin.powerIncreasePrice
            ? {
                ...state.rocket,
                power: state.rocket.power + 1,
              }
            : state.rocket,
        candies:
          state.candies > Coin.powerIncreasePrice
            ? state.candies - Coin.powerIncreasePrice
            : state.candies,
      } as GameReducerState;

    case GameActions.BuyLives:
      if (state.candies >= LIFE_PRICE && state.lives < MAXIMUM_LIVES_POSSIBLE) {
        return {
          ...state,
          candies: state.candies - LIFE_PRICE,
          lives: state.lives + 1,
        } as GameReducerState;
      }
      return state;

    case GameActions.Shoot: {
      // if (!state.isOverHead) {
      //   state.sound.play();
      // }
      return {
        ...state,
        bullets: !state.isOverHead
          ? [
              ...state.bullets,
              new Bullet(
                state.rocket.x +
                  state.rocket.width / 2 -
                  Bullet.bulletWidth / 2,
                state.rocket.y
              ),
            ]
          : state.bullets,
        isOverHead: state.bullets.length >= OVERHEAD_LIMIT,
      } as GameReducerState;
    }

    case GameActions.AddEnemyBullet:
      if (state.enemies.length) {
        const randomEnemyIndex = Math.floor(
          Math.random() * state.enemies.length
        );

        return {
          ...state,
          enemyBullets: [
            ...state.enemyBullets,
            new Bullet(
              state.enemies[randomEnemyIndex].x,
              state.enemies[randomEnemyIndex].y,
              state.theme.enemies[state.theme.currentEnemy].bulletWidth,
              state.theme.enemies[state.theme.currentEnemy].bulletHeight
            ),
          ],
        } as GameReducerState;
      }
      return state;

    case GameActions.MoveCoins:
      let overlappingCoins = 0;
      return {
        ...state,
        coins: state.coins.length
          ? state.coins
              .map((coin) => {
                coin.y += 1;
                return { ...coin };
              })
              .filter((coin) => coin.y < window.innerHeight)
              .filter((coin) => {
                const isOverlapping = doOverlap(
                  { x: coin.x, y: coin.y },
                  { x: coin.x + coin.width, y: coin.y + coin.height },
                  { x: state.rocket.x, y: state.rocket.y },
                  {
                    x: state.rocket.x + state.rocket.width,
                    y: state.rocket.y + state.rocket.height,
                  }
                );
                if (isOverlapping) {
                  overlappingCoins += 1;
                }
                return !isOverlapping;
              })
          : state.coins,
        candies: state.candies + overlappingCoins,
      } as GameReducerState;

    case GameActions.MoveEnemyBullet: {
      const bulletHittingRocket = state.enemyBullets.find((bullet) =>
        doOverlap(
          { x: bullet.x, y: bullet.y },
          { x: bullet.x + bullet.width, y: bullet.y + bullet.height },
          { x: state.rocket.x, y: state.rocket.y },
          {
            x: state.rocket.x + state.rocket.width,
            y: state.rocket.y + state.rocket.height,
          }
        )
      );
      return {
        ...state,
        enemyBullets: state.enemyBullets.length
          ? state.enemyBullets
              .map((bullet) => {
                return { ...bullet, y: bullet.y + 1 };
              })
              .filter((bullet) => bullet.y < window.innerHeight)
              .filter(
                (bullet) =>
                  bullet.x !== bulletHittingRocket?.x &&
                  bullet.y !== bulletHittingRocket?.y
              )
          : state.enemyBullets,
        isGameOver: state.lives === 0,
        lives: bulletHittingRocket ? state.lives - 1 : state.lives,
      } as GameReducerState;
    }

    case GameActions.MoveBullets: {
      if (state.bullets.length) {
        let overlappings: (Bullet | Enemy)[] = [];
        let newCoins = [...state.coins];
        for (let bullet of state.bullets) {
          for (let enemy of state.enemies) {
            if (
              doOverlap(
                { x: bullet.x, y: bullet.y },
                { x: bullet.x + bullet.width, y: bullet.y + bullet.height },
                { x: enemy.x, y: enemy.y },
                { x: enemy.x + enemy.width, y: enemy.y + enemy.height }
              )
            ) {
              overlappings = [...overlappings, enemy];
              overlappings = [...overlappings, bullet];

              if (
                Math.random() <= Coin.coinDropProbability &&
                enemy.lifePoints <= state.rocket.power
              ) {
                newCoins = [
                  ...newCoins,
                  new Coin(
                    enemy.x,
                    enemy.y,
                    state.theme.coins.width,
                    state.theme.coins.height
                  ),
                ];
              }
            }
          }
        }

        return {
          ...state,
          bullets:
            state.bullets.length > 0
              ? state.bullets
                  .map((bullet) => {
                    bullet.y -= 2;
                    return bullet;
                  })
                  .filter((bullet) => bullet.y > 0)
                  .filter(
                    (bullet) =>
                      !overlappings.find(
                        (b) => b.x === bullet.x && b.y === bullet.y
                      )
                  )
              : state.bullets,
          coins: newCoins,
          enemies: overlappings.length
            ? state.enemies
                .map((enemy) => {
                  if (overlappings.includes(enemy)) {
                    return {
                      ...enemy,
                      lifePoints: enemy.lifePoints - state.rocket.power,
                    };
                  }
                  return enemy;
                })
                .filter((enemy) => enemy.lifePoints > 0)
            : [...state.enemies],
          score: state.score + Math.floor(overlappings.length / 2),

          isOverHead: state.bullets.length >= OVERHEAD_LIMIT,
        } as GameReducerState;
      }
      return state;
    }

    case GameActions.NextLevel: {
      const nextEnemyIndex = state.theme.currentEnemy + 1;
      const gameIsWon = nextEnemyIndex >= state.theme.enemies.length;

      if (gameIsWon) {
        return {
          ...state,
          isGameWon: true,
        } as GameReducerState;
      }
      return {
        ...state,
        level: state.level + 1,
        theme: {
          ...state.theme,
          currentEnemy: nextEnemyIndex,
        },
        enemies: EnemyGeneratorService.getLevelEnemies(
          state.level + 3,
          state.theme.enemies[nextEnemyIndex].width,
          state.theme.enemies[nextEnemyIndex].height
        ),
      } as GameReducerState;
    }

    default:
      return state;
  }
}

// Returns true if two rectangles
// (l1, r1) and (l2, r2) overlap
function doOverlap(l1, r1, l2, r2) {
  // To check if either rectangle is actually a line
  // For example : l1 ={-1,0} r1={1,1} l2={0,-1} r2={0,1}

  if (l1.x === r1.x || l1.y === r1.y || l2.x === r2.x || l2.y === r2.y) {
    // the line cannot have positive overlap
    return false;
  }

  // If one rectangle is on left side of other
  if (l1.x >= r2.x || l2.x >= r1.x) {
    return false;
  }

  // If one rectangle is above other
  if (l1.y >= r2.y || l2.y >= r1.y) {
    return false;
  }

  return true;
}
