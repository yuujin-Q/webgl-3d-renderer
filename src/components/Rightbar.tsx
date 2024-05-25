import { Renderer } from "../lib/renderer/Renderer";
import { ObjectNode } from "../types/objects/ObjectNode";
import { useAppAction, useAppStore } from "../stores";
import { Vec3 } from "../types/math/Vec3";
import { radToDeg } from "../types/math/Degree";
import * as RadixSlider from '@radix-ui/react-slider';


const Rightbar = () => {
  const { scene, globalRotate, globalScale, globalTranslate } = useAppStore(state => state)
  const { setActiveObject, setGlobalTranslate, setGlobalRotate, setGlobalScale } = useAppAction()
  const setTransformation = (translate: Vec3, rotate: Vec3, scale: Vec3) => {
    setGlobalRotate(new Vec3(radToDeg(rotate.x), radToDeg(rotate.y), radToDeg(rotate.z)))
    setGlobalScale(scale)
    setGlobalTranslate(translate)
  }
  const updateXRotate = (val: number) => {
    Renderer.setRotation({ x: val }, true);
    setGlobalRotate(new Vec3(val, globalRotate.y, globalRotate.z))
  };
  const updateYRotate = (val: number) => {
    Renderer.setRotation({ y: val }, true);
    setGlobalRotate(new Vec3(globalRotate.x, val, globalRotate.z))

  };
  const updateZRotate = (val: number) => {
    Renderer.setRotation({ z: val }, true);
    setGlobalRotate(new Vec3(globalRotate.x, globalRotate.y, val))
  };
  const updateTranslation = ({
    x,
    y,
    z,
  }: {
    x?: number;
    y?: number;
    z?: number;
  }) => {
    const newX = x ? x : Renderer.translation().x;
    const newY = y ? y : Renderer.translation().y;
    const newZ = z ? z : Renderer.translation().z;
    Renderer.setTranslation({ x: newX, y: newY, z: newZ });
    setGlobalTranslate(new Vec3(newX, newY, newZ))
  };
  return (
    <div className="border-r border-gray-600 bg-black w-3/12 overflow-auto">
      <div className="h-[400px] flex flex-col pl-4 pr-6 py-2 overflow-auto text-white no-scrollbar">
        <h1 className="text-md font-bold">Active Component :</h1>
        {
          RenderTree(scene, setActiveObject, setTransformation)
        }
      </div>
      <div className="flex flex-col pl-4 pr-6 py-2 gap-1 border-b border-gray-500 text-white w-full">
        <h1 className="text-md font-bold">Rotate</h1>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row">
            <label className="text-sm font-semibold w-2/12">X - axis</label>
            <RadixSlider.Root
              className="w-10/12 relative flex items-center h-5"
              id="rotateX"
              name="scale"
              min={-180}
              max={180}
              value={[globalRotate.x]}
              step={0.05}
              onValueChange={(val) => updateXRotate(val[0])}
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
          <div className="flex flex-row">
            <label className="text-sm font-semibold w-2/12">Y - axis</label>
            <RadixSlider.Root
              className="w-10/12 relative flex items-center h-5"
              id="rotateY"
              name="scale"
              min={-180}
              max={180}
              value={[globalRotate.y]}
              step={0.05}
              onValueChange={(val) => updateYRotate(val[0])}
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
          <div className="flex flex-row">
            <label className="text-sm font-semibold w-2/12">Z - axis</label>
            <RadixSlider.Root
              className="w-10/12 relative flex items-center h-5"
              id="rotateZ"
              name="scale"
              min={-180}
              max={180}
              value={[globalRotate.z]}
              step={0.05}
              onValueChange={(val) => updateZRotate(val[0])}
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
        </div>
      </div>
      <div className="flex flex-col pl-4 pr-6 py-2 gap-1 border-b border-gray-500 text-white w-full">
        <h1 className="text-md font-bold">Scale</h1>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row">
            <label className="text-sm font-semibold w-2/12">X - axis</label>
            <RadixSlider.Root
              className="w-10/12 relative flex items-center h-5"
              id="scaleX"
              name="scale"
              min={0.1}
              max={5}
              value={[globalScale.x]}
              step={0.05}
              onValueChange={(val) => {
                Renderer.setScale({ x: val[0] })
                setGlobalScale(new Vec3(val[0], globalScale.y, globalScale.z))
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
          <div className="flex flex-row">
            <label className="text-sm font-semibold w-2/12">Y - axis</label>
            <RadixSlider.Root
              className="w-10/12 relative flex items-center h-5"
              id="scaleY"
              name="scale"
              min={0.1}
              max={5}
              value={[globalScale.y]}
              step={0.05}
              onValueChange={(val) => {
                Renderer.setScale({ y: val[0] })
                setGlobalScale(new Vec3(globalScale.x, val[0], globalScale.z))
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
          <div className="flex flex-row">
            <label className="text-sm font-semibold w-2/12">Z - axis</label>
            <RadixSlider.Root
              className="w-10/12 relative flex items-center h-5"
              id="scaleZ"
              name="scale"
              min={0.1}
              max={5}
              value={[globalScale.z]}
              step={0.05}
              onValueChange={(val) => {
                Renderer.setScale({ z: val[0] })
                setGlobalScale(new Vec3(globalScale.x, globalScale.y, val[0]))
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
        </div>
      </div>
      <div className="pl-4 pr-6 py-2 gap-1 border-b border-gray-500 text-white w-full">
        <h1 className="text-md font-bold">Translate</h1>
        <div className="flex flex-col gap-3">
          <div>
            <div className="flex flex-row gap-3">
              <label className="text-sm font-semibold w-2/12">X - axis</label>
              <RadixSlider.Root
                className="w-10/12 relative flex items-center h-5"
                id="translateX"
                name="translate"
                min={-2000}
                max={2000}
                value={[globalTranslate.x]}
                step={1}
                onValueChange={(val) => updateTranslation({ x: val[0] })}
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
          </div>
          <div>
            <div className="flex flex-row gap-3">
              <label className="text-sm font-semibold w-2/12">Y - axis</label>
              <RadixSlider.Root
                className="w-10/12 relative flex items-center h-5"
                id="translateY"
                name="translate"
                min={-2000}
                max={2000}
                value={[globalTranslate.y]}
                step={1}
                onValueChange={(val) => updateTranslation({ y: val[0] })}
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
          </div>
          <div>
            <div className="flex flex-row gap-3">
              <label className="text-sm font-semibold w-2/12">Z - axis</label>
              <RadixSlider.Root
                className="w-10/12 relative flex items-center h-5"
                id="translateZ"
                name="translate"
                min={-4000}
                max={4000}
                value={[globalTranslate.z]}
                step={1}
                onValueChange={(val) => updateTranslation({ z: val[0] })}
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
              className="w-1/3 flex flex-col items-center py-1.5 bg-green-500 border border-slate-900/10 text-sm font-bold rounded-lg active:bg-violet-500 justify-center"
            >
              Play
            </button>
            <button
              id="button-animation-pause"
              className="w-1/3 flex flex-col items-center py-1.5 bg-yellow-500 border border-slate-900/10 text-sm font-bold rounded-lg active:bg-violet-500 justify-center"
            >
              Pause
            </button>
            <button
              id="button-animation-stop"
              className="w-1/3 flex flex-col items-center py-1.5 bg-red-500 border border-slate-900/10 text-sm font-bold rounded-lg active:bg-violet-500 justify-center"
            >
              Stop
            </button>
          </div>
          <div className="flex flex-row gap-3">
            <button
              id="button-animation-prev"
              className="w-1/2 flex flex-col items-center py-1.5 bg-gray-500 border border-slate-900/10 text-sm font-bold rounded-lg active:bg-violet-500 justify-center"
            >
              Prev
            </button>
            <button
              id="button-animation-next"
              className="w-1/2 flex flex-col items-center py-1.5 bg-gray-500 border border-slate-900/10 text-sm font-bold rounded-lg active:bg-violet-500 justify-center"
            >
              Next
            </button>
          </div>
          <div className="flex flex-row gap-3">
            <button
              id="button-animation-first"
              className="w-1/2 flex flex-col items-center py-1.5 bg-gray-500 border border-slate-900/10 text-sm font-bold rounded-lg active:bg-violet-500 justify-center"
            >
              First
            </button>
            <button
              id="button-animation-last"
              className="w-1/2 flex flex-col items-center py-1.5 bg-gray-500 border border-slate-900/10 text-sm font-bold rounded-lg active:bg-violet-500 justify-center"
            >
              Last
            </button>
          </div>
          <div className="flex flex-row justify-center text-center items-center">
            <label className="text-md font-semibold mr-3">Reverse</label>
            <input id="toggle-reverse" type="checkbox"/>
            <label className="text-md font-semibold ml-5 mr-3">Auto Replay</label>
            <input id="toggle-auto-replay" type="checkbox"/>
            <label className="text-md font-semibold ml-5 mr-3">FPS</label>
            <input
              type="number"
              id="fps"
              name="fps"
              min="1"
              step="1"
              className="w-full text-sm text-white font-semibold rounded-lg px-5 py-1.5 bg-gray-700 border border-gray-600 focus:ring-blue-500 focus:border-blue-500 opacity-80"
            />
          </div>
          <div className="flex flex-row gap-3">
            <label className="text-sm font-semibold w-fit">Frame</label>
            <input
              className="w-full justify-end"
              type="range"
              id="frame"
              name="frame"
              min="0"
              max="100"
              step="1"
            />
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

const RenderTree = (object: ObjectNode, setActiveObject: (val: string) => void, setTransformation: (translate: Vec3, rotate: Vec3, scale: Vec3) => void) => {
  // if name is Camera, return null
  if (object.name === "Camera") {
    return null;
  }
  return <div className="pl-4">
    {
      Renderer.getActiveObject() == object.id ?
        <span className="block max-w-max my-3 px-2 py-1 font-medium border-2 border-green-400 rounded-md shadow-[0_0_15px_0px] shadow-green-400 bg-green-400 text-black cursor-pointer">{object.name}</span>
        :
        <span className="block max-w-max my-3 px-2 py-1 text-green-400 font-medium border-2 border-green-400 rounded-md shadow-[0_0_15px_0px] shadow-green-400 hover:bg-green-400 hover:text-black cursor-pointer" onClick={() => {
          Renderer.setActiveObject(object.id)
          setActiveObject(object.id)
          setTransformation(Renderer.translation(), Renderer.rotation(), Renderer.scaler())
        }}>{object.name}</span>
    }
    {
      object.children.map(child => {
        return RenderTree(child, setActiveObject, setTransformation)
      })
    }
  </div>
}

export default Rightbar;
