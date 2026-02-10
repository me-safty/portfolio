import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ChevronDown } from "lucide-react";

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

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const statusColor = project.status === "Live" ? "bg-emerald-500" : "bg-amber-500";
  const isEven = index % 2 === 0;

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
    >
      <article className="relative rounded-2xl border border-border/60 bg-card/50 overflow-hidden hover-lift">
        {/* Image */}
        <div className="relative aspect-16/10 overflow-hidden bg-muted">
          <img
            src={project.image}
            alt={project.name}
            className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.parentElement!.innerHTML = `
                <div class="size-full flex items-center justify-center bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A]">
                  <div class="text-center">
                    <p class="text-[10px] tracking-[0.3em] text-white/40 mb-2 font-mono uppercase">Stay Tuned</p>
                    <p class="text-3xl font-display text-white/80 italic">Coming Soon</p>
                  </div>
                </div>
              `;
            }}
          />
          
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Floating arrow on hover */}
          <div className="absolute bottom-4 right-4 size-10 rounded-full bg-white/90 flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400">
            <ArrowUpRight className="size-5 text-black" />
          </div>

          {/* Label badge */}
          <div className="absolute top-3 left-3">
            <span className="inline-block px-3 py-1 text-xs font-medium tracking-wide uppercase bg-background/80 backdrop-blur-sm rounded-full border border-border/40">
              {project.label}
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="p-4 sm:p-5">
          <div className="flex items-start justify-between gap-3 mb-2">
            <h3 className="font-display text-2xl sm:text-[1.7rem] tracking-tight leading-tight">
              {project.name}
            </h3>
            <div className="flex shrink-0 items-center gap-1.5 text-xs text-muted-foreground mt-1.5">
              <span className={`size-1.5 rounded-full ${statusColor}`} />
              <span className="font-mono">{project.status}</span>
            </div>
          </div>
          <p className="text-[0.95rem] leading-relaxed text-muted-foreground line-clamp-2">
            {project.description}
          </p>
        </div>
      </article>
    </a>
  );
}

export function Projects({ projects }: ProjectsProps) {
  const [showAll, setShowAll] = useState(false);
  const displayedProjects = showAll ? projects : projects.slice(0, 4);

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {displayedProjects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>

      {projects.length > 4 && (
        <div className="flex justify-center pt-6">
          <Button
            variant="outline"
            onClick={() => setShowAll(!showAll)}
            className="gap-2 h-11 rounded-xl px-6 border-border/60 hover:border-accent/40 font-medium"
          >
            {showAll ? "Show Less" : "View All Projects"}
            <ChevronDown className={`size-4 transition-transform duration-300 ${showAll ? "rotate-180" : ""}`} />
          </Button>
        </div>
      )}
    </div>
  );
}
