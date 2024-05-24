import { Texture } from "../../types/objects/mesh/material/Texture";
import { UniformSetterWebGLType } from "./WebGLType";

export type UniformTextureType = Texture | Texture[];
export type UniformDataType = Iterable<number> | UniformTextureType;
export type UniformSetters = (v: UniformDataType) => void;
export type UniformMapSetters = { [key: string]: UniformSetters };
// reference implementation: https://github.com/Fi1osof/webgl-utils.git

function isPowerOf2(value: number) {
  return (value & (value - 1)) == 0;
}

export function createUniformSetters(
  gl: WebGLRenderingContext,
  program: WebGLProgram
): UniformMapSetters {
  function createUniformSetter(info: WebGLActiveInfo): UniformSetters {
    // Initialization Time
    const loc = gl.getUniformLocation(program, info.name);
    const uniformType = info.type;
    const isArray = info.size > 1 && info.name.slice(-3) === "[0]";
    let textureUnit = 0;
    return (values) => {
      // Render Time (saat memanggil setUniforms() pada render loop)
      if (uniformType === gl.SAMPLER_2D || uniformType === gl.SAMPLER_CUBE) {
        // Kasus tekstur
        const unit = textureUnit; // Claim texture unit
        textureUnit += info.size; // info.size > 1 kalau sampler array
        const setupTexture = (v: Texture) => {
          v._texture = v._texture || gl.createTexture();
          gl.bindTexture(gl.TEXTURE_2D, v._texture); // bind tekstur sementara
          const isPOT = isPowerOf2(v.width) && isPowerOf2(v.height);
          if (v.needsUpload) {
            // Jika butuh upload data, lakukan upload
            v.needsUpload = false;
            if (v.isLoaded) {
              // Sudah load, gaskan upload
              if (v.data instanceof Uint8Array) {
                gl.texImage2D(
                  gl.TEXTURE_2D,
                  0,
                  v.format,
                  v.width,
                  v.height,
                  0,
                  v.format,
                  v.type,
                  v.data
                );
              } else {
                gl.texImage2D(
                  gl.TEXTURE_2D,
                  0,
                  v.format,
                  v.format,
                  v.type,
                  v.data!
                );
              }
              if (isPOT) gl.generateMipmap(gl.TEXTURE_2D);
            } else {
              // Belum load / gak ada data
              gl.texImage2D(
                gl.TEXTURE_2D,
                0,
                gl.RGBA,
                1,
                1,
                0,
                gl.RGBA,
                gl.UNSIGNED_BYTE,
                new Uint8Array(v.defaultColor)
              );
            }
          }
          if (v.parameterChanged) {
            // Jika parameter berubah, lakukan set parameter
            v.parameterChanged = false;
            if (!isPOT) {
              v.wrapS = v.wrapT = gl.CLAMP_TO_EDGE;
              v.minFilter = gl.LINEAR;
              console.log("image is not POT, fallback params", v);
            }
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, v.wrapS);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, v.wrapT);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, v.minFilter);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, v.magFilter);
          }
          gl.bindTexture(gl.TEXTURE_2D, null); // balikkan bind ke null
        };
        const renderTexture = (v: Texture) => {
          // Pilih tekstur unit, bind tekstur ke unit, set uniform sampler ke unit.
          gl.activeTexture(gl.TEXTURE0 + unit);
          gl.bindTexture(gl.TEXTURE_2D, v._texture);
        };
        const render = (v: Texture) => {
          setupTexture(v);
          renderTexture(v);
        };

        // == Render Time
        if (isArray && Array.isArray(values)) {
          // texture array
          values.forEach(render);
          gl.uniform1iv(
            loc,
            values.map((_, i) => unit + i)
          );
        } else if (values instanceof Texture) {
          render(values);
          gl.uniform1i(loc, unit);
        }
      } else {
        if (
          !(
            uniformType === gl.FLOAT_MAT2 ||
            uniformType === gl.FLOAT_MAT3 ||
            uniformType === gl.FLOAT_MAT4
          )
        ) {
          // handles passing single 1[fi] using vector 1[fi]v
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (gl as any)[`uniform${UniformSetterWebGLType[info.type]}v`](
            loc,
            values
          );
        } else {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (gl as any)[`uniform${UniformSetterWebGLType[info.type]}`](
            loc,
            false,
            values
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
