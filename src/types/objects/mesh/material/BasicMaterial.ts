import { UniformDataType } from "../../../../lib/webglutils/UniformSetter";
import { BufferAttribute } from "../geometry/BufferAttribute";
import { Color } from "../../Color";
import { basicFragmentShader, basicVertexShader } from "./DefaultShaders";
import { ShaderMaterial } from "./ShaderMaterial";
import { Texture } from "./Texture";
import { AttributeDataType } from "../../../../lib/webglutils/AttributeSetter";

export class BasicMaterial extends ShaderMaterial {
  constructor() {
    super(basicVertexShader, basicFragmentShader);
    this._id = "BasicMaterial";
    this.uniforms["u_useTexture"] = [0];
    this.uniforms["u_ambient"] = [1, 1, 1];
  }

  get vertexColor(): AttributeDataType {
    return this.attributes["a_color"];
  }
  set vertexColor(v: AttributeDataType) {
    this.attributes["a_color"] = v;
  }

  get ambient(): UniformDataType {
    return this.uniforms["u_ambient"];
  }
  set ambient(c: Color) {
    this.uniforms["u_ambient"] = c.toArray(false);
  }

  useTexture(val: boolean) {
    this.uniforms["u_useTexture"] = [val ? 1 : 0];
  }
  setTexture(t: Texture, coords: BufferAttribute) {
    this.uniforms["u_texture"] = t;
    this.attributes["a_texcoord"] = coords;
    this.useTexture(true);
  }
}
