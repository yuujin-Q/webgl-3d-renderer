import { Camera } from "./Camera";
import { M4 } from "../../math/M4";
import { Vec3 } from "../../math/Vec3";

export class ObliqueCamera extends Camera {
  left: number;
  right: number;
  bottom: number;
  top: number;
  near: number;
  far: number;
  skew: Vec3;

  constructor(
    left: number,
    right: number,
    bottom: number,
    top: number,
    near: number,
    far: number,
    skew: Vec3
  ) {
    super();
    this.left = left;
    this.right = right;
    this.bottom = bottom;
    this.top = top;
    this.near = near;
    this.far = far;
    this.skew = skew;
    this.computeProjectionMatrix();
  }

  override computeProjectionMatrix() {
    this._projectionMatrix = M4.oblique(
      this.left * this._zoom,
      this.right * this._zoom,
      this.bottom * this._zoom,
      this.top * this._zoom,
      this.near,
      this.far,
      this.skew
    );
  }
}
