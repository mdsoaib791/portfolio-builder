import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { container } from "@/config/ioc";
import { TYPES } from "@/config/types";
import { WorkExperienceDto } from "@/dtos/work-experience-dto";
import IUnitOfService from "@/services/interfaces/Iunit-of-service";

interface ExperienceSectionProps {
  experiences: WorkExperienceDto[]
}

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
  const unitOfService = container.get<IUnitOfService>(TYPES.IUnitOfService);


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
          {experiences?.map((experience, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <CardTitle className="text-xl">{experience.position}</CardTitle>
                    <CardDescription className="text-lg font-medium text-foreground/80">
                      {experience.companyName}
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="w-fit mt-2 md:mt-0">
                    {/* {experience.startDate && unitOfService.DateTimeService.convertToLocalDate(experience.startDate)} - {experience.endDate || "Present"} */}
                  </Badge>
                </div>
              </CardHeader>
              {/* <CardContent>
                <p className="text-muted-foreground mb-4">{experience.description}</p>
                <div className="flex flex-wrap gap-2">
                  {experience.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent> */}
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
