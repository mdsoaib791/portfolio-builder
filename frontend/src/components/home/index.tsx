import { AboutSection } from "./about-section";
import { ContactSection } from "./contact-section";
import { ExperienceSection } from "./experience-section";
import { Footer } from "./footer";
import { HeroSection } from "./hero-section";
import { Navigation } from "./navigation";
import ProjectsSection from "./projects-section";

import { SkillsSection } from "./skills-section";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
