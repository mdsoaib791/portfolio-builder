import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function ExperienceSection() {
  const experiences = [
    {
      title: "Senior Full Stack Developer",
      company: "TechCorp Solutions",
      period: "2022 - Present",
      description:
        "Lead development of enterprise applications, mentor junior developers, and implement best practices for scalable web solutions.",
      technologies: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "AWS", "Docker", "Redis", "GraphQL", "Tailwind CSS", "Jest", "CI/CD", "Microservices"],
    },
    {
      title: "Frontend Developer",
      company: "Digital Innovation Ltd",
      period: "2020 - 2022",
      description:
        "Developed responsive web applications, collaborated with design teams, and optimized application performance for better user experience.",
      technologies: ["React", "JavaScript", "SCSS", "Webpack", "Redux", "REST APIs", "Git", "Figma", "Bootstrap", "jQuery", "HTML5", "CSS3"],
    },
    {
      title: "Junior Web Developer",
      company: "StartupXYZ",
      period: "2019 - 2020",
      description:
        "Built landing pages, maintained existing codebases, and learned modern web development practices in an agile environment.",
      technologies: ["HTML", "CSS", "JavaScript", "jQuery", "Bootstrap", "PHP", "MySQL", "Git", "WordPress"],
    },
  ]

  return (
    <section id="experience" className="py-12 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Work Experience</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Sample work experience to showcase your professional journey and expertise
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
