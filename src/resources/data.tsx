import { BsCircleFill } from "react-icons/bs";
import { IAboutServices, ISkill } from "../types";
import { FaGamepad, FaCode, FaNetworkWired } from "react-icons/fa";

export const AboutHeader =
  "Skilled computer science graduate with few years of experience in designing and developing games. Passionate about graphics and software development, that wants to improve his skills in Rendering, Game Design and Graphics API Programming.";

export const AboutServices: IAboutServices[] = [
  {
    Title: "Game Developer",
    About:
      "Crafting immersive gaming experiences. Experienced in game jams and web development.",
    Icon: FaGamepad,
  },
  {
    Title: "Graphic Engineer",
    About:
      "Creating stunning visual effects with OpenGL and graphics technologies.",
    Icon: FaGamepad,
  },
  {
    Title: "Low-Level Programmer",
    About:
      "Optimizing performance and efficiency with C++ and low-level programming.",
    Icon: FaCode,
  },
  {
    Title: "Network Programmer",
    About:
      "Developing robust networking solutions for high-performance applications.",
    Icon: FaNetworkWired,
  },
  {
    Title: "AI Specialist",
    About:
      "Implementing intelligent algorithms for game behaviors and decision-making.",
    Icon: FaCode,
  },
  {
    Title: "UI/UX Designer",
    About:
      "Creating intuitive and visually appealing user interfaces for seamless gaming experiences.",
    Icon: FaCode,
  },
];

export const Languages: ISkill[] = [
  {
    name: "Python",
    level: "50%",
    Icon: BsCircleFill,
  },
  {
    name: "C#",
    level: "70%",
    Icon: BsCircleFill,
  },
];

export const Tools: ISkill[] = [
  {
    name: "Unity",
    level: "80%",
    Icon: BsCircleFill,
  },
  {
    name: "Unreal",
    level: "30%",
    Icon: BsCircleFill,
  },
];
