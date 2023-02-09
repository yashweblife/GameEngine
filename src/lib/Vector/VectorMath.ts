/**
 * ## VectorMath
 * Use this to do computation with vectors
 */
class VectorMath {
  /**
   * Add two Vectors
   * vec1 gets modified
   * @param vec1 Vector
   * @param vec2 Vector
   */
  public static add = (vec1: Vector, vec2: Vector) => {};
  /**
   * Subtract two Vectors
   * vec1 gets modified
   * @param vec1 Vector
   * @param vec2 Vector
   */
  public static sub = (vec1: Vector, vec2: Vector) => {};
  /**
   * Get distance between two Vectors
   * @param vec1 Vector
   * @param vec2 Vector
   * @returns number
   */
  public static getDistance = (vec1: Vector, vec2: Vector): number => {};
  /**
   * Dot two vectors
   * @param vec1 Vector
   * @param vec2 Vector
   * @returns Vector
   */
  public static dot = (vec1: Vector, vec2: Vector): Vector => {};
  /**
   * Cross 2 Vectors
   * @param vec1 Vector
   * @param vec2 Vector
   * @returns Vector
   */
  public static cross = (vec1: Vector, vec2: Vector): Vector => {};
  /**
   * Multiply a scalar to all the vector components
   * @param vec1 Vector
   * @param val number
   */
  public static scalar = (vec1: Vector, val: number) => {};
  /**
   * Normalize a Vector, set its components to their unit values
   * @param vec1 Vector
   */
  public static normalize = (vec1: Vector) => {};
  /**
   * Set magnitude of the vector, doesnt change direction
   * @param vec1 Vector
   * @param val number
   */
  public static setMag = (vec1: Vector, val: number) => {};
  /**
   * Rotate Vector along the X axis
   * @param vec1 Vector
   * @param val angle in degree
   */
  public static rotateX = (vec1: Vector, val: number) => {};
  /**
   * Rotate Vector along the Y axis
   * @param vec1 Vector
   * @param val angle in degree
   */
  public static rotateY = (vec1: Vector, val: number) => {};
  /**
   * Rotate Vector along the Z axis
   * @param vec1 Vector
   * @param val angle in degree
   */
  public static rotateZ = (vec1: Vector, val: number) => {};
  /**
   * Rotate Vector by given vector
   * @param vec1 Vector
   * @param vec2 Vector
   */
  public static rotate = (vec1: Vector, vec2: Vector) => {};
}
