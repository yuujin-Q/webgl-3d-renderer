import Canvas from "./components/Canvas";
import Leftbar from "./components/Leftbar";
import Rightbar from "./components/Rightbar";
import { CanvasProvider } from "./components/CanvasContext";
import { keyboardInput } from "./lib/Keyboard";

document.addEventListener("keydown", keyboardInput);

function App() {
  return (
    <CanvasProvider>
      <div className="h-screen flex">
        <Leftbar />
        <Canvas />
        <Rightbar />
      </div>
    </CanvasProvider>
  );
}

export default App;
