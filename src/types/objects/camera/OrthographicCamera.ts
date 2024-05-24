/* eslint-disable @typescript-eslint/no-explicit-any */
import { Camera } from "./Camera";
import { M4 } from "../../math/M4";

export class OrthographicCamera extends Camera {
  top: number;
  bottom: number;
  left: number;
  right: number;
  near: number;
  far: number;

  constructor(
    left: number,
    right: number,
    bottom: number,
    top: number,
    near: number,
    far: number
  ) {
    super(); // Setup Node
    this.left = left;
    this.right = right;
    this.top = top;
    this.bottom = bottom;
    this.near = near;
    this.far = far;
    // Jangan lupa untuk panggil computeProjectionMatrix() setiap
    // kali mengubah nilai left, right, top, bottom, near, atau far.
    this.computeProjectionMatrix();
  }

  override computeProjectionMatrix() {
    // M4.orthographic() menghasilkan proyeksi matriks ortografik
    // dengan 6 tupel left, right, bottom, top, near, dan far.
    this._projectionMatrix = M4.orthographic(
      this.left * this._zoom,
      this.right * this._zoom,
      this.bottom * this._zoom,
      this.top * this._zoom,
      this.near,
      this.far
    );
  }

  override toJSON() {
    return {
      ...super.toJSON(),
      left: this.left,
      right: this.right,
      bottom: this.bottom,
      top: this.top,
      near: this.near,
      far: this.far,
    };
  }

  static fromJSON(json: any): OrthographicCamera {
    const camera = new OrthographicCamera(
      json.left,
      json.right,
      json.bottom,
      json.top,
      json.near,
      json.far
    );
    const c = Camera.fromJSON(json);
    // assign all properties from c to camera
    Object.assign(camera, c);
    return camera;
  }
}
