import { Canvas } from "../Canvas/Canvas";
import { Vector } from "../Vector";
export class BodyConstructor {
  public canvas: Canvas;
  public resolution:number = 20;
  constructor(parent: HTMLElement = document.body) {
    this.canvas = new Canvas(parent);
    this.canvas.setSize(500, 500);
    this.canvas.start();
    for (let i = 0; i < this.canvas.size.x; i += this.resolution) {
      this.canvas.line(
        new Vector(i, 0, 0),
        new Vector(i, this.canvas.size.y, 0),
        "rgba(200,200,200,1)"
      );
    }
    for (let i = 0; i < this.canvas.size.y; i += this.resolution) {
      this.canvas.line(
        new Vector(0, i, 0),
        new Vector(this.canvas.size.x, i, 0),
        "rgba(200,200,200,1)"
      );
    }
    this.canvas.end();
  }
}
