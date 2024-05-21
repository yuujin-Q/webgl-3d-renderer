import { basicFragmentShader, basicVertexShader } from "./DefaultShaders";
import { ShaderMaterial } from "./ShaderMaterial";

export class BasicMaterial extends ShaderMaterial {
  // todo: add ambient color shading
  constructor() {
    super(basicVertexShader, basicFragmentShader);
    this._id = "BasicMaterial";
  }
}
