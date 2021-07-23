class Enemy {
  public static readonly enemyShootProbability = 1;
  constructor(
    public x: number,
    public y: number,
    public width: number,
    public height: number
  ) {}
}

export default Enemy;
