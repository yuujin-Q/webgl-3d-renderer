import { Color } from "../../Color";
import { phongFragmentShader, phongVertexShader } from "./DefaultShaders";
import { brickPreset } from "./DefaultTexture";
import { ShaderMaterial } from "./ShaderMaterial";
import { Texture } from "./Texture";

type PhongMaterialOptions = {
  ambientColor?: Color;
  diffuseMap: Texture;
  diffuseColor?: Color;
  specularMap?: Texture;
  specularColor?: Color;
  shininess?: number;
  normalMap?: Texture;
  useNormalMap?: boolean;
  displacementMap?: Texture;
};

export class PhongMaterial extends ShaderMaterial {
  private ambientColor: Color;
  private normalMap: Texture;
  private useNormalMap: boolean;
  private diffuseMap: Texture;
  private diffuseColor: Color;
  private specularMap: Texture;
  private specularColor: Color;
  private shininess: number;
  private displacementMap: Texture;

  constructor(options?: PhongMaterialOptions) {
    super(phongVertexShader, phongFragmentShader);
    this.ambientColor = options?.ambientColor || Color.white();
    this.diffuseColor = options?.diffuseColor || Color.white();
    this.specularColor = options?.specularColor || Color.white();
    this.diffuseMap = options?.diffuseMap || brickPreset.u_diffuseMap;
    this.specularMap = options?.specularMap || brickPreset.u_specularMap!;
    this.normalMap = options?.normalMap || brickPreset.u_normalMap!;
    this.useNormalMap = options?.useNormalMap || false;
    this.displacementMap =
      options?.displacementMap || brickPreset.u_displacementMap!;
    this.shininess = options?.shininess || 32;

    this.uniforms["u_ambient"] = this.ambientColor.toArray(false);
    this.uniforms["u_diffuseMap"] = this.diffuseMap;
    this.uniforms["u_diffuseColor"] = this.diffuseColor.toArray(true);
    this.uniforms["u_specularMap"] = this.specularMap;
    this.uniforms["u_specularColor"] = this.specularColor.toArray(true);
    this.uniforms["u_shininess"] = [this.shininess];
    this.uniforms["u_normalMap"] = this.normalMap;
    this.uniforms["u_displacementMap"] = this.displacementMap;
    this.uniforms["u_useNormalMap"] = [+this.useNormalMap];

    this._id = "PhongMaterial";
  }

  useTexture(val: boolean, key?: string) {
    if (key) {
      this.uniforms[key] = [val ? 1 : 0];
    } else {
      this.uniforms["u_useTexture"] = [val ? 1 : 0];
    }
  }
  setTexture(t: Texture, key?: string) {
    if (key) {
      this.uniforms[key] = t;
    } else {
      this.uniforms["u_texture"] = t;
    }
    this.useTexture(true);
  }
}
