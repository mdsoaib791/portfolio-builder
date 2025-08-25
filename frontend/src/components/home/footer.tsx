import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-muted/50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 max-w-[400px] text-center md:text-left">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Md Soaib Ansari
            </div>
            <p className="text-muted-foreground">Building elegant digital solutions with a focus on user experience and technical excellence.</p>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <div className="flex space-x-4">
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
            <p className="text-muted-foreground">© 2025 Md SOaib Ansari | Built with Nextjs and Tailwind</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
