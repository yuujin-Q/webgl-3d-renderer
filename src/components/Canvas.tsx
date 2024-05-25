import { useEffect, useState } from "react";
import { useCanvas } from "./CanvasContext";
import { Renderer } from "../lib/renderer/Renderer";
import { MouseInput } from "../lib/Mouse";
import { fcubeScene, } from "../examples/Example";
import { useAppAction } from "../stores";
import { DirectionalLight } from "../types/objects/light/DirectionalLight";
import { Vec3 } from "../types/math/Vec3";

const Canvas = () => {
  const { canvasRef } = useCanvas();
  const { setScene, setActiveObject } = useAppAction()
  const [drag, setDrag] = useState(false);

  // INIT WEBGL
  useEffect(() => {
    const scene = fcubeScene;
    const gl = canvasRef?.current?.getContext("webgl");
    if (!gl) {
      console.error("No GL");
      return;
    }

    const light = new DirectionalLight()
    light.setDirection(new Vec3(1,1,1))
    console.log(light)
    Renderer.initializeRenderer(gl);
    
    Renderer.setScene(scene);
    setScene(scene)
    Renderer.setActiveObject(scene.name)
    setActiveObject(scene.name)
    Renderer.setLight(light)
    Renderer.renderScene();
    console.log(scene)
  }, [canvasRef]);

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
