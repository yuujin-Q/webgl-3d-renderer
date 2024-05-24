import { UniformDataType } from "../../../lib/webglutils/UniformSetter";
import { Color } from "../Color";
import { ObjectNode } from "../ObjectNode";

type UniformSet<T = UniformDataType> = { [key: string]: T };
type LightOptions = {
  color?: Color;
  uniforms?: UniformSet;
};
export class Light extends ObjectNode {
  private _uniforms: UniformSet = {};
  private _color: Color = Color.white(); // La

  constructor(options?: LightOptions) {
    super();
    const { color, uniforms } = options || {};
    this._uniforms = uniforms || this._uniforms;
    this._uniforms["lightColor"] = color || this._color; // La
  }

  get color() {
    return this._color;
  }
  get uniforms() {
    return this._uniforms;
  }
}
