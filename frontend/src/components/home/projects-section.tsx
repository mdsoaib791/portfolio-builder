
"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, ExternalLink, Github, Tag, User } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { IoSearch } from "react-icons/io5"

// Mock data for 40+ projects
const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce solution with React, Node.js, and MongoDB",
    longDescription:
      "A comprehensive e-commerce platform built with modern technologies. Features include user authentication, product catalog, shopping cart, payment integration with Stripe, order management, and admin dashboard. The platform is fully responsive and optimized for performance.",
    image: "/images/backgrund-soaib.webp?height=400&width=600",
    category: "Web Development",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example",
    date: "2024-01-15",
    client: "Tech Startup Inc.",
  },
  {
    id: 2,
    title: "Mobile Banking App",
    description: "Secure mobile banking application with biometric authentication",
    longDescription:
      "A secure and user-friendly mobile banking application featuring biometric authentication, real-time transaction monitoring, budget tracking, and seamless money transfers. Built with React Native for cross-platform compatibility.",
    image: "/images/backgrund-soaib.webp?height=400&width=600",
    category: "Mobile Development",
    technologies: ["React Native", "Firebase", "Node.js", "PostgreSQL"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example",
    date: "2024-02-20",
    client: "FinTech Solutions",
  },
  {
    id: 3,
    title: "AI Dashboard",
    description: "Analytics dashboard with machine learning insights",
    longDescription:
      "An intelligent analytics dashboard that provides real-time insights using machine learning algorithms. Features include predictive analytics, data visualization, automated reporting, and customizable widgets for different business metrics.",
    image: "/images/backgrund-soaib.webp?height=400&width=600",
    category: "AI/ML",
    technologies: ["Python", "TensorFlow", "React", "D3.js"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example",
    date: "2024-03-10",
    client: "Data Corp",
  },
  {
    id: 4,
    title: "Social Media Platform",
    description: "Modern social networking platform with real-time features",
    longDescription:
      "A comprehensive social media platform with real-time messaging, post sharing, story features, and advanced privacy controls. Built with scalability in mind to handle millions of users.",
    image: "/images/backgrund-soaib.webp?height=400&width=600",
    category: "Web Development",
    technologies: ["Next.js", "Socket.io", "Redis", "AWS"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example",
    date: "2024-04-05",
    client: "Social Connect Ltd.",
  },
  {
    id: 5,
    title: "Fitness Tracking App",
    description: "Comprehensive fitness and health tracking mobile application",
    longDescription:
      "A complete fitness tracking solution with workout planning, nutrition tracking, progress monitoring, and social features. Integrates with wearable devices and provides personalized recommendations.",
    image: "/images/backgrund-soaib.webp?height=400&width=600",
    category: "Mobile Development",
    technologies: ["Flutter", "Firebase", "HealthKit", "Google Fit"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example",
    date: "2024-05-12",
    client: "HealthTech Inc.",
  },
  {
    id: 6,
    title: "Blockchain Wallet",
    description: "Secure cryptocurrency wallet with multi-chain support",
    longDescription:
      "A secure and user-friendly cryptocurrency wallet supporting multiple blockchain networks. Features include portfolio tracking, DeFi integration, NFT support, and advanced security measures.",
    image: "/images/backgrund-soaib.webp?height=400&width=600",
    category: "Blockchain",
    technologies: ["React", "Web3.js", "Solidity", "MetaMask"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example",
    date: "2024-06-18",
    client: "Crypto Solutions",
  },
]

// Generate more projects to reach 40+
const generateMoreProjects = () => {
  const categories = ["Web Development", "Mobile Development", "AI/ML", "Blockchain", "UI/UX Design"]
  const techStacks = [
    ["React", "TypeScript", "Tailwind"],
    ["Vue.js", "Nuxt.js", "Supabase"],
    ["Angular", "NestJS", "PostgreSQL"],
    ["React Native", "Expo", "Firebase"],
    ["Flutter", "Dart", "SQLite"],
    ["Python", "Django", "Redis"],
    ["Next.js", "Prisma", "Vercel"],
    ["Svelte", "SvelteKit", "MongoDB"],
  ]

  const projectTypes = [
    "Learning Management System",
    "Real Estate Platform",
    "Food Delivery App",
    "Travel Booking System",
    "Project Management Tool",
    "Video Streaming Platform",
    "Online Marketplace",
    "Healthcare Portal",
    "Event Management System",
    "Music Streaming App",
    "News Aggregator",
    "Weather Dashboard",
    "Task Management App",
    "Photo Gallery",
    "Chat Application",
    "Booking System",
    "Inventory Management",
    "CRM System",
    "Blog Platform",
    "Portfolio Website",
    "Landing Page",
    "Admin Dashboard",
    "API Gateway",
    "Microservice",
    "Database Design",
    "Cloud Infrastructure",
    "DevOps Pipeline",
    "Security Audit",
    "Performance Optimization",
    "Code Review Tool",
    "Testing Framework",
    "Documentation Site",
    "Component Library",
    "Design System",
  ]

  const additionalProjects = projectTypes.map((type, index) => ({
    id: index + 7,
    title: type,
    description: `Modern ${type.toLowerCase()} with advanced features and responsive design`,
    longDescription: `A comprehensive ${type.toLowerCase()} built with modern technologies and best practices. Features include user authentication, real-time updates, responsive design, and optimized performance.`,
    image: `/images/backgrund-soaib.webp?height=400&width=600&query=${type.toLowerCase().replace(/\s+/g, "-")}`,
    category: categories[index % categories.length],
    technologies: techStacks[index % techStacks.length],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example",
    date: new Date(2024, index % 12, Math.floor(Math.random() * 28) + 1).toISOString().split("T")[0],
    client: `Client ${index + 1}`,
  }))

  return [...projects, ...additionalProjects]
}

const allProjects = generateMoreProjects()

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<(typeof allProjects)[0] | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [currentPage, setCurrentPage] = useState(1)
  const projectsPerPage = 12

  const categories = ["All", ...Array.from(new Set(allProjects.map((p) => p.category)))]

  const filteredProjects = allProjects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.technologies.some((tech) => tech.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === "All" || project.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage)
  const startIndex = (currentPage - 1) * projectsPerPage
  const currentProjects = filteredProjects.slice(startIndex, startIndex + projectsPerPage)

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4"> Featured Projects</h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Explore my collection of {allProjects.length}+ carefully crafted projects, each showcasing different
            technologies and creative solutions.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-12 space-y-6">
          <div className="relative max-w-md mx-auto">
            <IoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 z-50 h-4 w-4" />
            <Input
              placeholder="Search projects, technologies..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1)
              }}
              className="pl-10 bg-white/50 backdrop-blur-sm border-slate-200 dark:bg-slate-800/50 dark:border-slate-700"
            />
          </div>

          <Tabs
            value={selectedCategory}
            onValueChange={(value) => {
              setSelectedCategory(value)
              setCurrentPage(1)
            }}
            className="w-full"
          >
            <TabsList className="grid w-full gap-4 grid-cols-2 md:grid-cols-6 bg-white/50 backdrop-blur-sm dark:bg-slate-800/50">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category} className="text-sm text-primary-foreground bg-gradient-to-r from-blue-600 to-purple-600">
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
          {currentProjects.map((project) => (
            <Card
              key={project.id}
              className="group cursor-pointer overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white/80 backdrop-blur-sm dark:bg-slate-800/80 hover:scale-[1.02] hover:-translate-y-2"
              onClick={() => setSelectedProject(project)}
            >
              <div className="relative overflow-hidden">
                <Image
                  src={project.image || "images/backgrund-soaib.webp"}
                  alt={project.title}
                  width={400}
                  height={250}
                  className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                  <div className="flex gap-2">
                    <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                      <Github className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="mb-3">
                  <Badge
                    variant="secondary"
                    className="mb-2 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                  >
                    {project.category}
                  </Badge>
                  <h3 className="font-semibold text-lg text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {project.title}
                  </h3>
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-1">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                  {project.technologies.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{project.technologies.length - 3}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 flex-wrap">
            <Button
              variant="outline"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}

            >
              Previous
            </Button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum = currentPage <= 3 ? i + 1 : currentPage - 2 + i
              if (pageNum > totalPages) return null
              return (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? "default" : "outline"}
                  onClick={() => setCurrentPage(pageNum)}

                >
                  {pageNum}
                </Button>
              )
            })}
            <Button
              variant="outline"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}

            >
              Next
            </Button>
          </div>
        )}

        {/* Project Modal */}
        <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
          <>
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
                        src={selectedProject.image || "/images/backgrund-soaib.webp"}
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
                          <p className="text-slate-600 dark:text-slate-300">{selectedProject.longDescription}</p>
                        </div>

                        <div>
                          <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Technologies Used</h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedProject.technologies.map((tech) => (
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
                            <span>Completed: {new Date(selectedProject.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                            <User className="h-4 w-4" />
                            <span>Client: {selectedProject.client}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                            <Tag className="h-4 w-4" />
                            <span>Category: {selectedProject.category}</span>
                          </div>
                        </div>
                        <div className="flex gap-3 pt-4">
                          <Button asChild className="flex-1">
                            <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Live Demo
                            </a>
                          </Button>
                          <Button variant="outline" asChild className="flex-1 bg-transparent">
                            <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer">
                              <Github className="h-4 w-4 mr-2" />
                              Source Code
                            </a>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </DialogContent>
          </>
        </Dialog>
      </div>
    </section>
  )
}
