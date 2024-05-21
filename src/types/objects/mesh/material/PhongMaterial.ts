import { phongFragmentShader, phongVertexShader } from "./DefaultShaders";
import { ShaderMaterial } from "./ShaderMaterial";

export class PhongMaterial extends ShaderMaterial {
  constructor() {
    super(phongVertexShader, phongFragmentShader);
    this._id = "PhongMaterial";
  }
}
