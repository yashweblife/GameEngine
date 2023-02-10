import { Vector } from "../Vector";
export class Mouse {
  pos: Vector;
  click: boolean;
  parent: HTMLElement;
  constructor(parent: HTMLElement = document.body) {
    this.parent = parent;
    const bound = this.parent.getBoundingClientRect();
    parent.addEventListener("mousemove", (e: MouseEvent) => {
      this.pos.x = e.clientX - bound.left;
      this.pos.y = e.clientY - bound.top;
    });
    parent.addEventListener("mousedown", (e: MouseEvent) => {
      this.click = true;
    });
    parent.addEventListener("mouseup", (e: MouseEvent) => {
      this.click = false;
    });
  }
}
