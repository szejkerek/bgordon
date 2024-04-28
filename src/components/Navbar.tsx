import { useEffect, useState, FunctionComponent } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [activeItem, setActiveItem] = useState<string>("");

  const location = useLocation();
  const { pathname } = location;
  console.log(pathname);
  useEffect(() => {
    if (pathname === "/") setActiveItem("About");
    else if (pathname === "/skills") setActiveItem("Skills");
    else if (pathname === "/projects") setActiveItem("Projects");
    else setActiveItem("About");
  }, [pathname]);

  const NavItem: FunctionComponent<{
    activeItem: string;
    setActiveItem: Function;
    name: string;
    route: string;
  }> = ({ activeItem, setActiveItem, name, route }) => {
    return activeItem !== name ? (
      <Link to={route} onClick={() => setActiveItem(name)}>
        <span className="hover:text-green-500">{name}</span>
      </Link>
    ) : null;
  };

  return (
    <div className="flex justify-between px-5 py-3 my-3">
      <span className="text-xl font-bold text-green-400 border-b-4 border-green-400 md:text-2xl">
        {activeItem}
      </span>
      <div className="flex space-x-5 text-lg">
        <NavItem
          setActiveItem={setActiveItem}
          activeItem={activeItem}
          name="About"
          // route="https://bgordon.pl/"
          route="/"
        />
        <NavItem
          setActiveItem={setActiveItem}
          activeItem={activeItem}
          name="Skills"
          // route="https://bgordon.pl/resume"
          route="/skills"
        />
        <NavItem
          setActiveItem={setActiveItem}
          activeItem={activeItem}
          name="Projects"
          // route="https://bgordon.pl/projects"
          route="/projects"
        />
      </div>
    </div>
  );
}
