import Bullet from "../model/bullet";
import Coin from "../model/coin";
import Enemy from "../model/enemy";
import GameActions from "../model/gameActions.enum";
import Rocket from "../model/rocket";

export const OVERHEAD_LIMIT = 5;

export default class Action<T, P> {
  constructor(public type: T, public payload: P) {}
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
        },
      };

    case GameActions.Shoot: {
      return {
        ...state,
        bullets: !state.isOverHead
          ? [
              ...state.bullets,
              new Bullet(state.rocket.x, state.rocket.y, 10, 10),
            ]
          : state.bullets,
        isOverHead: state.bullets.length >= OVERHEAD_LIMIT,
      } as GameReducerState;
    }

    case GameActions.AddEnemyBullet:
      const randomEnemyIndex = Math.floor(Math.random() * state.enemies.length);

      return {
        ...state,
        enemyBullets: [
          ...state.enemyBullets,
          new Bullet(
            state.enemies[randomEnemyIndex].x,
            state.enemies[randomEnemyIndex].y,
            10,
            10
          ),
        ],
      } as GameReducerState;

    case GameActions.MoveCoins: {
      const newState = { ...state };
      if (newState.coins.length) {
        newState.coins = newState.coins
          .map((coin) => {
            coin.y += 1;
            return coin;
          })
          .filter((coin) => coin.y < window.innerHeight);
      }
      return newState;
    }

    case GameActions.MoveEnemyBullet: {
      return {
        ...state,
        enemyBullets: state.enemyBullets.length
          ? state.enemyBullets
              .map((bullet) => {
                bullet.y += 1;
                return { ...bullet };
              })
              .filter((bullet) => bullet.y < window.innerHeight)
          : state.enemyBullets,
        isGameOver: state.enemyBullets.find((bullet) =>
          doOverlap(
            { x: bullet.x, y: bullet.y },
            { x: bullet.x + 45, y: bullet.y + 30 },
            { x: state.rocket.x, y: state.rocket.y },
            {
              x: state.rocket.x + state.rocket.width,
              y: state.rocket.y + state.rocket.height,
            }
          )
        )
          ? true
          : state.isGameOver,
      } as GameReducerState;
    }

    case GameActions.MoveBullets: {
      if (state.bullets.length) {
        let overlappings: (Bullet | Enemy)[] = [];
        let newCoins = new Array<Coin>();
        for (let bullet of state.bullets) {
          for (let enemy of state.enemies) {
            if (
              doOverlap(
                { x: bullet.x + 45, y: bullet.y },
                { x: bullet.x + 10 + 45, y: bullet.y + 30 },
                { x: enemy.x, y: enemy.y },
                { x: enemy.x + enemy.width, y: enemy.y + enemy.height }
              )
            ) {
              overlappings = [...overlappings, enemy];
              overlappings = [...overlappings, bullet];
              const random = Math.random();
              if (random < 0.2) {
                newCoins = [...newCoins, new Coin(enemy.x, enemy.y, 20, 30)];
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
            ? state.enemies.filter((enemy) => !overlappings.includes(enemy))
            : [...state.enemies],
          score: state.score + overlappings.length,

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
