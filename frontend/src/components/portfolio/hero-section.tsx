import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Github, Linkedin, Mail } from "lucide-react";

export function HeroSection() {
  return (
    <section className="pt-40 pb-24  bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <Badge variant="secondary" className="mb-4">
            Welcome
          </Badge>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            Create Your{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Perfect Portfolio
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Build a stunning professional portfolio in minutes. Showcase your skills, projects, and experience with our easy-to-use portfolio builder. Perfect for developers, designers, and creative professionals.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button size="lg" className="w-full sm:w-auto">
            <Mail className="mr-2 h-4 w-4" />
            Start Building
          </Button>
          <Button variant="secondary" size="lg" className="w-full sm:w-auto">
            <Download className="mr-2 h-4 w-4" />
            View Templates
          </Button>
        </div>

        <div className="flex justify-center space-x-6">
          <Button variant="ghost" size="icon">
            <Github className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Linkedin className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Mail className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
