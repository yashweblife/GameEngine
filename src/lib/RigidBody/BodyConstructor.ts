import { Canvas } from "../Canvas/Canvas";
import { Mouse } from "../Mouse/Mouse";
import { Vector, VectorMath } from "../Vector";
import { BoundingBox } from "./Body";
export class BodyConstructor {
  public canvas: Canvas;
  public resolution: number = 20;
  public mouse: Mouse;
  public points: Vector[] = [];
  public boundingBox: BoundingBox | null = null;
  constructor(parent: HTMLElement = document.body) {
    this.canvas = new Canvas(parent);
    this.mouse = new Mouse(this.canvas.dom);
    this.canvas.setSize(500, 500);
    this.canvas.start();

    this.mouse.onMove(this.projectPoint);
    this.mouse.onClick(this.addPoint);
    this.mouse.enableToolTip();
    parent.addEventListener("keypress", (e: KeyboardEvent) => {
      console.log(e);
      if (this.points.length > 0) {
        if (e.ctrlKey && e.key == "\x1A") {
          this.points.splice(this.points.length - 1, 1);
          console.log(this.points);
        }
      }
    });
  }
  public drawGrid = () => {
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
  };
  public projectPoint = (pos: Vector) => {
    this.canvas.start();
    this.canvas.circle(pos, 10, "red", null);
    this.canvas.end();
  };
  public addPoint = (pos: Vector) => {
    this.points.forEach((p: Vector) => {
      if (VectorMath.getDistance(p, pos) < 10) {
        pos = VectorMath.clone(p);
      }
    });
    this.points.push(pos);
    console.log(this.points);
  };
  public update = () => {
    this.canvas.clear();
    this.drawGrid();

    for (let i = 0; i < this.points.length - 1; i++) {
      this.canvas.start();
      this.canvas.line(this.points[i], this.points[i + 1], "red");
      this.canvas.end();
    }
    this.points.forEach((p: Vector) => {
      this.canvas.start();
      this.canvas.circle(p, 5, "black", null);
      this.canvas.end();
    });
    if (this.boundingBox !== null) {
      this.canvas.start();
      this.canvas.rect(this.boundingBox.topLeft, this.boundingBox.bottomRight, null, "red");
      this.canvas.end();
    }
    requestAnimationFrame(this.update);
  };
  public enableBoundingBox = () => {
    let maxX = 0;
    let minX = this.canvas.size.x;
    let maxY = 0;
    let minY = this.canvas.size.y;
    this.points.forEach((p: Vector) => {
      if (p.x >= maxX) {
        maxX = p.x;
      }
      if (p.y >= maxY) {
        maxY = p.y;
      }
    });
    this.points.forEach((p: Vector) => {
      if (p.x <= minX) {
        minX = p.x;
      }
      if (p.y <= minY) {
        minY = p.y;
      }
    });
    this.boundingBox = {topLeft : new Vector(minX, minY, 0),bottomRight : new Vector(maxX-minX, maxY-minY, 0)};
    console.log(this.boundingBox)
  };
  public disableBoundingBox = () => {
    this.boundingBox = null;
  };
}
