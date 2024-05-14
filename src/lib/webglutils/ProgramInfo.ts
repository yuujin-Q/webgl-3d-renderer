import {
  AttributeDataType,
  AttributeMapSetters,
  AttributeSingleDataType,
} from "./AttributeSetter";
import { UniformMapSetters } from "./UniformSetter";

export type ProgramInfo = {
  program: WebGLProgram;
  uniformSetters: UniformMapSetters;
  attributeSetters: AttributeMapSetters;
};
export function setAttribute(
  programInfo: ProgramInfo,
  attributeName: string,
  ...data: AttributeDataType
) {
  // accepts attributeName in format "a_attribute"
  const setters = programInfo.attributeSetters;
  if (attributeName in setters) {
    const shaderName = `${attributeName}`;
    setters[shaderName](...data);
  }
}
export function setAttributes(
  programInfo: ProgramInfo,
  attributes: { [attributeName: string]: AttributeSingleDataType }
) {
  for (const attributeName in attributes)
    setAttribute(programInfo, attributeName, attributes[attributeName]);
}
