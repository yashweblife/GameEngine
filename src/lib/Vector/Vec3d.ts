export class Vec3d {
  constructor(
    public x: number = 0,
    public y: number = 0,
    public z: number = 0
  ) {}
}

export function clone(vec: Vec3d, a: Vec3d) {
  vec.x = a.x;
  vec.y = a.y;
  vec.z = a.z;
}

export function add(vec: Vec3d, a: Vec3d, b: Vec3d) {
  vec.x = a.x + b.x;
  vec.y = a.y + b.y;
  vec.z = a.z + b.z;
  return vec;
}
export const translate = add;
export function subtract(vec: Vec3d, a: Vec3d, b: Vec3d) {
  vec.x = a.x - b.x;
  vec.y = a.y - b.y;
  vec.z = a.z - b.z;
  return vec;
}
export const sub = subtract;
export function multiply(vec: Vec3d, a: Vec3d, b: Vec3d) {
  vec.x = a.x * b.x;
  vec.y = a.y * b.y;
  vec.z = a.z * b.z;
  return vec;
}
export function divide(vec: Vec3d, a: Vec3d, b: Vec3d) {
  vec.x = a.x / b.x;
  vec.y = a.y / b.y;
  vec.z = a.z / b.z;
  return vec;
}
export function scalar(vec: Vec3d, a: number) {
  vec.x *= a;
  vec.y *= a;
  vec.z *= a;
  return vec;
}
export function dot(a: Vec3d, b: Vec3d) {
  return a.x * b.x + a.y * b.y + a.z * b.z;
}
export function cross(vec: Vec3d, a: Vec3d, b: Vec3d) {
  vec.x = a.y * b.z - a.z * b.y;
  vec.y = a.z * b.x - a.x * b.z;
  vec.z = a.x * b.y - a.y * b.x;
  return vec;
}
export function ceil(vec: Vec3d) {
  vec.x = Math.ceil(vec.x);
  vec.y = Math.ceil(vec.y);
  vec.z = Math.ceil(vec.z);
}
export function floor(vec: Vec3d) {
  vec.x = Math.floor(vec.x);
  vec.y = Math.floor(vec.y);
  vec.z = Math.floor(vec.z);
}
export function min(vec: Vec3d, vec1: Vec3d, vec2: Vec3d) {
  vec.x = Math.min(vec1.x, vec2.x);
  vec.y = Math.min(vec1.y, vec2.y);
  vec.z = Math.min(vec1.z, vec2.z);
  return vec;
}
export function max(vec: Vec3d, vec1: Vec3d, vec2: Vec3d) {
  vec.x = Math.max(vec1.x, vec2.x);
  vec.y = Math.max(vec1.y, vec2.y);
  vec.z = Math.max(vec1.z, vec2.z);
  return vec;
}
export function round(vec: Vec3d, vec1: Vec3d) {
  vec.x = Math.round(vec1.x);
  vec.y = Math.round(vec1.y);
  vec.z = Math.round(vec1.z);
  return vec;
}
export function scale(vec: Vec3d, vec1: Vec3d, vec2: Vec3d) {
  vec.x = vec1.x * vec2.x;
  vec.y = vec1.y * vec2.y;
  vec.z = vec1.z * vec2.z;
  return vec;
}
export function distance(vec1: Vec3d, vec2: Vec3d) {
  return Math.sqrt(
    (vec1.x - vec2.x) ** 2 + (vec1.y - vec2.y) ** 2 + (vec1.z - vec2.z) ** 2
  );
}
export function length(vec1: Vec3d) {
  return Math.sqrt(vec1.x ** 2 + vec1.y ** 2 + vec1.z ** 2);
}
export function negate(vec: Vec3d) {
  vec.x = -vec.x;
  vec.y = -vec.y;
  vec.z = -vec.z;
}
export function invert(vec: Vec3d) {
  vec.x = 1 / vec.x;
  vec.y = 1 / vec.y;
  vec.z = 1 / vec.z;
}
export function normalize(vec: Vec3d, a: Vec3d) {
  let len = a.x ** 2 + a.y ** 2 + a.z ** 2;
  if (len > 0) {
    len = 1 / Math.sqrt(len);
  }
  vec.x *= len;
  vec.y *= len;
  vec.z *= len;
  return vec;
}
export function lerp(vec: Vec3d, a: Vec3d, b: Vec3d, t: number) {
  vec.x = a.x + t * (b.x - a.x);
  vec.y = a.y + t * (b.y - a.y);
  vec.z = a.z + t * (b.z - a.z);
  return vec;
}
export function random(vec: Vec3d, scale: number = 1) {
  let rand = (Math.random() - 0.5) * 2 * Math.PI;
  vec.x = Math.cos(rand) * scale;
  vec.y = Math.sin(rand) * scale;
  vec.z = Math.sin(rand) * scale;
  return vec;
}
export function transformMat3d(
  vec: Vec3d,
  vec1: Vec3d,
  mat1: [number, number, number, number, number, number, number, number, number]
) {
  vec.x = vec1.x * mat1[0] + vec1.y * mat1[3] + vec1.z * mat1[6];
  vec.y = vec1.x * mat1[1] + vec1.y * mat1[4] + vec1.z * mat1[7];
  vec.z = vec1.x * mat1[2] + vec1.y * mat1[5] + vec1.z * mat1[8];
  return vec;
}
export function rotateX(vec: Vec3d, a: Vec3d, b: Vec3d, angle: number) {
  let tx = a.x - b.x;
  let ty = a.y - b.y;
  let tz = a.z - b.z;
  let sin = Math.sin(angle);
  let cos = Math.cos(angle);
  let rx = tx;
  let ry = ty * cos - tz * sin;
  let rz = ty * sin + tz * cos;
  vec.x = rx + b.x;
  vec.y = ry + b.y;
  vec.z = rz + b.z;
  return vec;
}

export function rotateY(vec: Vec3d, a: Vec3d, b: Vec3d, angle: number) {
  let tx = a.x - b.x;
  let ty = a.y - b.y;
  let tz = a.z - b.z;
  let sin = Math.sin(angle);
  let cos = Math.cos(angle);
  let rx = tz * sin + tx * cos;
  let ry = ty;
  let rz = ty * cos - tz * sin;
  vec.x = rx + b.x;
  vec.y = ry + b.y;
  vec.z = rz + b.z;
  return vec;
}
export function rotateZ(vec: Vec3d, a: Vec3d, b: Vec3d, angle: number) {
  let tx = a.x - b.x;
  let ty = a.y - b.y;
  let tz = a.z - b.z;
  let sin = Math.sin(angle);
  let cos = Math.cos(angle);
  let rx = tx * cos - ty * sin;
  let ry = tx * sin + ty * cos;
  let rz = tz;
  vec.x = rx + b.x;
  vec.y = ry + b.y;
  vec.z = rz + b.z;
  return vec;
}

export function angle(a: Vec3d, b: Vec3d) {
  let mag = Math.sqrt((a.x ** 2 + a.y ** 2) * (b.x ** 2 + b.y ** 2));
  let cos = mag && (a.x * b.x + a.y * b.y) / mag;
  return Math.acos(Math.min(Math.max(cos, -1), 1));
}
