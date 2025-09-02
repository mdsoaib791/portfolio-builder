"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ProjectDto } from "@/dtos/project-dto"
import { Calendar } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

interface ProjectsSectionProps {
  project?: ProjectDto[]
}

export default function ProjectsSection({ project }: ProjectsSectionProps) {
  const [selectedProject, setSelectedProject] = useState<ProjectDto | null>(null)

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover a showcase of diverse projects demonstrating various skills and technologies.
          </p>
        </div>

        {project && project.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
            {project.map((p) => {
              const techs =
                typeof p.technologies === "string"
                  ? p.technologies.split(",").map((t) => t.trim())
                  : []

              return (
                <Card
                  key={p.id}
                  className="group cursor-pointer overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white/80 backdrop-blur-sm dark:bg-slate-800/80 hover:scale-[1.02] hover:-translate-y-2"
                  onClick={() => setSelectedProject(p)}
                >
                  <div className="relative overflow-hidden">
                    <Image
                      src={"/images/backgrund-soaib.webp"}
                      alt={p.title}
                      width={400}
                      height={250}
                      className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <CardContent className="p-6">
                    <div className="mb-3">
                      <h3 className="font-semibold text-lg text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        {p.title}
                      </h3>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 line-clamp-2">
                      {p.description ?? "No description available"}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {techs.slice(0, 3).map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {techs.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{techs.length - 3}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        ) : (
          <p className="text-center text-gray-500">No Project.</p>
        )}

        {/* Project Modal */}
        <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur-sm dark:bg-slate-900/95">
            {selectedProject && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-slate-900 dark:text-white">
                    {selectedProject.title}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
                  <div className="relative overflow-hidden rounded-lg">
                    <Image
                      src={"/images/backgrund-soaib.webp"}
                      alt={selectedProject.title}
                      width={800}
                      height={400}
                      className="w-full h-64 md:h-80 object-cover"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Project Overview</h4>
                        <p className="text-slate-600 dark:text-slate-300">
                          {selectedProject.description ?? "No details provided."}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Technologies Used</h4>
                        <div className="flex flex-wrap gap-2">
                          {typeof selectedProject.technologies === "string" &&
                            selectedProject.technologies
                              .split(",")
                              .map((tech) => (
                                <Badge
                                  key={tech}
                                  variant="secondary"
                                  className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                                >
                                  {tech}
                                </Badge>
                              ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                          <Calendar className="h-4 w-4" />
                          <span>
                            Start: {new Date(selectedProject.startDate).toLocaleDateString()}
                          </span>
                        </div>
                        {selectedProject.endDate && (
                          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                            <Calendar className="h-4 w-4" />
                            <span>
                              End: {new Date(selectedProject.endDate).toLocaleDateString()}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}
