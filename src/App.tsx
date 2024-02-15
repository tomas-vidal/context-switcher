import { FormEvent, useState, useEffect } from "react";
import "./index.css";

export type Tab = {
  url: string;
  id: Id;
};

type Id = `${string}-${string}-${string}-${string}-${string}`;

function App() {
  const [input, setInput] = useState<string>("");
  const [tabs, setTabs] = useState<Tab[]>([]);

  function openTabs(): void {
    tabs.forEach(async (tab: Tab) => {
      await chrome.tabs.create({
        url: tab.url,
      });
    });
  }

  useEffect(() => {
    const fetchData = () => {
      chrome.storage.local.get("tabs", (result) => {
        setTabs(result.tabs);
      });
    };
    fetchData();
  }, []);

  useEffect(() => {
    chrome.storage.local.set({ tabs: tabs });
  }, [tabs]);

  async function addTab(e: FormEvent) {
    e.preventDefault();
    if (!input) return;
    let url: string;
    const id: Id = crypto.randomUUID();
    if (input.includes("http://") || input.includes("https://")) {
      url = input;
    } else if (input.includes("www.")) {
      url = "https://" + input;
    } else {
      url = "https://www." + input;
    }
    setTabs((prevTabs) => [...prevTabs, { url, id }]);
    setInput("");
  }

  async function deleteTab(id: Id) {
    setTabs((prevTabs: Tab[]): Tab[] => {
      return prevTabs.filter((tab: Tab) => tab.id !== id);
    });
  }

  return (
    <main className="w-[400px] h-[400px] bg-darker-gray flex flex-col items-center py-2">
      <form className="flex gap-2">
        <input
          className="px-2 rounded-xs"
          type="text"
          name="url"
          value={input}
          onChange={(evt) => setInput(evt.currentTarget.value)}
          placeholder="Enter new URL to save..."
        />
        <button
          className="bg-dark-gray text-white px-2 rounded-xs"
          type="submit"
          onClick={(e) => addTab(e)}
        >
          Add
        </button>
      </form>
      <section className="flex-1 self-stretch my-2 overflow-auto">
        <ul className="flex flex-col gap-2">
          {tabs.map((tab: Tab) => {
            return (
              <li className="bg-dark-gray text-white/50 flex px-2">
                {tab.url}
                <button
                  className="text-red-400 ml-auto"
                  onClick={() => deleteTab(tab.id)}
                >
                  X
                </button>
              </li>
            );
          })}
        </ul>
      </section>
      <div>
        <button
          className="bg-red-danger rounded-sm tracking-normal py-2 px-10 font-semibold text-white"
          onClick={openTabs}
        >
          Open tabs
        </button>
      </div>
    </main>
  );
}

export default App;
