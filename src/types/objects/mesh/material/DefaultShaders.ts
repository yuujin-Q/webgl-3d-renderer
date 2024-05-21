/* basic material shaders */
const basicVertexShader = `
    attribute vec4 a_position;
    attribute vec4 a_color;

    uniform mat4 u_matrix;

    varying vec4 v_color;

    void main() {
      // Multiply the position by the matrix.
      gl_Position = u_matrix * a_position;

      // Pass the color to the fragment shader.
      v_color = a_color;
    }
    `;
const basicFragmentShader = `
    precision mediump float;

    // Passed in from the vertex shader.
    varying vec4 v_color;

    void main() {
      gl_FragColor = v_color;
    }
    `;

export { basicVertexShader, basicFragmentShader };

/* phong material shaders */
const phongVertexShader = `
    attribute vec4 a_position;
    attribute vec4 a_color;
    attribute vec4 a_normal;
    
    uniform mat4 u_matrix;
    
    varying vec4 v_color;
    // varying vec3 v_eyevec;
    varying vec4 v_normal;

    void main() {
      vec4 vertex = u_matrix * a_position;
      
      v_color = a_color;
      // v_eyevec = -vertex.xyz;
      v_normal = u_matrix * a_normal;
      gl_Position = vertex;
    }
    `;
const phongFragmentShader = `
    precision mediump float;

    varying vec4 v_color;
    varying vec4 v_normal;
    
    void main() {
      vec3 ambient = vec3(0.4, 0.4, 0.4);

      vec3 normal = normalize(v_normal.xyz);
      vec3 lightColor = vec3(1.0, 1.0, 1.0);
      vec3 lightSource = vec3(1.0, 0.0, 0.0);
      float diffuseStrength = max(0.0, dot(lightSource, normal));
      vec3 diffuse = diffuseStrength*lightColor;

      vec3 cameraSource = vec3(0.0, 0.0, 1.0);
      vec3 viewSource = normalize(cameraSource);
      vec3 reflectSource = normalize(reflect(-lightSource, normal));
      float specularStrength = max(0.0, dot(viewSource, reflectSource));
      specularStrength = pow(specularStrength, 2.0);
      vec3 specular = specularStrength*lightColor;

      vec3 lighting = vec3(0.0, 0.0, 0.0);
      lighting = ambient;
      lighting = ambient*0.0+diffuse;
      lighting = ambient*0.0+diffuse*0.5+specular*0.5;

      vec4 colorr = vec4(0.75, 0.75, 0.75, 0.75);
      vec3 color = v_color.xyz * lighting;
      gl_FragColor = vec4(color, 1.0);
    }
    `;

export { phongVertexShader, phongFragmentShader };
