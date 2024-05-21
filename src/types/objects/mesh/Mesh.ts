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
    // Call fromJSON from objectNode
    const node =  ObjectNode.fromJSON(json);
    let mesh = new Mesh(
      BufferGeometry.fromJSON(json.geometry),
      ShaderMaterial.fromJSON(json.material)
    );
    // assign node properties to mesh
    mesh = Object.assign(mesh, node);
    return mesh;
  }

  static toJSON(mesh: Mesh): object {
    return {
      // Call toJSON from objectNode
      ...ObjectNode.toJSON(mesh),
      geometry: BufferGeometry.toJSON(mesh.geometry),
      material: ShaderMaterial.toJSON(mesh.material),
    };
  }

}
