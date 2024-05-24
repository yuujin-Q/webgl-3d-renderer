/**
 * Color class for WebGL rendering
 * Color is coded in rgba with values between 0 and 1.
 * r: red, g: green, b: blue, a: alpha
 */

import { BufferAttribute } from "../geometry/BufferAttribute";

// reference: https://github.com/marfgold1/IF3260_Tugas3_K02_G12/blob/main/src/lib/TRI/core/Color.js

export class Color {
  /**
   * Color is coded in rgba with values between 0 and 1
   * r: red, g: green, b: blue, a: alpha
   */
  r: number;
  g: number;
  b: number;
  a: number;

  /**
   * Create new instance of color.
   */
  constructor(r: number, g: number, b: number, a?: number) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a ? a : 1;
  }

  toString() {
    return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
  }

  toArray(includeAlpha: boolean) {
    return includeAlpha ? [this.r, this.g, this.b, this.a] : [this.r, this.g, this.b];
  }

  /**
   * Color setter
   */
  set(r = 1, g = 1, b = 1, a = 1) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }

  /**
   * Color setter using hex string
   */
  setHex(hex: string, a = this.a) {
    this.r = parseInt(hex.substring(1, 3), 16) / 255;
    this.g = parseInt(hex.substring(3, 5), 16) / 255;
    this.b = parseInt(hex.substring(5, 7), 16) / 255;
    this.a = a;
  }

  copy(c: Color) {
    this.set(c.r, c.g, c.b, c.a);
    return this;
  }

  /**
   * Create new instance of color from this instance.
   */
  clone() {
    return new Color(this.r, this.g, this.b, this.a);
  }

  /**
   * Convert color to 32 bit value
   */
  to32bit() {
    return `rgba(${this.r * 255}, ${this.g * 255}, ${this.b * 255}, ${
      this.a * 255
    })`;
  }

  /**
   * Set color from buffer attribute.
   */
  fromBufferAttribute(attr: BufferAttribute, index: number) {
    return this.set(
      ...attr.get(index, attr.size),
      ...[0, 0, 0, 0].slice(attr.size)
    );
  }

  /**
   * Get red value in 8-bit integer representation
   */
  get rInt() {
    return this.r * 255;
  }

  /**
   * Get green value in 8-bit integer representation
   */
  get gInt() {
    return this.g * 255;
  }

  /**
   * Get blue value in 8-bit integer representation
   */
  get bInt() {
    return this.b * 255;
  }

  /**
   * Get alpha value in 8-bit integer representation
   */
  get aInt() {
    return this.a * 255;
  }

  /**
   * Convert RGB to Hexadecimal representation
   */
  get hex() {
    return (
      "#" +
      (this.r * 255).toString(16).padStart(2, "0") +
      (this.g * 255).toString(16).padStart(2, "0") +
      (this.b * 255).toString(16).padStart(2, "0")
    );
  }

  static red() {
    return new Color(1, 0, 0, 1);
  }

  static green() {
    return new Color(0, 1, 0, 1);
  }

  static blue() {
    return new Color(0, 0, 1, 1);
  }

  static white() {
    return new Color(1, 1, 1, 1);
  }

  static black() {
    return new Color(0, 0, 0, 1);
  }

  toJSON() {
    return [...this];
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromJSON(obj: any) {
    return new Color(obj.r, obj.g, obj.b, obj.a);
  }

  *[Symbol.iterator]() {
    yield this.r;
    yield this.g;
    yield this.b;
    yield this.a;
  }
}
