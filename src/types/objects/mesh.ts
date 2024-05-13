import { ObjectNode } from "./objectnode";
import { BufferGeometry } from "./buffergeometry";
import { ShaderMaterial } from "./shadermaterial";

export class Mesh extends ObjectNode {
    geometry: BufferGeometry
    material: ShaderMaterial
    
    constructor(geometry: BufferGeometry, material: ShaderMaterial) {
        super();
        this.geometry = geometry;
        this.material = material;
    }
}
