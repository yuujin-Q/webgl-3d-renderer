import { Camera } from "./Camera";
import { M4 } from "../../math/M4";

export class PerspectiveCamera extends Camera {
  fov: number;
  aspect: number;
  near: number;
  far: number;

  constructor(fov: number, aspect: number, near: number, far: number) {
    super();
    this.fov = fov;
    this.aspect = aspect;
    this.near = near;
    this.far = far;
    this.computeProjectionMatrix();
  }

  override computeProjectionMatrix() {
    this._projectionMatrix = M4.perspective(
      this.fov,
      this.aspect,
      this.near,
      this.far
    );
  }
}
