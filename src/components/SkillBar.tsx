import React, { FunctionComponent } from "react";
import { ISkill } from "../types";

export const SkillBar: FunctionComponent<{ data: ISkill }> = ({
  data: { Icon, name, level },
}) => {
  return (
    <div className="my-2 text-white bg-gray-300 rounded-full dark:bg-black-500">
      <div
        className="flex items-center px-4 py-1 rounded-full bg-gradient-to-r from-green-300 to-blue-500"
        style={{
          width: level,
        }}
      >
        <Icon className="mr-3" /> {name}
      </div>
    </div>
  );
};
