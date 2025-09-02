import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export function AboutSection() {
  return (
    <section id="about" className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="rounded-2xl mb-8 md:mb-0 flex items-center justify-center">
            <Image
              src={"/images/about-image.png"}
              alt={'about-image'}
              width={400}
              height={200}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">About Portfolio Builder</h2>
            <p className="text-muted-foreground mb-4">
              Portfolio Builder is a modern, intuitive platform designed to help professionals create stunning portfolios effortlessly. Whether you're a developer, designer, or creative professional, our tool provides everything you need to showcase your work effectively.
            </p>
            <p className="text-muted-foreground mb-4">
              With our drag-and-drop interface, customizable templates, and powerful features, you can create a professional portfolio that stands out. Our platform supports various content types including projects, skills, work experience, and contact information.
            </p>
            <p className="text-muted-foreground mb-6">
              Join thousands of professionals who have already built their dream portfolios with our platform. Start your journey today and make your mark in the digital world.
            </p>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Key Features</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="default">Easy to Use</Badge>
                <Badge variant="default">Responsive Design</Badge>
                <Badge variant="default">Customizable Templates</Badge>
                <Badge variant="default">SEO Optimized</Badge>
                <Badge variant="default">Fast Loading</Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
