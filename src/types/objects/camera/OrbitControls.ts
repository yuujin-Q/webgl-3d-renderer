import { ObjectNode } from "../ObjectNode";
import { Vec3 } from "../../math/Vec3";

export class OrbitControls {
    target: ObjectNode
    distance: number
    theta: number
    phi: number

    constructor(target: ObjectNode, distance: number, theta: number, phi: number) {
        this.target = target;
        this.distance = distance;
        this.theta = theta;
        this.phi = phi;
    }

    update() {
        // Update camera position based on distance, theta, and phi
        const x = this.distance * Math.sin(this.phi) * Math.cos(this.theta);
        const y = this.distance * Math.cos(this.phi);
        const z = this.distance * Math.sin(this.phi) * Math.sin(this.theta);
        const position = new Vec3(x, y, z);
        this.target.position = position;
        this.target.computeWorldMatrix();
    }
}