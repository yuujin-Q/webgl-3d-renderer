import { ShaderMaterial } from "../../types/objects/mesh/material/ShaderMaterial";
import { createAttributeSetters } from "../webglutils/AttributeSetter";
import { ProgramInfo } from "../webglutils/ProgramInfo";
import { createUniformSetters } from "../webglutils/UniformSetter";

// INIT FUNCTIONS
export function createShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string
) {
  const shader = gl.createShader(type);
  if (shader !== null) {
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
      return shader;
    }
  }

  gl.deleteShader(shader);
}
export function createProgram(
  gl: WebGLRenderingContext,
  vertexShader: WebGLShader,
  fragmentShader: WebGLShader
) {
  const program = gl.createProgram();
  if (program !== null) {
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    return program;
  }

  gl.deleteProgram(program);
}

const _shaderCache: Map<string, ProgramInfo> = new Map();
export function fetchShaderProgram(
  gl: WebGLRenderingContext,
  material: ShaderMaterial
): ProgramInfo {
  const progId = material.id;

  // cache shader program if not available
  if (!_shaderCache.has(progId)) {
    // create program
    const vertexShader = createShader(
      gl,
      gl.VERTEX_SHADER,
      material.vertexShader
    );
    if (vertexShader === undefined) {
      console.error("Failed to create vertex shader");
      return _shaderCache.entries().next().value;
    }

    const fragmentShader = createShader(
      gl,
      gl.FRAGMENT_SHADER,
      material.fragmentShader
    );
    if (fragmentShader === undefined) {
      console.error("Failed to create fragment shader");
      return _shaderCache.entries().next().value;
    }

    const program = createProgram(gl, vertexShader, fragmentShader);

    if (program === undefined) {
      console.error("Failed to create shader program");
      return _shaderCache.entries().next().value;
    }

    _shaderCache.set(progId, {
      program,
      attributeSetters: createAttributeSetters(gl, program),
      uniformSetters: createUniformSetters(gl, program),
    });
  }

  return _shaderCache.get(progId)!;
}
