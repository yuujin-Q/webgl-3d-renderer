import { Vec3 } from "../../types/math/Vec3";
import { CubeGeometry } from "../../types/objects/mesh/geometry/CubeGeometry";
import { PhongMaterial } from "../../types/objects/mesh/material/PhongMaterial";
import { Mesh } from "../../types/objects/mesh/Mesh";
import { ObjectNode } from "../../types/objects/ObjectNode";
import { BufferAttribute } from "../../types/objects/mesh/geometry/BufferAttribute";
import { WebGLType } from "../../lib/webglutils/WebGLType";
import { Animation } from "../../lib/animation/Animation";

export class RobotModel extends ObjectNode {
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
  public body = new CubeGeometry(100, 150, 50);
  public head = new CubeGeometry(50, 50, 50);
  public bodyPos = new Vec3(0, 0, 0);
  public headPos = new Vec3(0, 100, 0);
  public arm = new CubeGeometry(30, 100, 25);
  public leg = new CubeGeometry(30, 100, 25);
  public legPos = new Vec3(25, -120, 0);
  public armPos = new Vec3(65, 10, 0);
  public armRotation = new Vec3(0, 0, Math.PI / 6);
  public legRotation = new Vec3(0, 0, 0);

  constructor() {
    super();
    this.name = "Robot Model";
    // Create body
    const bodyGeometry = this.body;
    const bodyMaterial = new PhongMaterial();
    bodyMaterial.attributes["a_color"] = new BufferAttribute(
      RobotModel.defaultColor,
      3,
      {
        dtype: RobotModel.colorType,
        normalize: RobotModel.normalizeColor,
        stride: RobotModel.stride,
        offset: RobotModel.offset,
      }
    );
    const body = new Mesh(bodyGeometry, bodyMaterial);
    body.name = "body";
    body.position = this.bodyPos;
    this.add(body);

    // Create head
    const headGeometry = this.head;
    const headMaterial = new PhongMaterial();
    headMaterial.attributes["a_color"] = new BufferAttribute(
      RobotModel.defaultColor,
      3,
      {
        dtype: RobotModel.colorType,
        normalize: RobotModel.normalizeColor,
        stride: RobotModel.stride,
        offset: RobotModel.offset,
      }
    );
    const head = new Mesh(headGeometry, headMaterial);
    head.name = "head";
    head.position = this.headPos;
    body.add(head);

    // Create left arm
    const leftArmGeometry = this.arm;
    const leftArmMaterial = new PhongMaterial();
    leftArmMaterial.attributes["a_color"] = new BufferAttribute(
      RobotModel.defaultColor,
      3,
      {
        dtype: RobotModel.colorType,
        normalize: RobotModel.normalizeColor,
        stride: RobotModel.stride,
        offset: RobotModel.offset,
      }
    );
    const leftArm = new Mesh(leftArmGeometry, leftArmMaterial);
    leftArm.name = "leftArm";
    leftArm.position = new Vec3(-this.armPos.x, this.armPos.y, this.armPos.z);
    leftArm.rotation = new Vec3(
      this.armRotation.x,
      this.armRotation.y,
      -this.armRotation.z
    );
    body.add(leftArm);

    // Create right arm
    const rightArmGeometry = this.arm;
    const rightArmMaterial = new PhongMaterial();
    rightArmMaterial.attributes["a_color"] = new BufferAttribute(
      RobotModel.defaultColor,
      3,
      {
        dtype: RobotModel.colorType,
        normalize: RobotModel.normalizeColor,
        stride: RobotModel.stride,
        offset: RobotModel.offset,
      }
    );
    const rightArm = new Mesh(rightArmGeometry, rightArmMaterial);
    rightArm.name = "rightArm";
    rightArm.position = this.armPos;
    rightArm.rotation = this.armRotation;
    body.add(rightArm);

    // Create left leg
    const leftLegGeometry = this.leg;
    const leftLegMaterial = new PhongMaterial();
    leftLegMaterial.attributes["a_color"] = new BufferAttribute(
      RobotModel.defaultColor,
      3,
      {
        dtype: RobotModel.colorType,
        normalize: RobotModel.normalizeColor,
        stride: RobotModel.stride,
        offset: RobotModel.offset,
      }
    );
    const leftLeg = new Mesh(leftLegGeometry, leftLegMaterial);
    leftLeg.name = "leftLeg";
    leftLeg.position = new Vec3(-this.legPos.x, this.legPos.y, this.legPos.z);
    body.add(leftLeg);

    // Create right leg
    const rightLegGeometry = this.leg;
    const rightLegMaterial = new PhongMaterial();
    rightLegMaterial.attributes["a_color"] = new BufferAttribute(
      RobotModel.defaultColor,
      3,
      {
        dtype: RobotModel.colorType,
        normalize: RobotModel.normalizeColor,
        stride: RobotModel.stride,
        offset: RobotModel.offset,
      }
    );
    const rightLeg = new Mesh(rightLegGeometry, rightLegMaterial);
    rightLeg.name = "rightLeg";
    rightLeg.position = this.legPos;
    body.add(rightLeg);

    this.animation = new Animation(this, RobotModel.walkingFrames, 60);

    // Initialize world matrices
    this.computeWorldMatrix(true, true);
  }

  static walkingFrames = Animation.generateFrames(
    [
      "head",
      "leftArm",
      "rightArm",
      "leftLeg",
      "rightLeg"
    ],
    [
      [new Vec3(0, 100, 0), new Vec3(0, 100, 0)],
      [new Vec3(-65, 10, 0), new Vec3(-65, 10, 0)],
      [new Vec3(65, 10, 0), new Vec3(65, 10, 0)],
      [new Vec3(-25, -120, 0), new Vec3(-25, -120, 0)],
      [new Vec3(25, -120, 0), new Vec3(25, -120, 0)]
    ],
    [
      [new Vec3(0, -0.25, 0), new Vec3(0, 0.25, 0)],
      [new Vec3(-0.25, 0, -Math.PI / 6), new Vec3(0.25, 0, -Math.PI / 6)],
      [new Vec3(0.25, 0, Math.PI / 6), new Vec3(-0.25, 0, Math.PI / 6)],
      [new Vec3(0.25, 0, 0), new Vec3(-0.25, 0, 0)],
      [new Vec3(-0.25, 0, 0), new Vec3(0.25, 0, 0)]
    ],
    [
      [new Vec3(1, 1, 1), new Vec3(1, 1, 1)],
      [new Vec3(1, 1, 1), new Vec3(1, 1, 1)],
      [new Vec3(1, 1, 1), new Vec3(1, 1, 1)],
      [new Vec3(1, 1, 1), new Vec3(1, 1, 1)],
      [new Vec3(1, 1, 1), new Vec3(1, 1, 1)],
    ],
    120,
    true,
    Vec3.easeInOutSine
  );
}
