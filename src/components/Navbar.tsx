import { useEffect, useState, FunctionComponent } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [activeItem, setActiveItem] = useState<string>("");

  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    if (pathname === "/") setActiveItem("About");
  }, [pathname]);

  const NavItem: FunctionComponent<{
    activeItem: string;
    setActiveItem: Function;
    name: string;
    route: string;
  }> = ({ activeItem, setActiveItem, name, route }) => {
    return activeItem !== name ? (
      <Link to={route} onClick={() => setActiveItem(name)}>
        <span>{name}</span>
      </Link>
    ) : null;
  };

  return (
    <div className="flex justify-between px-5">
      <span className="text-xl font-bold text-green-400 border-b-4 border-green-400">
        {activeItem}
      </span>
      <div className="flex space-x-3">
        <NavItem
          setActiveItem={setActiveItem}
          activeItem={activeItem}
          name="About"
          route="/"
        />
        <NavItem
          setActiveItem={setActiveItem}
          activeItem={activeItem}
          name="Resume"
          route="/resume"
        />
        <NavItem
          setActiveItem={setActiveItem}
          activeItem={activeItem}
          name="Projects"
          route="/projects"
        />
      </div>
    </div>
  );
}
