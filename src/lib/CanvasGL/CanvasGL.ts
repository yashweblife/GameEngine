import { Vector } from "../Vector";
export class CanvasGL {
  public dom: HTMLCanvasElement = document.createElement("canvas");
  public gl: WebGLRenderingContext = this.dom.getContext("webgl")!;
  public size: Vector = new Vector(0, 0, 0);
  constructor(parent: HTMLElement = document.body) {
    parent.appendChild(this.dom);
    this.setSize();
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    this.initializeShader();
  }
  public initializeShader = () => {
    const vsSource = `attribute vec4 aVertexPosition;uniform mat4 uModelViewMatrix;uniform mat4 uProjectionMatrix;
    void main() {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
    }`;
    const fsSource = `
void main() {
  gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
}
`;
    const vertexShader = this.createShader(this.gl.VERTEX_SHADER, vsSource);
    const fragmentShader = this.createShader(this.gl.FRAGMENT_SHADER, fsSource);
    const shaderProgram = this.createShaderProgram([
      vertexShader,
      fragmentShader,
    ]);
  };
  private createShader = (type: number, source: string): WebGLShader | null => {
    const shader = this.gl.createShader(type);
    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);
    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      console.log("Shader not loading");
      this.gl.deleteShader(shader);
      return null;
    }
    return shader;
  };
  private createShaderProgram = (
    shaders: WebGLShader[]
  ): WebGLProgram | null => {
    const program = this.gl.createProgram();
    shaders.forEach((shader: WebGLShader) => {
      this.gl.attachShader(program, shader);
    });
    this.gl.linkProgram(program);
    if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
      console.log("Error with program");
      return null;
    }
    return program;
  };
  private initBuffer = () => {
    const positionBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);
    const positions = [1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, -1.0];
    this.gl.bufferData(
      this.gl.ARRAY_BUFFER,
      new Float32Array(positions),
      this.gl.STATIC_DRAW
    );
    return { position: positionBuffer };
  };
  public drawScene = () => {
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0); // Clear to black, fully opaque
    this.gl.clearDepth(1.0);
    this.gl.depthFunc(this.gl.LEQUAL);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    const fov =  (45*Math.PI)/180;
    const aspect = this.gl.canvas.width/this.gl.canvas.height;
    const zNear = 0.1;
    const zFar = 100;

  };
  public setSize = (x: number = 500, y: number = 500) => {
    this.size = new Vector(x, y, 0);
    this.dom.width = x;
    this.dom.height = y;
  };
}
