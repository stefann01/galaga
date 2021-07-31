class Bullet {
  public static readonly bulletTime = 70;
  public static readonly bulletSpace = 0.01;
  public static bulletWidth = 20;
  public static bulletHeight = 30;
  constructor(
    public x: number,
    public y: number,
    public width: number = Bullet.bulletWidth,
    public height: number = Bullet.bulletHeight
  ) {}
}

export default Bullet;
