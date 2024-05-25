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

  static lerp(a: Vec3, b: Vec3, t: number): Vec3 {
    return new Vec3(
      a.x * (1 - t) + b.x * t,
      a.y * (1 - t) + b.y * t,
      a.z * (1 - t) + b.z * t
    );
  }

  static easeInSine(x: number): number {
    return 1 - Math.cos((x * Math.PI) / 2);
  }

  static easeOutSine(x: number): number {
    return Math.sin((x * Math.PI) / 2);
  }

  static easeInOutSine(x: number): number {
    return -(Math.cos(Math.PI * x) - 1) / 2;
  }

  static easeInQuad(x: number): number {
    return x * x;
  }

  static easeOutQuad(x: number): number {
    return 1 - (1 - x) * (1 - x);
  }

  static easeInOutQuad(x: number): number {
    return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
  }

  static easeInCubic(x: number): number {
    return x * x * x;
  }

  static easeOutCubic(x: number): number {
    return 1 - Math.pow(1 - x, 3);
  }

  static easeInOutCubic(x: number): number {
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
  }

  static easeInQuart(x: number): number {
    return x * x * x * x;
  }

  static easeOutQuart(x: number): number {
    return 1 - Math.pow(1 - x, 4);
  }

  static easeInOutQuart(x: number): number {
    return x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2;
  }

  static easeInQuint(x: number): number {
    return x * x * x * x * x;
  }

  static easeOutQuint(x: number): number {
    return 1 - Math.pow(1 - x, 5);
  }

  static easeInOutQuint(x: number): number {
    return x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2;
  }

  static easeInExpo(x: number): number {
    return x === 0 ? 0 : Math.pow(2, 10 * x - 10);
  }

  static easeOutExpo(x: number): number {
    return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
  }

  static easeInOutExpo(x: number): number {
    return x === 0
      ? 0
      : x === 1
      ? 1
      : x < 0.5
      ? Math.pow(2, 20 * x - 10) / 2
      : (2 - Math.pow(2, -20 * x + 10)) / 2;
  }

  static easeInCirc(x: number): number {
    return 1 - Math.sqrt(1 - Math.pow(x, 2));
  }

  static easeOutCirc(x: number): number {
    return Math.sqrt(1 - Math.pow(x - 1, 2));
  }

  static easeInOutCirc(x: number): number {
    return x < 0.5
      ? (1 - Math.sqrt(1 - Math.pow(2 * x, 2))) / 2
      : (Math.sqrt(1 - Math.pow(-2 * x + 2, 2)) + 1) / 2;
  }

  static easeInBack(x: number): number {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return c3 * x * x * x - c1 * x * x;
  }

  static easeOutBack(x: number): number {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
  }

  static easeInOutBack(x: number): number {
    const c1 = 1.70158;
    const c2 = c1 * 1.525;
    return x < 0.5
      ? (Math.pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2
      : (Math.pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
  }

  static easeInElastic(x: number): number {
    const c4 = (2 * Math.PI) / 3;
    return x === 0
      ? 0
      : x === 1
      ? 1
      : -Math.pow(2, 10 * x - 10) * Math.sin((x * 10 - 10.75) * c4);
  }

  static easeOutElastic(x: number): number {
    const c4 = (2 * Math.PI) / 3;
    return x === 0
      ? 0
      : x === 1
      ? 1
      : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
  }

  static easeInOutElastic(x: number): number {
    const c5 = (2 * Math.PI) / 4.5;
    return x === 0
      ? 0
      : x === 1
      ? 1
      : x < 0.5
      ? -(Math.pow(2, 20 * x - 10) * Math.sin((20 * x - 11.125) * c5)) / 2
      : (Math.pow(2, -20 * x + 10) * Math.sin((20 * x - 11.125) * c5)) / 2 + 1;
  }

  static easeInBounce(x: number): number {
    return 1 - Vec3.easeOutBounce(1 - x);
  }

  static easeOutBounce(x: number): number {
    const n1 = 7.5625;
    const d1 = 2.75;
    if (x < 1 / d1) {
      return n1 * x * x;
    } else if (x < 2 / d1) {
      return n1 * (x -= 1.5 / d1) * x + 0.75;
    } else if (x < 2.5 / d1) {
      return n1 * (x -= 2.25 / d1) * x + 0.9375;
    } else {
      return n1 * (x -= 2.625 / d1) * x + 0.984375;
    }
  }

  static easeInOutBounce(x: number): number {
    return x < 0.5
      ? (1 - Vec3.easeOutBounce(1 - 2 * x)) / 2
      : (1 + Vec3.easeOutBounce(2 * x - 1)) / 2;
  }

  static fromJSON(json: any): Vec3 {
    return new Vec3(json.x, json.y, json.z);
  }

  static toJSON(vec: Vec3): object {
    return { x: vec.x, y: vec.y, z: vec.z };
  }
}
