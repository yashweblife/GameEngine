import { Vector } from "../Vector";
export class Mouse {
  public pos: Vector = new Vector(0, 0, 0);
  public click: boolean = false;
  public parent: HTMLElement;
  public tooltip: HTMLElement | null = null;
  constructor(parent: HTMLElement = document.body) {
    this.parent = parent;
    const bound = this.parent.getBoundingClientRect();
    this.parent.addEventListener("mousemove", (e: MouseEvent) => {
      this.pos.x = e.clientX - bound.left;
      this.pos.y = e.clientY - bound.top;
      if (this.tooltip !== null) {
        this.tooltip.style.top = `${this.pos.y-50}px`;
        this.tooltip.style.left = `${this.pos.x-20}px`;
        this.tooltip.innerHTML = `X:${this.pos.x}px | Y:${this.pos.y}px`;
      }
    });
    this.parent.addEventListener("mousedown", (e: MouseEvent) => {
      this.click = true;
    });
    this.parent.addEventListener("mouseup", (e: MouseEvent) => {
      this.click = false;
    });
  }
  public onMove = (func: Function) => {
    this.parent.addEventListener("mousemove", (e: MouseEvent) => {
      func(this.pos);
    });
  };
  public onClick = (func: Function) => {
    this.parent.addEventListener("mouseup", (e: MouseEvent) => {
      func(new Vector(this.pos.x, this.pos.y, this.pos.z));
    });
  };
  public enableToolTip = () => {
    this.tooltip = document.createElement("div");
    this.tooltip.style.position = "absolute";
    this.tooltip.style.zIndex = "100";
    this.tooltip.style.backgroundColor = "rgba(32,32,32,0.4)";
    this.tooltip.style.color="white";
    this.tooltip.style.padding="0.5em";
    this.tooltip.style.borderRadius="1em";
    this.parent.parentElement.append(this.tooltip)
  };
  public disableToolTip = () => {
    this.tooltip = null;
  };
}
