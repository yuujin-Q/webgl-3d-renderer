import { BufferAttribute } from "../../types/objects/mesh/geometry/BufferAttribute";

export type AttributeDataType =
  | BufferAttribute
  | Float32Array
  | Uint8Array
  | number[];
export type AttributeBatchDataType = [AttributeDataType] | number[];
export type AttributeSetters = (...v: AttributeBatchDataType) => void;
export type AttributeMapSetters = { [key: string]: AttributeSetters };
export function createAttributeSetters(
  gl: WebGLRenderingContext,
  program: WebGLProgram
): AttributeMapSetters {
  function createAttributeSetter(info: WebGLActiveInfo): AttributeSetters {
    // Initialization Time
    const loc = gl.getAttribLocation(program, info.name);
    return (...values) => {
      // Render Time (saat memanggil setAttributes() pada render loop)
      const v = values[0];
      if (v instanceof BufferAttribute) {
        v.buffer = v.buffer || gl.createBuffer()!;
        gl.bindBuffer(gl.ARRAY_BUFFER, v.buffer);
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

        if (v instanceof Float32Array || v instanceof Uint8Array) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (gl as any)[`vertexAttrib${v.length}fv`](loc, v);
        }
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
