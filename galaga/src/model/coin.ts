class Coin {
  public static readonly coinDropProbability = 1;
  public static readonly width = 50;
  public static readonly height = 40;
  public static readonly powerIncreasePrice = 10;
  constructor(
    public x: number,
    public y: number,
    public width: number = Coin.width,
    public height: number = Coin.height
  ) {}
}

export default Coin;
