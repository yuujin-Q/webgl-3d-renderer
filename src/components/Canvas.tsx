import { useEffect } from "react";
import { useCanvas } from "./CanvasContext";
import { Renderer } from "../lib/renderer";

const Canvas = () => {
  const { canvasRef } = useCanvas();

  // INIT WEBGL
  useEffect(() => {
    const gl = canvasRef?.current?.getContext("webgl");

    Renderer.initializeRenderer(gl);
  }, [canvasRef]);

  return (
    <div className="flex flex-col w-6/12 bg-gray-700">
      <canvas
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
