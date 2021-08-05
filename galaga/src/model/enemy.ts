class Enemy {
  public static readonly enemyShootProbability = 0.2;
  public static readonly defaultEnemyLife = 1;
  constructor(
    public x: number,
    public y: number,
    public width: number,
    public height: number,
    public lifePoints: number = Enemy.defaultEnemyLife
  ) {}
}

export default Enemy;
