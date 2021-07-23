import Bullet from "./bullet";
import Coin from "./coin";
import Enemy from "./enemy";
import Rocket from "./rocket";

interface GameContextModel {
  rocket: Rocket;
  pressedKeys: Set<number>;
  bullets: Bullet[];
  enemyBullets: Bullet[];
  enemies: Enemy[];
  score: number;
  isGameOver: boolean;
  isOverHead: boolean;
  coins: Coin[];
  candies: number;

  lives: number;
  dispatch: React.Dispatch<any>;
}

export default GameContextModel;
