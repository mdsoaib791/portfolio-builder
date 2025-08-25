import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Github, Linkedin, Mail } from "lucide-react";

export function HeroSection() {
  return (
    <section className="pt-40 pb-24  bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <Badge variant="secondary" className="mb-4">
            Available for work
          </Badge>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            I&apos;m{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Soaib Ansari
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            I&apos;m a Frontend Developer with 5+ years of experience crafting scalable web and mobile applications using React.js, Next.js, and React Native. I specialize in building clean, responsive interfaces and optimizing user experience.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button size="lg" className="w-full sm:w-auto">
            <Mail className="mr-2 h-4 w-4" />
            Get in touch
          </Button>
          <Button variant="secondary" size="lg" className="w-full sm:w-auto">
            <Download className="mr-2 h-4 w-4" />
            Download CV
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
