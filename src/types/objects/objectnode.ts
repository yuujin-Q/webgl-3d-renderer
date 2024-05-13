import { M4 } from "../math/m4";
import { Vec3 } from "../math/vec3";

export class ObjectNode {
  private _position: Vec3 = new Vec3();
  private _rotation: Vec3 = new Vec3();
  private _scale: Vec3 = new Vec3(1, 1, 1);
  private _localMatrix: M4 = M4.identity();
  private _worldMatrix: M4 = M4.identity();
  private _parent?: ObjectNode;
  private _children: ObjectNode[] = [];
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

  // Public setter
  // Should update world matrix if parent changed
  set parent(parent) {
    if (this._parent !== parent) {
      this._parent = parent;
      this.computeWorldMatrix(false, true);
    }
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
      this._worldMatrix = M4.multiply(this.parent.worldMatrix, this._localMatrix);
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
    console.log(n)
    // TODO: hapus ObjectNode dari this.children (jangan lupa set ObjectNode.parent = null)
    return this;
  }

  removeFromParent() {
    if (this.parent) this.parent.remove(this);
    return this;
  }
}
