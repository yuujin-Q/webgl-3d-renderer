/* eslint-disable @typescript-eslint/no-explicit-any */
export class Vec3 {
  public x: number = 0;
  public y: number = 0;
  public z: number = 0;

  constructor(x?: number, y?: number, z?: number) {
    if (x !== undefined && y !== undefined && z !== undefined) {
      this.x = x;
      this.y = y;
      this.z = z;
    }
  }

  static add(v1: Vec3, v2: Vec3) {
    v1.x += v2.x;
    v1.y += v2.y;
    v1.z += v2.z;
  }

  static sub(v1: Vec3, v2: Vec3) {
    v1.x -= v2.x;
    v1.y -= v2.y;
    v1.z -= v2.z;
  }

  static mul(v1: Vec3, x: number) {
    v1.x *= x;
    v1.y *= x;
    v1.z *= x;
  }

  length(): number {
    return Math.sqrt(
      Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2)
    );
  }

  static fromJSON(json: any): Vec3 {
    return new Vec3(json.x, json.y, json.z);
  }

  static toJSON(vec: Vec3): object {
    return { x: vec.x, y: vec.y, z: vec.z };
  }
}
