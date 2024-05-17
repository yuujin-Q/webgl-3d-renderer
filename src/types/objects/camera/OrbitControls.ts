import { ObjectNode } from "../ObjectNode";
import { Vec3 } from "../../math/Vec3";

export class OrbitControls {
    camera: ObjectNode
    lastCameraRotationState: Vec3;
    distance: number
    theta: number
    phi: number

    constructor(target: ObjectNode, distance: number, theta: number, phi: number) {
        this.camera = target;
        this.distance = distance;
        this.theta = theta;
        this.phi = phi;

        this.lastCameraRotationState = target.rotation;
    }

    update() {
        console.log("update");
        // Update camera position based on distance, theta, and phi
        const x = this.distance * Math.sin(this.phi) * Math.cos(this.theta);
        const y = this.distance * Math.cos(this.phi);
        const z = this.distance * Math.sin(this.phi) * Math.sin(this.theta);
        
        // Update camera rotation
        const xRot = Math.atan2(z, y) / 100;
        const yRot = Math.atan2(x, z) / 100;
        const zRot = Math.atan2(y, x) / 100;
        // this.camera.position = new Vec3(x, y, z);
        this.camera.rotation.x = this.lastCameraRotationState.x + xRot;
        this.camera.rotation.y = this.lastCameraRotationState.y + yRot;
        this.camera.rotation.z = this.lastCameraRotationState.z + zRot;
        this.camera.computeWorldMatrix();
    }
}