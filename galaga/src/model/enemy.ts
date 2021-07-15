class Enemy {
  public static readonly enemyShootProbability = 0.3;
  constructor(
    public x: number,
    public y: number,
    public width: number,
    public height: number
  ) {}
}

export default Enemy;