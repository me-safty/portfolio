import { useState } from "react";
import { Button } from "@/components/ui/button";

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
    <article className="rounded-xl border border-border/95 bg-card p-2.5 sm:p-3">
      <div className="mb-2.5 flex items-center justify-between">
        <span className="text-sm text-muted-foreground">{project.label}</span>
        {project.featured && (
          <span className="inline-flex size-8 items-center justify-center rounded-[10px] border border-border bg-secondary/60 text-muted-foreground">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-3.5"
            >
              <path d="m7 17 10-10" />
              <path d="M8 7h9v9" />
            </svg>
          </span>
        )}
      </div>

      <div className="aspect-video overflow-hidden rounded-lg border border-border bg-muted">
        <img
          src={project.image}
          alt={project.name}
          className="size-full object-cover transition-transform duration-500 hover:scale-[1.02]"
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

      <div className="px-0.5 pt-3">
        <div className="mb-1.5 flex items-center justify-between gap-4">
          <h3 className="text-[1.85rem] sm:text-[2rem] font-semibold tracking-tight leading-none">{project.name}</h3>
          <div className="flex shrink-0 items-center gap-1.5 text-sm text-muted-foreground">
            <span className={`size-2 rounded-full ${statusColor}`} />
            <span>{project.status}</span>
          </div>
        </div>

        <p className="mb-2 text-[1.05rem] leading-8 text-foreground/70 line-clamp-3">{project.description}</p>

        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-[1.04rem] text-muted-foreground hover:text-foreground"
        >
          View Project
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-3.5"
          >
            <path d="M7 7h10v10" />
            <path d="M7 17 17 7" />
          </svg>
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
      <div className="grid grid-cols-1 gap-3 p-2.5 md:grid-cols-2">
        {displayedProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {projects.length > 4 && (
        <div className="flex justify-center pb-5 pt-2">
          <Button
            variant="default"
            onClick={() => setShowAll(!showAll)}
            className="h-10 rounded-[12px] border border-border/70 px-5 text-base"
          >
            {showAll ? "Show Less" : "View All"}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-4"
            >
              <path d="M7 7h10v10" />
              <path d="M7 17 17 7" />
            </svg>
          </Button>
        </div>
      )}
    </div>
  );
}
