export class MouseInput {
  static initPhi = 0;
  static initTheta = 0;
  static deltaPhi = 0;
  static deltaTheta = 0;

  static initAngles(phi: number, theta: number) {
    this.initPhi = phi;
    this.initTheta = theta;
  }
  
  static onMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
      this.deltaPhi = e.clientX - this.initPhi;
      this.deltaTheta = e.clientY - this.initTheta;
      console.log(this.deltaPhi, this.deltaTheta);
  }
}