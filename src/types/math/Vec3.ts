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

  static fromJSON(json: any): Vec3 {
    return new Vec3(json.x, json.y, json.z);
  }

  static toJSON(vec: Vec3): object {
    return { x: vec.x, y: vec.y, z: vec.z };
  }
}
