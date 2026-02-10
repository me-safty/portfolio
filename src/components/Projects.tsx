import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

interface Project {
  id: string;
  name: string;
  image: string;
  label: string;
  description: string;
  status: "Live" | "Building";
  url: string;
  featured: boolean;
}

interface ProjectsProps {
  projects: Project[];
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <a 
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block relative bg-card border border-border overflow-hidden transition-all duration-500 hover:border-primary/50"
    >
      {/* Image Container */}
      <div className="relative aspect-[16/9] overflow-hidden bg-muted grayscale group-hover:grayscale-0 transition-all duration-700">
        <img
          src={project.image}
          alt={project.name}
          className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.parentElement!.innerHTML = `
              <div class="size-full flex items-center justify-center bg-secondary/20">
                <div class="text-center p-6">
                   <div class="text-4xl font-black opacity-10 mb-2">IMG_01</div>
                </div>
              </div>
            `;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Status Badge */}
        <div className="absolute top-4 right-4 flex items-center gap-2 bg-background/80 backdrop-blur-sm border border-border px-3 py-1 font-mono text-xs">
          <span className={`size-1.5 rounded-full ${project.status === "Live" ? "bg-emerald-500" : "bg-amber-500 animate-pulse"}`} />
          {project.status.toUpperCase()}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 md:p-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-xs font-mono text-primary mb-2 uppercase tracking-widest">{project.label}</p>
            <h3 className="text-2xl font-bold font-display leading-none group-hover:text-primary transition-colors flex items-center gap-2">
              {project.name}
            </h3>
          </div>
          <ArrowUpRight className="size-6 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
        </div>
        
        <p className="text-muted-foreground leading-relaxed font-light line-clamp-3 group-hover:line-clamp-none transition-all">
          {project.description}
        </p>

        {/* Decorative corner */}
        <div className="absolute bottom-0 right-0 size-4 border-b-2 border-r-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </div>
    </a>
  );
}

export function Projects({ projects }: ProjectsProps) {
  const [showAll, setShowAll] = useState(false);
  const displayedProjects = showAll ? projects : projects.slice(0, 4);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {displayedProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {projects.length > 4 && (
        <div className="flex justify-center pt-12">
          <Button
            variant="outline"
            onClick={() => setShowAll(!showAll)}
            className="rounded-none border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            {showAll ? "Show Less" : "View All Projects"}
          </Button>
        </div>
      )}
    </div>
  );
}
