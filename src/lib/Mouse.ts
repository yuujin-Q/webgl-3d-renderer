import { ObjectNode } from "../types/objects/ObjectNode";
import { Renderer } from "./Renderer";

export class MouseInput {
  static initPhi = 0;
  static initTheta = 0;
  static deltaPhi = 0;
  static deltaTheta = 0;
  static camera: ObjectNode;

  static initAngles(phi: number, theta: number) {
    this.initPhi = phi;
    this.initTheta = theta;
  }
  
  static onMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
      this.deltaPhi = e.clientX - this.initPhi;
      this.deltaTheta = e.clientY - this.initTheta;
      const x = this.camera.position.x * Math.sin(this.deltaPhi) * Math.cos(this.deltaTheta);
      const y = this.camera.position.y * Math.cos(this.deltaPhi);
      const z = this.camera.position.z * Math.sin(this.deltaPhi) * Math.sin(this.deltaTheta);
      this.camera.position = { x, y, z };

      // const xRot = Math.atan2(z, y) / 100;
      // const yRot = Math.atan2(x, z) / 100;
      // const zRot = Math.atan2(y, x) / 100;
      // this.camera.rotation = { x: xRot, y: yRot, z: zRot };

      // increase rotation camera with deltaPhi and deltaTheta
      this.camera.rotation.x -= (this.deltaTheta * 0.001);
      this.camera.rotation.y -= (this.deltaPhi * 0.001);
      this.camera.rotation.z += 0;
      
      this.camera.computeWorldMatrix();
      // Render the scene
      Renderer.renderScene();
      console.log("camera.rotation: ", this.camera.rotation);
      console.log(this.deltaPhi, this.deltaTheta);
  }
}