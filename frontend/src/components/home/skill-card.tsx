"use client";

import Image from "next/image";
import { FC } from "react";
import { IconType } from "react-icons";

interface Skill {
  name: string;
  logo: string;
}

interface SkillCardProps {
  title: string;
  icon: IconType;
  skills: Skill[];
}

export const SkillCard: FC<SkillCardProps> = ({ title, icon: Icon, skills }) => {
  return (
    <div className="bg-white rounded-xl border p-6 w-full max-w-sm shadow-md">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-blue-100 p-2 rounded-md text-blue-500">
          <Icon size={20} />
        </div>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
      <div className="flex flex-wrap gap-3">
        {skills.map((skill) => (
          <div
            key={skill.name}
            className="flex items-center gap-2 bg-gray-100 text-sm text-gray-800 px-3 py-1 rounded-full"
          >
            <Image
              src={skill.logo}
              alt={skill.name}
              width={40}
              height={40}
              className="rounded"
            />
            <p>{skill.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
