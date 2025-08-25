import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function ExperienceSection() {
  const experiences = [
    {
      title: "Frontend Developer",
      company: "FirstBit DIgital Technologys Pvt Ltd.",
      period: "2021 - Present",
      description:
        "Lead frontend development for multiple client projects, mentoring junior developers and implementing best practices for code quality and performance.",
      technologies: ["Expo", "React Native", "React", "Next.js", "TypeScript", "React Query", "Tailwind CSS", "express.js", "Node.js", "Redux", "Git", "Figma", "REST APIs", "Agile Methodologies", "Cross-Browser Compatibility", "Unit Testing", "Responsive Design", "Version Control", "Code Reviews", "Continuous Integration"],
    },

    {
      title: "Frontend Developer",
      company: "Bsit Software Services Pvt Ltd.",
      period: "2019 - 2021",
      description:
        "Built responsive web applications and landing pages, optimized performance and implemented SEO best practices.",
      technologies: ["React", "JavaScript", "SCSS", "Webpack", "Bootstrap", "HTML", "CSS", "Git", "Figma", "REST APIs", "Agile Methodologies", "Cross-Browser Compatibility", "Unit Testing", "Responsive Design", "Version Control", "Code Reviews", "Continuous Integration"],
    },
  ]

  return (
    <section id="experience" className="py-12 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Work Experience</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            My professional journey and the roles that shaped my expertise
          </p>
        </div>

        <div className="space-y-8">
          {experiences.map((experience, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <CardTitle className="text-xl">{experience.title}</CardTitle>
                    <CardDescription className="text-lg font-medium text-foreground/80">
                      {experience.company}
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="w-fit mt-2 md:mt-0">
                    {experience.period}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{experience.description}</p>
                <div className="flex flex-wrap gap-2">
                  {experience.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
