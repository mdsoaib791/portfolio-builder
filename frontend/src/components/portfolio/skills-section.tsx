"use client";

import { SkillDto } from "@/dtos/skill-dto";
import Image from "next/image";
import { BsCode } from 'react-icons/bs';

interface skillProps {
  skill?: SkillDto[]
}
export function SkillsSection({ skill }: skillProps) {
  return (
    <section id="skills" className="py-12 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Skills</h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Showcase your expertise with a comprehensive skills section. Display your proficiency in various technologies, frameworks, and tools that make you stand out as a professional.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          {skill && skill.length > 0 ? (
            skill.map((item) => (
              <div
                key={item.name}
                className="flex items-center gap-2 bg-gray-100 text-sm text-gray-800 px-3 py-1 rounded-full"
              >
                {item.logo ? (<Image
                  src={item.logo}
                  alt={item.name}
                  width={40}
                  height={40}
                  className="rounded"
                />) : (<BsCode />)}

                <p className="m-0">{item.name}</p>
              </div>

            ))) : (<><p>No skill Found</p></>)}

        </div>
      </div>
    </section>
  );
}
