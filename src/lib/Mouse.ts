import { Vec3 } from "../types/math/Vec3";
import { ObjectNode } from "../types/objects/ObjectNode";
import { Renderer } from "./Renderer";

export class MouseInput {
  private static deltaPhi = 0;
  private static deltaTheta = 0;
  private static prevDeltaPhi = 0;
  private static prevDeltaTheta = 0;
  static sensitivity = 0.01;
  static camera: ObjectNode;

  static initAngles(e: React.MouseEvent<HTMLCanvasElement>) {
    this.prevDeltaPhi = e.clientX;
    this.prevDeltaTheta = e.clientY;
  }

  static onMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    this.deltaPhi = e.clientX - this.prevDeltaPhi;
    this.deltaTheta = e.clientY - this.prevDeltaTheta;

    const radius = this.camera.position.length();
    const x = radius * Math.sin(this.deltaPhi) * Math.cos(this.deltaTheta);
    const y = radius * Math.cos(this.deltaPhi);
    const z = radius * Math.sin(this.deltaPhi) * Math.sin(this.deltaTheta);
    this.camera.position = new Vec3(x, y, z);

    // increase rotation camera with deltaPhi and deltaTheta
    // todo: change rotation to match lookAt implementation?
    this.camera.rotation.x -= this.deltaTheta * this.sensitivity;
    this.camera.rotation.y -= this.deltaPhi * this.sensitivity;

    // Render the scene
    this.camera.computeWorldMatrix();
    Renderer.renderScene();

    this.prevDeltaPhi = e.clientX;
    this.prevDeltaTheta = e.clientY;
  };
}
