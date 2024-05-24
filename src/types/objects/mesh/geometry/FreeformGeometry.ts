import { BufferAttribute } from "./BufferAttribute";
import { BufferGeometry } from "./BufferGeometry";

export class FreeformGeometry extends BufferGeometry {
  constructor(v?: BufferAttribute) {
    super();
    if (v) this.setVertexPosition(v);
  }

  setVertexPosition(v: BufferAttribute) {
    this.setAttribute("a_position", v);
    this.calculateNormals();
  }
}
