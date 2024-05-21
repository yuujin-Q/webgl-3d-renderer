import { MagnifyingGlassMinus, MagnifyingGlassPlus } from "phosphor-react";
import { useAppAction, useAppStore } from "../stores";
import Header from "./Header";

const Leftbar = () => {

  return (
    <div className="border-r border-gray-600 bg-gray-700 w-3/12 overflow-auto">
      <Header />
      <div className="flex flex-col pl-4 pr-6 py-4 border-b border-gray-500 text-white w-full">
        <div className="flex items-center">
          <label
            htmlFor="model"
            className="block text-xl font-bold text-white w-5/12"
          >
            Articulated Model
          </label>
          <select
            id="model"
            className="border text-sm font-semibold rounded-lg w-7/12 p-3 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
            
          >
            <option value="3D1">3D Satu</option>
            <option value="3D2">3D Dua</option>
            <option value="3D3">3D Tiga</option>
            <option value="3D4">3D Empat</option>
          </select>
        </div>
      </div>
      <div className="flex flex-col pl-4 pr-6 py-4 border-b border-gray-500 text-white w-full">
        <h1 className="text-md font-bold">Component Tree</h1>
        <div id="component-tree"></div>
      </div>
      <div className="flex flex-col pl-4 pr-6 py-2 gap-1 border-b border-gray-500 text-white w-full">
        <h1 className="text-md font-bold">Camera Angle</h1>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row">
            <label className="text-sm font-semibold w-2/12">Angle X</label>
            <input
              className="w-10/12"
              type="range"
              id="cameraX"
              name="camera"
              min="-3.3"
              max="3.3"
              step="0.05"
            />
          </div>
          <div className="flex flex-row">
            <label className="text-sm font-semibold w-2/12">Angle Y</label>
            <input
              className="w-10/12"
              type="range"
              id="cameraY"
              name="camera"
              min="-3.3"
              max="3.3"
              step="0.05"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-row pl-4 pr-6 py-2 gap-1 border-b border-gray-500 text-white w-full">
        <div className="flex flex-col gap-2 text-white w-1/2">
          <h1 className="text-md font-bold">Change Cam Radius</h1>
          <div>
            <div className="flex flex-row gap-3">
              <button
                id="button-zoom-in"
                className="w-1/3 flex flex-col items-center py-1 bg-orange-500 border border-slate-900/10 text-xs font-bold rounded-lg active:bg-violet-500"
              >
                <MagnifyingGlassPlus />
              </button>
              <button
                id="button-zoom-out"
                className="w-1/3 flex flex-col items-center py-1 bg-orange-500 border border-slate-900/10 text-xs font-bold rounded-lg active:bg-violet-500"
              >
                <MagnifyingGlassMinus />
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 text-white w-1/2">
          <div className="flex flex-row items-center">
            <label className="text-md font-semibold mr-5">Shading</label>
            <input id="shader" type="checkbox" />
          </div>
          <button
            id="button-reset"
            className="w-9/12 flex flex-col items-center py-1.5 bg-red-500 border border-slate-900/10 text-sm font-bold rounded-lg active:bg-violet-500"
          >
            Reset
          </button>
        </div>
      </div>
      <div className="flex flex-col pl-4 pr-6 py-2 gap-1 border-b border-gray-500 text-white w-full">
        <h1 className="text-md font-bold">Projection</h1>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-10">
            <button
              id="button-proj-orthographic"
              className="w-1/2 flex flex-col items-center py-1.5 bg-pink-500 border border-slate-900/10 text-sm font-bold rounded-lg active:bg-violet-500"
            >
              Orthographic
            </button>
            <button
              id="button-proj-perspective"
              className="w-1/2 flex flex-col items-center py-1.5 bg-pink-500 border border-slate-900/10 text-sm font-bold rounded-lg active:bg-violet-500"
            >
              Perspective
            </button>
          </div>
          <div className="flex flex-row">
            <div className="w-1/4"></div>
            <button
              id="button-proj-oblique"
              className="w-1/2 flex flex-col items-center py-1.5 bg-pink-500 border border-slate-900/10 text-sm font-bold rounded-lg active:bg-violet-500"
            >
              Oblique
            </button>
            <div className="w-1/4"></div>
          </div>
        </div>
      </div>
      <div className="flex flex-col pl-4 pr-6 py-2 gap-1 border-b border-gray-500 text-white w-full">
        <div className="flex">
          <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            Edit Single
          </span>
          <label className="relative inline-flex items-center cursor-pointer mx-4">
            <input
              type="checkbox"
              value=""
              id="subtree-toggle"
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-red-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
          <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            Edit SubTree
          </span>
        </div>
      </div>
    </div>
  );
};

export default Leftbar;
