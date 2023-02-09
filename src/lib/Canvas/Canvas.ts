import { Vector } from "../Vector";
export class Canvas {
  public size: Vector = new Vector(500, 500, 0);
  public dom: HTMLCanvasElement = document.createElement("canvas");
  public ctx: CanvasRenderingContext2D = this.dom.getContext("2d")!;
  constructor(parent: HTMLElement = document.body) {
    parent.append(this.dom);
    this.dom.width = this.size.x;
    this.dom.height = this.size.y;
  }
  public setSize = (x: number, y: number) => {
    this.size.x = x;
    this.size.y = y;
    this.dom.width = this.size.x;
    this.dom.height = this.size.y;
  };
  public clear = () => {};
  public circle = (
    pos: Vector = new Vector(0, 0, 0),
    size: number = 10,
    fill: string | null = null,
    stroke: string | null = null
  ) => {};
  public rect = (
    pos: Vector = new Vector(0, 0, 0),
    size: Vector = new Vector(0, 0, 0),
    fill: string | null = null,
    stroke: string | null = null
  ) => {};
  public line = (
    pos1: Vector = new Vector(0, 0, 0),
    pos2: Vector = new Vector(10, 10, 0),
    stroke: string | null = null
  ) => {};
  public image = (
    image: HTMLImageElement | SVGAElement | HTMLCanvasElement,
    pos: Vector = new Vector(0, 0, 0),
    size: Vector = new Vector(0, 0, 0)
  ) => {};
  public start = () => {};
  public end = () => {};
}
