"use client";

import { ProjectDto } from "@/dtos/project-dto";
import { SkillDto } from "@/dtos/skill-dto";
import { WorkExperienceDto } from "@/dtos/work-experience-dto";
import { AboutSection } from "./about-section";
import { ContactSection } from "./contact-section";
import { ExperienceSection } from "./experience-section";
import { Footer } from "../common/footer";
import { HeroSection } from "./hero-section";

import ProjectsSection from "./projects-section";
import { SkillsSection } from "./skills-section";
import { Navigation } from "../common/navigation";

export interface PortfolioProps {
  skill: SkillDto[];
  project: ProjectDto[];
  experience: WorkExperienceDto[];

}

export default function HomePageWrapper({ skill, project, experience }: PortfolioProps) {
  // The components don't accept props, so we'll just render them as is
  // In a real application, you'd want to modify the components to accept and use the portfolio data
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <SkillsSection skill={skill} />
      <ProjectsSection project={project} />
      <ExperienceSection experiences={experience} />
      <ContactSection />
      <Footer />
    </main>
  );
}
