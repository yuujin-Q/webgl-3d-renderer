import {
  AttributeBatchDataType,
  AttributeMapSetters,
  AttributeDataType,
} from "./AttributeSetter";
import { UniformMapSetters, UniformDataType } from "./UniformSetter";

export type ProgramInfo = {
  program: WebGLProgram;
  uniformSetters: UniformMapSetters;
  attributeSetters: AttributeMapSetters;
};

// set attribute methods
export function setAttribute(
  programInfo: ProgramInfo,
  attributeName: string,
  ...data: AttributeBatchDataType
) {
  const setters = programInfo.attributeSetters;
  if (attributeName in setters) {
    const shaderName = `${attributeName}`;
    setters[shaderName](...data);
  }
}
export function setAttributes(
  programInfo: ProgramInfo,
  attributes: { [attributeName: string]: AttributeDataType }
) {
  for (const attributeName in attributes) {
    setAttribute(programInfo, attributeName, attributes[attributeName]);
  }
}

// set uniform methods
export function setUniform(
  programInfo: ProgramInfo,
  uniformName: string,
  data: UniformDataType
) {
  const setters = programInfo.uniformSetters;
  if (uniformName in setters) {
    const shaderName = `${uniformName}`;
    setters[shaderName](data);
  }
}
export function setUniforms(
  programInfo: ProgramInfo,
  uniforms: { [uniformName: string]: UniformDataType }
) {
  for (const uniformName in uniforms)
    setUniform(programInfo, uniformName, uniforms[uniformName]);
}
