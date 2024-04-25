import "./App.css";
import Sidebar from "./components/Sidebar";

export default function App() {
  return (
    <div className="grid grid-cols-12 gap-6 my-14 lg:px-48 px-5">
      <div className="lg:col-span-3 bg-white rounded-2xl col-span-12">
        <Sidebar />
      </div>
      <div className="lg:col-span-9 bg-white rounded-2xl col-span-12">xd</div>
    </div>
  );
}
