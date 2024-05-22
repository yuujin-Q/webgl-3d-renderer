import { Vec3 } from "../../../math/Vec3";
import { CubeGeometry } from "../geometry/CubeGeometry";
import { PhongMaterial } from "../material/PhongMaterial";
import { Mesh } from "../Mesh";
import { ObjectNode } from "../../ObjectNode";
import { BufferAttribute } from "../geometry/BufferAttribute";
import { WebGLType } from "../../../../lib/webglutils/WebGLType";

export class RobotModel extends ObjectNode {
    static defaultColor = new Uint8Array([
        200, 70, 120, 200, 70, 120, 200, 70, 120, 200, 70, 120, 200, 70, 120, 200, 70, 120,
        200, 70, 120, 200, 70, 120, 200, 70, 120, 200, 70, 120, 200, 70, 120, 200, 70, 120,
        200, 70, 120, 200, 70, 120, 200, 70, 120, 200, 70, 120, 200, 70, 120, 200, 70, 120,
        80, 70, 200, 80, 70, 200, 80, 70, 200, 80, 70, 200, 80, 70, 200, 80, 70, 200, 80, 70, 200,
        80, 70, 200, 80, 70, 200, 80, 70, 200, 80, 70, 200, 80, 70, 200, 80, 70, 200, 80, 70, 200,
        80, 70, 200, 80, 70, 200, 80, 70, 200, 80, 70, 200, 80, 70, 200, 80, 70, 200, 80, 70, 200,
        70, 200, 210, 70, 200, 210, 70, 200, 210, 70, 200, 210, 70, 200, 210, 70, 200, 210,
        200, 200, 70, 200, 200, 70, 200, 200, 70, 200, 200, 70, 200, 200, 70, 200, 200, 70,
        210, 100, 70, 210, 100, 70, 210, 100, 70, 210, 100, 70, 210, 100, 70, 210, 100, 70,
        210, 160, 70, 210, 160, 70, 210, 160, 70, 210, 160, 70, 210, 160, 70, 210, 160, 70,
        70, 180, 210, 70, 180, 210, 70, 180, 210, 70, 180, 210, 70, 180, 210, 70, 180, 210,
        100, 70, 210, 100, 70, 210, 100, 70, 210, 100, 70, 210, 100, 70, 210, 100, 70, 210,
        76, 210, 100, 76, 210, 100, 76, 210, 100, 76, 210, 100, 76, 210, 100, 76, 210, 100,
        140, 210, 80, 140, 210, 80, 140, 210, 80, 140, 210, 80, 140, 210, 80, 140, 210, 80,
        90, 130, 110, 90, 130, 110, 90, 130, 110, 90, 130, 110, 90, 130, 110, 90, 130, 110,
        160, 160, 220, 160, 160, 220, 160, 160, 220, 160, 160, 220, 160, 160, 220, 160, 160, 220,
    ]);
    static colorType = WebGLType.UNSIGNED_BYTE;
    static normalizeColor = true;
    static stride = 0;
    static offset = 0;
    public arm = new CubeGeometry(25, 100, 25);
    public leg = new CubeGeometry(25, 150, 25);
    public legPos = new Vec3(18, -65, 0); 
    public armPos = new Vec3(50, 10, 0);
    public armRotation = new Vec3(0, 0, Math.PI / 6);
    public legRotation = new Vec3(0, 0, 0);

    constructor() {
        super();

        // Create body
        const bodyGeometry = new CubeGeometry(100, 150, 50);
        const bodyMaterial = new PhongMaterial();
        bodyMaterial.attributes['a_color'] = new BufferAttribute(RobotModel.defaultColor, 3, {dtype: RobotModel.colorType, normalize: RobotModel.normalizeColor, stride: RobotModel.stride, offset: RobotModel.offset});
        const body = new Mesh(bodyGeometry, bodyMaterial);
        body.position = new Vec3(0, 0, 0);
        this.add(body);

        // Create head
        const headGeometry = new CubeGeometry(50, 50, 50);
        const headMaterial = new PhongMaterial();
        headMaterial.attributes['a_color'] = new BufferAttribute(RobotModel.defaultColor, 3, {dtype: RobotModel.colorType, normalize: RobotModel.normalizeColor, stride: RobotModel.stride, offset: RobotModel.offset});
        const head = new Mesh(headGeometry, headMaterial);
        head.position = new Vec3(0, 50, 0);
        body.add(head);

        // Create left arm
        const leftArmGeometry = this.arm;
        const leftArmMaterial = new PhongMaterial();
        leftArmMaterial.attributes['a_color'] = new BufferAttribute(RobotModel.defaultColor, 3, {dtype: RobotModel.colorType, normalize: RobotModel.normalizeColor, stride: RobotModel.stride, offset: RobotModel.offset});
        const leftArm = new Mesh(leftArmGeometry, leftArmMaterial);
        leftArm.position = new Vec3(-this.armPos.x, this.armPos.y, this.armPos.z);
        leftArm.rotation = new Vec3(this.armRotation.x, this.armRotation.y, -this.armRotation.z);
        body.add(leftArm);

        // Create right arm
        const rightArmGeometry = this.arm;
        const rightArmMaterial = new PhongMaterial();
        rightArmMaterial.attributes['a_color'] = new BufferAttribute(RobotModel.defaultColor, 3, {dtype: RobotModel.colorType, normalize: RobotModel.normalizeColor, stride: RobotModel.stride, offset: RobotModel.offset});
        const rightArm = new Mesh(rightArmGeometry, rightArmMaterial);
        rightArm.position = this.armPos;
        rightArm.rotation = this.armRotation;
        body.add(rightArm);

        // Create left leg
        const leftLegGeometry = this.leg;
        const leftLegMaterial = new PhongMaterial();
        leftLegMaterial.attributes['a_color'] = new BufferAttribute(RobotModel.defaultColor, 3, {dtype: RobotModel.colorType, normalize: RobotModel.normalizeColor, stride: RobotModel.stride, offset: RobotModel.offset});
        const leftLeg = new Mesh(leftLegGeometry, leftLegMaterial);
        leftLeg.position = new Vec3(-this.legPos.x, this.legPos.y, this.legPos.z);
        body.add(leftLeg);

        // Create right leg
        const rightLegGeometry = this.leg;
        const rightLegMaterial = new PhongMaterial();
        rightLegMaterial.attributes['a_color'] = new BufferAttribute(RobotModel.defaultColor, 3, {dtype: RobotModel.colorType, normalize: RobotModel.normalizeColor, stride: RobotModel.stride, offset: RobotModel.offset});
        const rightLeg = new Mesh(rightLegGeometry, rightLegMaterial);
        rightLeg.position = this.legPos;
        body.add(rightLeg);

        // Initialize world matrices
        this.computeWorldMatrix(true, true);
    }
}
