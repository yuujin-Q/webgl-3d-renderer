import { Color } from "../../types/objects/Color";
import { BufferAttribute } from "../../types/objects/mesh/geometry/BufferAttribute";
import { FreeformGeometry } from "../../types/objects/mesh/geometry/FreeformGeometry";
import { PhongMaterial } from "../../types/objects/mesh/material/PhongMaterial";
import { Mesh } from "../../types/objects/mesh/Mesh";

export class CinderBlock extends Mesh {
  constructor(offset?: number) {
    if (!offset) {
      offset = 0.2;
    }
    if (offset <= 0 || offset >= 1) {
      offset = 0.2;
    }
    const normalizedVertices: number[] = [
      // front
      2,
      0,
      1,
      2,
      2,
      1,
      -2,
      2,
      1,
      -2,
      0,
      1,
      2,
      0,
      1,
      -2,
      2,
      1,
      // back
      2,
      2,
      -1,
      2,
      0,
      -1,
      -2,
      2,
      -1,
      2,
      0,
      -1,
      -2,
      0,
      -1,
      -2,
      2,
      -1,
      // inner front
      2,
      0,
      -(1 - offset),
      2,
      2,
      -(1 - offset),
      -2,
      2,
      -(1 - offset),
      -2,
      0,
      -(1 - offset),
      2,
      0,
      -(1 - offset),
      -2,
      2,
      -(1 - offset),
      // inner back
      2,
      2,
      1 - offset,
      2,
      0,
      1 - offset,
      -2,
      2,
      1 - offset,
      2,
      0,
      1 - offset,
      -2,
      0,
      1 - offset,
      -2,
      2,
      1 - offset,
      // left
      -2,
      0,
      -1,
      -2,
      0,
      1,
      -2,
      2,
      1,
      -2,
      0,
      -1,
      -2,
      2,
      1,
      -2,
      2,
      -1,
      // inner left
      -(2 - offset),
      0,
      1,
      -(2 - offset),
      0,
      -1,
      -(2 - offset),
      2,
      1,
      -(2 - offset),
      2,
      1,
      -(2 - offset),
      0,
      -1,
      -(2 - offset),
      2,
      -1,
      // middle left
      -(offset / 2),
      0,
      -1,
      -(offset / 2),
      0,
      1,
      -(offset / 2),
      2,
      1,
      -(offset / 2),
      0,
      -1,
      -(offset / 2),
      2,
      1,
      -(offset / 2),
      2,
      -1,
      // right
      2,
      0,
      1,
      2,
      0,
      -1,
      2,
      2,
      1,
      2,
      2,
      1,
      2,
      0,
      -1,
      2,
      2,
      -1,
      // inner right
      2 - offset,
      0,
      -1,
      2 - offset,
      0,
      1,
      2 - offset,
      2,
      1,
      2 - offset,
      0,
      -1,
      2 - offset,
      2,
      1,
      2 - offset,
      2,
      -1,
      // middle right
      offset / 2,
      0,
      1,
      offset / 2,
      0,
      -1,
      offset / 2,
      2,
      1,
      offset / 2,
      2,
      1,
      offset / 2,
      0,
      -1,
      offset / 2,
      2,
      -1,
      // top front
      2,
      2,
      1,
      2,
      2,
      1 - offset,
      -2,
      2,
      1 - offset,
      -2,
      2,
      1 - offset,
      -2,
      2,
      1,
      2,
      2,
      1,
      // top back
      2,
      2,
      -1,
      -2,
      2,
      -(1 - offset),
      2,
      2,
      -(1 - offset),
      -2,
      2,
      -1,
      -2,
      2,
      -(1 - offset),
      2,
      2,
      -1,
      // top left
      -2,
      2,
      1 - offset,
      -(2 - offset),
      2,
      -(1 - offset),
      -2,
      2,
      -(1 - offset),
      -2,
      2,
      1 - offset,
      -(2 - offset),
      2,
      1 - offset,
      -(2 - offset),
      2,
      -(1 - offset),
      // top middle
      -(offset / 2),
      2,
      1 - offset,
      offset / 2,
      2,
      -(1 - offset),
      -(offset / 2),
      2,
      -(1 - offset),
      //
      offset / 2,
      2,
      1 - offset,
      offset / 2,
      2,
      -(1 - offset),
      -(offset / 2),
      2,
      1 - offset,
      // top right
      2 - offset,
      2,
      -(1 - offset),
      2,
      2,
      1 - offset,
      2,
      2,
      -(1 - offset),
      2 - offset,
      2,
      1 - offset,
      2,
      2,
      1 - offset,
      2 - offset,
      2,
      -(1 - offset),

      // bottom front
      2,
      0,
      1,
      -2,
      0,
      1 - offset,
      2,
      0,
      1 - offset,
      -2,
      0,
      1,
      -2,
      0,
      1 - offset,
      2,
      0,
      1,
      // bottom back
      -2,
      0,
      -(1 - offset),
      2,
      0,
      -1,
      2,
      0,
      -(1 - offset),
      -2,
      0,
      -(1 - offset),
      -2,
      0,
      -1,
      2,
      0,
      -1,
      // bottom left
      -(2 - offset),
      0,
      -(1 - offset),
      -2,
      0,
      1 - offset,
      -2,
      0,
      -(1 - offset),
      -(2 - offset),
      0,
      1 - offset,
      -2,
      0,
      1 - offset,
      -(2 - offset),
      0,
      -(1 - offset),
      // bottom middle
      offset / 2,
      0,
      -(1 - offset),
      -(offset / 2),
      0,
      1 - offset,
      -(offset / 2),
      0,
      -(1 - offset),
      //
      offset / 2,
      0,
      -(1 - offset),
      offset / 2,
      0,
      1 - offset,
      -(offset / 2),
      0,
      1 - offset,
      // bottom right
      2 - offset,
      0,
      -(1 - offset),
      2,
      0,
      -(1 - offset),
      2,
      0,
      1 - offset,
      2 - offset,
      0,
      1 - offset,
      2 - offset,
      0,
      -(1 - offset),
      2,
      0,
      1 - offset,
    ];
    const vertices = new Float32Array(
      normalizedVertices.map((item) => item * 100)
    );
    const positionAttr = new BufferAttribute(vertices, 3);
    const geometry = new FreeformGeometry(positionAttr);

    const material = new PhongMaterial();
    material.defaultColor = new Color(0.5, 0.5, 0.5);
    material.enableDefaultColor(true);

    super(geometry, material);
    this.name = "Cinder Block";
  }
}
