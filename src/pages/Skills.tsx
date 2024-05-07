import React from "react";
import { Languages, Tools } from "../resources/data";
import { SkillBar } from "../components/SkillBar";
import { EducationSlot } from "../components/EducationSlot";

export default function Skills() {
  return (
    <div className="p-4">
      <div className="grid gap-6 md:grid-cols-2">
        <EducationSlot />
        <EducationSlot />
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <h5 className="my-3 text-2xl font-bold">Languages and Frameworks</h5>
          <div className="my-2">
            {Languages.map((language) => (
              <SkillBar data={language} key={language.name} />
            ))}
          </div>
        </div>
        <div>
          <h5 className="my-3 text-2xl font-bold">Tools</h5>
          <div className="my-2">
            {Tools.map((tool) => (
              <SkillBar data={tool} key={tool.name} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
