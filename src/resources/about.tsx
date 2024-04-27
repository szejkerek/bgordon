import { IconType } from "react-icons";
import { FaServer } from "react-icons/fa";

interface IAboutService {
  title: string;
  about: string;
  icon: IconType;
}

export const AboutService: IAboutService[] = [
  {
    title: "Game Developer",
    about: "Doing games",
    icon: FaServer,
  },
  {
    title: "Graphic Enginnerrerer",
    about: "OpenGl itd",
    icon: FaServer,
  },
  {
    title: "Low level",
    about: "C++ pzdr",
    icon: FaServer,
  },
  {
    title: "Low level",
    about: "C++ pzdr",
    icon: FaServer,
  },
];
