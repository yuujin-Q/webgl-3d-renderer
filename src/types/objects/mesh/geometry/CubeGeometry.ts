import { BufferAttribute } from "./BufferAttribute";
import { BufferGeometry } from "./BufferGeometry";

export class CubeGeometry extends BufferGeometry {
    width: number;
    height: number;
    depth: number;

    constructor(width = 1, height = 1, depth = 1) {
        super();
        this.width = width;
        this.height = height;
        this.depth = depth;

        const hw = width / 2;
        const hh = height / 2;
        const hd = depth / 2;

        // Vertices of a cube
        const vertices = new Float32Array([
            // Front face
            -hw, -hh, hd,
            hw, -hh, hd,
            hw, hh, hd,
            -hw, hh, hd,
            -hw, -hh, hd,
            hw, hh, hd,

            // Back face
            hw, -hh, -hd,
            -hw, -hh, -hd,
            -hw, hh, -hd,
            hw, hh, -hd,
            hw, -hh, -hd,
            -hw, hh, -hd,

            // Top face
            -hw, hh, hd,
            hw, hh, hd,
            hw, hh, -hd,
            -hw, hh, -hd,
            -hw, hh, hd,
            hw, hh, -hd,

            // Bottom face
            hw, -hh, hd,
            -hw, -hh, hd,
            -hw, -hh, -hd,
            hw, -hh, -hd,
            hw, -hh, hd,
            -hw, -hh, -hd,

            // Right face
            hw, -hh, hd,
            hw, -hh, -hd,
            hw, hh, -hd,
            hw, hh, hd,
            hw, -hh, hd,
            hw, hh, -hd,

            // Left face
            -hw, -hh, -hd,
            -hw, -hh, hd,
            -hw, hh, hd,
            -hw, hh, -hd,
            -hw, -hh, -hd,
            -hw, hh, hd,
        ]);

        this.setAttribute("a_position", new BufferAttribute(vertices, 3));
        this.calculateNormals();
    }
}

/*
    const materialCube = new ShaderMaterial("", "");
    materialCube.attributes["a_color"] = new BufferAttribute(
      new Uint8Array([
        // Front face colors (red)
        255, 0, 0, 255, 0, 0, 255, 0, 0, 255, 0, 0, 255, 0, 0, 255, 0, 0,
        // Back face colors (green)
        0, 255, 0, 0, 255, 0, 0, 255, 0, 0, 255, 0, 0, 255, 0, 0, 255, 0,
        // Top face colors (blue)
        0, 0, 255, 0, 0, 255, 0, 0, 255, 0, 0, 255, 0, 0, 255, 0, 0, 255,
        // Bottom face colors (yellow)
        255, 255, 0, 255, 255, 0, 255, 255, 0, 255, 255, 0, 255, 255, 0, 255, 255, 0,
        // Right face colors (magenta)
        255, 0, 255, 255, 0, 255, 255, 0, 255, 255, 0, 255, 255, 0, 255, 255, 0, 255,
        // Left face colors (cyan)
        0, 255, 255, 0, 255, 255, 0, 255, 255, 0, 255, 255, 0, 255, 255, 0, 255, 255,
      ]),
      3,
      {
        dtype: colorType,
        normalize: normalizeColor,
        stride: stride,
        offset: offset,
      }
    );
*/