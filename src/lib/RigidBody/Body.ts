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
// export class Body {
//   public shape: Vector[] = [];
//   public matrix:Vector[] = [];
//   public edges: Edge[] = [];
//   public pos: Vector = new Vector(255, 255, 0);
//   public boundingBox: BoundingBox;
//   public centerOfMass: Vector;
//   public scale: number = 100;
//   public angle:Vector = new Vector(0,0,0);
//   constructor(shape: Vector[]) {
//     this.shape = shape;
//     this.calculateEdges();
//   }
//   public calculateEdges = () => {
//     for (let i = 0; i < this.shape.length - 1; i++) {
//       this.edges.push({
//         start: this.shape[i],
//         end: this.shape[i + 1],
//       } as Edge);
//     }
//   };
//   public getScaledVertices = () => {
//     this.shape.forEach((p: Vector) => {
//       let alter = VectorMath.clone(p);
//       VectorMath.scalar(alter, this.scale);
//       VectorMath.add(alter, this.pos);
//     });
//   };
//   public calculateRotatedMatrix = (deg:Vector = new Vector(0,0,0))=>{
//     this.matrix.forEach((p:Vector)=>{
//       VectorMath.rotate(p,deg);
//     })
//   }
//   public getTranslatedShape = ()=>{}
//   public getRotatedShape = ()=>{}
//   public getScaledEdges = () => {
//     this.edges.forEach((e: Edge) => {
//       let alter1 = VectorMath.clone(e.start);
//       let alter2 = VectorMath.clone(e.end);
//       VectorMath.scalar(alter1, this.scale);
//       VectorMath.scalar(alter2, this.scale);
//       VectorMath.add(alter1, this.pos);
//       VectorMath.add(alter2, this.pos);
//     });
//   };
//   public show = (render: Canvas) => {
//     //this.calculateRotatedMatrix(new Vector(0,0,90));
//     this.edges.forEach((e: Edge) => {
//       let alter1 = VectorMath.clone(e.start);
//       let alter2 = VectorMath.clone(e.end);
//       VectorMath.scalar(alter1, this.scale);
//       VectorMath.scalar(alter2, this.scale);
//       VectorMath.add(alter1, this.pos);
//       VectorMath.add(alter2, this.pos);
//       render.start();
//       render.line(alter1, alter2, "red");
//       render.end();
//     });
//     this.shape.forEach((p: Vector) => {
//       let alter = VectorMath.clone(p);
//       VectorMath.scalar(alter, this.scale);
//       VectorMath.add(alter, this.pos);
//       render.start();
//       render.circle(alter, 10, null, "red");
//       render.end();
//     });
//   };
// }

export class Body {
  public vertices: Vector[] = []; //This is to keep a record of the original shape
  public matrix: Vector[] = []; //This is to perform any mutations onto
  public scale: number = 100;
  public pos: Vector = new Vector(250,250, 0);
  public rotation: Vector = new Vector(0, 0, 0);
  public centerOfMass: Vector = new Vector(0, 0, 0);
  constructor(shape: Vector[] = []) {
    shape.forEach((val: Vector) => {
      const test = VectorMath.clone(val);
      this.vertices.push(test);
      this.matrix.push(test);
    });
    this.calculateMatrix();
  }
  public setRotation = (val: Vector) => {
    this.rotation = VectorMath.clone(val);
    this.calculateMatrix();
  };
  public setScale = (scale: number = 100) => {
    this.scale = scale;
    this.calculateMatrix();
  };
  public setPosition = (val: Vector) => {
    this.pos = VectorMath.clone(val);
    this.calculateMatrix();
  };
  public calculateMatrix = () => {
    /**
     * Calculate in the order of Rotation -> Scale -> Translation
     */
    this.matrix.forEach((val: Vector) => {
      VectorMath.rotate(val, this.rotation);
      VectorMath.scalar(val, this.scale);
      VectorMath.add(val, this.pos);
    });
  };
  public calculateCenterOfMass = () => {
    VectorMath.scalar(this.centerOfMass, 0);
    const size = this.matrix.length - 1;
    for (let i = 0; i < size; i++) {
      VectorMath.add(this.centerOfMass, this.matrix[i]);
    }
    VectorMath.scalar(this.centerOfMass, 1 / size);
  };
  public update = () => {};
  public show = (canvas: Canvas) => {
    const size = this.matrix.length - 1;
    for (let i = 0; i < size; i++) {
      canvas.start();
      canvas.circle(this.matrix[i], 10, "red");
      canvas.end();
      canvas.start();
      canvas.line(this.matrix[i], this.matrix[i + 1], "red");
      canvas.end();
    }
  };
}
