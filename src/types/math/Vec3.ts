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

  toArray() {
    return [this.x, this.y, this.z];
  }

  set(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
    return this;
  }

  add(v2: Vec3) {
    return Vec3.add(this, v2);
  }
  static add(v1: Vec3, v2: Vec3) {
    v1.x += v2.x;
    v1.y += v2.y;
    v1.z += v2.z;
    return v1;
  }

  sub(v2: Vec3) {
    return Vec3.sub(this, v2);
  }
  static sub(v1: Vec3, v2: Vec3) {
    v1.x -= v2.x;
    v1.y -= v2.y;
    v1.z -= v2.z;
    return v1;
  }

  mul(x: number) {
    return Vec3.mul(this, x);
  }
  static mul(v1: Vec3, x: number) {
    v1.x *= x;
    v1.y *= x;
    v1.z *= x;
    return v1;
  }

  normalize() {
    return Vec3.normalize(this);
  }
  static normalize(v1: Vec3) {
    const len = v1.length();
    if (len != 0) {
      v1.set(v1.x / len, v1.y / len, v1.z / len);
    }
    return v1;
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
