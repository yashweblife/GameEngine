import { Canvas } from "../Canvas/Canvas";
import { Vector, VectorMath } from "../Vector";

export interface BoundingBox {
  topLeft: Vector;
  bottomRight: Vector;
}
export interface Edge {
  start: Vector;
  end: Vector;
}
export class Body {
  public shape: Vector[] = [];
  public matrix:Vector[] = [];
  public edges: Edge[] = [];
  public pos: Vector = new Vector(255, 255, 0);
  public boundingBox: BoundingBox;
  public centerOfMass: Vector;
  public scale: number = 100;
  public angle:Vector = new Vector(0,0,0);
  constructor(shape: Vector[]) {
    this.shape = shape;
    this.calculateEdges();
  }
  public calculateMatrix = ()=>{
    this.shape.forEach((p:Vector)=>{
      let alter = VectorMath.clone(p);
      VectorMath.scalar(alter, this.scale);
      VectorMath.add(alter, this.pos);
      VectorMath.rotate(alter,this.angle);
      this.matrix.push(alter);
    })
  }
  public calculateEdges = () => {
    for (let i = 0; i < this.matrix.length - 1; i++) {
      this.edges.push({
        start: this.matrix[i],
        end: this.matrix[i + 1],
      } as Edge);
    }
  };
  public getScaledVertices = () => {
    this.shape.forEach((p: Vector) => {
      let alter = VectorMath.clone(p);
      VectorMath.scalar(alter, this.scale);
      VectorMath.add(alter, this.pos);
    });
  };
  public calculateRotatedMatrix = (deg:Vector = new Vector(0,0,0))=>{
    this.matrix.forEach((p:Vector)=>{
      VectorMath.rotate(p,deg);
    })
  }
  public getScaledEdges = () => {
    this.edges.forEach((e: Edge) => {
      let alter1 = VectorMath.clone(e.start);
      let alter2 = VectorMath.clone(e.end);
      VectorMath.scalar(alter1, this.scale);
      VectorMath.scalar(alter2, this.scale);
      VectorMath.add(alter1, this.pos);
      VectorMath.add(alter2, this.pos);
    });
  };
  public show = (render: Canvas) => {
    this.calculateRotatedMatrix(new Vector(0,0,90));
    this.edges.forEach((e: Edge) => {
      let alter1 = VectorMath.clone(e.start);
      let alter2 = VectorMath.clone(e.end);
      VectorMath.scalar(alter1, this.scale);
      VectorMath.scalar(alter2, this.scale);
      VectorMath.add(alter1, this.pos);
      VectorMath.add(alter2, this.pos);
      render.start();
      render.line(alter1, alter2, "red");
      render.end();
    });
    this.matrix.forEach((p: Vector) => {
      let alter = VectorMath.clone(p);
      VectorMath.scalar(alter, this.scale);
      VectorMath.add(alter, this.pos);
      render.start();
      render.circle(alter, 10, null, "red");
      render.end();
    });
  };
}
