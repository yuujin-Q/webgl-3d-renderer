/* eslint-disable @typescript-eslint/no-explicit-any */
import { v4 } from "uuid";
import { M4 } from "../math/M4";
import { Vec3 } from "../math/Vec3";

export class ObjectNode {
  private _position: Vec3 = new Vec3();
  private _rotation: Vec3 = new Vec3();
  private _scale: Vec3 = new Vec3(1, 1, 1);
  private _localMatrix: M4 = M4.identity();
  private _worldMatrix: M4 = M4.identity();
  private _parent?: ObjectNode;
  private _children: ObjectNode[] = [];
  private _name = v4(); 
  visible = true;

  // Public getter, prevent re-instance new object
  get position() {
    return this._position;
  }
  get rotation() {
    return this._rotation;
  }
  get scale() {
    return this._scale;
  }
  get parent() {
    return this._parent;
  }
  get localMatrix() {
    return this._localMatrix;
  }
  get worldMatrix() {
    return this._worldMatrix;
  }
  get children() {
    return this._children;
  }
  get name() {
    return this._name;
  }

  // Public setter
  // Should update world matrix if parent changed
  set parent(parent) {
    if (this._parent !== parent) {
      this._parent = parent;
      this.computeWorldMatrix(false, true);
    }
  }
  // set position, rotation, scale
  set position(p: Vec3) {
    this._position = p;
    this.computeLocalMatrix();
  }
  set rotation(r: Vec3) {
    this._rotation = r;
    this.computeLocalMatrix();
  }
  set scale(s: Vec3) {
    this._scale = s;
    this.computeLocalMatrix();
  }
  set children(c: ObjectNode[]) {
    this._children = c;
    this.computeWorldMatrix(false, true);
  }

  // convert to json gltf format
  static toJSON(node: ObjectNode): object {
    return {
      position: Vec3.toJSON(node.position),
      rotation: Vec3.toJSON(node.rotation),
      scale: Vec3.toJSON(node.scale),
      // children: node.children.map((child) => ObjectNode.toJSON(child)),
      // local and world matrix 
      worldMatrix: node.worldMatrix,
      localMatrix: node.localMatrix,
    };
  }

  // convert from json gltf format
  static fromJSON(json: any): ObjectNode {
    const node = new ObjectNode();
    if (json.position) node.position = Vec3.fromJSON(json.position);
    if (json.rotation) node.rotation = Vec3.fromJSON(json.rotation);
    if (json.scale) node.scale = Vec3.fromJSON(json.scale);
    if (json.children)
      node.children = json.children.map((child: any) => ObjectNode.fromJSON(child));
    if (json.worldMatrix) node._worldMatrix = json.worldMatrix;
    if (json.localMatrix) node._localMatrix = json.localMatrix;
    return node;
  }

  computeLocalMatrix() {
    this._localMatrix = M4.multiply(
      M4.translation(this._position),
      M4.rotation(this._rotation),
      M4.scaling(this._scale)
    );
  }

  computeWorldMatrix(updateParent = true, updateChildren = true) {
    // If updateParent, update world matrix of our ancestors
    // (.parent, .parent.parent, .parent.parent.parent, ...)
    if (updateParent && this.parent)
      this.parent.computeWorldMatrix(true, false);
    // Update this ObjectNode
    this.computeLocalMatrix();
    if (this.parent) {
      this._worldMatrix = M4.multiply(
        this.parent.worldMatrix,
        this._localMatrix
      );
    } else {
      this._worldMatrix = this._localMatrix.clone();
    }
    // If updateChildren, update our children
    // (.children, .children.children, .children.children.children, ...)
    if (updateChildren)
      for (let i = 0; i < this._children.length; i++)
        this._children[i].computeWorldMatrix(false, true);
  }

  /**
   * Tambah ObjectNode sebagai child dari ObjectNode ini.
   *
   * Jika ObjectNode sudah memiliki parent, maka ObjectNode akan
   * dilepas dari parentnya terlebih dahulu.
   */
  add(n: ObjectNode): ObjectNode {
    if (n.parent !== this) {
      n.removeFromParent();
      n.parent = this;
    }
    this.children.push(n);
    return this;
  }

  remove(n: ObjectNode) {
    const index = this.children.indexOf(n);
    if (index !== -1) {
      n.parent = undefined;
      this.children.splice(index, 1);
    }
    return this;
  }

  removeFromParent() {
    if (this.parent) this.parent.remove(this);
    return this;
  }
}
