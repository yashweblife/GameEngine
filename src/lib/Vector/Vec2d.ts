import { Vec3d } from "./Vec3d";
export class Vec2d {
  public x: number = 0;
  public y: number = 0;
}

export function clone(vec: Vec2d, a: Vec2d) {
  vec.x = a.x;
  vec.y = a.y;
}

export function add(vec: Vec2d, a: Vec2d, b: Vec2d) {
  vec.x = a.x + b.x;
  vec.y = a.y + b.y;
  return vec;
}
export const translate = add;
export function subtract(vec: Vec2d, a: Vec2d, b: Vec2d) {
  vec.x = a.x - b.x;
  vec.y = a.y - b.y;
  return vec;
}
export const sub = subtract;
export function multiply(vec: Vec2d, a: Vec2d, b: Vec2d) {
  vec.x = a.x * b.x;
  vec.y = a.y * b.y;
  return vec;
}
export function divide(vec: Vec2d, a: Vec2d, b: Vec2d) {
  vec.x = a.x / b.x;
  vec.y = a.y / b.y;
  return vec;
}
export function scalar(vec: Vec2d, a: number) {
  vec.x *= a;
  vec.y *= a;
  return vec;
}
export function dot(a: Vec2d, b: Vec2d) {
  return a.x * b.x + a.y * b.y;
}
export function cross(vec: Vec3d, a: Vec2d, b: Vec2d) {
  let z = a.x * b.y - a.y * b.x;
  vec.x = vec.y = 0;
  vec.z = z;
}
export function ceil(vec: Vec2d) {
  vec.x = Math.ceil(vec.x);
  vec.y = Math.ceil(vec.y);
}
export function floor(vec: Vec2d) {
  vec.x = Math.floor(vec.x);
  vec.y = Math.floor(vec.y);
}
export function min(vec: Vec2d, vec1: Vec2d, vec2: Vec2d) {
  vec.x = Math.min(vec1.x, vec2.x);
  vec.y = Math.min(vec1.y, vec2.y);
  return vec;
}
export function max(vec: Vec2d, vec1: Vec2d, vec2: Vec2d) {
  vec.x = Math.max(vec1.x, vec2.x);
  vec.y = Math.max(vec1.y, vec2.y);
  return vec;
}
export function round(vec: Vec2d, vec1: Vec2d) {
  vec.x = Math.round(vec1.x);
  vec.y = Math.round(vec1.y);
  return vec;
}
export function scale(vec: Vec2d, vec1: Vec2d, vec2: Vec2d) {
  vec.x = vec1.x * vec2.x;
  vec.y = vec1.y * vec2.y;
  return vec;
}
export function distance(vec1: Vec2d, vec2: Vec2d) {
  return Math.sqrt((vec1.x - vec2.x) ** 2 + (vec1.y - vec2.y) ** 2);
}
export function length(vec1: Vec2d) {
  return Math.sqrt(vec1.x ** 2 + vec1.y ** 2);
}
export function negate(vec: Vec2d) {
  vec.x = -vec.x;
  vec.y = -vec.y;
}
export function invert(vec: Vec2d) {
  vec.x = 1 / vec.x;
  vec.y = 1 / vec.y;
}
export function normalize(vec: Vec2d, a: Vec2d) {
  let len = a.x ** 2 + a.y ** 2;
  if (len > 0) {
    len = 1 / Math.sqrt(len);
  }
  vec.x *= len;
  vec.y *= len;
  return vec;
}
export function lerp(vec: Vec2d, a: Vec2d, b: Vec2d, t: number) {
  vec.x = a.x + t * (b.x - a.x);
  vec.y = a.y + t * (b.y - a.y);
  return vec;
}
export function random(vec: Vec2d, scale: number = 1) {
    
}
export function transformMat2d(
  vec: Vec2d,
  vec1: Vec2d,
  mat1: [number, number, number, number]
) {
  vec.x = mat1[0] * vec1.x + mat1[2] * vec1.y;
  vec.x = mat1[1] * vec1.x + mat1[3] * vec1.y;
  return vec;
}
export function rotate(vec: Vec2d, target: Vec2d, orgin: Vec2d, angle: number) {
  let tx = target.x - orgin.x,
    ty = target.y - orgin.y,
    sin = Math.sin(angle),
    cos = Math.cos(angle);
  vec.x = tx * cos - ty * sin + orgin.x;
  vec.x = tx * sin + ty * cos + orgin.y;
}

export function angle(a: Vec2d, b: Vec2d) {
  let mag = Math.sqrt((a.x ** 2 + a.y ** 2) * (b.x ** 2 + b.y ** 2));
  let cos = mag && (a.x * b.x + a.y * b.y) / mag;
  return Math.acos(Math.min(Math.max(cos, -1), 1));
}
