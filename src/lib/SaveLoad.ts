/* eslint-disable @typescript-eslint/no-explicit-any */
// save function to .gltf JSON file
// import { Vec3 } from "../types/math/Vec3";
import { ObjectNode } from "../types/objects/ObjectNode";
import { Mesh } from "../types/objects/mesh/Mesh";
// import { ShaderMaterial } from "../types/objects/mesh/material/ShaderMaterial";
// import { WebGLType } from "./webglutils/WebGLType";
// import { BufferAttribute } from "../types/objects/mesh/geometry/BufferAttribute";
// import { BufferGeometry } from "../types/objects/mesh/geometry/BufferGeometry";

export class GLTFConverter {
  static toJSON(node: any): object {
      if (node instanceof Mesh) {
          return (Mesh.toJSON(node));
      }
      else if (node instanceof ObjectNode) {
          return (ObjectNode.toJSON(node));
      } 
      else {
          throw new Error("Unknown node type");
      }
  }

  static fromJSON(json: any): ObjectNode {
      if (json.geometry) {
          return Mesh.fromJSON(json);
      }
      else {
          return ObjectNode.fromJSON(json);
      }
  }

  static save(rootNode: ObjectNode): string {
      const nodes: any[] = [];
      const nodeIndices = new Map<ObjectNode, number>();
  
      function processNode(this: any, node: ObjectNode, parentIndex: number | null = null) {
        const index = nodes.length;
        nodeIndices.set(node, index);
  
        const nodeData = GLTFConverter.toJSON(node);
        // alert(JSON.stringify(nodeData));
        nodes.push(nodeData);
        nodes[index].parent = parentIndex;

        if (node.children.length > 0) {
          // nodes[index].children 
          for (const child of node.children) {
            processNode(child, index);
            // nodes[index].children.push(childIndex);
          }
        }

      }
  
      processNode(rootNode);
  
      const gltf = {
        asset: {
          version: "2.0",
        },
        scenes: [
          {
            nodes: [0],
          },
        ],
        nodes,
      };
  
      return JSON.stringify(gltf, null, 2);
  }
  // static load(json: string): ObjectNode {
  //     const data = JSON.parse(json);
  //     const nodesData = data.nodes;
  //     const rootNode = GLTFConverter.fromJSON(nodesData[0]);
  //     for 
  // }
}