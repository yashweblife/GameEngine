import { Vector } from "../Vector";

interface BoundingBox {
  top: Vector;
  left: Vector;
  bottom: Vector;
  right: Vector;
}
export class Body {
  public shape: Vector[] = [];
  public center: Vector;
  public boundingBox: BoundingBox;
  constructor() {}
}
