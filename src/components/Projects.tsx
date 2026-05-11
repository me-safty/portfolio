import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

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
  const statusColor = project.status === "Live" ? "bg-emerald-500" : "bg-rose-500";

  return (
    <article className="focus-lift rounded-2xl border border-border/90 bg-card p-3">
      <div className="mb-3 flex items-center justify-between">
        <span className="rounded-full border border-border bg-secondary/50 px-2.5 py-1 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
          {project.label}
        </span>
        {project.featured && (
          <span className="inline-flex size-8 items-center justify-center rounded-full border border-border bg-secondary/60 text-muted-foreground">
            <ExternalLink className="size-3.5" aria-hidden="true" />
          </span>
        )}
      </div>

      <div className="aspect-video overflow-hidden rounded-xl border border-border bg-muted">
        <img
          src={project.image}
          alt={project.name}
          className="size-full object-cover transition-transform duration-500 hover:scale-[1.035]"
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.parentElement!.innerHTML = `
              <div class=\"size-full flex items-center justify-center bg-gradient-to-b from-zinc-950 to-zinc-900\">
                <div class=\"text-center text-white\">
                  <p class=\"text-[11px] tracking-[0.22em] opacity-70 mb-2\">STAY TUNED</p>
                  <p class=\"text-4xl font-semibold leading-none\">COMING</p>
                  <p class=\"text-4xl font-semibold leading-none\">SOON</p>
                </div>
              </div>
            `;
          }}
        />
      </div>

      <div className="px-1 pt-4">
        <div className="mb-2 flex items-start justify-between gap-4">
          <h3 className="text-2xl font-semibold leading-tight tracking-tight sm:text-[1.7rem]">{project.name}</h3>
          <div className="flex shrink-0 items-center gap-1.5 text-sm text-muted-foreground">
            <span className={`size-2 rounded-full ${statusColor}`} />
            <span>{project.status}</span>
          </div>
        </div>

        <p className="mb-3 line-clamp-3 text-[0.98rem] leading-7 text-foreground/68">{project.description}</p>

        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          View Project
          <ExternalLink className="size-3.5" aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}

export function Projects({ projects }: ProjectsProps) {
  const [showAll, setShowAll] = useState(false);
  const displayedProjects = showAll ? projects : projects.slice(0, 4);

  return (
    <div>
      <div className="grid grid-cols-1 gap-3 p-3 sm:p-4 md:grid-cols-2">
        {displayedProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {projects.length > 4 && (
        <div className="flex justify-center pb-5 pt-1">
          <Button
            variant="default"
            onClick={() => setShowAll(!showAll)}
            className="h-10 rounded-full border border-border/70 px-5 text-sm"
          >
            {showAll ? "Show Less" : "View All"}
            <ExternalLink className="size-4" aria-hidden="true" />
          </Button>
        </div>
      )}
    </div>
  );
}