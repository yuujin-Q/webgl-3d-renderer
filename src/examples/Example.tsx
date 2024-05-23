import { BufferAttribute } from "../types/objects/mesh/geometry/BufferAttribute";
import { WebGLType } from "../lib/webglutils/WebGLType";
import { PlaneGeometry } from "../types/objects/mesh/geometry/PlaneGeometry";
import { Mesh } from "../types/objects/mesh/Mesh";
import { Scene } from "../types/objects/Scene";
import { Vec3 } from "../types/math/Vec3";
import { AnimalModel } from "./articulated/AnimalModel";
import { RobotModel } from "./articulated/RobotModel";
import { LetterF } from "./shapes/LetterF";
import { Cube } from "./shapes/Cube";
import { BasicMaterial } from "../types/objects/mesh/material/BasicMaterial";

const colorType = WebGLType.UNSIGNED_BYTE;
const normalizeColor = true;
const stride = 0;
const offset = 0;

const plane = new PlaneGeometry(100, 200);
const materialplane = new BasicMaterial();
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

const planemesh: Mesh = new Mesh(plane, materialplane);
planemesh.name = "plane";
planemesh.position = new Vec3(0, 200, 0);

const fmesh = new LetterF();
const cube = new Cube();
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
