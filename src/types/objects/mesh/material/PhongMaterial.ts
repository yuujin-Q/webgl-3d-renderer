import { phongFragmentShader, phongVertexShader } from "./DefaultShaders";
import { ShaderMaterial } from "./ShaderMaterial";

export class PhongMaterial extends ShaderMaterial {
  get id() {
    return "PhongMaterial";
  }

  constructor() {
    super(phongVertexShader, phongFragmentShader);
  }
}
