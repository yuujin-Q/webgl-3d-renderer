import { degToRad } from "../../types/math/Degree";
import { M4 } from "../../types/math/M4";
import { Vec3 } from "../../types/math/Vec3";
import { Camera } from "../../types/objects/camera/Camera";
import { OrthographicCamera } from "../../types/objects/camera/OrthographicCamera";
import { ObliqueCamera } from "../../types/objects/camera/ObliqueCamera";
import { PerspectiveCamera } from "../../types/objects/camera/PerspectiveCamera";
import { Mesh } from "../../types/objects/mesh/Mesh";
import { ObjectNode } from "../../types/objects/ObjectNode";
import { Scene } from "../../types/objects/Scene";
import { MouseInput } from "../Mouse";
import {
  ProgramInfo,
  setAttributes,
  setUniform,
  setUniforms,
} from "../webglutils/ProgramInfo";
import { fetchShaderProgram } from "./ShaderManager";
import { Light } from "../../types/objects/light/Light";
import { PhongMaterial } from "../../types/objects/mesh/material/PhongMaterial";
import { DirectionalLight } from "../../types/objects/light/DirectionalLight";
import { Color } from "../../types/objects/Color";
import { BasicMaterial } from "../../types/objects/mesh/material/BasicMaterial";

export class Renderer {
  // gl classes
  private static gl: WebGLRenderingContext;

  // shader cache
  private static currentProgram: ProgramInfo;
  static setProgramInfo(info: ProgramInfo) {
    if (this.currentProgram !== info) {
      this.gl.useProgram(info.program);
      this.currentProgram = info;
    }
  }

  // scene data
  private static scene: Scene;
  private static light: Light;
  private static zoom = 1.5;
  private static size = 500;
  private static cameras: Camera[] = [
    new OrthographicCamera(
      -this.size * this.zoom,
      this.size * this.zoom,
      -this.size * this.zoom,
      this.size * this.zoom,
      -2000,
      2000
    ),
    new PerspectiveCamera(90, 1, -2000, 2000),
    new ObliqueCamera(
      -this.size * this.zoom,
      this.size * this.zoom,
      -this.size * this.zoom,
      this.size * this.zoom,
      -2000,
      2000,
      new Vec3(1, -2, 1)
    ),
  ];
  private static camera: Camera = this.cameras[0];

  // transformation
  private static _translate: Vec3 = new Vec3(0, 0, 0);
  private static _rotate: Vec3 = new Vec3(0, 0, 0);
  private static _scale: Vec3 = new Vec3(1, 1, 1);
  private static activeObject: string;
  static translation() {
    return this._translate;
  }
  static rotation() {
    return this._rotate;
  }
  static scaler() {
    return this._scale;
  }
  static getScene() {
    return this.scene;
  }
  static getCamera() {
    return this.camera;
  }
  static getLight() {
    return this.light;
  }
  static switchCamera(index: number) {
    this.setCamera(this.cameras[index]);
    this.renderScene();
  }

  static initializeRenderer(gl: WebGLRenderingContext | undefined | null) {
    if (!gl) {
      console.error("No GL");
      return;
    }
    this.gl = gl;

    // init mouse orbit
    this.setCamera(this.camera);
  }

  static setTranslation({ x, y, z }: { x?: number; y?: number; z?: number }) {
    if (x !== undefined) {
      this._translate.x = x;
    }
    if (y !== undefined) {
      this._translate.y = y;
    }
    if (z !== undefined) {
      this._translate.z = z;
    }
    this.setAttribObjectRecurrent(this.scene, true, false, false);
    this.renderScene();
  }
  static setRotation(
    { x, y, z }: { x?: number; y?: number; z?: number },
    isDegree: boolean
  ) {
    if (x !== undefined) {
      this._rotate.x = isDegree ? degToRad(x) : x;
    }
    if (y !== undefined) {
      this._rotate.y = isDegree ? degToRad(y) : y;
    }
    if (z !== undefined) {
      this._rotate.z = isDegree ? degToRad(z) : z;
    }
    this.setAttribObjectRecurrent(this.scene, false, true, false);
    this.renderScene();
  }
  static setScale({ x, y, z }: { x?: number; y?: number; z?: number }) {
    if (x !== undefined) {
      this._scale.x = x;
    }
    if (y !== undefined) {
      this._scale.y = y;
    }
    if (z !== undefined) {
      this._scale.z = z;
    }
    this.setAttribObjectRecurrent(this.scene, false, false, true);
    this.renderScene();
  }

  static setCamera(cam: Camera) {
    this.camera = cam;
    MouseInput.camera = cam;
  }

  static setLight(light: Light) {
    this.light = light;
  }

  static setTexture() {
    // todo: implement
  }

  static setScene(sc: Scene) {
    this.scene = sc;
  }

  static addChildOnCurrentObject(newChild: ObjectNode) {
    this.addChildOnCurrentObjectRecurrent(this.scene, newChild);
    this.renderScene();
  }

  static addChildOnCurrentObjectRecurrent(
    object: ObjectNode,
    newChild: ObjectNode
  ) {
    if (object.id != this.activeObject) {
      object.children.forEach((obj) => {
        this.addChildOnCurrentObjectRecurrent(obj, newChild);
      });
    } else {
      object.add(newChild);
    }
  }

  static getObjectById(id: string) {
    return this.getObjectByIdRecurrent(this.scene, id);
  }

  static getObjectByIdRecurrent(object: ObjectNode, id: string) {
    if (object.id !== id) {
      let res;
      object.children.forEach((obj) => {
        const tmp = this.getObjectByIdRecurrent(obj, id);
        if (tmp != undefined) {
          res = tmp;
        }
      });
      return res;
    } else {
      return object;
    }
  }

