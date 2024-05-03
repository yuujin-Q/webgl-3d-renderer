import { useEffect } from "react";

const vertexShaderSource =
  // `
  //   attribute vec4 a_position;

  //   uniform mat4 u_matrix;

  //   void main() {
  //     // Multiply the position by the matrix.
  //     gl_Position = u_matrix * a_position;
  //   }
  // `;

  `
  attribute vec2 a_position;
  
  void main() {
    // Multiply the position by the matrix.
    gl_Position = vec4(a_position, 0, 1);
  }
`;
// TODO: change to 3d shader

const fragmentShaderSource = `
  precision mediump float;

  void main() {
    // gl_FragColor = frag_color;
    gl_FragColor = vec4(1, 1, 0, 1);
  }
`;
// TODO: change fragment processor

const Canvas = ({
  canvasRef,
}: {
  canvasRef: React.RefObject<HTMLCanvasElement>;
}) => {
  // TODO: passing data for model objects

  // INIT FUNCTIONS
  const createShader = (
    glc: WebGLRenderingContext,
    type: number,
    source: string
  ) => {
    const shader = glc.createShader(type);
    if (shader !== null) {
      glc.shaderSource(shader, source);
      glc.compileShader(shader);
      const success = glc.getShaderParameter(shader, glc.COMPILE_STATUS);
      if (success) {
        return shader;
      }
    }

    glc.deleteShader(shader);
  };
  const createProgram = (
    glc: WebGLRenderingContext,
    vertexShader: WebGLShader,
    fragmentShader: WebGLShader
  ) => {
    const program = glc.createProgram();
    if (program !== null) {
      glc.attachShader(program, vertexShader);
      glc.attachShader(program, fragmentShader);
      glc.linkProgram(program);
      return program;
    }

    glc.deleteProgram(program);
  };

  // INIT WEBGL
  useEffect(() => {
    const gl = canvasRef?.current?.getContext("webgl");

    if (!gl) {
      console.error("No GL");
      return;
    }
    console.log("yes");

    // create vertex shaders and fragment shaders
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(
      gl,
      gl.FRAGMENT_SHADER,
      fragmentShaderSource
    );
    if (vertexShader === undefined || fragmentShader === undefined) {
      console.error("Shader initialization failed");
      return;
    }

    // create gl program
    const program = createProgram(gl, vertexShader, fragmentShader);
    if (program === undefined) {
      console.error("GL Program initialization failed");
      return;
    }
    gl.useProgram(program);

    // get attribute for vertex buffer
    const positionAttribute = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionAttribute);

    // Create and link buffer for the position attribute
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    // Set up the position data
    const positions = [0, 0, 0, 0.5, 0.7, 0];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    // Set up the position attribute pointer
    gl.vertexAttribPointer(positionAttribute, 2, gl.FLOAT, false, 0, 0);

    // Render the shader program
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 3);
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
