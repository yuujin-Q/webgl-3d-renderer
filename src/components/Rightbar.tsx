import {
  ArrowDown,
  ArrowDownLeft,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  ArrowsIn,
  ArrowsOut,
} from "phosphor-react";
import { Renderer } from "../lib/renderer";

const Rightbar = () => {
  const updateXRotate = (val: number) => {
    Renderer.setRotation({ x: val }, true);
  };
  const updateYRotate = (val: number) => {
    Renderer.setRotation({ y: val }, true);
  };
  const updateZRotate = (val: number) => {
    Renderer.setRotation({ z: val }, true);
  };
  return (
    <div className="border-r border-gray-600 bg-gray-700 w-3/12 overflow-auto">
      <div className="flex flex-col pl-4 pr-6 py-2 gap-1 border-b border-gray-500 text-white w-full">
        <h1 className="text-md font-bold">Active Component :</h1>
        <div
          id="active-component"
          className="w-1/3 flex flex-col items-center py-1 bg-green-600 border border-slate-900/10 text-xs font-bold rounded-lg"
        >
          Tes
        </div>
      </div>
      <div className="flex flex-col pl-4 pr-6 py-2 gap-1 border-b border-gray-500 text-white w-full">
        <h1 className="text-md font-bold">Rotate</h1>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row">
            <label className="text-sm font-semibold w-2/12">X - axis</label>
            <input
              className="w-10/12"
              type="range"
              id="rotateX"
              name="scale"
              min="-180"
              max="180"
              defaultValue={Renderer.rotation().x}
              step="0.05"
              onChange={(e) => updateXRotate(Number(e.target.value))}
            />
          </div>
          <div className="flex flex-row">
            <label className="text-sm font-semibold w-2/12">Y - axis</label>
            <input
              className="w-10/12"
              type="range"
              id="rotateY"
              name="scale"
              min="-180"
              max="180"
              defaultValue={Renderer.rotation().y}
              step="0.05"
              onChange={(e) => updateYRotate(Number(e.target.value))}
            />
          </div>
          <div className="flex flex-row">
            <label className="text-sm font-semibold w-2/12">Z - axis</label>
            <input
              className="w-10/12"
              type="range"
              id="rotateZ"
              name="scale"
              min="-180"
              max="180"
              defaultValue={Renderer.rotation().z}
              step="0.05"
              onChange={(e) => updateZRotate(Number(e.target.value))}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col pl-4 pr-6 py-2 gap-1 border-b border-gray-500 text-white w-full">
        <h1 className="text-md font-bold">Scale</h1>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row">
            <label className="text-sm font-semibold w-2/12">X - axis</label>
            <input
              className="w-10/12"
              type="range"
              id="scaleX"
              name="scale"
              min="0.1"
              max="5"
              step="0.05"
            />
          </div>
          <div className="flex flex-row">
            <label className="text-sm font-semibold w-2/12">Y - axis</label>
            <input
              className="w-10/12"
              type="range"
              id="scaleY"
              name="scale"
              min="0.1"
              max="5"
              step="0.05"
            />
          </div>
          <div className="flex flex-row">
            <label className="text-sm font-semibold w-2/12">Z - axis</label>
            <input
              className="w-10/12"
              type="range"
              id="scaleZ"
              name="scale"
              min="0.1"
              max="5"
              step="0.05"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-row pl-4 pr-6 py-2 gap-1 border-b border-gray-500 text-white w-full">
        <div className="flex flex-col gap-2 text-white w-1/2">
          <h1 className="text-md font-bold">Translate</h1>
          <div className="flex flex-col gap-3">
            <div>
              <div className="flex flex-row gap-3">
                <button
                  id="button-translate-left"
                  className="w-1/3 flex flex-col items-center py-1 bg-sky-600 border border-slate-900/10 text-xs font-bold rounded-lg active:bg-violet-500"
                >
                  <ArrowLeft />
                </button>
                <button
                  id="button-translate-right"
                  className="w-1/3 flex flex-col items-center py-1 bg-sky-600 border border-slate-900/10 text-xs font-bold rounded-lg active:bg-violet-500"
                >
                  <ArrowRight />
                </button>
              </div>
            </div>
            <div>
              <div className="flex flex-row gap-3">
                <button
                  id="button-translate-up"
                  className="w-1/3 flex flex-col items-center py-1 bg-sky-600 border border-slate-900/10 text-xs font-bold rounded-lg active:bg-violet-500"
                >
                  <ArrowUp />
                </button>
                <button
                  id="button-translate-down"
                  className="w-1/3 flex flex-col items-center py-1 bg-sky-600 border border-slate-900/10 text-xs font-bold rounded-lg active:bg-violet-500"
                >
                  <ArrowDown />
                </button>
              </div>
            </div>
            <div>
              <div className="flex flex-row gap-3">
                <button
                  id="button-translate-out"
                  className="w-1/3 flex flex-col items-center py-1 bg-sky-600 border border-slate-900/10 text-xs font-bold rounded-lg active:bg-violet-500"
                >
                  <ArrowDownLeft />
                </button>
                <button
                  id="button-translate-in"
                  className="w-1/3 flex flex-col items-center py-1 bg-sky-600 border border-slate-900/10 text-xs font-bold rounded-lg active:bg-violet-500"
                >
                  <ArrowUpRight />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 text-white w-1/2">
          <h1 className="text-md font-bold">Resize</h1>
          <div className="flex flex-col gap-2">
            <div className="flex flex-row items-center">
              <label className="text-sm font-semibold mr-3">Scale</label>
              <input
                type="number"
                value="1"
                id="scale"
                name="scale"
                min="0.1"
                step="0.1"
                className="w-1/2 text-sm text-white font-semibold rounded-lg px-5 py-1.5 bg-gray-700 border border-gray-600 focus:ring-blue-500 focus:border-blue-500 opacity-80"
              />
            </div>
            <button
              id="button-scale"
              className="w-9/12 flex flex-col items-center py-1.5 bg-green-700 border border-slate-900/10 text-sm font-bold rounded-lg active:bg-violet-500"
            >
              Resize
            </button>
            <div className="flex flex-row gap-3">
              <button
                id="button-shrink"
                className="w-1/3 flex flex-col items-center py-1 bg-green-600 border border-slate-900/10 text-xs font-bold rounded-lg active:bg-violet-500"
              >
                <ArrowsIn />
              </button>
              <button
                id="button-enlarge"
                className="w-1/3 flex flex-col items-center py-1 bg-green-600 border border-slate-900/10 text-xs font-bold rounded-lg active:bg-violet-500"
              >
                <ArrowsOut />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col pl-4 pr-6 py-2 gap-1 border-b border-gray-500 text-white w-full">
        <h1 className="text-md font-bold">Texture</h1>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-3">
            <button
              id="button-texture-bump"
              className="w-1/2 flex flex-col items-center py-1.5 bg-gray-500 border border-slate-900/10 text-sm font-bold rounded-lg active:bg-violet-500"
            >
              Bump
            </button>
            <button
              id="button-texture-environment"
              className="w-1/2 flex flex-col items-center py-1.5 bg-gray-500 border border-slate-900/10 text-sm font-bold rounded-lg active:bg-violet-500"
            >
              Image
            </button>
          </div>
          <div className="flex flex-row gap-3">
            <button
              id="button-texture-reflective"
              className="w-1/2 flex flex-col items-center py-1.5 bg-gray-500 border border-slate-900/10 text-sm font-bold rounded-lg active:bg-violet-500"
            >
              Reflective
            </button>
            <button
              id="button-texture-none"
              className="w-1/2 flex flex-col items-center py-1.5 bg-gray-500 border border-slate-900/10 text-sm font-bold rounded-lg active:bg-violet-500"
            >
              None
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col pl-4 pr-6 py-2 gap-1 border-b border-gray-500 text-white w-full">
        <h1 className="text-md font-bold">Animation</h1>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-2">
            <button
              id="button-animation-play"
              className="w-1/3 flex flex-col items-center py-1.5 bg-green-500 border border-slate-900/10 text-sm font-bold rounded-lg active:bg-violet-500"
            >
              Play
            </button>
            <button
              id="button-animation-pause"
              className="w-1/3 flex flex-col items-center py-1.5 bg-yellow-500 border border-slate-900/10 text-sm font-bold rounded-lg active:bg-violet-500"
            >
              Pause
            </button>
            <button
              id="button-animation-stop"
              className="w-1/3 flex flex-col items-center py-1.5 bg-red-500 border border-slate-900/10 text-sm font-bold rounded-lg active:bg-violet-500"
            >
              Stop
            </button>
          </div>
          <div className="flex flex-row gap-2">
            <button
              id="button-animation-prev"
              className="w-1/3 flex flex-col items-center py-1.5 bg-green-500 border border-slate-900/10 text-sm font-bold rounded-lg active:bg-violet-500"
            >
              Prev
            </button>
            <button
              id="button-animation-next"
              className="w-1/3 flex flex-col items-center py-1.5 bg-yellow-500 border border-slate-900/10 text-sm font-bold rounded-lg active:bg-violet-500"
            >
              Next
            </button>
            <label
              id="set-animation-label"
              htmlFor="set-animation"
              className="flex w-1/3 flex-col items-center gap-2 px-4 py-2.5 mr-2 bg-slate-900/30 border border-slate-900/10 text-xs font-bold bg-blue-500 rounded-lg active:bg-violet-700 cursor-pointer"
            >
              <p>Set Animation</p>
            </label>
            <input
              className="hidden"
              type="file"
              accept=".json"
              id="set-animation"
              name="filename"
            />
          </div>
          <div className="flex flex-row gap-2">
            <div className="w-1/3 flex flex-row items-center">
              <input
                type="number"
                value="1000"
                id="duration"
                name="duration"
                min="1"
                step="10"
                className="w-2/3 text-sm text-white font-semibold rounded-lg px-5 py-1.5 bg-gray-700 border border-gray-600 focus:ring-blue-500 focus:border-blue-500 opacity-80"
              />
            </div>
            <button
              id="set-duration"
              className="w-1/3 flex flex-col items-center py-1.5 bg-green-700 border border-slate-900/10 text-sm font-bold rounded-lg active:bg-violet-500"
            >
              Set Duration
            </button>
            <button
              id="reverse-animation"
              className="w-1/3 flex flex-col items-center py-1.5 bg-green-700 border border-slate-900/10 text-sm font-bold rounded-lg active:bg-violet-500"
            >
              Reverse
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col pl-4 pr-6 py-2 gap-1 border-b border-gray-500 text-white w-full">
        <h1 className="text-md font-bold">Frame Controller</h1>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-2">
            <button
              id="save-as-frame"
              className="w-1/3 flex flex-col items-center py-1.5 bg-green-500 border border-slate-900/10 text-sm font-bold rounded-lg active:bg-violet-500"
            >
              Save as Frame
            </button>
            <button
              id="delete-frame"
              className="w-1/3 flex flex-col items-center py-1.5 bg-red-500 border border-slate-900/10 text-sm font-bold rounded-lg active:bg-violet-500"
            >
              Delete Frame
            </button>
            <div className="flex w-1/3">
              <p className="me-2">Frame:</p>
              <div id="idx-frame">NONE</div>
            </div>
          </div>
          <div className="flex flex-row gap-2">
            <button
              id="save-animation"
              className="w-1/3 flex flex-col items-center py-1.5 bg-green-500 border border-slate-900/10 text-sm font-bold rounded-lg active:bg-violet-500"
            >
              Save Animation
            </button>
            <button
              id="swap-with-next-frame"
              className="w-1/3 flex flex-col items-center py-1.5 bg-green-500 border border-slate-900/10 text-sm font-bold rounded-lg active:bg-violet-500"
            >
              Swap with Next Frame
            </button>
            <label
              id="insert-as-next-frame"
              htmlFor="uploadframe"
              className="flex w-1/3 flex-col items-center gap-2 px-4 py-2.5 mr-2 bg-slate-900/30 border border-slate-900/10 text-xs font-bold bg-blue-500 rounded-lg active:bg-violet-700 cursor-pointer"
            >
              <p>Insert as Next Frame</p>
            </label>
            <input
              className="hidden"
              type="file"
              accept=".json"
              id="uploadframe"
              name="filename"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rightbar;