  static setColor(color: Color) {
    this.setColorRecurrent(this.scene, color);
  }

  static setColorRecurrent(object: ObjectNode, color: Color) {
    if (object.id == this.activeObject) {
      this.setMeshColorRecurrent(object, color);
    } else {
      object.children.forEach((obj) => this.setColorRecurrent(obj, color));
    }
  }

  static setMeshColorRecurrent(object: ObjectNode, color: Color) {
    if (!(object instanceof Mesh)) {
      object.children.forEach((obj) => this.setMeshColorRecurrent(obj, color));
    } else {
      if (object.material instanceof BasicMaterial) {
        object.material.attributes["a_color"] = new Float32Array([
          color.r,
          color.g,
          color.b,
        ]);
        console.log(object.material.attributes["a_color"]);
      }
    }
  }

  static removeObject(obj: ObjectNode) {
    this.removeObjectRecurrent(this.scene, obj);
  }

  static removeObjectRecurrent(parent: ObjectNode, obj: ObjectNode) {
    if (parent.children.indexOf(obj) >= 0) {
      parent.remove(obj);
    } else {
      parent.children.forEach((child) => {
        this.removeObjectRecurrent(child, obj);
      });
    }
  }

  private static processNodes(object: ObjectNode) {
    // Proses mesh, kamera, dan lainnya yang
    // terkait pada node
    if (object instanceof Mesh) {
      this.renderMesh(object);
    } else if (object instanceof Camera) {
      this.setCamera(object);
    }

    // Proses secara rekursif semua anak dari node
    object.children.forEach((child) => {
      this.processNodes(child);
    });
  }

  private static renderMesh(object: Mesh) {
    const geometry = object.geometry;
    const material = object.material;

    this.setProgramInfo(fetchShaderProgram(this.gl, material));

    setAttributes(this.currentProgram, geometry.attributes);
    setAttributes(this.currentProgram, material.attributes);
    setUniforms(this.currentProgram, material.uniforms);

    // compute object TRS and camera projection
    const transformationMatrix = M4.multiply(
      this.camera.viewProjectionMatrix,
      object.worldMatrix
    );

    // Todo : test save and load object for transformation
    // transformationMatrix = M4.translate(transformationMatrix, object.position);
    // transformationMatrix = M4.xRotate(transformationMatrix, object.rotation.x);
    // transformationMatrix = M4.yRotate(transformationMatrix, object.rotation.y);
    // transformationMatrix = M4.zRotate(transformationMatrix, object.rotation.z);
    // transformationMatrix = M4.scale(transformationMatrix, object.scale);

    setUniform(this.currentProgram, "u_matrix", transformationMatrix.elements);
    if (material instanceof PhongMaterial) {
      console.log(
        setUniform(this.currentProgram, "u_lightColor", [
          this.light.color.r,
          this.light.color.g,
          this.light.color.b,
        ])
      );
      console.log(
        setUniform(this.currentProgram, "u_lightSource", [
          (this.light as DirectionalLight).getDirection.x,
          (this.light as DirectionalLight).getDirection.y,
          (this.light as DirectionalLight).getDirection.z,
        ])
      );
    }

    setUniforms(this.currentProgram, this.light.uniforms);

    // setUniform(this.currentProgram, "u_ambient", [1, 1, 1]);
    // setUniform(this.glProgram, "uShininess", [100.0]);
    // setUniform(this.glProgram, "uLightDirection", [0.0, -1.0, 10.0]);
    // setUniform(this.glProgram, "uLightAmbient", [0.4, 0.4, 0.4, 1.0]);
    // setUniform(this.glProgram, "uLightDiffuse", [255.0, 255.0, 255.0, 1.0]);
    // setUniform(this.glProgram, "uLightSpecular", [0.3, 0.3, 0.3, 1.0]);
    // setUniform(this.glProgram, "uMaterialAmbient", [0.5, 0.5, 0.5, 1.0]);
    // setUniform(this.glProgram, "uMaterialDiffuse", [128, 205, 26, 1.0]);
    // setUniform(this.glProgram, "uMaterialSpecular", [0.34, 0.34, 0.34, 1.0]);

    this.gl.drawArrays(
      this.gl.TRIANGLES,
      0,
      geometry.getAttribute("a_position").length / 3
    );
  }

  static renderScene() {
    const gl = this.gl;
    console.log(this.scene);

    // todo: viewport and resize canvas?
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.CULL_FACE);
    gl.enable(gl.DEPTH_TEST);
    this.processNodes(this.scene);
  }
  static getActiveObject() {
    return this.activeObject;
  }

  static setActiveObject(id: string) {
    this.activeObject = id;
    this.getAttribObjectRecurrent(this.scene, true, true, true);
  }

  static setAttribObjectRecurrent(
    object: ObjectNode,
    translate: boolean = false,
    rotation: boolean = false,
    scale: boolean = false
  ) {
    if (object.id == this.activeObject) {
      if (translate) {
        object.position = this._translate;
      }
      if (rotation) {
        object.rotation = this._rotate;
      }
      if (scale) {
        object.scale = this._scale;
      }
      object.computeWorldMatrix(false, true);
    } else {
      object.children.forEach((child) =>
        this.setAttribObjectRecurrent(child, translate, rotation, scale)
      );
    }
  }

  static getAttribObjectRecurrent(
    object: ObjectNode,
    translate: boolean = false,
    rotation: boolean = false,
    scale: boolean = false
  ) {
    if (object.id == this.activeObject) {
      if (translate) {
        this._translate = object.position;
      }
      if (rotation) {
        this._rotate = object.rotation;
      }
      if (scale) {
        this._scale = object.scale;
      }
    } else {
      object.children.forEach((child) =>
        this.getAttribObjectRecurrent(child, translate, rotation, scale)
      );
    }
  }
}
