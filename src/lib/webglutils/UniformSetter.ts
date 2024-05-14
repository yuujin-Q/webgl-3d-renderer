import { BufferAttribute } from "../../types/objects/mesh/geometry/BufferAttribute";

// TODO: replace uniform setter implementation placeholders
export type UniformSingleDataType = BufferAttribute | Float32Array | number[];
export type UniformDataType = [UniformSingleDataType] | number[];
export type UniformSetters = (...v: UniformDataType) => void;
export type UniformMapSetters = { [key: string]: UniformSetters };
export function createUniformSetters(
  gl: WebGLRenderingContext,
  program: WebGLProgram
): UniformMapSetters {
  function createAttributeSetter(info: WebGLActiveInfo): UniformSetters {
    // Initialization Time
    const loc = gl.getAttribLocation(program, info.name);
    const buf = gl.createBuffer();
    return (...values) => {
      // Render Time (saat memanggil setAttributes() pada render loop)
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      const v = values[0];
      if (v instanceof BufferAttribute) {
        if (v.isDirty) {
          // Data Changed Time (note that buffer is already binded)
          gl.bufferData(gl.ARRAY_BUFFER, v.data, gl.STATIC_DRAW);
          v.consume();
        }
        gl.enableVertexAttribArray(loc);
        gl.vertexAttribPointer(
          loc,
          v.size,
          v.dtype,
          v.normalize,
          v.stride,
          v.offset
        );
      } else {
        gl.disableVertexAttribArray(loc);
        if (v instanceof Float32Array)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (gl as any)[`vertexAttrib${v.length}fv`](loc, v);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        else (gl as any)[`vertexAttrib${values.length}f`](loc, ...values);
      }
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const attribSetters: { [key: string]: any } = {};
  const numAttribs = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
  for (let i = 0; i < numAttribs; i++) {
    const info = gl.getActiveAttrib(program, i);
    if (!info) continue;
    attribSetters[info.name] = createAttributeSetter(info);
  }
  return attribSetters;
}