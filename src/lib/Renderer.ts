import { degToRad } from "../types/math/Degree";
import { M4 } from "../types/math/M4";
import { Vec3 } from "../types/math/Vec3";
import { Camera } from "../types/objects/camera/Camera";
import { Mesh } from "../types/objects/mesh/Mesh";
import { ObjectNode } from "../types/objects/ObjectNode";
import { Scene } from "../types/objects/Scene";
import { createAttributeSetters } from "./webglutils/AttributeSetter";
import {
  ProgramInfo,
  setAttributes,
  setUniform,
} from "./webglutils/ProgramInfo";
import { createUniformSetters } from "./webglutils/UniformSetter";

export class Renderer {
  // gl classes
  private static gl: WebGLRenderingContext;
  private static glProgram: ProgramInfo;

  // shaders
  private static defaultVertexShader = `
    attribute vec4 a_position;
    attribute vec4 a_color;

    uniform mat4 u_matrix;

    varying vec4 v_color;

    void main() {
      // Multiply the position by the matrix.
      gl_Position = u_matrix * a_position;

      // Pass the color to the fragment shader.
      v_color = a_color;
    }
    `;
  private static defaultFragmentShader = `
    precision mediump float;

    // Passed in from the vertex shader.
    varying vec4 v_color;

    void main() {
      gl_FragColor = v_color;
    }
    `;

  // scene data
  private static scene: Scene;
  private static camera: Camera;

  // transformation
  private static _translate: Vec3 = new Vec3(95, 15, 15);
  private static _rotate: Vec3 = new Vec3(0, 0, 0);
  private static _scale: Vec3 = new Vec3(1, 1, 1);
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

  static initializeRenderer(
    gl: WebGLRenderingContext | undefined | null,
    vertexShaderSource?: string,
    fragmentShaderSource?: string
  ) {
    // use default shaders if source not provided
    if (vertexShaderSource === undefined) {
      vertexShaderSource = this.defaultVertexShader;
    }
    if (fragmentShaderSource === undefined) {
      fragmentShaderSource = this.defaultFragmentShader;
    }
    // INIT FUNCTIONS
    const createShader = (
      glc: WebGLRenderingContext,
      type: number,
      source: string
    ) => {
      const shader = glc.createShader(type);
      if (shader !== null) {
        glc.shaderSource(shader, source);
        glc.compileShader(shader);
        const success = glc.getShaderParameter(shader, glc.COMPILE_STATUS);
        if (success) {
          return shader;
        }
      }

      glc.deleteShader(shader);
    };
    const createProgram = (
      glc: WebGLRenderingContext,
      vertexShader: WebGLShader,
      fragmentShader: WebGLShader
    ) => {
      const program = glc.createProgram();
      if (program !== null) {
        glc.attachShader(program, vertexShader);
        glc.attachShader(program, fragmentShader);
        glc.linkProgram(program);
        return program;
      }

      glc.deleteProgram(program);
    };

    if (!gl) {
      console.error("No GL");
      return;
    }
    this.gl = gl;

    // create vertex shaders and fragment shaders
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(
      gl,
      gl.FRAGMENT_SHADER,
      fragmentShaderSource
    );
    if (vertexShader === undefined || fragmentShader === undefined) {
      console.error("Shader initialization failed");
      return;
    }

    // create gl program
    const program = createProgram(gl, vertexShader, fragmentShader);
    if (program === undefined) {
      console.error("GL Program initialization failed");
      return;
    }
    gl.useProgram(program);
    this.glProgram = {
      program: program,
      attributeSetters: createAttributeSetters(gl, program),
      uniformSetters: createUniformSetters(gl, program),
    };
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
    this.renderScene();
  }

  static setCamera(cam: Camera) {
    this.camera = cam;
  }
  static setTexture() {
    // todo: implement
  }

  static setScene(sc: Scene) {
    this.scene = sc;
  }

  private static processNodes(object: ObjectNode) {
    // Proses mesh, kamera, dan lainnya yang
    // terkait pada node
    if (object instanceof Mesh) {
      console.log("Process node instanceof mesh");

      this.renderMesh(object);
    } else if (object instanceof Camera) {
      console.log("Set renderer camera to Camera");

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

    setAttributes(this.glProgram, geometry.attributes);
    setAttributes(this.glProgram, material.attributes);
    this.camera.computeProjectionMatrix();
    let transformationMatrix = this.camera.viewProjectionMatrix;
    transformationMatrix = M4.translate(transformationMatrix, this._translate);
    transformationMatrix = M4.xRotate(transformationMatrix, this._rotate.x);
    transformationMatrix = M4.yRotate(transformationMatrix, this._rotate.y);
    transformationMatrix = M4.zRotate(transformationMatrix, this._rotate.z);
    transformationMatrix = M4.scale(transformationMatrix, this._scale);

    setUniform(this.glProgram, "u_matrix", transformationMatrix.elements);
    this.gl.drawArrays(
      this.gl.TRIANGLES,
      0,
      geometry.getAttribute("a_position").length / 3
    );
  }

  static renderScene() {
    const gl = this.gl;

    // todo: viewport and resize canvas?
    gl.useProgram(this.glProgram.program);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.CULL_FACE);
    gl.enable(gl.DEPTH_TEST);
    this.processNodes(this.scene.children[0]);
  }
}
