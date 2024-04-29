import { useEffect, useState, FunctionComponent } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  let NavBarItems: [name: string, path: string][] = [
    ["About", "/"],
    ["Skills", "/skills"],
    ["Projects", "/projects"],
  ];

  const [activeItem, setActiveItem] = useState<string>("");
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    setActiveItem(NavBarItems[0][0]);
    NavBarItems.map((pair) => {
      if (pathname === pair[1]) setActiveItem(pair[0]);
    });
  }, [pathname]);

  const NavItem: FunctionComponent<{
    name: string;
    path: string;
  }> = ({ name, path }) => {
    return activeItem !== name ? (
      <Link to={path} onClick={() => setActiveItem(name)}>
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
        {NavBarItems.map((pair, index) => (
          <NavItem name={pair[0]} path={pair[1]} />
        ))}
      </div>
    </div>
  );
}
