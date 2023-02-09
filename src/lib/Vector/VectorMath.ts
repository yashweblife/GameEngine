import { Vector } from "./Vector";
/**
 * ## VectorMath
 * Use this to do computation with vectors
 */
export class VectorMath {
  /**
   * Add two Vectors
   * vec1 gets modified
   * @param vec1 Vector
   * @param vec2 Vector
   */
  public static getMagnitude = (vec1: Vector): number => {
    return Math.sqrt(vec1.x ** 2 + vec1.y ** 2 + vec1.z ** 2);
  };
  public static add = (vec1: Vector, vec2: Vector) => {
    vec1.x += vec2.x;
    vec1.y += vec2.y;
    vec1.z += vec2.z;
  };
  /**
   * Subtract two Vectors
   * vec1 gets modified
   * @param vec1 Vector
   * @param vec2 Vector
   */
  public static sub = (vec1: Vector, vec2: Vector) => {
    vec1.x -= vec2.x;
    vec1.y -= vec2.y;
    vec1.z -= vec2.z;
  };
  /**
   * Get distance between two Vectors
   * @param vec1 Vector
   * @param vec2 Vector
   * @returns number
   */
  public static getDistance = (vec1: Vector, vec2: Vector): number => {
    return Math.sqrt(
      (vec1.x - vec2.x) ** 2 + (vec1.y - vec2.y) ** 2 + (vec1.z - vec2.z) ** 2
    );
  };
  /**
   * Dot two vectors
   * @param vec1 Vector
   * @param vec2 Vector
   * @returns number
   */
  public static dot = (vec1: Vector, vec2: Vector): number => {
    return vec1.x * vec2.x + vec1.y * vec2.y + vec1.z * vec2.z;
  };
  /**
   * Cross 2 Vectors
   * @param vec1 Vector
   * @param vec2 Vector
   * @returns Vector
   */
  public static cross = (vec1: Vector, vec2: Vector): Vector => {
    return new Vector(
      vec1.y * vec2.z - vec1.z * vec2.y,
      vec1.z * vec2.x - vec1.x * vec2.z,
      vec1.x * vec2.y - vec1.y * vec2.x
    );
  };
  /**
   * Multiply a scalar to all the vector components
   * @param vec1 Vector
   * @param val number
   */
  public static scalar = (vec1: Vector, val: number) => {
    vec1.x *= val;
    vec1.y *= val;
    vec1.z *= val;
  };
  /**
   * Normalize a Vector, set its components to their unit values
   * @param vec1 Vector
   */
  public static normalize = (vec1: Vector) => {
    const mag = Math.sqrt(vec1.x ** 2 + vec1.y ** 2 + vec1.z ** 2);
    vec1.x /= mag;
    vec1.y /= mag;
    vec1.z /= mag;
  };
  /**
   * Set magnitude of the vector, doesnt change direction
   * @param vec1 Vector
   * @param val number
   */
  public static setMag = (vec1: Vector, val: number) => {
    const final = val / Math.sqrt(vec1.x ** 2 + vec1.y ** 2 + vec1.z ** 2);
    vec1.x *= final;
    vec1.y *= final;
    vec1.z *= final;
  };
  /**
   * Rotate Vector along the X axis
   * @param vec1 Vector
   * @param val angle in degree
   */
  public static rotateX = (vec1: Vector, val: number) => {
    const theta = (val * Math.PI) / 180;
    vec1.y = vec1.y * Math.cos(theta) - vec1.z * Math.sin(theta);
    vec1.z = vec1.y * Math.sin(theta) + vec1.z * Math.cos(theta);
  };
  /**
   * Rotate Vector along the Y axis
   * @param vec1 Vector
   * @param val angle in degree
   */
  public static rotateY = (vec1: Vector, val: number) => {
    const theta = (val * Math.PI) / 180;
    vec1.x = vec1.x * Math.cos(theta) + vec1.z * Math.sin(theta);
    vec1.z = -vec1.x * Math.sin(theta) + vec1.z * Math.cos(theta);
  };
  /**
   * Rotate Vector along the Z axis
   * @param vec1 Vector
   * @param val angle in degree
   */
  public static rotateZ = (vec1: Vector, val: number) => {
    const theta = (val * Math.PI) / 180;
    vec1.x = vec1.x * Math.cos(theta) - vec1.y * Math.sin(theta);
    vec1.y = vec1.x * Math.sin(theta) + vec1.y * Math.cos(theta);
  };
  /**
   * Rotate Vector by given vector
   * @param vec1 Vector
   * @param vec2 Vector
   */
  public static rotate = (vec1: Vector, vec2: Vector) => {
    this.rotateX(vec1, vec2.x);
    this.rotateY(vec1, vec2.y);
    this.rotateZ(vec1, vec2.z);
  };
}
