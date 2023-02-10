import { Vector } from "../Vector";

export interface BoundingBox {
  topLeft: Vector
  bottomRight: Vector;
}
export class Body {
  public shape: Vector[] = [];
  public center: Vector;
  public boundingBox: BoundingBox;
  constructor() {}
}
