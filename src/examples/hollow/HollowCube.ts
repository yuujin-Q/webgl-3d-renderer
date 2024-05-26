import { Color } from "../../types/objects/Color";
import { BufferAttribute } from "../../types/objects/mesh/geometry/BufferAttribute";
import { FreeformGeometry } from "../../types/objects/mesh/geometry/FreeformGeometry";
import { PhongMaterial } from "../../types/objects/mesh/material/PhongMaterial";
import { Mesh } from "../../types/objects/mesh/Mesh";

export class HollowCube extends Mesh {
  constructor(height: number, length: number, width: number, thickness: number) {

    const thicknessInside = 1 / thickness;
    const hw = width * thicknessInside;
    const hh = height;
    const hd = length * thicknessInside;

    // Vertices of the cube polygon
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


    const verticesSide = HollowCube.rotateVertices(vertices, Math.PI / 2, 'z');
    const verticesSide2 = HollowCube.rotateVertices(vertices, Math.PI / 2, 'x');

    const hollowCubeVertices = [];
    // make 12 sides poles of the cube
    // 4 sides of the front face
    const rightFront = HollowCube.translateVertices(vertices, width, 0, length);
    hollowCubeVertices.push(...rightFront);
    const leftFront = HollowCube.translateVertices(vertices, -width, 0, length);
    hollowCubeVertices.push(...leftFront);
    const bottomFront = HollowCube.translateVertices(verticesSide, 0, -height*0.88, length);
    hollowCubeVertices.push(...bottomFront);
    const topFront = HollowCube.translateVertices(verticesSide, 0, height*0.88, length);
    hollowCubeVertices.push(...topFront);

    // 4 sides of the back face
    const rightBack = HollowCube.translateVertices(vertices, width, 0, -length);
    hollowCubeVertices.push(...rightBack);
    const leftBack = HollowCube.translateVertices(vertices, -width, 0, -length);
    hollowCubeVertices.push(...leftBack);
    const bottomBack = HollowCube.translateVertices(verticesSide, 0, -height*0.88, -length);
    hollowCubeVertices.push(...bottomBack);
    const topBack = HollowCube.translateVertices(verticesSide, 0, height*0.88, -length);
    hollowCubeVertices.push(...topBack);
    
    // make 2 sides of the right face
    const rightTop = HollowCube.translateVertices(verticesSide2, width, height*0.88, 0);
    hollowCubeVertices.push(...rightTop);
    const rightBottom = HollowCube.translateVertices(verticesSide2, width, -height*0.88, 0);
    hollowCubeVertices.push(...rightBottom);

    // make 2 sides of the left face
    const leftTop = HollowCube.translateVertices(verticesSide2, -width, height*0.88, 0);
    hollowCubeVertices.push(...leftTop);
    const leftBottom = HollowCube.translateVertices(verticesSide2, -width, -height*0.88, 0);
    hollowCubeVertices.push(...leftBottom);

    const positionAttr = new BufferAttribute(new Float32Array(hollowCubeVertices), 3);
    const geometry = new FreeformGeometry(positionAttr);

    const material = new PhongMaterial();
    material.defaultColor = new Color(0.5, 0.5, 0.5);
    material.enableDefaultColor(true);

    super(geometry, material);
    this.name = "HollowCube";
  }

  static translateVertices(vertices: Float32Array, x: number, y: number, z: number): Float32Array {
    const translatedVertices = [];
    for (let i = 0; i < vertices.length; i += 3) {
      translatedVertices.push(vertices[i] + x);
      translatedVertices.push(vertices[i + 1] + y);
      translatedVertices.push(vertices[i + 2] + z);
    }
    return new Float32Array(translatedVertices);
  }

  static rotateVertices(vertices: Float32Array, angle: number, axis: string = 'y'): Float32Array {
    const rotatedVertices = [];
    for (let i = 0; i < vertices.length; i += 3) {
      const x = vertices[i];
      const y = vertices[i + 1];
      const z = vertices[i + 2];
      let x1 = 0;
      let y1 = 0;
      let z1 = 0;
      if (axis === 'y') {
        x1 = x * Math.cos(angle) - z * Math.sin(angle);
        y1 = y;
        z1 = x * Math.sin(angle) + z * Math.cos(angle);
      } else if (axis === 'x') {
        x1 = x;
        y1 = y * Math.cos(angle) - z * Math.sin(angle);
        z1 = y * Math.sin(angle) + z * Math.cos(angle);
      } else{
        x1 = x * Math.cos(angle) - y * Math.sin(angle);
        y1 = x * Math.sin(angle) + y * Math.cos(angle);
        z1 = z;
      }
      rotatedVertices.push(x1);
      rotatedVertices.push(y1);
      rotatedVertices.push(z1);
    }
    return new Float32Array(rotatedVertices);
  }
}
