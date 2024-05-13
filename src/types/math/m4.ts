import { Vec3 } from "./Vec3";

// TODO: check for calculation
export class M4 {
  clone(): M4 {
    return new M4(Array.from(this.elements));
  }
  elements: number[];

  constructor(elements: number[]) {
    if (elements.length != 4 * 4) {
      console.error("Element count received is not length 16");
      this.elements = M4.identity().elements;
      return;
    }
    this.elements = elements;
  }

  static identity(): M4 {
    const elements = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    return new M4(elements);
  }

  // implementation reference: https://webglfundamentals.org/webgl/lessons/webgl-3d-orthographic.html
  static projection(width: number, height: number, depth: number): M4 {
    // Note: This matrix flips the Y axis so 0 is at the top.
    return new M4([
      2 / width,
      0,
      0,
      0,
      0,
      -2 / height,
      0,
      0,
      0,
      0,
      2 / depth,
      0,
      -1,
      1,
      0,
      1,
    ]);
  }

  static multiply(a: M4, b: M4, ...others: M4[]): M4 {
    const multiplyM4 = (a: M4, b: M4) => {
      const a00 = a.elements[0 * 4 + 0];
      const a01 = a.elements[0 * 4 + 1];
      const a02 = a.elements[0 * 4 + 2];
      const a03 = a.elements[0 * 4 + 3];
      const a10 = a.elements[1 * 4 + 0];
      const a11 = a.elements[1 * 4 + 1];
      const a12 = a.elements[1 * 4 + 2];
      const a13 = a.elements[1 * 4 + 3];
      const a20 = a.elements[2 * 4 + 0];
      const a21 = a.elements[2 * 4 + 1];
      const a22 = a.elements[2 * 4 + 2];
      const a23 = a.elements[2 * 4 + 3];
      const a30 = a.elements[3 * 4 + 0];
      const a31 = a.elements[3 * 4 + 1];
      const a32 = a.elements[3 * 4 + 2];
      const a33 = a.elements[3 * 4 + 3];
      const b00 = b.elements[0 * 4 + 0];
      const b01 = b.elements[0 * 4 + 1];
      const b02 = b.elements[0 * 4 + 2];
      const b03 = b.elements[0 * 4 + 3];
      const b10 = b.elements[1 * 4 + 0];
      const b11 = b.elements[1 * 4 + 1];
      const b12 = b.elements[1 * 4 + 2];
      const b13 = b.elements[1 * 4 + 3];
      const b20 = b.elements[2 * 4 + 0];
      const b21 = b.elements[2 * 4 + 1];
      const b22 = b.elements[2 * 4 + 2];
      const b23 = b.elements[2 * 4 + 3];
      const b30 = b.elements[3 * 4 + 0];
      const b31 = b.elements[3 * 4 + 1];
      const b32 = b.elements[3 * 4 + 2];
      const b33 = b.elements[3 * 4 + 3];
      return new M4([
        b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30,
        b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31,
        b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32,
        b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33,
        b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30,
        b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31,
        b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32,
        b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33,
        b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30,
        b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31,
        b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32,
        b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33,
        b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30,
        b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31,
        b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32,
        b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33,
      ]);
    };
    if (others.length == 0) {
      return multiplyM4(a, b);
    } else {
      let result = multiplyM4(a, b);
      for (const x of others) {
        result = multiplyM4(result, x);
      }
      return result;
    }
  }

  static translation(t: Vec3): M4 {
    return new M4([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, t.x, t.y, t.z, 1]);
  }

  static xRotation(angleInRadians: number): M4 {
    const c = Math.cos(angleInRadians);
    const s = Math.sin(angleInRadians);

    return new M4([1, 0, 0, 0, 0, c, s, 0, 0, -s, c, 0, 0, 0, 0, 1]);
  }

  static yRotation(angleInRadians: number): M4 {
    const c = Math.cos(angleInRadians);
    const s = Math.sin(angleInRadians);

    return new M4([c, 0, -s, 0, 0, 1, 0, 0, s, 0, c, 0, 0, 0, 0, 1]);
  }

  static zRotation(angleInRadians: number): M4 {
    const c = Math.cos(angleInRadians);
    const s = Math.sin(angleInRadians);

    return new M4([c, s, 0, 0, -s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
  }

  static rotation(r: Vec3): M4 {
    let result = M4.identity();
    if (r.x != 0) {
      result = this.multiply(result, this.xRotation(r.x));
    }
    if (r.y != 0) {
      result = this.multiply(result, this.yRotation(r.y));
    }
    if (r.z != 0) {
      result = this.multiply(result, this.zRotation(r.z));
    }

    return result;
  }

  static scaling(s: Vec3): M4 {
    return new M4([s.x, 0, 0, 0, 0, s.y, 0, 0, 0, 0, s.z, 0, 0, 0, 0, 1]);
  }

  static translate(m: M4, t: Vec3): M4 {
    return M4.multiply(m, M4.translation(t));
  }

  static xRotate(m: M4, angleInRadians: number): M4 {
    return M4.multiply(m, M4.xRotation(angleInRadians));
  }

  static yRotate(m: M4, angleInRadians: number): M4 {
    return M4.multiply(m, M4.yRotation(angleInRadians));
  }

  static zRotate(m: M4, angleInRadians: number): M4 {
    return M4.multiply(m, M4.zRotation(angleInRadians));
  }
  
  static scale(m: M4, s: Vec3): M4 {
    return M4.multiply(m, M4.scaling(s));
  }

  // inverse of matrix
  static inv(m: M4): M4 {
    const det = m.elements[0] * (m.elements[5] * m.elements[10] - m.elements[6] * m.elements[9]) -
      m.elements[1] * (m.elements[4] * m.elements[10] - m.elements[6] * m.elements[8]) +
      m.elements[2] * (m.elements[4] * m.elements[9] - m.elements[5] * m.elements[8]);
    const invDet = 1 / det;
    const result = new M4([
      (m.elements[5] * m.elements[10] - m.elements[6] * m.elements[9]) * invDet,
      -(m.elements[1] * m.elements[10] - m.elements[2] * m.elements[9]) * invDet,
      (m.elements[1] * m.elements[6] - m.elements[2] * m.elements[5]) * invDet,
      0,
      -(m.elements[4] * m.elements[10] - m.elements[6] * m.elements[8]) * invDet,
      (m.elements[0] * m.elements[10] - m.elements[2] * m.elements[8]) * invDet,
      -(m.elements[0] * m.elements[6] - m.elements[2] * m.elements[4]) * invDet,
      0,
      (m.elements[4] * m.elements[9] - m.elements[5] * m.elements[8]) * invDet,
      -(m.elements[0] * m.elements[9] - m.elements[1] * m.elements[8]) * invDet,
      (m.elements[0] * m.elements[5] - m.elements[1] * m.elements[4]) * invDet,
      0,
      0, 0, 0, 1
    ]);
    return result;
  }

  // camera matrix
  // orthographic projection matrix
  static orthographic(left: number, right: number, bottom: number, top: number, near: number, far: number): M4 {
    const lr = 1 / (left - right);
    const bt = 1 / (bottom - top);
    const nf = 1 / (near - far);
    return new M4([
      -2 * lr, 0, 0, 0,
      0, -2 * bt, 0, 0,
      0, 0, 2 * nf, 0,
      (left + right) * lr, (top + bottom) * bt, (far + near) * nf, 1,
    ]);
  }

  // oblique projection matrix

}
