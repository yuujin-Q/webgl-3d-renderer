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
import { Animation } from "../lib/animation/Animation";
import { MechanicalHand } from "./articulated/MechanicalHand";
import { PyramidModel } from "./hollow/PyramidModel";
import { CinderBlock } from "./hollow/CinderBlock";
import { HollowCube } from "./hollow/HollowCube";

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
const animal2 = new AnimalModel();
animal2.position = new Vec3(400, 0, 400);
animal2.rotation = new Vec3(0, -90, 0);
const robot = new RobotModel();
robot.position = new Vec3(-200, 100, -200);
const claw = new MechanicalHand();
claw.position.x = 500;
const pyramid = new PyramidModel();
pyramid.position = new Vec3(0, 400, 0);
const block = new CinderBlock(0.4);
block.position.y = -250;
block.rotation.x = 1.5;
const hollowCube = new HollowCube(100, 100, 100, 8)
hollowCube.position.x = -500;
hollowCube.position.y = 200;
hollowCube.rotation.y = 0.5;
hollowCube.rotation.x = 0.5;

const fcubeScene = new Scene();
fcubeScene.name = "F Cube Scene";
fcubeScene.add(fmesh);
fcubeScene.add(cube);
fcubeScene.add(planemesh);
fcubeScene.add(animal);
fcubeScene.add(animal2);
fcubeScene.add(robot);
fcubeScene.add(claw);
fcubeScene.add(pyramid);
fcubeScene.add(block);
fcubeScene.add(hollowCube);

const fcubeAnimations: Animation[] = [];
const animalAnimation = new Animation(animal, AnimalModel.frames, 60);
animalAnimation.play();
const animal2Animation = new Animation(animal2, AnimalModel.frames, 60);
animal2Animation.convertFrames(Vec3.easeInOutBack);
animal2Animation.play();

fcubeAnimations.push(animalAnimation, animal2Animation);

export { fcubeScene, fcubeAnimations };
