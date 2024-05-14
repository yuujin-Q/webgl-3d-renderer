import {
  AttributeDataType,
  AttributeMapSetters,
  AttributeSingleDataType,
} from "./AttributeSetter";
import { UniformMapSetters } from "./UniformSetter";

type ProgramInfo = {
  program: WebGLProgram;
  uniformSetters: UniformMapSetters;
  attributeSetters: AttributeMapSetters;
};
function setAttribute(
  programInfo: ProgramInfo,
  attributeName: string,
  ...data: AttributeDataType
) {
  const setters = programInfo.attributeSetters;
  if (attributeName in setters) {
    const shaderName = `a_${attributeName}`;
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
