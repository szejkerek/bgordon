import React from "react";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import { GoLocation } from "react-icons/go";
import { GiTie } from "react-icons/gi";

export default function Sidebar() {
  return (
    <div>
      <img
        src="https://cdn.discordapp.com/attachments/782221077119631382/1232724408473227314/IMG20240424180552.jpg?ex=662bd111&is=662a7f91&hm=81c850f33870ed1fef2cd1b15368fcce8cf65f1f70269167691b7ea0e4565842&"
        alt="Ramen"
        className="w-32 h-32 rounded-full mx-auto"
      />
      <h1 className="my-4 text-3xl font-medium">
        <span>Bartłomiej</span> Gordon
      </h1>
      <p className="px-2 py-1 my-3 bg-gray-200 rounded-full">Game Developer</p>
      <p>
        <a
          className="px-2 py-1 my-3 bg-gray-200 rounded-full flex items-center justify-center"
          href=""
          download="name"
        >
          <GiTie className="w-6 h-6" />
          Download Resume
        </a>
      </p>

      <div>
        <a href="https://github.com/szejkerek">
          <AiFillGithub className="w-8 h-8" />
        </a>
        <a href="">
          <AiFillLinkedin className="w-8 h-8" />
        </a>
      </div>
      <div>
        <div>
          <GoLocation className="w-6 h-6" />
          <span>Katowice, Gliwice</span>
        </div>
        <p>bartekk.gordon@gmail.com</p>
      </div>
    </div>
  );
}
