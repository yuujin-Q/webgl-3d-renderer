import { basicFragmentShader, basicVertexShader } from "./DefaultShaders";
import { ShaderMaterial } from "./ShaderMaterial";

export class BasicMaterial extends ShaderMaterial {
  // todo: add ambient color shading
  get id() {
    return "BasicMaterial";
  }

  constructor() {
    super(basicVertexShader, basicFragmentShader);
  }
}
