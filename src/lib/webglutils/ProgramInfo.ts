import {
  AttributeDataType,
  AttributeMapSetters,
  AttributeSingleDataType,
} from "./AttributeSetter";
import {
  UniformDataType,
  UniformMapSetters,
  UniformSingleDataType,
} from "./UniformSetter";

export type ProgramInfo = {
  program: WebGLProgram;
  uniformSetters: UniformMapSetters;
  attributeSetters: AttributeMapSetters;
};

// set attribute methods
export function setAttribute(
  programInfo: ProgramInfo,
  attributeName: string,
  ...data: AttributeDataType
) {
  const setters = programInfo.attributeSetters;
  if (attributeName in setters) {
    console.log("Set Attribute", attributeName);
    console.log(data);
    const shaderName = `${attributeName}`;
    setters[shaderName](...data);
  }
}
export function setAttributes(
  programInfo: ProgramInfo,
  attributes: { [attributeName: string]: AttributeSingleDataType }
) {
  for (const attributeName in attributes) {
    setAttribute(programInfo, attributeName, attributes[attributeName]);
  }
}

// set uniform methods
export function setUniform(
  programInfo: ProgramInfo,
  uniformName: string,
  ...data: UniformDataType
) {
  // accepts attributeName in format "a_attribute"
  const setters = programInfo.uniformSetters;
  if (uniformName in setters) {
    console.log("Set Uniform", uniformName);
    console.log(data);
    const shaderName = `${uniformName}`;
    setters[shaderName](...data);
  }
}
export function setUniforms(
  programInfo: ProgramInfo,
  uniforms: { [uniformName: string]: UniformSingleDataType }
) {
  for (const uniformName in uniforms)
    setAttribute(programInfo, uniformName, uniforms[uniformName]);
}
