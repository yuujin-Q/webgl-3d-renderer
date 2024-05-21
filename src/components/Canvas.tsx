import { useEffect, useState } from "react";
import { useCanvas } from "./CanvasContext";
import { Renderer } from "../lib/renderer/Renderer";
import { Scene } from "../types/objects/Scene";
import { MouseInput } from "../lib/Mouse";
import { cube, fcubeScene, fmesh, planemesh } from "./Example";

const Canvas = () => {
  const { canvasRef } = useCanvas();
  const [drag, setDrag] = useState(false);

  // INIT WEBGL
  useEffect(() => {
    const scene = fcubeScene;

    const gl = canvasRef?.current?.getContext("webgl");

    Renderer.initializeRenderer(gl);

    Renderer.setScene(scene);
    Renderer.renderScene();
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
