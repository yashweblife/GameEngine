import { Canvas } from "../Canvas/Canvas";
import { Vector } from "../Vector";
export class BodyConstructor {
  public canvas: Canvas;
  constructor(parent: HTMLElement = document.body) {
    this.canvas = new Canvas(parent);
    this.canvas.setSize(500, 500);
    this.canvas.start();
    for (let i = 0; i < this.canvas.size.x; i++) {
      this.canvas.line(
        new Vector(i, 0, 0),
        new Vector(i, this.canvas.size.x, 0)
      );
    }
    this.canvas.end();
  }
}
