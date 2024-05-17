import { useEffect, useState } from "react";
import { useCanvas } from "./CanvasContext";
import { Renderer } from "../lib/Renderer";
import { Scene } from "../types/objects/Scene";
import { OrthographicCamera } from "../types/objects/camera/OrthographicCamera";
import { Camera } from "../types/objects/camera/Camera";
import { MouseInput } from "../lib/Mouse";
import { fmesh, planemesh } from "./Example";

const Canvas = () => {
  const { canvasRef } = useCanvas();
  const [drag, setDrag] = useState(false);

  // INIT WEBGL
  useEffect(() => {
    const camera: Camera = new OrthographicCamera(0, 400, 0, 400, -2000, 2000);
    MouseInput.camera = camera;

    const scene = new Scene();
    Renderer.setCamera(camera);
    scene.add(fmesh.add(planemesh));

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
