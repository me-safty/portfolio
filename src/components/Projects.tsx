import { useState } from "react";

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
  const statusColor = project.status === "Live" ? "bg-emerald-500/80" : "bg-amber-500/80";

  return (
    <article className="group">
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block py-4 border-b border-border/50 last:border-b-0 hover:opacity-80 transition-opacity"
      >
        <div className="flex gap-4">
          <div className="w-24 h-16 shrink-0 rounded-lg overflow-hidden bg-muted/60">
            <img
              src={project.image}
              alt={project.name}
              className="size-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
              loading="lazy"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.parentElement!.innerHTML = `
                  <div class="size-full flex items-center justify-center bg-muted text-[10px] text-muted-foreground">
                    —
                  </div>
                `;
              }}
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-medium">{project.name}</h3>
              <span className={`size-1.5 rounded-full ${statusColor}`} />
            </div>
            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{project.description}</p>
            <p className="text-xs text-muted-foreground/70 mt-1">{project.label}</p>
          </div>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-3.5 shrink-0 text-muted-foreground"
          >
            <path d="M7 7h10v10" />
            <path d="M7 17 17 7" />
          </svg>
        </div>
      </a>
    </article>
  );
}

export function Projects({ projects }: ProjectsProps) {
  const [showAll, setShowAll] = useState(false);
  const displayedProjects = showAll ? projects : projects.slice(0, 4);

  return (
    <div>
      {displayedProjects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}

      {projects.length > 4 && (
        <div className="flex justify-center pt-4">
          <button
            type="button"
            onClick={() => setShowAll(!showAll)}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {showAll ? "Show less" : "View all"}
          </button>
        </div>
      )}
    </div>
  );
}
