import { Scene } from "../types/objects/Scene";
import { Vec3 } from "../types/math/Vec3";
import { AnimalModel } from "./articulated/AnimalModel";
import { RobotModel } from "./articulated/RobotModel";
import { MechanicalHand } from "./articulated/MechanicalHand";
import { PyramidModel } from "./hollow/PyramidModel";
import { CinderBlock } from "./hollow/CinderBlock";
import { HollowCube } from "./hollow/HollowCube";
import { TrapzzModel } from "./hollow/TrapzzModel";
import { CreeperModel } from "./articulated/CreeperModel";

const animal = new AnimalModel();
animal.position = new Vec3(-150, 50, 0);
animal.rotation = new Vec3(0.5, -0.75, 0);
animal.scale = new Vec3(1.5, 1.5, 1.5);

const robot = new RobotModel();
robot.rotation = new Vec3(0.5, 0.75, 0);
robot.scale = new Vec3(2, 2, 2);

const claw = new MechanicalHand();
claw.rotation = new Vec3(0.25, 0.25, 0);

const pyramid = new PyramidModel();
pyramid.position = new Vec3(-325, 0, 0);
pyramid.rotation = new Vec3(0.5, 0.5, 0);
pyramid.scale = new Vec3(2, 2, 2);

const block = new CinderBlock(0.4);
block.rotation = new Vec3(-1.5, -1, 0);
block.scale = new Vec3(1.5, 1.5, 1.5);

const hollowCube = new HollowCube(100, 100, 100, 8)
hollowCube.rotation = new Vec3(0.5, 0.5, 0);
hollowCube.scale = new Vec3(2, 2, 2);

const trapzz = new TrapzzModel();
trapzz.position = new Vec3(-250, 0, 0);
trapzz.rotation = new Vec3(0.5, 0.5, 0);
trapzz.scale = new Vec3(1.5, 1.5, 1.5);

const creeper = new CreeperModel();
creeper.rotation = new Vec3(-1, 0, 2);

const exampleScene = new Scene();
exampleScene.name = "Example Scene";
exampleScene.add(animal);
exampleScene.add(robot);
exampleScene.add(claw);
exampleScene.add(pyramid);
exampleScene.add(block);
exampleScene.add(hollowCube);
exampleScene.add(trapzz);
exampleScene.add(creeper);

export { exampleScene, animal, robot, creeper, claw, trapzz, hollowCube, pyramid, block };
