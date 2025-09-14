"use client";

import React from "react";
import { AboutSection } from "./about-section";
import { ContactSection } from "./contact-section";
import { ExperienceSection } from "./experience-section";
import { Footer } from "./footer";
import { HeroSection } from "./hero-section";
import { Navigation } from "./navigation";
import ProjectsSection from "./projects-section";
import { SkillsSection } from "./skills-section";
import { PortfolioData } from "@/services/portfolio-service";

export interface PortfolioProps {
    portfolioData: PortfolioData;
}

export default function HomePageWrapper({ portfolioData }: PortfolioProps) {
    // The components don't accept props, so we'll just render them as is
    // In a real application, you'd want to modify the components to accept and use the portfolio data
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
    );
}
