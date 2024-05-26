import { useEffect, useState } from "react";
import { useCanvas } from "./CanvasContext";
import { Renderer } from "../lib/renderer/Renderer";
import { MouseInput } from "../lib/Mouse";
import { animal, block, claw, creeper, hollowCube, pyramid, robot, trapzz } from "../examples/Example";
import { useAppAction, useAppStore } from "../stores";
import { DirectionalLight } from "../types/objects/light/DirectionalLight";
import { Vec3 } from "../types/math/Vec3";
import { Scene } from "../types/objects/Scene";

const Canvas = () => {
  const { canvasRef } = useCanvas();
  const { setScene, setActiveObject, setAnimations } = useAppAction();
  const { model} = useAppStore(state => state);
  const [drag, setDrag] = useState(false);

  // INIT WEBGL
  useEffect(() => {
    const scene = new Scene();
    scene.name = "Root"
    const gl = canvasRef?.current?.getContext("webgl");
    if (!gl) {
      console.error("No GL");
      return;
    }

    switch (model) {
      case "animal":
        scene.add(animal)
        break;
      case "creeper":
        scene.add(creeper)
        break;
      case "mechanic_hand":
        scene.add(claw)
        break;
      case "robot":
        scene.add(robot)
        break;
      case "cinder_block":
        scene.add(block)
        break
      case "hollow_cube":
        scene.add(hollowCube)
        break
      case "pyramid":
        scene.add(pyramid)
        break
      case "trapzz":
        scene.add(trapzz)
        break
      default:
        break;
    }

    const animatedChildren = scene.children.filter((child) => {
      return child.animation.isAnimated();
    });
    const fcubeAnimations = animatedChildren.map((child) => child.animation);

    const light = new DirectionalLight();
    light.setDirection(new Vec3(1, 1, 1));
    Renderer.initializeRenderer(gl);

    Renderer.setScene(scene);
    setScene(scene);
    Renderer.setActiveObject(scene.id);
    setActiveObject(scene.id);
    setAnimations(fcubeAnimations);
    Renderer.setLight(light);
    Renderer.renderScene();
    console.log(scene);
  }, [canvasRef, model]);

  return (
    <div className="flex flex-col w-6/12 bg-gray-700 h-full">
      <canvas
        onMouseDown={(e) => {
          MouseInput.initAngles(e);
          setDrag(true);
        }}
        onMouseUp={() => {
          setDrag(false);
        }}
        onMouseMove={(e) => {
          if (drag) {
            MouseInput.onMouseMove(e);
          }
        }}
        onWheel={(e) => {
          MouseInput.onMouseWheel(e);
        }}
        ref={canvasRef}
        id="canvas"
        width="600"
        height="600"
        className="bg-white"
      >
        Oops ... your browser doesn't support the HTML5 canvas element
      </canvas>
    </div>
  );
};

export default Canvas;
