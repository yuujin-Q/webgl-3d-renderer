import { useEffect } from "react";
import { useCanvas } from "./CanvasContext";
import { Renderer } from "../lib/Renderer";
import { Mesh } from "../types/objects/mesh/Mesh";
import { ShaderMaterial } from "../types/objects/mesh/material/ShaderMaterial";
import { Scene } from "../types/objects/Scene";
import { OrthographicCamera } from "../types/objects/camera/OrthographicCamera";
import { Camera } from "../types/objects/camera/Camera";
import { BufferAttribute } from "../types/objects/mesh/geometry/BufferAttribute";
import { WebGLType } from "../lib/webglutils/WebGLType";
import { BufferGeometry } from "../types/objects/mesh/geometry/BufferGeometry";
import { PlaneGeometry } from "../types/objects/mesh/geometry/PlaneGeometry";
import { CubeGeometry } from "../types/objects/mesh/geometry/CubeGeometry";

const Canvas = () => {
  const { canvasRef } = useCanvas();

  // INIT WEBGL
  useEffect(() => {
    // test scene
    const material = new ShaderMaterial("", "");
    const colorType = WebGLType.UNSIGNED_BYTE;
    const normalizeColor = true;
    const stride = 0;
    const offset = 0;
    const fobject = new BufferGeometry();
    fobject.setAttribute(
      "a_position",
      new BufferAttribute(
        new Float32Array([
          -100.0, -100.0,  100.0,  // bottom left
          100.0, -100.0,  100.0,  // bottom right
          100.0,  100.0,  100.0,  // top right

          -100.0, -100.0,  100.0,  // bottom left
          -100.0,  100.0,  100.0,  // top left
          100.0,  100.0,  100.0,  // top right

          // Back face (negative z)
          -100.0, -100.0, -100.0,  // bottom left
          100.0, -100.0, -100.0,  // bottom right
          100.0,  100.0, -100.0,  // top right

          -100.0, -100.0, -100.0,  // bottom left
          -100.0,  100.0, -100.0,  // top left
          100.0,  100.0, -100.0,  // top right

          // Right face (positive x)
          100.0, -100.0,  100.0,  // bottom left
          100.0, -100.0, -100.0,  // bottom right
          100.0,  100.0, -100.0,  // top right

          100.0, -100.0,  100.0,  // bottom left
          100.0,  100.0,  100.0,  // top left
          100.0,  100.0, -100.0,  // top right

          // Left face (negative x)
          -100.0, -100.0,  100.0,  // bottom left
          -100.0, -100.0, -100.0,  // bottom right
          -100.0,  100.0, -100.0,  // top right

          -100.0, -100.0,  100.0,  // bottom left
          -100.0,  100.0,  100.0,  // top left
          -100.0,  100.0, -100.0,  // top right

          // Top face (positive y)
          -100.0,  100.0,  100.0,  // bottom left
          100.0,  100.0,  100.0,  // bottom right
          100.0,  100.0, -100.0,  // top right

          -100.0,  100.0,  100.0,  // bottom left
          -100.0,  100.0, -100.0,  // top left
          100.0,  100.0, -100.0,  // top right

          // Bottom face (negative y)
          -100.0, -100.0,  100.0,  // bottom left
          100.0, -100.0,  100.0,  // bottom right
          100.0, -100.0, -100.0,  // top right

          -100.0, -100.0,  100.0,  // bottom left
          -100.0, -100.0, -100.0,  // top left
          100.0, -100.0, -100.0,  // top right
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
    material.attributes["a_color"] = new BufferAttribute(
      new Uint8Array([
        // 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128,
        // left column front
        200, 70, 120, 
        200, 70, 120, 
        200, 70, 120, 

        200, 70, 120,
        200, 70, 120,
        200, 70, 120,

        200, 70, 120, 
        200, 70, 120, 
        200, 70, 120, 

        200, 70, 120,
        200, 70, 120,
        200, 70, 120,

        200, 70, 120, 
        200, 70, 120, 
        200, 70, 120, 

        200, 70, 120,
        200, 70, 120,
        200, 70, 120,

        200, 70, 120, 
        200, 70, 120, 
        200, 70, 120, 

        200, 70, 120,
        200, 70, 120,
        200, 70, 120,

        200, 70, 120, 
        200, 70, 120, 
        200, 70, 120, 

        200, 70, 120,
        200, 70, 120,
        200, 70, 120,

        200, 70, 120, 
        200, 70, 120, 
        200, 70, 120, 

        200, 70, 120,
        200, 70, 120,
        200, 70, 120,

      ]),
      3,
      {
        dtype: colorType,
        normalize: normalizeColor,
        stride: stride,
        offset: offset,
      }
    );
    const pgeo = new PlaneGeometry(100, 200);

    
    const materialCube = new ShaderMaterial("", "");
    materialCube.attributes["a_color"] = new BufferAttribute(
      new Uint8Array([
        // Front face colors (red)
        255, 0, 0, 255, 0, 0, 255, 0, 0, 255, 0, 0, 255, 0, 0, 255, 0, 0,
        // Back face colors (green)
        0, 255, 0, 0, 255, 0, 0, 255, 0, 0, 255, 0, 0, 255, 0, 0, 255, 0,
        // Top face colors (blue)
        0, 0, 255, 0, 0, 255, 0, 0, 255, 0, 0, 255, 0, 0, 255, 0, 0, 255,
        // Bottom face colors (yellow)
        255, 255, 0, 255, 255, 0, 255, 255, 0, 255, 255, 0, 255, 255, 0, 255, 255, 0,
        // Right face colors (magenta)
        255, 0, 255, 255, 0, 255, 255, 0, 255, 255, 0, 255, 255, 0, 255, 255, 0, 255,
        // Left face colors (cyan)
        0, 255, 255, 0, 255, 255, 0, 255, 255, 0, 255, 255, 0, 255, 255, 0, 255, 255,
      ]),
      3,
      {
        dtype: colorType,
        normalize: normalizeColor,
        stride: stride,
        offset: offset,
      }
    );

    const planemesh: Mesh = new Mesh(pgeo, materialCube);
    const fmesh = new Mesh(fobject, material);
    const camera: Camera = new OrthographicCamera(0, 400, 0, 400, -2000, 2000);
    const scene = new Scene();
    Renderer.setCamera(camera);
    scene.add(planemesh);

    const gl = canvasRef?.current?.getContext("webgl");

    Renderer.initializeRenderer(gl);

    Renderer.setScene(scene);
    Renderer.renderScene();
  }, [canvasRef]);

  return (
    <div className="flex flex-col w-6/12 bg-gray-700 h-full">
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
