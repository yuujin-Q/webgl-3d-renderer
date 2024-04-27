
const Header = () => {
    return <header
    className="w-full px-10 py-1 border-b border-slate-900/10 bg-gradient-to-r from-green-800 to-purple-800 text-white"
  >
    <div className="grid grid-cols-3">
      <div className="flex items-center justify-start col-span-1"></div>
      <div className="items-center justify-center col-span-1">
        <h1 className="text-2xl font-bold text-center py-4">
          3D Articulated Model
        </h1>
      </div>
      <div className="flex items-center justify-end col-span-1 gap-2">
        <label
          id="load-button"
          htmlFor="load"
          className="flex flex-col items-center gap-2 px-4 py-2.5 mr-2 bg-slate-900/30 border border-slate-900/10 text-xs font-bold rounded-lg active:bg-violet-700 cursor-pointer"
        >
          <img src="./img/load2.svg" className="w-5 h-5" />
          <p>Load</p>
        </label>
        <input
          className="hidden"
          type="file"
          accept=".json"
          id="load"
          name="filename"
        />
        <button
          id="save"
          className="flex flex-col items-center gap-2 px-4 py-2.5 mr-2 bg-slate-900/30 border border-slate-900/10 text-xs font-bold rounded-lg active:bg-violet-700"
        >
          <img src="./img/save2.svg" className="w-5 h-5" />
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
    </div>
  </header>
}

export default Header