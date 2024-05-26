import { Vec3 } from "../../types/math/Vec3";
import { CubeGeometry } from "../../types/objects/mesh/geometry/CubeGeometry";
import { PhongMaterial } from "../../types/objects/mesh/material/PhongMaterial";
import { Mesh } from "../../types/objects/mesh/Mesh";
import { ObjectNode } from "../../types/objects/ObjectNode";
import { BufferAttribute } from "../../types/objects/mesh/geometry/BufferAttribute";
import { WebGLType } from "../../lib/webglutils/WebGLType";

export class CreeperModel extends ObjectNode {
  static defaultColor = new Uint8Array([
    200, 70, 120, 200, 70, 120, 200, 70, 120, 200, 70, 120, 200, 70, 120, 200,
    70, 120, 200, 70, 120, 200, 70, 120, 200, 70, 120, 200, 70, 120, 200, 70,
    120, 200, 70, 120, 200, 70, 120, 200, 70, 120, 200, 70, 120, 200, 70, 120,
    200, 70, 120, 200, 70, 120, 80, 70, 200, 80, 70, 200, 80, 70, 200, 80, 70,
    200, 80, 70, 200, 80, 70, 200, 80, 70, 200, 80, 70, 200, 80, 70, 200, 80,
    70, 200, 80, 70, 200, 80, 70, 200, 80, 70, 200, 80, 70, 200, 80, 70, 200,
    80, 70, 200, 80, 70, 200, 80, 70, 200, 80, 70, 200, 80, 70, 200, 80, 70,
    200, 70, 200, 210, 70, 200, 210, 70, 200, 210, 70, 200, 210, 70, 200, 210,
    70, 200, 210, 200, 200, 70, 200, 200, 70, 200, 200, 70, 200, 200, 70, 200,
    200, 70, 200, 200, 70, 210, 100, 70, 210, 100, 70, 210, 100, 70, 210, 100,
    70, 210, 100, 70, 210, 100, 70, 210, 160, 70, 210, 160, 70, 210, 160, 70,
    210, 160, 70, 210, 160, 70, 210, 160, 70, 70, 180, 210, 70, 180, 210, 70,
    180, 210, 70, 180, 210, 70, 180, 210, 70, 180, 210, 100, 70, 210, 100, 70,
    210, 100, 70, 210, 100, 70, 210, 100, 70, 210, 100, 70, 210, 76, 210, 100,
    76, 210, 100, 76, 210, 100, 76, 210, 100, 76, 210, 100, 76, 210, 100, 140,
    210, 80, 140, 210, 80, 140, 210, 80, 140, 210, 80, 140, 210, 80, 140, 210,
    80, 90, 130, 110, 90, 130, 110, 90, 130, 110, 90, 130, 110, 90, 130, 110,
    90, 130, 110, 160, 160, 220, 160, 160, 220, 160, 160, 220, 160, 160, 220,
    160, 160, 220, 160, 160, 220,
  ]);
  static colorType = WebGLType.UNSIGNED_BYTE;
  static normalizeColor = true;
  static stride = 0;
  static offset = 0;

  constructor() {
    super();
    this.name = "Creeper Model";
    // Create body
    const bodyGeometry = new CubeGeometry(100, 100, 200);
    const bodyMaterial = new PhongMaterial();
    bodyMaterial.attributes["a_color"] = new BufferAttribute(
      CreeperModel.defaultColor,
      3,
      {
        dtype: CreeperModel.colorType,
        normalize: CreeperModel.normalizeColor,
        stride: CreeperModel.stride,
        offset: CreeperModel.offset,
      }
    );
    const body = new Mesh(bodyGeometry, bodyMaterial);
    body.name = "body";
    body.scale = new Vec3(1, 1.1, 1);
    this.add(body);

    // Create head
    const headGeometry = new CubeGeometry(100, 100, 200);
    const headMaterial = new PhongMaterial();
    headMaterial.attributes["a_color"] = new BufferAttribute(
      CreeperModel.defaultColor,
      3,
      {
        dtype: CreeperModel.colorType,
        normalize: CreeperModel.normalizeColor,
        stride: CreeperModel.stride,
        offset: CreeperModel.offset,
      }
    );
    const head = new Mesh(headGeometry, headMaterial);
    head.name = "head";
    head.position = new Vec3(0, 0, 184);
    head.scale = new Vec3(1.85, 1.6, 1);
    body.add(head);

    // Create foot 1
    const foot1Geometry = new CubeGeometry(100, 100, 200);
    const foot1Material = new PhongMaterial();
    foot1Geometry.setAttribute(
      "color",
      new BufferAttribute(CreeperModel.defaultColor, 3, {
        dtype: CreeperModel.colorType,
        normalize: CreeperModel.normalizeColor,
        stride: CreeperModel.stride,
        offset: CreeperModel.offset,
      })
    );
    const foot1 = new Mesh(foot1Geometry, foot1Material);
    foot1.name = "foot1";
    foot1.position = new Vec3(0, 68, -128);
    foot1.scale = new Vec3(1, 0.65, 0.5);
    body.add(foot1);
    
    // Create foot 2
    const foot2Geometry = new CubeGeometry(100, 100, 200);
    const foot2Material = new PhongMaterial();
    foot2Geometry.setAttribute(
      "color",
      new BufferAttribute(CreeperModel.defaultColor, 3, {
        dtype: CreeperModel.colorType,
        normalize: CreeperModel.normalizeColor,
        stride: CreeperModel.stride,
        offset: CreeperModel.offset,
      })
    );
    const foot2 = new Mesh(foot2Geometry, foot2Material);
    foot2.name = "foot2";
    foot2.position = new Vec3(-4, -64, -128);
    foot2.scale = new Vec3(1, 0.65, 0.5);
    body.add(foot2);

    // Initialize world matrices
    this.computeWorldMatrix(true, true);
  }
}
