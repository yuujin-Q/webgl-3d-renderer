/* basic material shaders */
const basicVertexShader = `
    attribute vec4 a_position;
    attribute vec4 a_color;
    attribute vec2 a_texcoord;

    uniform mat4 u_matrix;

    varying vec4 v_color;
    varying vec2 v_texcoord;

    void main() {
      // Multiply the position by the matrix.
      gl_Position = u_matrix * a_position;

      // Pass the color to the fragment shader.
      v_color = a_color;

      // Pass the texcoord to the fragment shader.
      v_texcoord = a_texcoord;
    }
    `;
const basicFragmentShader = `
    precision mediump float;

    // Passed in from the vertex shader.
    varying vec4 v_color;
    varying vec2 v_texcoord;
    
    // The texture.
    uniform sampler2D u_texture;
    uniform bool u_useTexture;

    uniform vec3 u_ambient;

    void main() {
      if (u_useTexture) {
        gl_FragColor = texture2D(u_texture, v_texcoord) * vec4(u_ambient, 1.0);
      } else {
        gl_FragColor = v_color * vec4(u_ambient, 1.0);
      }
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

// todo: diffuse, specular, etc as varying parameters
const phongFragmentShader = `
    precision mediump float;

    varying vec4 v_color;
    varying vec4 v_normal;
    uniform vec3 u_ambient;
    uniform vec3 u_lightSource;
    uniform vec3 u_lightColor;
    
    void main() {
      vec3 normal = normalize(v_normal.xyz);
      vec3 lightColor = vec3(1.0, 1.0, 1.0);
      vec3 lightSource = vec3(1.0, 0.0, 0.0);
      float diffuseStrength = max(0.0, dot(u_lightSource, normal));
      vec3 diffuse = diffuseStrength*u_lightColor;

      vec3 cameraSource = vec3(0.0, 0.0, 1.0);
      vec3 viewSource = normalize(cameraSource);
      vec3 reflectSource = normalize(reflect(-u_lightSource, normal));
      float specularStrength = max(0.0, dot(viewSource, reflectSource));
      specularStrength = pow(specularStrength, 2.0);
      vec3 specular = specularStrength*u_lightColor;

      vec3 lighting = vec3(0.0, 0.0, 0.0);
      lighting = u_ambient;
      lighting = u_ambient*0.0+diffuse;
      lighting = u_ambient*0.0+diffuse*0.5+specular*0.5;

      vec4 colorr = vec4(0.75, 0.75, 0.75, 0.75);
      vec3 color = v_color.xyz * lighting;
      gl_FragColor = vec4(color, 1.0);
    }
    `;

export { phongVertexShader, phongFragmentShader };
