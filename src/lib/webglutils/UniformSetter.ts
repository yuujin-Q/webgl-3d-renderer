import { UniformSetterWebGLType } from "./WebGLType";

export type UniformSingleDataType = Float32Array | number[];
export type UniformDataType = [UniformSingleDataType] | number[];
export type UniformSetters = (...v: UniformDataType) => void;
export type UniformMapSetters = { [key: string]: UniformSetters };
// reference implementation: https://github.com/Fi1osof/webgl-utils.git
export function createUniformSetters(
  gl: WebGLRenderingContext,
  program: WebGLProgram
): UniformMapSetters {
  function createUniformSetter(info: WebGLActiveInfo): UniformSetters {
    // Initialization Time
    const loc = gl.getUniformLocation(program, info.name);
    const uniformType = info.type;
    const isArray = info.size > 1 && info.name.slice(-3) === "[0]";
    return (...values) => {
      // Render Time (saat memanggil setAttributes() pada render loop)
      const v = values[0];
      if (uniformType === gl.SAMPLER_2D || uniformType === gl.SAMPLER_CUBE) {
        if (isArray) {
          console.error("todo: implement handler for samplers");
        } else {
          console.error("todo: implement handler for samplers");
        }
      } else {
        if (
          !(
            uniformType === gl.FLOAT_MAT2 ||
            uniformType === gl.FLOAT_MAT3 ||
            uniformType === gl.FLOAT_MAT4
          )
        ) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (gl as any)[`uniform${UniformSetterWebGLType[info.type]}v`](loc, v);
        } else {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (gl as any)[`uniform${UniformSetterWebGLType[info.type]}`](
            loc,
            false,
            v
          );
        }
      }
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const uniformSetters: { [key: string]: any } = {};
  const numUniforms = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
  for (let i = 0; i < numUniforms; i++) {
    const info = gl.getActiveUniform(program, i);
    if (!info) continue;
    uniformSetters[info.name] = createUniformSetter(info);
  }
  return uniformSetters;
}
