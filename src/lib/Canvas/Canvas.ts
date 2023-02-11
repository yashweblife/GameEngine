import { Vector } from "../Vector";
export class Canvas {
  public size: Vector = new Vector(500, 500, 0);
  public dom: HTMLCanvasElement = document.createElement("canvas");
  public ctx: CanvasRenderingContext2D = this.dom.getContext("2d")!;
  public boundingBox:DOMRect = this.dom.getBoundingClientRect();
  constructor(parent: HTMLElement = document.body) {
    parent.append(this.dom);
    this.dom.width = this.size.x;
    this.dom.height = this.size.y;
  }
  public translate = (x:number,y:number)=>{
    this.ctx.translate(x,y);
  }
  public setSize = (x: number, y: number) => {
    this.size.x = x;
    this.size.y = y;
    this.dom.width = this.size.x;
    this.dom.height = this.size.y;
  };
  public start = () => {
    this.ctx.beginPath();
  };
  public end = () => {
    this.ctx.closePath();
  };
  public clear = () => {
    this.ctx.clearRect(0, 0, this.size.x, this.size.y);
  };
  public circle = (
    pos: Vector = new Vector(0, 0, 0),
    size: number = 10,
    fill: string | null = null,
    stroke: string | null = null
  ) => {
    this.ctx.arc(pos.x, pos.y, size, 0, Math.PI * 2, false);
    if(fill !== null){
      this.ctx.fillStyle = fill;
      this.ctx.fill();

    }
    if(stroke !== null){
      this.ctx.strokeStyle = stroke;
      this.ctx.stroke();
    }
  };
  public rect = (
    pos: Vector = new Vector(0, 0, 0),
    size: Vector = new Vector(0, 0, 0),
    fill: string | null = null,
    stroke: string | null = null
  ) => {
    this.ctx.rect(pos.x, pos.y, size.x, size.y);
    if(fill !== null){
      this.ctx.fillStyle = fill;
      this.ctx.fill();

    }
    if(stroke !== null){
      this.ctx.strokeStyle = stroke;
      this.ctx.stroke();
    }
  };
  public line = (
    pos1: Vector = new Vector(0, 0, 0),
    pos2: Vector = new Vector(10, 10, 0),
    stroke: string | null = null
  ) => {
    this.ctx.moveTo(pos1.x, pos1.y);
    this.ctx.lineTo(pos2.x, pos2.y);
    this.ctx.strokeStyle = stroke || "black";
    this.ctx.stroke();
  };
  public image = (
    image: CanvasImageSource,
    pos: Vector = new Vector(0, 0, 0),
    size: Vector = new Vector(0, 0, 0)
  ) => {
    this.ctx.drawImage(image, pos.x, pos.y, size.x, size.y);
  };
}
