/* eslint-disable @typescript-eslint/no-explicit-any */
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

  static fromJSON(json: any): Mesh {
    return new Mesh(BufferGeometry.fromJSON(json.geometry), ShaderMaterial.fromJSON(json.material));
  }

  static toJSON(mesh: Mesh): object {
    return {
      geometry: BufferGeometry.toJSON(mesh.geometry),
      material: ShaderMaterial.toJSON(mesh.material),
    };
  }

}
