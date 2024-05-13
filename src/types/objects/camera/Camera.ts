import { ObjectNode } from "../ObjectNode";
import { M4 } from "../../math/M4";

export class Camera extends ObjectNode {
    protected _projectionMatrix = M4.identity();
    private _invWorldMatrix = M4.identity();


    computeWorldMatrix() {
        super.computeWorldMatrix();
        this._invWorldMatrix = M4.inv(this.worldMatrix);
    }


    get viewProjectionMatrix() {
        this.computeWorldMatrix();
        return M4.multiply(this._projectionMatrix, this._invWorldMatrix);
    }
   
    get projectionMatrix() {
        return this._projectionMatrix;
    }


    computeProjectionMatrix() {
        throw new Error("Camera.computeProjectionMatrix() must be implemented in derived classes.");
    }
}
