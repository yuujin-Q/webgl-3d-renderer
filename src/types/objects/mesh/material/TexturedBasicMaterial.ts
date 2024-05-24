import { basicTexFragmentShader, basicTexVertexShader } from "./DefaultShaders";
import { ShaderMaterial } from "./ShaderMaterial";

export class TexturedBasicMaterial extends ShaderMaterial {
  constructor() {
    super(basicTexVertexShader, basicTexFragmentShader);
    this._id = "TexturedBasicMaterial";
  }
}
