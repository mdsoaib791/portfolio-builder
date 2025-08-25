"use client";

import { BiServer } from "react-icons/bi";
import {
  FaCode,
  FaDatabase,
  FaPaintBrush,
  FaTools,
} from "react-icons/fa";
import { MdOutlineDeveloperMode } from "react-icons/md";
import { SkillCard } from "./skill-card";

export function SkillsSection() {
  return (
    <section id="skills" className="py-12 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4"> Skills</h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Here are some of the technologies and tools I work with regularly. My expertise spans across frontend and backend development, databases, design, and more.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">

          <SkillCard
            title="Programming Languages"
            icon={FaCode}
            skills={[
              { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
              { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
              { name: "HTML/CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
            ]}
          />

          <SkillCard
            title="Frontend Development"
            icon={MdOutlineDeveloperMode}
            skills={[
              { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
              { name: "React Native", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
              { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-line.svg" },
              { name: "Tailwind CSS", logo: "/images/tailwind.jpeg" },
            ]}
          />

          <SkillCard
            title="Backend Development"
            icon={BiServer}
            skills={[
              { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
              { name: "Express.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
              { name: "REST APIs", logo: "https://uxwing.com/wp-content/themes/uxwing/download/web-app-development/rest-api-icon.png" },
            ]}
          />

          <SkillCard
            title="Databases"
            icon={FaDatabase}
            skills={[
              { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
              { name: "MySQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
              { name: "Firebase", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
              { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
            ]}
          />

          <SkillCard
            title="Tools & Technologies"
            icon={FaTools}
            skills={[
              { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
              { name: "Agile/Scrum", logo: "/images/agile-methodology.png" },
            ]}
          />

          <SkillCard
            title="Design"
            icon={FaPaintBrush}
            skills={[
              { name: "Figma", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
              { name: "Adobe AI", logo: "/images/illustrator.svg" },
              { name: "Photoshop", logo: "/images/photoshop.svg" },
              { name: "UI/UX Design", logo: "/images/ui-ux-designer.jpg" },
            ]}
          />

        </div>
      </div>
    </section>
  );
}
