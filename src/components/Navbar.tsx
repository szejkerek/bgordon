import React, { useState } from "react";
// import { Link } from "react-router-dom";

export default function Navbar() {
  const [activeItem, setActiveItem] = useState<string>("");

  const handleItemClick = (item: string) => {
    setActiveItem(item);
  };

  return (
    <div>
      <span className="font-bold text-green-400">{activeItem}</span>
      <div className="flex space-x-3">
        {/* <Link to="/" onClick={() => handleItemClick("About")}>
          <span>About</span>
        </Link>
        <Link to="/projects" onClick={() => handleItemClick("Projects")}>
          <span>Projects</span>
        </Link>
        <Link to="/resume" onClick={() => handleItemClick("Resume")}>
          <span>Resume</span>
        </Link> */}
      </div>
    </div>
  );
}
