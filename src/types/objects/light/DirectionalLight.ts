import { Vec3 } from "../../math/Vec3";
import { ObjectNode } from "../ObjectNode";
import { Light } from "./Light";

export class DirectionalLight extends Light {
  public target?: ObjectNode;
  private _direction: Vec3 = new Vec3();

  constructor() {
    super();
  }


  get getDirection(){
    return this._direction;
  }
  setDirection(direction: Vec3){
    this._direction = direction;
  }

  get direction() {
    // direction = target.pos -  this.pos (in world space)
    if (this.target) {
      const direction = this.target.worldMatrix
        .translation()
        .sub(this.worldMatrix.translation())
        .normalize();
      this._direction = direction;
    } else {
      // Asumsi target = (0,0,0), direction = -this.pos
      const direction = this.worldMatrix.translation().mul(-1).normalize();
      this._direction = direction;
    }
    return this._direction.toArray();
  }

  get uniforms() {
    return {
      ...super.uniforms,
      u_lightDirection: this.direction,
      u_lightIsDirectional: [1], // menandakan directional light di shader
    };
  }
}
