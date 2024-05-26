import { WebGLType } from "../../lib/webglutils/WebGLType";
import { Color } from "../../types/objects/Color";
import { BufferAttribute } from "../../types/objects/mesh/geometry/BufferAttribute";
import { CubeGeometry } from "../../types/objects/mesh/geometry/CubeGeometry";
import { PhongMaterial } from "../../types/objects/mesh/material/PhongMaterial";
import { Mesh } from "../../types/objects/mesh/Mesh";

export class Cube extends Mesh {
  constructor() {
    const colorType = WebGLType.UNSIGNED_BYTE;
    const normalizeColor = true;
    const stride = 0;
    const offset = 0;
    const geometry = new CubeGeometry(100, 100, 200);
    const cubeMaterial = new PhongMaterial();

    cubeMaterial.defaultColor = new Color(0.5, 0.5, 0.5);
    cubeMaterial.enableDefaultColor(true);
    geometry.attributes["a_texcoord"] = new BufferAttribute(
      new Float32Array(Array(100).fill([0, 0, 0, 1, 1, 0, 1, 1]).flat()),
      2
    );
    cubeMaterial.attributes["a_color"] = new BufferAttribute(
      new Uint8Array([
        // 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128,
        // left column front
        200, 70, 120, 200, 70, 120, 200, 70, 120, 200, 70, 120, 200, 70, 120,
        200, 70, 120,

        // top rung front
        200, 70, 120, 200, 70, 120, 200, 70, 120, 200, 70, 120, 200, 70, 120,
        200, 70, 120,

        // middle rung front
        200, 70, 120, 200, 70, 120, 200, 70, 120, 200, 70, 120, 200, 70, 120,
        200, 70, 120,

        // left column back
        80, 70, 200, 80, 70, 200, 80, 70, 200, 80, 70, 200, 80, 70, 200, 80, 70,
        200,

        // top rung back
        80, 70, 200, 80, 70, 200, 80, 70, 200, 80, 70, 200, 80, 70, 200, 80, 70,
        200,

        // middle rung back
        80, 70, 200, 80, 70, 200, 80, 70, 200, 80, 70, 200, 80, 70, 200, 80, 70,
        200,

        // top
        70, 200, 210, 70, 200, 210, 70, 200, 210, 70, 200, 210, 70, 200, 210,
        70, 200, 210,

        // top rung right
        200, 200, 70, 200, 200, 70, 200, 200, 70, 200, 200, 70, 200, 200, 70,
        200, 200, 70,

        // under top rung
        210, 100, 70, 210, 100, 70, 210, 100, 70, 210, 100, 70, 210, 100, 70,
        210, 100, 70,

        // between top rung and middle
        210, 160, 70, 210, 160, 70, 210, 160, 70, 210, 160, 70, 210, 160, 70,
        210, 160, 70,

        // top of middle rung
        70, 180, 210, 70, 180, 210, 70, 180, 210, 70, 180, 210, 70, 180, 210,
        70, 180, 210,

        // right of middle rung
        100, 70, 210, 100, 70, 210, 100, 70, 210, 100, 70, 210, 100, 70, 210,
        100, 70, 210,

        // bottom of middle rung.
        76, 210, 100, 76, 210, 100, 76, 210, 100, 76, 210, 100, 76, 210, 100,
        76, 210, 100,

        // right of bottom
        140, 210, 80, 140, 210, 80, 140, 210, 80, 140, 210, 80, 140, 210, 80,
        140, 210, 80,

        // bottom
        90, 130, 110, 90, 130, 110, 90, 130, 110, 90, 130, 110, 90, 130, 110,
        90, 130, 110,

        // left side
        160, 160, 220, 160, 160, 220, 160, 160, 220, 160, 160, 220, 160, 160,
        220, 160, 160, 220,
      ]),
      3,
      {
        dtype: colorType,
        normalize: normalizeColor,
        stride: stride,
        offset: offset,
      }
    );
    super(geometry, cubeMaterial);
    this.name = "Cube";
  }
}
