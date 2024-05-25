import { create } from "zustand";
import { ProgramInfo } from "../lib/webglutils/ProgramInfo";
import { Scene } from "../types/objects/Scene";
import { Camera } from "../types/objects/camera/Camera";
import { Vec3 } from "../types/math/Vec3";
import { OrthographicCamera } from "../types/objects/camera/OrthographicCamera";
import { Animation } from "../lib/animation/Animation";

type AppState = {
    canvasRef: React.LegacyRef<HTMLCanvasElement>;
    gl: WebGLRenderingContext | null;
    glProgram: ProgramInfo | null;

    // shaders
    defaultVertexShader: string;
    defaultFragmentShader: string;

    // scene data
    scene: Scene;
    camera: Camera;
    activeObject: string;

    // transformation
    globalTranslate: Vec3;
    globalRotate: Vec3;
    globalScale: Vec3;

    // animation
    animations: Animation[];

    actions: {
        setCanvasRef: (canvasRef: React.LegacyRef<HTMLCanvasElement>) => void,
        setGl: (gl: WebGLRenderingContext) => void,
        setGlProgram: (glProgram: ProgramInfo) => void,
        setScene: (glScene: Scene) => void,
        setCamera: (glCamera: Camera) => void,
        setActiveObject: (glActiveObject: string) => void,
        setGlobalTranslate: (glGlobalTranslate: Vec3) => void,
        setGlobalRotate: (glGlobalRotate: Vec3) => void,
        setGlobalScale: (glGlobalTranslate: Vec3) => void,
        setAnimations: (glAnimations: Animation[]) => void,
    };
};

export const useAppStore = create<AppState>((set) => ({
    canvasRef: null,
    gl: null,
    glProgram: null,
    defaultFragmentShader: `
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
    lighting = ambient*0.0+diffuse+specular;

    vec4 colorr = vec4(0.75, 0.75, 0.75, 0.75);
    vec3 color = v_color.xyz * lighting;
    gl_FragColor = vec4(color, 1.0);
    }
    `,
    defaultVertexShader: `
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
    `,
    camera: new OrthographicCamera(-400, 400, -400, 400, -2000, 2000),
    scene: new Scene(),
    activeObject: "",
    globalTranslate: new Vec3(0, 0, 0),
    globalRotate: new Vec3(0, 0, 0),
    globalScale: new Vec3(1, 1, 1),
    animations: [],

    actions: {
        setCanvasRef(canvasRef){
            set({canvasRef})
        },
        setGl(gl) {
            set({ gl });
        },
        setGlProgram(glProgram) {
            set({ glProgram });
        },
        setScene(scene) {
            set({ scene });
        },
        setCamera(camera) {
            set({ camera });
        },
        setActiveObject(activeObject) {
            set({ activeObject });
        },
        setGlobalTranslate(globalTranslate) {
            set({ globalTranslate });
        },
        setGlobalRotate(globalRotate) {
            set({ globalRotate });
        },
        setGlobalScale(globalScale) {
            set({ globalScale });
        },
        setAnimations(animations) {
            set({ animations });
        },
    }
}));

export function useAppAction() {
    return useAppStore((state) => state.actions);
}
