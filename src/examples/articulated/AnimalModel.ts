import { Vec3 } from "../../types/math/Vec3";
import { CubeGeometry } from "../../types/objects/mesh/geometry/CubeGeometry";
import { PhongMaterial } from "../../types/objects/mesh/material/PhongMaterial";
import { Mesh } from "../../types/objects/mesh/Mesh";
import { ObjectNode } from "../../types/objects/ObjectNode";
import { BufferAttribute } from "../../types/objects/mesh/geometry/BufferAttribute";
import { WebGLType } from "../../lib/webglutils/WebGLType";

export class AnimalModel extends ObjectNode {
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
    this.name = "Animal Model";
    // Create body
    const bodyGeometry = new CubeGeometry(200, 100, 100);
    const bodyMaterial = new PhongMaterial();
    bodyMaterial.attributes["a_color"] = new BufferAttribute(
      AnimalModel.defaultColor,
      3,
      {
        dtype: AnimalModel.colorType,
        normalize: AnimalModel.normalizeColor,
        stride: AnimalModel.stride,
        offset: AnimalModel.offset,
      }
    );
    const body = new Mesh(bodyGeometry, bodyMaterial);
    body.name = "body";
    body.position = new Vec3(0, 0, 0);
    this.add(body);

    // Create head
    const headGeometry = new CubeGeometry(75, 75, 75);
    const headMaterial = new PhongMaterial();
    headMaterial.attributes["a_color"] = new BufferAttribute(
      AnimalModel.defaultColor,
      3,
      {
        dtype: AnimalModel.colorType,
        normalize: AnimalModel.normalizeColor,
        stride: AnimalModel.stride,
        offset: AnimalModel.offset,
      }
    );
    const head = new Mesh(headGeometry, headMaterial);
    head.name = "head";
    head.position = new Vec3(100, 60, 0);
    head.rotation = new Vec3(0, 0, 25);
    body.add(head);

    // Create left front leg
    const leftFrontLegGeometry = new CubeGeometry(50, 150, 50);
    const leftFrontLegMaterial = new PhongMaterial();
    leftFrontLegGeometry.setAttribute(
      "color",
      new BufferAttribute(AnimalModel.defaultColor, 3, {
        dtype: AnimalModel.colorType,
        normalize: AnimalModel.normalizeColor,
        stride: AnimalModel.stride,
        offset: AnimalModel.offset,
      })
    );
    const leftFrontLeg = new Mesh(leftFrontLegGeometry, leftFrontLegMaterial);
    leftFrontLeg.name = "leftFrontLeg";
    leftFrontLeg.position = new Vec3(50, -50, 50);
    body.add(leftFrontLeg);

    // Create right front leg
    const rightFrontLegGeometry = new CubeGeometry(50, 150, 50);
    const rightFrontLegMaterial = new PhongMaterial();
    rightFrontLegGeometry.setAttribute(
      "color",
      new BufferAttribute(AnimalModel.defaultColor, 3, {
        dtype: AnimalModel.colorType,
        normalize: AnimalModel.normalizeColor,
        stride: AnimalModel.stride,
        offset: AnimalModel.offset,
      })
    );
    const rightFrontLeg = new Mesh(
      rightFrontLegGeometry,
      rightFrontLegMaterial
    );
    rightFrontLeg.name = "rightFrontLeg";
    rightFrontLeg.position = new Vec3(50, -50, -50);
    body.add(rightFrontLeg);

    // Create left back leg
    const leftBackLegGeometry = new CubeGeometry(50, 150, 50);
    const leftBackLegMaterial = new PhongMaterial();
    leftBackLegGeometry.setAttribute(
      "color",
      new BufferAttribute(AnimalModel.defaultColor, 3, {
        dtype: AnimalModel.colorType,
        normalize: AnimalModel.normalizeColor,
        stride: AnimalModel.stride,
        offset: AnimalModel.offset,
      })
    );
    const leftBackLeg = new Mesh(leftBackLegGeometry, leftBackLegMaterial);
    leftBackLeg.name = "leftBackLeg";
    leftBackLeg.position = new Vec3(-50, -50, 50);
    body.add(leftBackLeg);

    // Create right back leg
    const rightBackLegGeometry = new CubeGeometry(50, 150, 50);
    const rightBackLegMaterial = new PhongMaterial();
    rightBackLegGeometry.setAttribute(
      "color",
      new BufferAttribute(AnimalModel.defaultColor, 3, {
        dtype: AnimalModel.colorType,
        normalize: AnimalModel.normalizeColor,
        stride: AnimalModel.stride,
        offset: AnimalModel.offset,
      })
    );
    const rightBackLeg = new Mesh(rightBackLegGeometry, rightBackLegMaterial);
    rightBackLeg.name = "rightBackLeg";
    rightBackLeg.position = new Vec3(-50, -50, -50);
    body.add(rightBackLeg);

    // Create tail
    const tailGeometry = new CubeGeometry(100, 25, 25);
    const tailMaterial = new PhongMaterial();
    tailMaterial.attributes["a_color"] = new BufferAttribute(
      AnimalModel.defaultColor,
      3,
      {
        dtype: AnimalModel.colorType,
        normalize: AnimalModel.normalizeColor,
        stride: AnimalModel.stride,
        offset: AnimalModel.offset,
      }
    );
    const tail = new Mesh(tailGeometry, tailMaterial);
    tail.name = "tail";
    tail.position = new Vec3(-125, 25, 0);
    tail.rotation = new Vec3(0, 0, 25);
    body.add(tail);

    // Initialize world matrices
    this.computeWorldMatrix(true, true);
  }
}
