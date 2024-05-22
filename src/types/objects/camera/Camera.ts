/* eslint-disable @typescript-eslint/no-explicit-any */
import { ObjectNode } from "../ObjectNode";
import { M4 } from "../../math/M4";
import { Vec3 } from "../../math/Vec3";
import { Renderer } from "../../../lib/renderer/Renderer";

export class Camera extends ObjectNode {
  protected _projectionMatrix = M4.identity();
  protected _zoom = 1;
  private maxZoom = 6; // zoom out
  private minZoom = 0.1; // zoom in 
  private _invWorldMatrix = M4.identity();

  constructor() {
    super();
    this.name = "Camera";
  }

  override computeWorldMatrix() {
    super.computeWorldMatrix();
    this._invWorldMatrix = M4.inv(this.worldMatrix);
  }

  get viewProjectionMatrix() {
    this.computeWorldMatrix();
    return M4.multiply(this._projectionMatrix, this._invWorldMatrix);
  }

  get projectionMatrix() {
    return this._projectionMatrix;
  }

  computeProjectionMatrix() {
    throw new Error(
      "Camera.computeProjectionMatrix() must be implemented in derived classes."
    );
  }

  // camera movement
  public move(deltaPhi: number, deltaTheta: number, sensitivity: number) {
    const radius = this.position.length();
    const x = radius * Math.sin(deltaPhi) * Math.cos(deltaTheta);
    const y = radius * Math.cos(deltaPhi);
    const z = radius * Math.sin(deltaPhi) * Math.sin(deltaTheta);
    this.position = new Vec3(x, y, z);

    // increase rotation camera with deltaPhi and deltaTheta
    // todo: change rotation to match lookAt implementation?
    this.rotation.x -= deltaTheta * sensitivity;
    this.rotation.y -= deltaPhi * sensitivity;

    // Render the scene
    this.computeWorldMatrix();
    Renderer.renderScene();
  }

  public zoom(delta: number, sensitivity: number) {
    this._zoom += delta * sensitivity;
    if (this._zoom <= this.minZoom) {
      this._zoom = this.minZoom;
    } else if (this._zoom >= this.maxZoom) {
      this._zoom = this.maxZoom;
    }
    // console.log(this._zoom);
    this.computeProjectionMatrix();
    Renderer.renderScene();
  }

  static toJSON(camera: Camera): object {
    return {
      ...ObjectNode.toJSON(camera),
      projectionMatrix: camera._projectionMatrix,
      invWorldMatrix: camera._invWorldMatrix,
    };
  }

  static fromJSON(json: any): Camera {
    const node = ObjectNode.fromJSON(json);
    let camera = new Camera();
    camera._projectionMatrix = json.projectionMatrix;
    camera._invWorldMatrix = json.invWorldMatrix;
    camera = Object.assign(camera, node);
    return camera;
  }
}
