class Rectangle {
  constructor(
    public left: number,
    public top: number,
    public right: number,
    public bottom: number
  ) {}

  public static intersects(rectA: Rectangle, rectB: Rectangle): boolean {
    return !(
      rectB.left > rectA.right ||
      rectB.right < rectA.left ||
      rectB.top > rectA.bottom ||
      rectB.bottom < rectA.top
    );
  }
}

export default Rectangle;
