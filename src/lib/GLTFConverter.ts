/* eslint-disable @typescript-eslint/no-explicit-any */
import { Camera } from "../types/objects/camera/Camera";
import { ObjectNode } from "../types/objects/ObjectNode";
import { Mesh } from "../types/objects/mesh/Mesh";
import { Renderer } from "./renderer/Renderer";

export class GLTFConverter {
  static toJSON(node: any): object {
    if (node instanceof Mesh) {
      return Mesh.toJSON(node);
    } else if (node instanceof Camera) {
      return Camera.toJSON(node);
    } else if (node instanceof ObjectNode) {
      return ObjectNode.toJSON(node);
    } else {
      throw new Error("Unknown node type");
    }
  }

  static fromJSON(json: any): ObjectNode {
    if (json.geometry) {
      return Mesh.fromJSON(json);
    } else if (json.projectionMatrix) {
      const cam = Camera.fromJSON(json);
      Renderer.setCamera(cam);
      return cam;
    } else {
      return ObjectNode.fromJSON(json);
    }
  }

  static save(rootNode: ObjectNode): string {
    // add camera to rootNode
    rootNode.add(Renderer.getCamera());
    const nodes: any[] = [];
    const nodeIndices = new Map<ObjectNode, number>();

    function processNode(
      this: any,
      node: ObjectNode,
      parentIndex: number | null = null
    ) {
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

    for (let i = 0; i < nodesData.length; i++) {
      const node = GLTFConverter.fromJSON(nodesData[i]);
      nodes.push(node);
      if (nodesData[i].parent !== null) {
        nodes[i].parent = nodes[nodesData[i].parent];
        // set children for parent
        nodes[nodesData[i].parent].add(nodes[i]);
      }
    }
    console.log("Loading nodes: ", nodes);
    return nodes[0];
  }
}
