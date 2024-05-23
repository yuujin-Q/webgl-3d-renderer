import { BufferAttribute } from "../types/objects/mesh/geometry/BufferAttribute";
import { WebGLType } from "../lib/webglutils/WebGLType";
import { BufferGeometry } from "../types/objects/mesh/geometry/BufferGeometry";
import { PlaneGeometry } from "../types/objects/mesh/geometry/PlaneGeometry";
import { Mesh } from "../types/objects/mesh/Mesh";
import { CubeGeometry } from "../types/objects/mesh/geometry/CubeGeometry";
import { PhongMaterial } from "../types/objects/mesh/material/PhongMaterial";
import { BasicMaterial } from "../types/objects/mesh/material/BasicMaterial";
import { Scene } from "../types/objects/Scene";
import { Vec3 } from "../types/math/Vec3";
import { AnimalModel } from "./articulated/AnimalModel";
import { RobotModel } from "./articulated/RobotModel";

const colorType = WebGLType.UNSIGNED_BYTE;
const normalizeColor = true;
const stride = 0;
const offset = 0;
const fobject = new BufferGeometry();
fobject.setAttribute(
  "a_position",
  new BufferAttribute(
    new Float32Array([
      // left column front
      0, 0, 0, 0, 150, 0, 30, 0, 0, 0, 150, 0, 30, 150, 0, 30, 0, 0,

      // top rung front
      30, 0, 0, 30, 30, 0, 100, 0, 0, 30, 30, 0, 100, 30, 0, 100, 0, 0,

      // middle rung front
      30, 60, 0, 30, 90, 0, 67, 60, 0, 30, 90, 0, 67, 90, 0, 67, 60, 0,

      // left column back
      0, 0, 30, 30, 0, 30, 0, 150, 30, 0, 150, 30, 30, 0, 30, 30, 150, 30,

      // top rung back
      30, 0, 30, 100, 0, 30, 30, 30, 30, 30, 30, 30, 100, 0, 30, 100, 30, 30,

      // middle rung back
      30, 60, 30, 67, 60, 30, 30, 90, 30, 30, 90, 30, 67, 60, 30, 67, 90, 30,

      // top
      0, 0, 0, 100, 0, 0, 100, 0, 30, 0, 0, 0, 100, 0, 30, 0, 0, 30,

      // top rung right
      100, 0, 0, 100, 30, 0, 100, 30, 30, 100, 0, 0, 100, 30, 30, 100, 0, 30,

      // under top rung
      30, 30, 0, 30, 30, 30, 100, 30, 30, 30, 30, 0, 100, 30, 30, 100, 30, 0,

      // between top rung and middle
      30, 30, 0, 30, 60, 30, 30, 30, 30, 30, 30, 0, 30, 60, 0, 30, 60, 30,

      // top of middle rung
      30, 60, 0, 67, 60, 30, 30, 60, 30, 30, 60, 0, 67, 60, 0, 67, 60, 30,

      // right of middle rung
      67, 60, 0, 67, 90, 30, 67, 60, 30, 67, 60, 0, 67, 90, 0, 67, 90, 30,

      // bottom of middle rung.
      30, 90, 0, 30, 90, 30, 67, 90, 30, 30, 90, 0, 67, 90, 30, 67, 90, 0,

      // right of bottom
      30, 90, 0, 30, 150, 30, 30, 90, 30, 30, 90, 0, 30, 150, 0, 30, 150, 30,

      // bottom
      0, 150, 0, 0, 150, 30, 30, 150, 30, 0, 150, 0, 30, 150, 30, 30, 150, 0,

      // left side
      0, 0, 0, 0, 0, 30, 0, 150, 30, 0, 0, 0, 0, 150, 30, 0, 150, 0,
    ]),
    3,
    {
      dtype: WebGLType.FLOAT,
      normalize: false,
      stride: stride,
      offset: offset,
    }
  )
);

const fmaterial = new BasicMaterial();
fmaterial.attributes["a_color"] = new BufferAttribute(
  new Uint8Array([
    // 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128,
    // left column front
    200, 70, 120, 200, 70, 120, 200, 70, 120, 200, 70, 120, 200, 70, 120, 200,
    70, 120,

    // top rung front
    200, 70, 120, 200, 70, 120, 200, 70, 120, 200, 70, 120, 200, 70, 120, 200,
    70, 120,

    // middle rung front
    200, 70, 120, 200, 70, 120, 200, 70, 120, 200, 70, 120, 200, 70, 120, 200,
    70, 120,

    // left column back
    80, 70, 200, 80, 70, 200, 80, 70, 200, 80, 70, 200, 80, 70, 200, 80, 70,
    200,

    // top rung back
    80, 70, 200, 80, 70, 200, 80, 70, 200, 80, 70, 200, 80, 70, 200, 80, 70,
    200,

    // middle rung back
    80, 70, 200, 80, 70, 200, 80, 70, 200, 80, 70, 200, 80, 70, 200, 80, 70,
    200,

    // top
    70, 200, 210, 70, 200, 210, 70, 200, 210, 70, 200, 210, 70, 200, 210, 70,
    200, 210,

    // top rung right
    200, 200, 70, 200, 200, 70, 200, 200, 70, 200, 200, 70, 200, 200, 70, 200,
    200, 70,

    // under top rung
    210, 100, 70, 210, 100, 70, 210, 100, 70, 210, 100, 70, 210, 100, 70, 210,
    100, 70,

    // between top rung and middle
    210, 160, 70, 210, 160, 70, 210, 160, 70, 210, 160, 70, 210, 160, 70, 210,
    160, 70,

    // top of middle rung
    70, 180, 210, 70, 180, 210, 70, 180, 210, 70, 180, 210, 70, 180, 210, 70,
    180, 210,

    // right of middle rung
    100, 70, 210, 100, 70, 210, 100, 70, 210, 100, 70, 210, 100, 70, 210, 100,
    70, 210,

    // bottom of middle rung.
    76, 210, 100, 76, 210, 100, 76, 210, 100, 76, 210, 100, 76, 210, 100, 76,
    210, 100,

    // right of bottom
    140, 210, 80, 140, 210, 80, 140, 210, 80, 140, 210, 80, 140, 210, 80, 140,
    210, 80,

    // bottom
    90, 130, 110, 90, 130, 110, 90, 130, 110, 90, 130, 110, 90, 130, 110, 90,
    130, 110,

    // left side
    160, 160, 220, 160, 160, 220, 160, 160, 220, 160, 160, 220, 160, 160, 220,
    160, 160, 220,
  ]),
  3,
  {
    dtype: colorType,
    normalize: normalizeColor,
    stride: stride,
    offset: offset,
  }
);

