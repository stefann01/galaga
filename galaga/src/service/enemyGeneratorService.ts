import Enemy from "../model/enemy";

export default class EnemyGeneratorService {
  public static getLevelEnemies(enemyLifePoints, enemyWidth, enemyHeight) {
    let enemies: Enemy[] = [];

    const enemySize = enemyWidth;
    //= (3 / 100) * window.innerWidth;

    enemies = [
      ...EnemyGeneratorService.getLine(
        25,
        enemySize,
        100,
        200,
        enemyLifePoints,
        enemyWidth,
        enemyHeight
      ),
      ...EnemyGeneratorService.getLine(
        20,
        enemySize,
        100 + enemySize + 20,
        125,
        enemyLifePoints,
        enemyWidth,
        enemyHeight
      ),
      ...EnemyGeneratorService.getLine(
        10,
        enemySize,
        100 + 2 * (enemySize + 20),
        200,
        enemyLifePoints,
        enemyWidth,
        enemyHeight
      ),
    ];

    return enemies;
  }

  private static getLine(
    numberOfEnemies: number,
    enemySize: number,
    yOfLine: number,
    marginDistanceWidth: number = 200,
    enemyLifePoints: number,
    enemyWidth: number,
    enemyHeight: number
  ) {
    const enemies: Enemy[] = [];

    const canvasLeftMargin = marginDistanceWidth;
    const canvasRightMargin = window.innerWidth - marginDistanceWidth;
    const canvasDistance = canvasRightMargin - canvasLeftMargin;
    const spaceBetweenAliens = canvasDistance / (numberOfEnemies - 1);

    let current = canvasLeftMargin;
    for (let i = 0; i < numberOfEnemies; i++) {
      enemies.push(
        new Enemy(
          current - enemySize / 2,
          yOfLine,
          enemyWidth,
          enemyHeight,
          enemyLifePoints,
          enemyLifePoints
        )
      );
      current += spaceBetweenAliens;
    }

    return enemies;
  }
}
