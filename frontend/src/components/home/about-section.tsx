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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
            <p className="text-muted-foreground">I&apos;m a Frontend Developer...</p>
            <p className="text-muted-foreground">Over the years, I&apos;ve contributed...</p>
            <p className="text-muted-foreground">Outside of coding, you&apos;ll often find me...</p>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">What I do</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="default">Frontend Development</Badge>
                <Badge variant="default">Backend Development</Badge>
                <Badge variant="default">UI/UX Design</Badge>
                <Badge variant="default">Mobile Development</Badge>
                <Badge variant="default">DevOps</Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
