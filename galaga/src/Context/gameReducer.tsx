import Bullet from "../model/bullet";
import Enemy from "../model/enemy";
import GameActions from "../model/gameActions.enum";
import Rocket from "../model/rocket";

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
}

export function gameReducer(
  state: GameReducerState,
  action: Action<GameActions, any>
) {
  switch (action.type) {
    case GameActions.Move: {
      const newState = { ...state };
      newState.rocket.x = action.payload.x - 50;
      return newState;
    }

    case GameActions.Shoot: {
      const newState = { ...state };
      newState.bullets = [
        ...newState.bullets,
        new Bullet(state.rocket.x, state.rocket.y),
      ];
      return newState;
    }

    case GameActions.AddEnemyBullet: {
      const newState = { ...state };
      const randomEnemy =
        newState.enemies[Math.floor(Math.random() * newState.enemies.length)];
      newState.enemyBullets = [
        ...newState.enemyBullets,
        new Bullet(randomEnemy.x, randomEnemy.y),
      ];

      return newState;
    }

    case GameActions.MoveEnemyBullet: {
      const newState = { ...state };
      if (newState.enemyBullets.length) {
        newState.enemyBullets = newState.enemyBullets
          .map((bullet) => {
            bullet.y += 1;
            return bullet;
          })
          .filter((bullet) => bullet.y < window.innerHeight);
      }
      return newState;
    }

    case GameActions.MoveBullets: {
      const newState = { ...state };

      if (newState.bullets.length) {
        newState.bullets = newState.bullets
          .map((bullet) => {
            bullet.y -= 2;
            return bullet;
          })
          .filter((bullet) => bullet.y > 0);

        let intersectedEnemies: Enemy[] = [];
        newState.bullets.forEach((bullet) => {
          intersectedEnemies = [
            ...intersectedEnemies,
            ...state.enemies.filter((enemy) =>
              doOverlap(
                { x: bullet.x + 45, y: bullet.y },
                { x: bullet.x + 10 + 45, y: bullet.y + 30 },
                { x: enemy.x, y: enemy.y },
                { x: enemy.x + enemy.width, y: enemy.y + enemy.height }
              )
            ),
          ];
        });
        if (intersectedEnemies.length) {
          console.log(intersectedEnemies);
        }
        newState.enemies = newState.enemies.filter(
          (enemy) => !intersectedEnemies.includes(enemy)
        );
        newState.score = state.score + intersectedEnemies.length;
      }

      return newState;
    }

    case GameActions.AddEnemy: {
      const newState = { ...state };
      newState.enemies = [
        ...newState.enemies,
        new Enemy(
          action.payload.x,
          action.payload.y,
          action.payload.width,
          action.payload.height
        ),
      ];
      return newState;
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

  if (l1.x == r1.x || l1.y == r1.y || l2.x == r2.x || l2.y == r2.y) {
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
