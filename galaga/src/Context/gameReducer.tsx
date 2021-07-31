import { Howl } from "howler";
import Bullet from "../model/bullet";
import Coin from "../model/coin";
import Enemy from "../model/enemy";
import GameActions from "../model/gameActions.enum";
import Rocket from "../model/rocket";

export const OVERHEAD_LIMIT = 5;
export const MAXIMUM_LIVES_POSSIBLE = 5;
export const LIFE_PRICE = 5;

export default class Action<T, P> {
  constructor(public type: T, public payload?: P) {}
}

export interface GameReducerState {
  rocket: Rocket;
  bullets: Bullet[];
  enemyBullets: Bullet[];
  pressedKeys: Set<number>;
  enemies: Enemy[];
  score: number;
  isGameOver: boolean;
  isOverHead: boolean;
  coins: Coin[];
  candies: number;
  lives: number;
  sound: Howl;
}

export function gameReducer(
  state: GameReducerState,
  action: Action<GameActions, any>
) {
  switch (action.type) {
    case GameActions.Move:
      return {
        ...state,
        rocket: {
          ...state.rocket,
          x: action.payload.x,
          y: action.payload.y,
        },
      };

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
      if (!state.isOverHead) {
        state.sound.play();
      }
      return {
        ...state,
        bullets: !state.isOverHead
          ? [
              ...state.bullets,
              new Bullet(
                state.rocket.x +
                  state.rocket.width / 2 -
                  Bullet.bulletWidth / 2, // - half of bullet size
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
              20,
              40
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
      const rocketIsHit = state.enemyBullets.find((bullet) =>
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
                bullet.y += 1;
                return { ...bullet };
              })
              .filter((bullet) => bullet.y < window.innerHeight)
              .filter(
                (bullet) =>
                  !(bullet.x === rocketIsHit?.x && bullet.y === rocketIsHit?.y)
              )
          : state.enemyBullets,
        isGameOver: state.lives === 0,
        lives: rocketIsHit ? state.lives - 1 : state.lives,
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
                enemy.lifePoints === 1
              ) {
                newCoins = [...newCoins, new Coin(enemy.x, enemy.y)];
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
                  debugger;
                  if (overlappings.includes(enemy)) {
                    return { ...enemy, lifePoints: enemy.lifePoints - 1 };
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

    case GameActions.AddEnemy:
      return {
        ...state,
        enemies: [
          ...state.enemies,
          new Enemy(
            action.payload.x,
            action.payload.y,
            action.payload.width,
            action.payload.height
          ),
        ],
      } as GameReducerState;

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
