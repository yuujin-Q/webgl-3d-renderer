import { M4 } from "../types/math/M4";
import { Vec3 } from "../types/math/Vec3";
import { WebGLType } from "./WebGLType";

export class Renderer {
  // gl classes
  private static glProgram: WebGLProgram;
  private static gl: WebGLRenderingContext;
  private static positionBuffer: WebGLBuffer;
  private static colorBuffer: WebGLBuffer;

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

  // vertex and colors
  private static positions: number[] = [];
  private static colors: number[] = [];
  private static vertexCount = 0;

  // transformation
  private static _translate: Vec3 = new Vec3(0, 0, 0);
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
    console.log("yes");

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
    this.glProgram = program;
  }

  static setGeometry(vertex: number[]) {
    this.positions = vertex;
    const gl = this.gl;

    const positionAttribute = gl.getAttribLocation(
      this.glProgram,
      "a_position"
    );
    gl.enableVertexAttribArray(positionAttribute);
    this.positionBuffer = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array(this.positions),
      gl.STATIC_DRAW
    );
    this.vertexCount = vertex.length / 3;
  }
  static setColors(color: number[]) {
    if (color.length / 3 != this.vertexCount) {
      console.error("unequal length");
      return;
    }
    this.colors = color;
    const gl = this.gl;

    const colorAttribute = gl.getAttribLocation(this.glProgram, "a_color");
    gl.enableVertexAttribArray(colorAttribute);
    this.colorBuffer = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Uint8Array(this.colors), gl.STATIC_DRAW);
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
    const degToRad = (val: number) => (val * Math.PI) / 180;
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

  static setCamera() {
    // todo: implement
  }

  static setTexture() {
    // todo: implement
  }

  static renderScene() {
    // args for buffer data parsing
    const size = 3;
    const vertexType = WebGLType.FLOAT;
    const colorType = WebGLType.UNSIGNED_BYTE;
    const normalizeVertex = false;
    const normalizeColor = true;
    const stride = 0;
    const offset = 0;

    const gl = this.gl;
    const program = this.glProgram;

    // todo: viewport and resize canvas
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.CULL_FACE);
    gl.enable(gl.DEPTH_TEST);

    // link vertex buffer to vertex attribute
    const positionAttribute = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionAttribute);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
    // Set up the position attribute pointer
    gl.vertexAttribPointer(
      positionAttribute,
      size,
      vertexType,
      normalizeVertex,
      stride,
      offset
    );

    // link color buffer to color attribute
    const colorAttribute = gl.getAttribLocation(program, "a_color");
    gl.enableVertexAttribArray(colorAttribute);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
    // Set up the position attribute pointer
    gl.vertexAttribPointer(
      colorAttribute,
      size,
      colorType,
      normalizeColor,
      stride,
      offset
    );

    const uniformLocation = gl.getUniformLocation(program, "u_matrix");

    let transformationMatrix = M4.projection(
      gl.canvas.width,
      gl.canvas.height,
      400
    );
    transformationMatrix = M4.translate(transformationMatrix, this._translate);
    transformationMatrix = M4.xRotate(transformationMatrix, this._rotate.x);
    transformationMatrix = M4.yRotate(transformationMatrix, this._rotate.y);
    transformationMatrix = M4.zRotate(transformationMatrix, this._rotate.z);
    transformationMatrix = M4.scale(transformationMatrix, this._scale);

    // todo: is this correct?
    gl.uniformMatrix4fv(uniformLocation, false, transformationMatrix.elements);

    // Render the shader program
    gl.drawArrays(gl.TRIANGLES, 0, this.vertexCount);
  }
}
