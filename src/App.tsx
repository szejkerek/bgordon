import "./App.css";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Skills from "./pages/Skills";
import About from "./pages/About";
import Projects from "./pages/Projects";
import { Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <div className="grid grid-cols-12 gap-6 px-5 my-14 lg:px-12 md:px-16 sm:px-21">
      <div className="col-span-12 text-center bg-white lg:col-span-3 rounded-2xl">
        <Sidebar />
      </div>
      <div className="col-span-12 overflow-hidden bg-white lg:col-span-9 rounded-2xl">
        <Navbar />
        <Routes>
          <Route path="/" Component={About} />
          <Route path="/skills" Component={Skills} />
          <Route path="/projects" Component={Projects} />
        </Routes>
      </div>
    </div>
  );
}
