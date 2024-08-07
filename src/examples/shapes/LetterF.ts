import { WebGLType } from "../../lib/webglutils/WebGLType";
import { BufferAttribute } from "../../types/objects/mesh/geometry/BufferAttribute";
import { FreeformGeometry } from "../../types/objects/mesh/geometry/FreeformGeometry";
import { BasicMaterial } from "../../types/objects/mesh/material/BasicMaterial";
import { Color } from "../../types/objects/Color";
import { Mesh } from "../../types/objects/mesh/Mesh";
import { Texture } from "../../types/objects/mesh/material/Texture";

export class LetterF extends Mesh {
  constructor() {
    const colorType = WebGLType.UNSIGNED_BYTE;
    const normalizeColor = true;
    const stride = 0;
    const offset = 0;
    const fobject = new FreeformGeometry(
      new BufferAttribute(
        new Float32Array([
          // left column front
          0, 0, 0, 0, 150, 0, 30, 0, 0, 0, 150, 0, 30, 150, 0, 30, 0, 0,

          // top rung front
          30, 0, 0, 30, 30, 0, 100, 0, 0, 30, 30, 0, 100, 30, 0, 100, 0, 0,

          // middle rung front
          30, 60, 0, 30, 90, 0, 67, 60, 0, 30, 90, 0, 67, 90, 0, 67, 60, 0,

          // left column back
          0, 0, 30, 30, 0, 30, 0, 150, 30, 0, 150, 30, 30, 0, 30, 30, 150, 30,

          // top rung back
          30, 0, 30, 100, 0, 30, 30, 30, 30, 30, 30, 30, 100, 0, 30, 100, 30,
          30,

          // middle rung back
          30, 60, 30, 67, 60, 30, 30, 90, 30, 30, 90, 30, 67, 60, 30, 67, 90,
          30,

          // top
          0, 0, 0, 100, 0, 0, 100, 0, 30, 0, 0, 0, 100, 0, 30, 0, 0, 30,

          // top rung right
          100, 0, 0, 100, 30, 0, 100, 30, 30, 100, 0, 0, 100, 30, 30, 100, 0,
          30,

          // under top rung
          30, 30, 0, 30, 30, 30, 100, 30, 30, 30, 30, 0, 100, 30, 30, 100, 30,
          0,

          // between top rung and middle
          30, 30, 0, 30, 60, 30, 30, 30, 30, 30, 30, 0, 30, 60, 0, 30, 60, 30,

          // top of middle rung
          30, 60, 0, 67, 60, 30, 30, 60, 30, 30, 60, 0, 67, 60, 0, 67, 60, 30,

          // right of middle rung
          67, 60, 0, 67, 90, 30, 67, 60, 30, 67, 60, 0, 67, 90, 0, 67, 90, 30,

          // bottom of middle rung.
          30, 90, 0, 30, 90, 30, 67, 90, 30, 30, 90, 0, 67, 90, 30, 67, 90, 0,

          // right of bottom
          30, 90, 0, 30, 150, 30, 30, 90, 30, 30, 90, 0, 30, 150, 0, 30, 150,
          30,

          // bottom
          0, 150, 0, 0, 150, 30, 30, 150, 30, 0, 150, 0, 30, 150, 30, 30, 150,
          0,

          // left side
          0, 0, 0, 0, 0, 30, 0, 150, 30, 0, 0, 0, 0, 150, 30, 0, 150, 0,
        ]),
        3,
        {
          dtype: WebGLType.FLOAT,
          normalize: false,
          stride: stride,
          offset: offset,
        }
      )
    );

    const fmaterial = new BasicMaterial();
    fmaterial.vertexColor = new BufferAttribute(
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

    // TEXTURE TEST
    // TEXTURE TEST
    // const fTexture = new Texture();
    // fTexture.setData("/f-texture.png");
    // fmaterial.setTexture(
    //   fTexture,
    //   new BufferAttribute(
    //     new Float32Array([
    //       // left column front
    //       0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0,
    const fTexture = new Texture();
    fTexture.setData("/f-texture.png");
    fmaterial.setTexture(fTexture);
    fobject.attributes["a_texcoord"] = new BufferAttribute(
      new Float32Array([
        // left column front
        0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0,

        //       // top rung front
        //       0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0,
        // top rung front
        0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0,

        //       // middle rung front
        //       0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0,
        // middle rung front
        0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0,

        //       // left column back
        //       0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1,
        // left column back
        0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1,

        //       // top rung back
        //       0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1,
        // top rung back
        0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1,

        //       // middle rung back
        //       0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1,
        // middle rung back
        0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1,

        //       // top
        //       0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1,
        // top
        0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1,

        //       // top rung right
        //       0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1,
        // top rung right
        0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1,

        //       // under top rung
        //       0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0,
        // under top rung
        0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0,

        //       // between top rung and middle
        //       0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1,
        // between top rung and middle
        0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1,

        //       // top of middle rung
        //       0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1,
        // top of middle rung
        0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1,

        //       // right of middle rung
        //       0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1,
        // right of middle rung
        0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1,

        //       // bottom of middle rung.
        //       0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0,
        // bottom of middle rung.
        0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0,

        //       // right of bottom
        //       0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1,
        // right of bottom
        0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1,

        //       // bottom
        //       0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0,
        // bottom
        0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0,

        //       // left side
        //       0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0,
        //     ]),
        //     2,
        //     {}
        //   )
        // );
        // left side
        0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0,
      ]),
      2,
      {}
    );
    fmaterial.ambient = new Color(1, 1, 1);

    // VERTEX COLOR TEST
    fmaterial.enableDefaultColor(false);

    super(fobject, fmaterial);
    this.name = "F";
  }
}
