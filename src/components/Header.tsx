import { GLTFConverter } from "../lib/GLTFConverter";
import { Renderer } from "../lib/renderer/Renderer";
import { useRef } from "react";
import { Scene } from "../types/objects/Scene";
import { useAppAction } from "../stores";
import { Download, Upload } from "phosphor-react";

const Header = () => {
  const { setScene, setActiveObject, setAnimations } = useAppAction()
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    const rootNode = Renderer.getScene();
    const gltf = GLTFConverter.save(rootNode);
    // alert("gltf: " + gltf);
    const blob = new Blob([gltf], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "model.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleLoad = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result;
      if (typeof content === "string") {
        const scene: Scene = GLTFConverter.load(content);

        const animatedChildren = scene.children.filter((child) => {
          return child.animation.isAnimated();
        });
        const fcubeAnimations = animatedChildren.map((child) => child.animation);

        Renderer.setScene(scene);
        setScene(scene)
        Renderer.setActiveObject(scene.id)
        setActiveObject(scene.id)
        setAnimations(fcubeAnimations);
        Renderer.renderScene();
        console.log(scene)
      }
    };
    reader.readAsText(file);
  };

  return (
    <header className="w-full px-10 py-2 border-b border-slate-900/10 bg-black text-white">
      <div >
        <h1 className="text-2xl font-bold text-center py-2">
          3D Model
        </h1>
        <div className="flex justify-evenly">
          <label
            id="load-button"
            htmlFor="load"
            className="flex flex-col items-center gap-2 px-4 py-2.5 mr-2 bg-slate-900/30 border border-slate-900/10 text-xs font-bold rounded-lg active:bg-violet-700 cursor-pointer"
          >
            <Upload size={32}/>
            <p>Load</p>
          </label>
          <input
            ref={fileInputRef}
            className="hidden"
            type="file"
            accept=".json"
            id="load"
            name="filename"
            onChange={handleLoad}
          />
          <div>
            <button
              id="save"
              className="flex flex-col items-center gap-2 px-4 py-2.5 mr-2 bg-slate-900/30 border border-slate-900/10 text-xs font-bold rounded-lg active:bg-violet-700"
              onClick={handleSave}
            >
              <Download size={32}/>
              <p>Save</p>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
