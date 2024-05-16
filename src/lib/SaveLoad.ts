/* eslint-disable @typescript-eslint/no-explicit-any */
// save function to .gltf JSON file
// import { Vec3 } from "../types/math/Vec3";
import { ObjectNode } from "../types/objects/ObjectNode";
import { Mesh } from "../types/objects/mesh/Mesh";
import { Renderer } from "./Renderer";
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
  
  static load(json: string): ObjectNode {
      const data = JSON.parse(json);
      const nodesData = data.nodes;
      const nodes: ObjectNode[] = [];
      const nodeIndices = new Map<number, ObjectNode>();

      // combine geometry and material inside element in nodesData
      // alert(JSON.stringify(nodesData.length));
      // for (let i = 0; i < nodesData.length; i++) {
      //   if (nodesData[i].geometry && nodesData[i].material) {
      //     const nodeDataMesh: any = {};
      //     nodeDataMesh.geometry = nodesData[i].geometry;
      //     nodeDataMesh.material = nodesData[i+1].material;
      //     // remove the geometry and material from nodesData and 
      //     // add change the nodeDataMesh to nodesData
      //     nodes.push(GLTFConverter.fromJSON(nodeDataMesh));
      //     alert(JSON.stringify(nodeDataMesh));
      //     // check parent
      //     if (nodesData[i].parent !== null) {
      //       nodes[i].parent = nodes[nodesData[i+1].parent];
      //       // set children for parent
      //       nodes[nodesData[i+1].parent].children.push(nodes[i]);
      //     }
      //     i++;
      //   } else {
      //     nodes.push(GLTFConverter.fromJSON(nodesData[i]));
      //     // check parent
      //     if (nodesData[i].parent !== null) {
      //       nodes[i].parent = nodes[nodesData[i].parent];
      //       // set children for parent
      //       nodes[nodesData[i].parent].children.push(nodes[i]);
      //     }
      //   }
      //   nodeIndices.set(i, nodes[i]);
      // }

      // for (const nodeData of nodesData) {
      //     const node = GLTFConverter.fromJSON(nodeData);
      //     alert(JSON.stringify(nodeData));
      //     nodes.push(node);
      //         if (nodeData.parent !== null) {
      //           const parentNode = nodeIndices.get(nodeData.parent);
      //           if (parentNode !== undefined) {
      //             node.parent = parentNode;
      //             // set children for parent
      //             parentNode.children.push(node);
      //           }
      //         }
      //       }
        for (let i = 0; i < nodesData.length; i++) {
            const node = GLTFConverter.fromJSON(nodesData[i]);
            nodes.push(node);
            if (nodesData[i].parent !== null) {
                nodes[i].parent = nodes[nodesData[i].parent];
                // set children for parent
                nodes[nodesData[i].parent].children.push(nodes[i]);
            }
        }
        console.log("nodes: ", nodes);
          Renderer.setScene(nodes[0]);
    Renderer.renderScene();
    return nodes[0];
  }
}