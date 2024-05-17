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
          // left column front
          0, 0, 0, 0, 150, 0, 30, 0, 0, 0, 150, 0, 30, 150, 0, 30, 0, 0,

          // top rung front
          30, 0, 0, 30, 30, 0, 100, 0, 0, 30, 30, 0, 100, 30, 0, 100, 0, 0,

          // middle rung front
          30, 60, 0, 30, 90, 0, 67, 60, 0, 30, 90, 0, 67, 90, 0, 67, 60, 0,

          // left column back
          0, 0, 30, 30, 0, 30, 0, 150, 30, 0, 150, 30, 30, 0, 30, 30, 150, 30,

          // top rung back
          30, 0, 30, 100, 0, 30, 30, 30, 30, 30, 30, 30, 100, 0, 30, 100, 30,
          30,

          // middle rung back
          30, 60, 30, 67, 60, 30, 30, 90, 30, 30, 90, 30, 67, 60, 30, 67, 90,
          30,

          // top
          0, 0, 0, 100, 0, 0, 100, 0, 30, 0, 0, 0, 100, 0, 30, 0, 0, 30,

          // top rung right
          100, 0, 0, 100, 30, 0, 100, 30, 30, 100, 0, 0, 100, 30, 30, 100, 0,
          30,

          // under top rung
          30, 30, 0, 30, 30, 30, 100, 30, 30, 30, 30, 0, 100, 30, 30, 100, 30,
          0,

          // between top rung and middle
          30, 30, 0, 30, 60, 30, 30, 30, 30, 30, 30, 0, 30, 60, 0, 30, 60, 30,

          // top of middle rung
          30, 60, 0, 67, 60, 30, 30, 60, 30, 30, 60, 0, 67, 60, 0, 67, 60, 30,

          // right of middle rung
          67, 60, 0, 67, 90, 30, 67, 60, 30, 67, 60, 0, 67, 90, 0, 67, 90, 30,

          // bottom of middle rung.
          30, 90, 0, 30, 90, 30, 67, 90, 30, 30, 90, 0, 67, 90, 30, 67, 90, 0,

          // right of bottom
          30, 90, 0, 30, 150, 30, 30, 90, 30, 30, 90, 0, 30, 150, 0, 30, 150,
          30,

          // bottom
          0, 150, 0, 0, 150, 30, 30, 150, 30, 0, 150, 0, 30, 150, 30, 30, 150,
          0,

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
    material.attributes["a_color"] = new BufferAttribute(
      new Uint8Array([
        // 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128,
        // left column front
        200, 70, 120, 200, 70, 120, 200, 70, 120, 200, 70, 120, 200, 70, 120,
        200, 70, 120,

        // top rung front
        200, 70, 120, 200, 70, 120, 200, 70, 120, 200, 70, 120, 200, 70, 120,
        200, 70, 120,

        // middle rung front
        200, 70, 120, 200, 70, 120, 200, 70, 120, 200, 70, 120, 200, 70, 120,
        200, 70, 120,

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
        70, 200, 210, 70, 200, 210, 70, 200, 210, 70, 200, 210, 70, 200, 210,
        70, 200, 210,

        // top rung right
        200, 200, 70, 200, 200, 70, 200, 200, 70, 200, 200, 70, 200, 200, 70,
        200, 200, 70,

        // under top rung
        210, 100, 70, 210, 100, 70, 210, 100, 70, 210, 100, 70, 210, 100, 70,
        210, 100, 70,

        // between top rung and middle
        210, 160, 70, 210, 160, 70, 210, 160, 70, 210, 160, 70, 210, 160, 70,
        210, 160, 70,

        // top of middle rung
        70, 180, 210, 70, 180, 210, 70, 180, 210, 70, 180, 210, 70, 180, 210,
        70, 180, 210,

        // right of middle rung
        100, 70, 210, 100, 70, 210, 100, 70, 210, 100, 70, 210, 100, 70, 210,
        100, 70, 210,

        // bottom of middle rung.
        76, 210, 100, 76, 210, 100, 76, 210, 100, 76, 210, 100, 76, 210, 100,
        76, 210, 100,

        // right of bottom
        140, 210, 80, 140, 210, 80, 140, 210, 80, 140, 210, 80, 140, 210, 80,
        140, 210, 80,

        // bottom
        90, 130, 110, 90, 130, 110, 90, 130, 110, 90, 130, 110, 90, 130, 110,
        90, 130, 110,

        // left side
        160, 160, 220, 160, 160, 220, 160, 160, 220, 160, 160, 220, 160, 160,
        220, 160, 160, 220,
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

    const materialplane = new ShaderMaterial("", "");
    materialplane.attributes["a_color"] = new BufferAttribute(
      new Uint8Array([
        // 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128,
        // left column front
        200, 70, 120, 200, 70, 120, 200, 70, 120, 200, 70, 120, 200, 70, 120,
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

    const planemesh: Mesh = new Mesh(pgeo, materialplane);
    const fmesh = new Mesh(fobject, material);
    const camera: Camera = new OrthographicCamera(0, 400, 0, 400, -2000, 2000);
    const scene = new Scene();
    Renderer.setCamera(camera);
    scene.add(fmesh);
    fmesh.add(planemesh);

    const gl = canvasRef?.current?.getContext("webgl");

    Renderer.initializeRenderer(gl);

    // Renderer.setScene(scene);

    // Renderer.renderScene();
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
