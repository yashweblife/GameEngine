import { Vec3d } from "./Vec3d";
export class Vec2d {
  public x: number = 0;
  public y: number = 0;
}

export function clone  (vec:Vec2d,a:Vec2d){
    vec.x=a.x;
    vec.y=a.y;
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
