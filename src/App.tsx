import Canvas from "./components/Canvas";
import Header from "./components/Header";
import Leftbar from "./components/Leftbar";
import Rightbar from "./components/Rightbar";
import { CanvasProvider } from "./components/CanvasContext";
import { keyboardInput } from "./lib/Keyboard";

document.addEventListener("keydown", keyboardInput);

function App() {
  return (
    <>
      <Header />
      <div className="flex">
        <CanvasProvider>
          <>
            <Leftbar />
            <Canvas />
            <Rightbar />
          </>
        </CanvasProvider>
      </div>
    </>
  );
}

export default App;
