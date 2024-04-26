import { useEffect, useState, FunctionComponent } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [activeItem, setActiveItem] = useState<string>("");

  const location = useLocation();
  const { hash, pathname, search } = location;

  console.log(pathname);

  useEffect(() => {
    if (pathname === "/") handleItemClick("About");
  }, []);

  const handleItemClick = (item: string) => {
    setActiveItem(item);
  };

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
    <div>
      <span className="font-bold text-green-400">{activeItem}</span>
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
