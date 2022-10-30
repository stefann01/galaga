class Coin {
  public static readonly coinDropProbability = 0.3;
  public static readonly width = 50;
  public static readonly height = 40;
  public static readonly powerIncreasePrice = 10;
  constructor(
    public x: number,
    public y: number,
    public width: number = Coin.width,
    public height: number = Coin.height,
    public coinDropProbability: number = Coin.coinDropProbability
  ) {}
}

export default Coin;
