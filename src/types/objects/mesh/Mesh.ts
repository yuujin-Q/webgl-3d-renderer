import { ObjectNode } from "../ObjectNode";
import { BufferGeometry } from "./geometry/BufferGeometry";
import { ShaderMaterial } from "./material/ShaderMaterial";

export class Mesh extends ObjectNode {
  geometry: BufferGeometry;
  material: ShaderMaterial;

  constructor(geometry: BufferGeometry, material: ShaderMaterial) {
    super();
    this.geometry = geometry;
    this.material = material;
  }
}
