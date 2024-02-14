import { FormEvent, useState } from "react"
import "./index.css";


function App() {
  const [input, setInput] = useState<string>("");
  const [tabs, setTabs] = useState<string[]>([])
  function openTabs() : void {
    tabs.forEach( async (tab) => {
      await chrome.tabs.create({
        url: tab,
      });
    })
  }

  function addTab(e : FormEvent) : void {
    e.preventDefault();
    if (!input) return;
    setInput("");
    if (input.includes("http://") || input.includes("https://")) {
      setTabs( prevTabs => [...prevTabs, input]);
    } else if (input.includes("wwww.")) {
      setTabs( prevTabs => [...prevTabs, "https://" + input]);
    } else {
      setTabs( prevTabs => [...prevTabs, "https://www." + input]);
    }
  }

  function deleteTab(id) {

  }
  return (
    <main className="w-[400px] h-[400px] bg-darker-gray flex flex-col items-center py-2">
      <form className="flex gap-2">
      <input className="px-2 rounded-xs" type="text" name="url" value={input} onChange={(evt) => setInput(evt.currentTarget.value)} placeholder="Enter new URL to save..." />
      <button className="bg-dark-gray text-white px-2 rounded-xs" type="submit" onClick={(e) => addTab(e)}>Add</button>
      </form>
      <section className="flex-1 self-stretch my-2">
          <ul className="flex flex-col gap-2">
            {tabs.map( (tab, idx) => {
              return(
              <li className="bg-dark-gray text-white/50 flex px-2">
                {tab}
                <button className="text-red-400 ml-auto" onClick={() => deleteTab()}>X</button>
              </li>
              )
            })}
          </ul>
      </section>
      <div>
      <button
        className="bg-red-danger rounded-sm tracking-normal py-2 px-10 font-semibold text-white"
        onClick={openTabs}
      >
        Open tabs
      </button></div>
    </main>
  );
}

export default App;
