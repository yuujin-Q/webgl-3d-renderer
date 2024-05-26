import { CaretLeft, CaretRight, MagnifyingGlassMinus, MagnifyingGlassPlus } from "phosphor-react";
import Header from "./Header";
import { Renderer } from "../lib/renderer/Renderer";
import { MouseInput } from "../lib/Mouse";
import * as RadixSlider from '@radix-ui/react-slider';
import { DirectionalLight } from "../types/objects/light/DirectionalLight";
import { Vec3 } from "../types/math/Vec3";
import { Color } from "../types/objects/Color";
import { useAppAction, useAppStore } from "../stores";
import { Mesh } from "../types/objects/mesh/Mesh";
import { PhongMaterial } from "../types/objects/mesh/material/PhongMaterial";

type EnumModel = "animal" | "mechanic_hand" | "robot" | "creeper" | "pyramid" | "cinder_block" | "hollow_cube" | "trapzz"

const Leftbar = () => {
  const { model, activeObject } = useAppStore(state => state)
  const { setModel } = useAppAction()
  

    if(activeObject !== ""){
      return (
        <div className="border-r border-gray-600 bg-black w-3/12 overflow-auto">
          <Header />
          <div className="flex flex-col pl-4 pr-6 py-4 border-b border-gray-500 text-white w-full">
            <div className="flex items-center">
              <label
                htmlFor="model"
                className="block text-xl font-bold text-white w-5/12"
              >
                Select Model
              </label>
              <select
                id="model"
                className="border text-sm font-semibold rounded-lg w-7/12 p-3 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                value={model}
                onChange={(e) => {
                  setModel(e.target.value as EnumModel)
                }}
              >
                <option value="animal">Animal Model</option>
                <option value="mechanic_hand">Mechanic Hand</option>
                <option value="robot">Robot Model</option>
                <option value="creeper">Creeper</option>
                <option value="pyramid">Pyramid</option>
                <option value="cinder_block">Cinder Block</option>
                <option value="hollow_cube">Hollow Cube</option>
                <option value="trapzz">Trapzz</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col pl-4 pr-6 py-2 gap-1 border-b border-gray-500 text-white w-full">
            <h1 className="text-md font-bold mb-2">Camera Angle</h1>
            <div className="flex flex-col gap-6">
              <div className="flex justify-evenly items-center">
                <button
                  className="px-4 py-2 text-lg rounded-md border-2 border-green-400  shadow-[0_0_15px_0px] shadow-green-400 text-green-400 hover:bg-green-400 hover:text-black active:scale-95"
                  onClick={() => MouseInput.camera.move(-20, 0, 0.01)}
                ><CaretLeft size={24} weight="bold" /></button>
                <label className="text-sm font-semibold w-2/12">Angle X</label>
                <button
                  className="px-4 py-2 text-lg rounded-md border-2 border-green-400  shadow-[0_0_15px_0px] shadow-green-400 text-green-400 hover:bg-green-400 hover:text-black active:scale-95"
                  onClick={() => MouseInput.camera.move(20, 0, 0.01)}
                ><CaretRight size={24} weight="bold" /></button>
              </div>
              <div className="flex justify-evenly items-center">
                <button
                  className="px-4 py-2 text-lg rounded-md border-2 border-green-400  shadow-[0_0_15px_0px] shadow-green-400 text-green-400 hover:bg-green-400 hover:text-black active:scale-95"
                  onClick={() => MouseInput.camera.move(0, -20, 0.01)}
                ><CaretLeft size={24} weight="bold" /></button>
                <label className="text-sm font-semibold w-2/12">Angle Y</label>
                <button
                  className="px-4 py-2 text-lg rounded-md border-2 border-green-400  shadow-[0_0_15px_0px] shadow-green-400 text-green-400 hover:bg-green-400 hover:text-black active:scale-95"
                  onClick={() => MouseInput.camera.move(0, 20, 0.01)}
                ><CaretRight size={24} weight="bold" /></button>
              </div>
            </div>
          </div>
          <div className="pl-4 pr-6 py-2 gap-1 border-b border-gray-500 text-white w-full">
            <h1 className="text-md font-bold mb-2">Camera Zoom</h1>
            <div>
              <div className="flex items-center justify-evenly">
                <button
                  className="px-4 py-2 text-lg rounded-md border-2 border-green-400  shadow-[0_0_15px_0px] shadow-green-400 text-green-400 hover:bg-green-400 hover:text-black active:scale-95"
                  onClick={() => MouseInput.camera.zoom(5, 0.01)}
                ><MagnifyingGlassMinus size={24} weight="bold" /></button>
                <label className="text-sm font-semibold w-2/12">Angle Y</label>
                <button
                  className="px-4 py-2 text-lg rounded-md border-2 border-green-400  shadow-[0_0_15px_0px] shadow-green-400 text-green-400 hover:bg-green-400 hover:text-black active:scale-95"
                  onClick={() => MouseInput.camera.zoom(-5, 0.01)}
                ><MagnifyingGlassPlus size={24} weight="bold" /></button>
              </div>
            </div>
          </div>
          <div className="flex flex-col pl-4 pr-6 py-2 gap-1 border-b border-gray-500 text-white w-full">
            <h1 className="text-md font-bold">Projection</h1>
            <div className="flex flex-col gap-2">
              <div className="flex flex-row gap-10">
                <button
                  id="button-proj-orthographic"
                  className="w-1/2 flex flex-col items-center py-1.5 bg-pink-500 border border-slate-900/10 text-sm font-bold rounded-lg active:bg-violet-500"
                  onClick={() => Renderer.switchCamera(0)}
                >
                  Orthographic
                </button>
                <button
                  id="button-proj-perspective"
                  className="w-1/2 flex flex-col items-center py-1.5 bg-pink-500 border border-slate-900/10 text-sm font-bold rounded-lg active:bg-violet-500"
                  onClick={() => Renderer.switchCamera(1)}
                >
                  Perspective
                </button>
              </div>
              <div className="flex flex-row">
                <div className="w-1/4"></div>
                <button
                  id="button-proj-oblique"
                  className="w-1/2 flex flex-col items-center py-1.5 bg-pink-500 border border-slate-900/10 text-sm font-bold rounded-lg active:bg-violet-500"
                  onClick={() => Renderer.switchCamera(2)}
                >
                  Oblique
                </button>
                <div className="w-1/4"></div>
              </div>
            </div>
          </div>
          <div className="flex flex-col pl-4 pr-6 py-2 gap-1 border-b border-gray-500 text-white w-full">
            <h1 className="text-md font-bold">Lighting</h1>
            <div className="flex">
              <label className="text-sm font-semibold w-min mr-2">X - axis</label>
              <RadixSlider.Root
                className="w-full relative flex items-center h-5"
                id="cameraTranslateX"
                name="camareTranslate"
                min={-1}
                max={1}
                defaultValue={[0]}
                // value={[globalTranslate.z]}
                step={0.01}
                onValueChange={(val) => {
                  const light = Renderer.getLight()
                  if(light instanceof DirectionalLight){
                    light.setDirection(new Vec3(val[0], light.getDirection.y, light.getDirection.z))
                  }
                  Renderer.setLight(light)
                  Renderer.renderScene()
                }}
              >
                <RadixSlider.Track className="bg-blackA7 relative grow rounded-full h-[3px] bg-black">
                  <RadixSlider.Range className="absolute bg-green-400 shadow-[0_0_30px_2px] rounded-full h-full" />
                </RadixSlider.Track>
                <RadixSlider.Thumb
                  className="block w-5 h-5 bg-green-400 shadow-[0_0_30px_2px] rounded-[10px] focus:outline-none focus:scale-125"
                  aria-label="Volume"
                />
              </RadixSlider.Root>
            </div>
            <div className="flex">
              <label className="text-sm font-semibold w-min mr-2">Y - axis</label>
              <RadixSlider.Root
                className="w-full relative flex items-center h-5"
                id="cameraTranslateX"
                name="camareTranslate"
                min={-1}
                max={1}
                defaultValue={[0]}
                // value={[globalTranslate.z]}
                step={0.01}
                onValueChange={(val) => {
                  const light = Renderer.getLight()
                  if(light instanceof DirectionalLight){
                    light.setDirection(new Vec3(light.getDirection.x, val[0], light.getDirection.z))
                  }
                  Renderer.setLight(light)
                  Renderer.renderScene()
                }}
              >
                <RadixSlider.Track className="bg-blackA7 relative grow rounded-full h-[3px] bg-black">
                  <RadixSlider.Range className="absolute bg-green-400 shadow-[0_0_30px_2px] rounded-full h-full" />
                </RadixSlider.Track>
                <RadixSlider.Thumb
                  className="block w-5 h-5 bg-green-400 shadow-[0_0_30px_2px] rounded-[10px] focus:outline-none focus:scale-125"
                  aria-label="Volume"
                />
              </RadixSlider.Root>
            </div>
            <div className="flex">
              <label className="text-sm font-semibold w-min mr-2">Z - axis</label>
              <RadixSlider.Root
                className="w-full relative flex items-center h-5"
                id="cameraTranslateX"
                name="camareTranslate"
                min={-1}
                max={1}
                defaultValue={[0]}
                // value={[globalTranslate.z]}
                step={0.01}
                onValueChange={(val) => {
                  const light = Renderer.getLight()
                  if(light instanceof DirectionalLight){
                    light.setDirection(new Vec3(light.getDirection.x, light.getDirection.y, val[0]))
                  }
                  Renderer.setLight(light)
                  Renderer.renderScene()
                }}
              >
                <RadixSlider.Track className="bg-blackA7 relative grow rounded-full h-[3px] bg-black">
                  <RadixSlider.Range className="absolute bg-green-400 shadow-[0_0_30px_2px] rounded-full h-full" />
                </RadixSlider.Track>
                <RadixSlider.Thumb
                  className="block w-5 h-5 bg-green-400 shadow-[0_0_30px_2px] rounded-[10px] focus:outline-none focus:scale-125"
                  aria-label="Volume"
                />
              </RadixSlider.Root>
            </div>
            <div className="flex">
              <label className="text-sm font-semibold w-min mr-2">Color</label>
              <input type="color" defaultValue="#ffffff" onChange={(e) => {
                const light = Renderer.getLight()
                const color = new Color(1,1,1)
                color.setHex(e.target.value)
                light.setColor(color)
                Renderer.setLight(light)
                Renderer.renderScene()
              }}/>
            </div>
          </div>
          <div className="flex flex-col pl-4 pr-6 py-2 gap-1 border-b border-gray-500 text-white w-full">
            <h1 className="text-md font-bold">Material</h1>
            <select
              id="model"
              className="border text-sm font-semibold rounded-lg w-7/12 p-3 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
              defaultValue=""
              onChange={(e) => {
                if(e.target.value != ""){
                  Renderer.changeMaterial(e.target.value as "basic" | "phong")
                }
              }}
            >
              <option value="">Select</option>
              <option value="basic">Basic</option>
              <option value="phong">Phong</option>
            </select> 
            {
              (Renderer.getObjectById(activeObject) instanceof Mesh) ? 
              <div>
                {
                  ((Renderer.getObjectById(activeObject) as Mesh).material instanceof PhongMaterial) ? "Phong" : "Basic"
                }
              </div>
    
                : 
                "Objek Terpilih Bukan merupakan Mesh"
            }
          </div>
        </div>
      );
    }else{
      return <div></div>
    }
};

export default Leftbar;
