class Bullet {
  public static readonly bulletTime: 70;
  public static readonly bulletSpace: 0.01;
  constructor(
    public x: number,
    public y: number,
    public width: number,
    public height: number
  ) {}
}

export default Bullet;