const plane = new PlaneGeometry(100, 200);
const materialplane = new PhongMaterial();
materialplane.attributes["a_color"] = new BufferAttribute(
  new Uint8Array([
    // 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128,
    // left column front
    200, 70, 120, 200, 70, 120, 200, 70, 120, 200, 70, 120, 200, 70, 120, 200,
    70, 120,
  ]),
  3,
  {
    dtype: colorType,
    normalize: normalizeColor,
    stride: stride,
    offset: offset,
  }
);

const cubeObject = new CubeGeometry(100, 100, 200);
const cubeMaterial = new PhongMaterial();
cubeMaterial.attributes["a_color"] = new BufferAttribute(
  new Uint8Array([
    // 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128,
    // left column front
    200, 70, 120, 200, 70, 120, 200, 70, 120, 200, 70, 120, 200, 70, 120, 200,
    70, 120,

    // top rung front
    200, 70, 120, 200, 70, 120, 200, 70, 120, 200, 70, 120, 200, 70, 120, 200,
    70, 120,

    // middle rung front
    200, 70, 120, 200, 70, 120, 200, 70, 120, 200, 70, 120, 200, 70, 120, 200,
    70, 120,

    // left column back
    80, 70, 200, 80, 70, 200, 80, 70, 200, 80, 70, 200, 80, 70, 200, 80, 70,
    200,

    // top rung back
    80, 70, 200, 80, 70, 200, 80, 70, 200, 80, 70, 200, 80, 70, 200, 80, 70,
    200,

    // middle rung back
    80, 70, 200, 80, 70, 200, 80, 70, 200, 80, 70, 200, 80, 70, 200, 80, 70,
    200,

    // top
    70, 200, 210, 70, 200, 210, 70, 200, 210, 70, 200, 210, 70, 200, 210, 70,
    200, 210,

    // top rung right
    200, 200, 70, 200, 200, 70, 200, 200, 70, 200, 200, 70, 200, 200, 70, 200,
    200, 70,

    // under top rung
    210, 100, 70, 210, 100, 70, 210, 100, 70, 210, 100, 70, 210, 100, 70, 210,
    100, 70,

    // between top rung and middle
    210, 160, 70, 210, 160, 70, 210, 160, 70, 210, 160, 70, 210, 160, 70, 210,
    160, 70,

    // top of middle rung
    70, 180, 210, 70, 180, 210, 70, 180, 210, 70, 180, 210, 70, 180, 210, 70,
    180, 210,

    // right of middle rung
    100, 70, 210, 100, 70, 210, 100, 70, 210, 100, 70, 210, 100, 70, 210, 100,
    70, 210,

    // bottom of middle rung.
    76, 210, 100, 76, 210, 100, 76, 210, 100, 76, 210, 100, 76, 210, 100, 76,
    210, 100,

    // right of bottom
    140, 210, 80, 140, 210, 80, 140, 210, 80, 140, 210, 80, 140, 210, 80, 140,
    210, 80,

    // bottom
    90, 130, 110, 90, 130, 110, 90, 130, 110, 90, 130, 110, 90, 130, 110, 90,
    130, 110,

    // left side
    160, 160, 220, 160, 160, 220, 160, 160, 220, 160, 160, 220, 160, 160, 220,
    160, 160, 220,
  ]),
  3,
  {
    dtype: colorType,
    normalize: normalizeColor,
    stride: stride,
    offset: offset,
  }
);

const planemesh: Mesh = new Mesh(plane, materialplane);
planemesh.name = "plane";
planemesh.position = new Vec3(0, 200, 0);
const fmesh = new Mesh(fobject, fmaterial);
fmesh.name = "fmesh";
const cube = new Mesh(cubeObject, cubeMaterial);
cube.name = "cube";
cube.position = new Vec3(200, 0, 200);
const animal = new AnimalModel();
animal.position = new Vec3(-400, 0, 200);
const robot = new RobotModel();
robot.position = new Vec3(-200, 100, -200);

const fcubeScene = new Scene();
fcubeScene.name = "F Cube Scene";
fcubeScene.add(fmesh);
fcubeScene.add(cube);
fcubeScene.add(planemesh);
fcubeScene.add(animal);
fcubeScene.add(robot);

export { fmesh, planemesh, cube, fcubeScene };