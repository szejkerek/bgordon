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
        className="w-32 h-32 mx-auto rounded-full"
      />
      <h1 className="my-4 text-3xl font-medium">
        <span>Bartłomiej</span> Gordon
      </h1>
      <p className="px-2 py-1 my-3 bg-gray-200 rounded-full">Game Developer</p>
      <p>
        <a
          className="flex items-center justify-center px-2 py-1 my-3 bg-gray-200 rounded-full"
          download="name"
        >
          <GiTie className="w-6 h-6" />
          Download Resume
        </a>
      </p>

      <div className="flex justify-center w-full my-5 space-x-8 text-black">
        <a href="https://github.com/szejkerek">
          <AiFillGithub className="w-8 h-8 cursor-pointer" />
        </a>
        <a href="https://www.linkedin.com/in/bartekgordon/">
          <AiFillLinkedin className="w-8 h-8 cursor-pointer" />
        </a>
      </div>
      <div className="py-4 my-5 bg-gray-200">
        <div className="flex items-center justify-center space-x-2">
          <GoLocation className="w-6 h-6" />
          <span>Katowice, Gliwice</span>
        </div>
        <p>bartekk.gordon@gmail.com</p>
      </div>
      <button className="w-8/12 px-5 py-2 my-2 text-white rounded-full bg-gradient-to-r from-green-400 to-blue-400">
        Email me
      </button>
    </div>
  );
}