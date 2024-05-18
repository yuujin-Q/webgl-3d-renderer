import { ObjectNode } from "../types/objects/ObjectNode";
import { Renderer } from "./Renderer";

export class MouseInput {
  private static initPhi = 0;
  private static initTheta = 0;
  private static deltaPhi = 0;
  private static deltaTheta = 0;
  private static prevDeltaPhi = 0;
  private static prevDeltaTheta = 0;
  static sensitivity = 0.0001;
  static camera: ObjectNode;

  static initAngles(e: React.MouseEvent<HTMLCanvasElement>) {
    this.initPhi = e.clientX;
    this.initTheta = e.clientY;
  }

  static onMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    this.prevDeltaPhi = this.deltaPhi;
    this.prevDeltaTheta = this.deltaTheta;
    this.deltaPhi = e.clientX - this.initPhi;
    this.deltaTheta = e.clientY - this.initTheta;

    const isIncreasePhi = this.deltaPhi > this.prevDeltaPhi;
    const isIncreaseTheta = this.deltaTheta > this.prevDeltaTheta;

    const x =
      this.camera.position.x *
      Math.sin(this.deltaPhi) *
      Math.cos(this.deltaTheta);
    const y = this.camera.position.y * Math.cos(this.deltaPhi);
    const z =
      this.camera.position.z *
      Math.sin(this.deltaPhi) *
      Math.sin(this.deltaTheta);
    this.camera.position = { x, y, z };

    // increase rotation camera with deltaPhi and deltaTheta
    this.camera.rotation.x -=
      Math.abs(this.deltaTheta * this.sensitivity) * (isIncreaseTheta ? 1 : -1);
    this.camera.rotation.y -=
      Math.abs(this.deltaPhi * this.sensitivity) * (isIncreasePhi ? 1 : -1);

    // Render the scene
    this.camera.computeWorldMatrix();
    Renderer.renderScene();
  };
}
