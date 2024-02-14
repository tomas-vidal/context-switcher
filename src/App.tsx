import "./index.css";

function App() {
  async function openTabs() {
    await chrome.tabs.create({
      url: "https://www.op.gg/summoners/las/Ax7SynysterGates-LAS",
    });
    await chrome.tabs.create({ url: "https://u.gg/" });
  }
  return (
    <main className="w-[400px] h-[400px] bg-dark-gray flex items-center justify-center">
      <button
        className="bg-red-danger rounded-sm tracking-normal py-2 px-10 font-semibold text-white"
        onClick={openTabs}
      >
        Open tabs
      </button>
    </main>
  );
}

export default App;
