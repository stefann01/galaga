import Bullet from "./bullet";
import Enemy from "./enemy";
import Rocket from "./rocket";

interface GameContextModel {
  rocket: Rocket;
  pressedKeys: Set<number>;
  bullets: Bullet[];
  enemyBullets: Bullet[];
  enemies: Enemy[];
  score: number;

  dispatch: React.Dispatch<any>;
}

export default GameContextModel;