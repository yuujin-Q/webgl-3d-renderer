import { ObjectNode } from "../types/objects/ObjectNode";
import { Renderer } from "./Renderer";

export class MouseInput {
  static initPhi = 0;
  static initTheta = 0;
  static deltaPhi = 0;
  static deltaTheta = 0;
  static befPhi = 0;
  static befTheta = 0;
  static camera: ObjectNode;

  static initAngles(e: React.MouseEvent<HTMLCanvasElement>) {
    this.initPhi = e.clientX;
    this.initTheta = e.clientY;
  }
  
  static onMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    this.befPhi = this.deltaPhi;
    this.befTheta = this.deltaTheta;
    this.deltaPhi = e.clientX - this.initPhi;
    this.deltaTheta = e.clientY - this.initTheta;

    const isIncreasePhi = this.deltaPhi > this.befPhi;
    const isIncreaseTheta = this.deltaTheta > this.befTheta;
    
    const x = this.camera.position.x * Math.sin(this.deltaPhi) * Math.cos(this.deltaTheta);
    const y = this.camera.position.y * Math.cos(this.deltaPhi);
    const z = this.camera.position.z * Math.sin(this.deltaPhi) * Math.sin(this.deltaTheta);
    this.camera.position = { x, y, z };

    // const xRot = Math.atan2(z, y) / 100;
    // const yRot = Math.atan2(x, z) / 100;
    // const zRot = Math.atan2(y, x) / 100;
    // this.camera.rotation = { x: xRot, y: yRot, z: zRot };

    // increase rotation camera with deltaPhi and deltaTheta
    const sensitivity = 0.0001;
    this.camera.rotation.x -= Math.abs(this.deltaTheta * sensitivity) * (isIncreaseTheta ? 1 : -1)
    this.camera.rotation.y -= Math.abs(this.deltaPhi * sensitivity) * (isIncreasePhi ? 1 : -1)
    // this.camera.rotation.z
    
    this.camera.computeWorldMatrix();
    // Render the scene
    Renderer.renderScene();
    // console.log("camera.rotation: ", this.camera.rotation);
    // console.log(this.deltaPhi, this.deltaTheta);\
  }
}