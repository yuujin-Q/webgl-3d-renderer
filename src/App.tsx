import { useRef } from "react"
import Canvas from "./components/Canvas"
import Header from "./components/Header"
import Leftbar from "./components/Leftbar"
import Rightbar from "./components/Rightbar"

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <>
      <Header/>
      <div className="flex">
        <Leftbar/>
        <Canvas canvasRef={canvasRef}/>
        <Rightbar/>
      </div>
    </>
  )
}

export default App
