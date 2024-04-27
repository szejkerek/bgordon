import { IconType } from "react-icons";
import { FaGamepad, FaCode, FaNetworkWired } from "react-icons/fa";

interface IAboutService {
  title: string;
  about: string;
  icon: IconType;
}

export const AboutService: IAboutService[] = [
  {
    title: "Game Developer",
    about:
      "Crafting immersive gaming experiences. Experienced in game jams and web development.",
    icon: FaGamepad,
  },
  {
    title: "Graphic Engineer",
    about:
      "Creating stunning visual effects with OpenGL and graphics technologies.",
    icon: FaGamepad,
  },
  {
    title: "Low-Level Programmer",
    about:
      "Optimizing performance and efficiency with C++ and low-level programming.",
    icon: FaCode,
  },
  {
    title: "Network Programmer",
    about:
      "Developing robust networking solutions for high-performance applications.",
    icon: FaNetworkWired,
  },
  {
    title: "AI Specialist",
    about:
      "Implementing intelligent algorithms for game behaviors and decision-making.",
    icon: FaCode,
  },
  {
    title: "UI/UX Designer",
    about:
      "Creating intuitive and visually appealing user interfaces for seamless gaming experiences.",
    icon: FaCode,
  },
];
