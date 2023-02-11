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
  public centerOfMass: Vector | null = null;
  public edgeBisector: Vector[] | null = null;
  public normalized:Vector[] | null = null;
  public scale:number = 0;
  constructor(parent: HTMLElement = document.body) {
    this.canvas = new Canvas(parent);
    this.canvas.translate(250,250);
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
    this.boundingBox = {
      topLeft: new Vector(minX, minY, 0),
      bottomRight: new Vector(maxX - minX, maxY - minY, 0),
    };
  };
  public disableBoundingBox = () => {
    this.boundingBox = null;
  };
  public enableCenterOfMass = () => {
    4;
    let avgPoint = new Vector(0, 0, 0);
    for (let i = 0; i < this.points.length - 1; i++) {
      VectorMath.add(avgPoint, this.points[i]);
    }
    VectorMath.scalar(avgPoint, 1 / (this.points.length - 1));
    this.centerOfMass = avgPoint;
    console.log(this.centerOfMass);
  };
  public disableCenterOfMass = () => {
    this.centerOfMass = null;
  };
  public enableEdgeBisector = () => {
    let bisectors: Vector[] = [];

    for (let i = 0; i < this.points.length - 1; i++) {
      let base = VectorMath.clone(this.points[i]);
      VectorMath.add(base, this.points[i + 1]);
      VectorMath.scalar(base, 0.5);
      bisectors.push(base);
    }
    this.edgeBisector = bisectors;
    console.log(this.edgeBisector);
  };
  public disableEdgeBisector = () => {
    this.edgeBisector = null;
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
      this.canvas.rect(
        this.boundingBox.topLeft,
        this.boundingBox.bottomRight,
        null,
        "red"
      );
      this.canvas.end();
    }
    if (this.centerOfMass !== null) {
      this.canvas.start();
      this.canvas.circle(this.centerOfMass, 5, "red");
      this.canvas.end();
    }
    if (this.edgeBisector !== null) {
      let closestEdge = new Vector(0, 0, 0);
      let furthestEdge = VectorMath.clone(
        this.centerOfMass || new Vector(0, 0, 0)
      );
      this.edgeBisector.forEach((b: Vector) => {
        if (this.centerOfMass) {
          if (
            VectorMath.getDistance(this.centerOfMass, b) <
            VectorMath.getDistance(closestEdge, this.centerOfMass)
          ) {
            closestEdge = VectorMath.clone(b);
          }
          if (
            VectorMath.getDistance(this.centerOfMass, b) >
            VectorMath.getDistance(furthestEdge, this.centerOfMass)
          ) {
            furthestEdge = VectorMath.clone(b);
          }
        }
        this.canvas.start();
        this.canvas.circle(b, 5, "red");
        this.canvas.end();
      });
      if (this.centerOfMass !== null) {
        this.canvas.start();
        this.canvas.line(this.centerOfMass, closestEdge);
        this.canvas.end();
        this.canvas.start();
        this.canvas.circle(
          this.centerOfMass,
          VectorMath.getDistance(this.centerOfMass, closestEdge),
          null,
          "blue"
        );
        this.canvas.end();
        this.canvas.start();
        this.canvas.line(this.centerOfMass, furthestEdge);
        this.canvas.end();
        this.canvas.start();
        this.canvas.circle(
          this.centerOfMass,
          VectorMath.getDistance(this.centerOfMass, furthestEdge),
          null,
          "green"
        );
        this.canvas.end();
      }
    }
    if(this.normalized !== null){
      for (let i = 0; i < this.normalized.length - 1; i++) {
        const alter1 = VectorMath.clone(this.normalized[i]);
        const alter2 = VectorMath.clone(this.normalized[i+1]);
        VectorMath.scalar(alter1, this.scale);
        VectorMath.scalar(alter2, this.scale);
        VectorMath.add(alter1, new Vector(250,250,0));
        VectorMath.add(alter2, new Vector(250,250,0));
        this.canvas.start();
        this.canvas.line(alter1, alter2, "red");
        this.canvas.end();
      }
      this.normalized.forEach((p:Vector)=>{
        const alter = VectorMath.clone(p);
        VectorMath.scalar(alter, this.scale);
        VectorMath.add(alter, new Vector(250,250,0));
        this.canvas.start();
        this.canvas.circle(alter,3,"red");
        this.canvas.end();
      })
    }
    requestAnimationFrame(this.update);
  };
  public enableNormalize = () => {
    this.normalized=[];
    this.points.forEach((p: Vector) => {
      let alter = VectorMath.clone(p);
      VectorMath.sub(alter, this.centerOfMass);
      VectorMath.normalize(alter);
      this.normalized.push(alter);
      console.log(alter);
    });
  };
  public setScale = (val: number) => {
    this.scale = val;
  };
}
