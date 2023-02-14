export class CanvasGL {
  public dom: HTMLCanvasElement = document.createElement("canvas");
  public ctx: WebGL2RenderingContext = this.dom.getContext("webgl2")!;
  constructor(parent: HTMLElement = document.body) {
    parent.appendChild(this.dom);
  }
}
