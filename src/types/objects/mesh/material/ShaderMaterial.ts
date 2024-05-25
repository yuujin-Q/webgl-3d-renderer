import { AttributeDataType } from "../../../../lib/webglutils/AttributeSetter";
import { UniformDataType } from "../../../../lib/webglutils/UniformSetter";
import { Color } from "../../Color";
import { BufferAttribute } from "../geometry/BufferAttribute";
import { Texture } from "./Texture";

/* eslint-disable @typescript-eslint/no-explicit-any */
export class ShaderMaterial {
  static #idcounter = 0;
  protected _id: string = "M" + ShaderMaterial.#idcounter++;
  private readonly _vertexShader: string;
  private readonly _fragmentShader: string;
  private _uniforms: { [name: string]: UniformDataType };
  private _attributes: { [name: string]: AttributeDataType };

  // vertex color
  private _defaultColor: Color = new Color(1, 0, 0);
  private _useDefaultColor: boolean = false;

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

  get defaultColor() {
    return this._defaultColor;
  }
  set defaultColor(c: Color) {
    this._defaultColor = c;
  }
  enableDefaultColor(val: boolean) {
    this._useDefaultColor = val;
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
    if (this._useDefaultColor) {
      const attr = { ...this._attributes };
      attr["a_color"] = new Uint8Array([
        this._defaultColor.rInt,
        this._defaultColor.gInt,
        this._defaultColor.bInt,
      ]);
      console.log("attr", attr);
      return attr;
    } else {
      return this._attributes;
    }
  }

  set uniforms(uniforms: { [name: string]: UniformDataType }) {
    this._uniforms = uniforms;
  }
  set attributes(attributes: { [name: string]: AttributeDataType }) {
    this._attributes = attributes;
  }

  static fromJSON(json: any): ShaderMaterial {
    const material = new ShaderMaterial(json.vertexShader, json.fragmentShader);
    material._id = json.id;
    // set uniforms
    for (const name in json.uniforms) {
      if (name === "u_texture" && json.uniforms[name]) {
        material.uniforms[name] = Texture.fromJSON(json.uniforms[name]);
      } else {
        material.uniforms[name] = json.uniforms[name];
      }
    }
    // set attributes
    for (const name in json.attributes) {
      material.attributes[name] = BufferAttribute.fromJSON(json.attributes[name]);
    }
    return material;
  }

  static toJSON(material: ShaderMaterial): object {
    const json: any = {
      id: material.id,
      vertexShader: material.vertexShader,
      fragmentShader: material.fragmentShader,
      uniforms: {},
      attributes: {},
    };
    for (const name in material.uniforms) {
      if (name === "u_texture" && material.uniforms[name]) {
        json.uniforms[name] = Texture.toJSON(material.uniforms[name] as Texture);
      } else {
        json.uniforms[name] = material.uniforms[name];
      }
    }
    for (const name in material.attributes) {
      if (material.attributes[name] instanceof BufferAttribute) {
        json.attributes[name] = BufferAttribute.toJSON(
          material.attributes[name]
        );
      } else {
        json.attributes[name] = material.attributes[name];
      }
    }
    return json;
  }
}
