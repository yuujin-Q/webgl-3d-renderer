import { UniformDataType } from "../../../../lib/webglutils/UniformSetter";
import { BufferAttribute } from "../geometry/BufferAttribute";

/* eslint-disable @typescript-eslint/no-explicit-any */
export class ShaderMaterial {
  static #idcounter = 0;
  protected _id: string = "M" + ShaderMaterial.#idcounter++;
  private readonly _vertexShader: string;
  private readonly _fragmentShader: string;
  private _uniforms: { [name: string]: UniformDataType };
  private _attributes: { [name: string]: BufferAttribute };

  constructor(vertexShader: string, fragmentShader: string) {
    this._vertexShader = vertexShader;
    this._fragmentShader = fragmentShader;
    this._uniforms = {};
    this._attributes = {};
  }

  // material id
  get id() {
    return this._id;
  }
  equals(material: ShaderMaterial) {
    return this._id === material.id;
  }

  get vertexShader() {
    return this._vertexShader;
  }
  get fragmentShader() {
    return this._fragmentShader;
  }
  get uniforms() {
    return this._uniforms;
  }
  get attributes() {
    return this._attributes;
  }

  set uniforms(uniforms: { [name: string]: UniformDataType }) {
    this._uniforms = uniforms;
  }
  set attributes(attributes: { [name: string]: BufferAttribute }) {
    this._attributes = attributes;
  }

  static fromJSON(json: any): ShaderMaterial {
    const material = new ShaderMaterial(json.vertexShader, json.fragmentShader);
    material._id = json.id;
    material.uniforms = json.uniforms;
    // set attributes
    for (const name in json.attributes) {
      material.attributes[name] = BufferAttribute.fromJSON(
        json.attributes[name],
        name === "a_color"
      );
    }
    // material.attributes = json.attributes;
    return material;
  }

  static toJSON(material: ShaderMaterial): object {
    const json: any = {
      id: material.id,
      vertexShader: material.vertexShader,
      fragmentShader: material.fragmentShader,
      uniforms: material.uniforms,
      attributes: {},
    };
    for (const name in material.attributes) {
      json.attributes[name] = BufferAttribute.toJSON(material.attributes[name]);
    }
    return json;
  }
}
