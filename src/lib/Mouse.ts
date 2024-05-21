import { Camera } from "../types/objects/camera/Camera";

export class MouseInput {
  private static deltaX = 0;
  private static deltaY = 0;
  private static prevDeltaX = 0;
  private static prevDeltaY = 0;
  static sensitivity = 0.01;
  static camera: Camera;

  static initAngles(e: React.MouseEvent<HTMLCanvasElement>) {
    this.prevDeltaX = e.clientX;
    this.prevDeltaY = e.clientY;
  }

  static onMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    // deltaX is deltaPhi, deltaY is deltaTheta
    this.deltaX = e.clientX - this.prevDeltaX;
    this.deltaY = e.clientY - this.prevDeltaY;

    this.camera.move(this.deltaX, this.deltaY, this.sensitivity);

    this.prevDeltaX = e.clientX;
    this.prevDeltaY = e.clientY;
  };
}
