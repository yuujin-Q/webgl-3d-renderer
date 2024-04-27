import Canvas from "./components/Canvas"
import Header from "./components/Header"
import Leftbar from "./components/Leftbar"
import Rightbar from "./components/Rightbar"

function App() {

  return (
    <>
      <Header/>
      <div className="flex">
        <Leftbar/>
        <Canvas/>
        <Rightbar/>
      </div>
    </>
  )
}

export default App
