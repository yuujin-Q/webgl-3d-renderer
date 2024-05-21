import { ObjectNode } from "../ObjectNode";
import { M4 } from "../../math/M4";
import { Vec3 } from "../../math/Vec3";
import { Renderer } from "../../../lib/renderer/Renderer";

export class Camera extends ObjectNode {
  protected _projectionMatrix = M4.identity();
  private _invWorldMatrix = M4.identity();

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
}
