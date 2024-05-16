import { GLTFConverter } from "../lib/SaveLoad";
import { Renderer } from "../lib/Renderer";
import { useRef } from "react";

const Header = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    const rootNode = Renderer.getScene();
    const gltf = GLTFConverter.save(rootNode);
    // alert("gltf: " + gltf);
    const blob = new Blob([gltf], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "model.gltf";
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
        GLTFConverter.load(content);
        // const json = JSON.parse(content);
        // const rootNode = ObjectNode.fromJSON(json);
        // Renderer.setScene(rootNode);
      }
    };
    reader.readAsText(file);
  };

  return (
    <header className="w-full px-10 py-2 border-b border-slate-900/10 bg-gradient-to-r from-green-800 to-purple-800 text-white">
      <div className="grid grid-cols-3">
        <div className="items-center justify-center col-span-3">
          <h1 className="text-2xl font-bold text-center py-2">3D Articulated Model</h1>
        </div>
        <label
          id="load-button"
          htmlFor="load"
          className="flex flex-col items-center gap-2 px-4 py-2.5 mr-2 bg-slate-900/30 border border-slate-900/10 text-xs font-bold rounded-lg active:bg-violet-700 cursor-pointer"
        >
          <img src="./img/load2.svg" className="w-5 h-5" />
          <p>Load</p>
        </label>
        <input
          ref={fileInputRef}
          className="hidden"
          type="file"
          accept=".gltf"
          id="load"
          name="filename"
          onChange={handleLoad}
        />
        <button
          id="save"
          className="flex flex-col items-center gap-2 px-4 py-2.5 mr-2 bg-slate-900/30 border border-slate-900/10 text-xs font-bold rounded-lg active:bg-violet-700"
          onClick={handleSave}
        >
          <img src="./img/save.svg" className="w-5 h-5" />
          <p>Save</p>
        </button>
        <button
          id="help"
          className="flex flex-col items-center gap-2 px-4 py-2.5 mr-2 bg-slate-900/30 border border-slate-900/10 text-xs font-bold rounded-lg active:bg-violet-700"
        >
          <img src="./img/help.svg" className="w-5 h-5" />
          <p>Help</p>
        </button>
      </div>
    </header>
  );
};

export default Header;
