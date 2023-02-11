import { Canvas } from "./lib/Canvas/Canvas";
import { Body } from "./lib/RigidBody/Body";
import { Vector } from "./lib/Vector";
const canvas = new Canvas();
const test: Vector[] = [
  new Vector(-0.9643516153778124, 0.2646241899717482, 0),
  new Vector(0.03230252534863266, -0.9994781372576895, 0),
  new Vector(0.6510875613551799, 0.7590026267731654, 0),
  new Vector(-0.9643516153778124, 0.2646241899717482, 0),
];

const bod: Body = new Body(test);
bod.show(canvas);
