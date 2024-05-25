import { WebGLType } from "../../lib/webglutils/WebGLType";
import { BufferAttribute } from "../../types/objects/mesh/geometry/BufferAttribute";
import { PyramidGeometry } from "../../types/objects/mesh/geometry/PyramidGeometry";
import { PhongMaterial } from "../../types/objects/mesh/material/PhongMaterial";
import { Mesh } from "../../types/objects/mesh/Mesh";

export class PyramidModel extends Mesh {
  constructor() {
    const defaultColor = new Uint8Array([
      // First face
      0, 0, 210, 0, 30, 210, 0, 0, 0, 0, 30, 210, 0, 30, 0, 0, 0, 0,
      // Second face
      30, 0, 0, 30, 30, 0, 30, 0, 210, 30, 30, 0, 30, 30, 210, 30, 0, 210,
      // Third face
      30, 0, 0, 30, 0, 210, 0, 0, 0, 30, 0, 210, 0, 0, 210, 0, 0, 0,
      // Fourth face
      30, 30, 210, 30, 30, 0, 0, 30, 210, 30, 30, 0, 0, 30, 0, 0, 30, 210,
      // Fifth face
      180, 0, 210, 180, 30, 210, 180, 0, 0, 180, 30, 210, 180, 30, 0, 180, 0, 0,
      // Sixth face
      210, 0, 0, 210, 30, 0, 210, 0, 210, 210, 30, 0, 210, 30, 210, 210, 0, 210,
      // Seventh face
      210, 0, 0, 210, 0, 210, 180, 0, 0, 210, 0, 210, 180, 0, 210, 180, 0, 0,
      // Eighth face
      210, 30, 210, 210, 30, 0, 180, 30, 210, 210, 30, 0, 180, 30, 0, 180, 30,
      210,
      // Ninth face
      210, 0, 210, 210, 30, 210, 0, 0, 210, 210, 30, 210, 0, 30, 210, 0, 0, 210,
      // Tenth face
      0, 0, 180, 0, 30, 180, 210, 0, 180, 0, 30, 180, 210, 30, 180, 210, 0, 180,
      // Eleventh face
      0, 0, 180, 210, 0, 180, 0, 0, 210, 210, 0, 180, 210, 0, 210, 0, 0, 210,
      // Twelfth face
      210, 30, 180, 0, 30, 180, 210, 30, 210, 0, 30, 180, 0, 30, 210, 210, 30,
      210,
      // Thirteenth face
      210, 0, 30, 210, 30, 30, 0, 0, 30, 210, 30, 30, 0, 30, 30, 0, 0, 30,
      // Fourteenth face
      0, 0, 0, 0, 30, 0, 210, 0, 0, 0, 30, 0, 210, 30, 0, 210, 0, 0,
      // Fifteenth face
      0, 0, 0, 210, 0, 0, 0, 0, 30, 210, 0, 0, 210, 0, 30, 0, 0, 30,
      // Sixteenth face
      210, 30, 0, 0, 30, 0, 210, 30, 30, 0, 30, 0, 0, 30, 30, 210, 30, 30,
      // Seventeenth face
      0, 30, 0, 105, 210, 105, 30, 30, 0, 105, 210, 0, 105, 210, 0, 30, 30, 0,
      // Eighteenth face
      0, 30, 30, 105, 210, 105, 0, 30, 0, 105, 210, 0, 105, 210, 0, 0, 30, 0,
      // Nineteenth face
      30, 30, 0, 105, 210, 105, 30, 30, 30, 105, 210, 30, 105, 210, 30, 30, 30,
      30,
      // Twentieth face
      30, 30, 30, 105, 210, 105, 0, 30, 30, 105, 210, 30, 105, 210, 30, 0, 30,
      30,
      // Twenty-first face
      180, 30, 0, 105, 210, 105, 210, 30, 0, 105, 210, 0, 105, 210, 0, 180, 30,
      0,
      // Twenty-second face
      210, 30, 0, 105, 210, 105, 210, 30, 30, 105, 210, 0, 105, 210, 0, 210, 30,
      30,
      // Twenty-third face
      210, 30, 30, 105, 210, 105, 180, 30, 30, 105, 210, 30, 105, 210, 30, 180,
      30, 30,
      // Twenty-fourth face
      180, 30, 30, 105, 210, 105, 180, 30, 0, 105, 210, 30, 105, 210, 30, 180,
      30, 0,
      // Twenty-fifth face
      0, 30, 180, 105, 210, 105, 30, 30, 180, 105, 210, 180, 105, 210, 180, 30,
      30, 180,
      // Twenty-sixth face
      0, 30, 210, 105, 210, 105, 0, 30, 180, 105, 210, 180, 105, 210, 180, 0,
      30, 180,
      // Twenty-seventh face
      30, 30, 180, 105, 210, 105, 30, 30, 210, 105, 210, 210, 105, 210, 210, 30,
      30, 210,
      // Twenty-eighth face
      30, 30, 210, 105, 210, 105, 0, 30, 210, 105, 210, 210, 105, 210, 210, 0,
      30, 210,
      // Twenty-ninth face
      180, 30, 180, 105, 210, 105, 210, 30, 180, 105, 210, 180, 105, 210, 180,
      210, 30, 180,
      // Thirtieth face
      210, 30, 180, 105, 210, 105, 210, 30, 210, 105, 210, 180, 105, 210, 180,
      210, 30, 30,
      // Thirty-first face
      210, 30, 210, 105, 210, 105, 180, 30, 210, 105, 210, 210, 105, 210, 210,
      180, 30, 210,
      // Thirty-second face
      180, 30, 210, 105, 210, 105, 180, 30, 180, 105, 210, 210, 105, 210, 210,
      180, 30, 180,
    ]);
    const colorType = WebGLType.UNSIGNED_BYTE;
    const normalizeColor = true;
    const stride = 0;
    const offset = 0;

    const geometry = new PyramidGeometry();
    const pyramidMaterial = new PhongMaterial();
    pyramidMaterial.attributes["a_color"] = new BufferAttribute(
      defaultColor,
      3,
      {
        dtype: colorType,
        normalize: normalizeColor,
        stride: stride,
        offset: offset,
      }
    );
    super(geometry, pyramidMaterial);
    this.name = "Pyramid";
  }
}
