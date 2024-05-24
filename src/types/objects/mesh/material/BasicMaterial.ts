import { basicFragmentShader, basicVertexShader } from "./DefaultShaders";
import { ShaderMaterial } from "./ShaderMaterial";

export class BasicMaterial extends ShaderMaterial {
  constructor() {
    super(basicVertexShader, basicFragmentShader);
    this._id = "BasicMaterial";
  }
}
