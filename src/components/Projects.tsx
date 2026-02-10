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

function ComingSoonPlaceholder() {
  return (
    <div className="size-full min-h-[140px] flex flex-col items-center justify-center bg-neutral-950 text-white relative">
      <svg className="absolute top-3 right-3 size-5 text-white/40" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
      <p className="text-[10px] sm:text-[11px] tracking-[0.25em] opacity-80 mb-1">STAY TUNED</p>
      <p className="text-2xl sm:text-3xl font-semibold tracking-tight">COMING SOON</p>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const statusColor = project.status === "Live" ? "bg-emerald-500" : "bg-rose-500";

  return (
    <article className="rounded-xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="p-3 pb-2 flex items-center justify-between">
        <span className="text-sm text-muted-foreground font-medium">{project.label}</span>
        <div className="flex items-center gap-1.5">
          <span className={`size-2 rounded-full ${statusColor}`} />
          <span className="text-sm text-muted-foreground">{project.status}</span>
        </div>
      </div>

      <div className="aspect-video overflow-hidden bg-muted relative">
        {project.status === "Building" ? (
          <ComingSoonPlaceholder />
        ) : (
          <img
            src={project.image}
            alt={project.name}
            className="size-full object-cover transition-transform duration-500 hover:scale-[1.02]"
            loading="lazy"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              const parent = target.parentElement;
              if (parent) {
                const div = document.createElement("div");
                div.className = "size-full min-h-[140px] flex flex-col items-center justify-center bg-neutral-950 text-white relative";
                div.innerHTML = `
                  <svg class="absolute top-3 right-3 size-5 text-white/40" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  <p class="text-[10px] sm:text-[11px] tracking-[0.25em] opacity-80 mb-1">STAY TUNED</p>
                  <p class="text-2xl sm:text-3xl font-semibold tracking-tight">COMING SOON</p>
                `;
                parent.replaceChildren(div);
              }
            }}
          />
        )}
      </div>

      <div className="p-3 pt-2">
        <h3 className="text-xl sm:text-[1.5rem] font-semibold tracking-tight leading-tight mb-1.5">{project.name}</h3>
        <p className="mb-2 text-[0.95rem] leading-7 text-foreground/75 line-clamp-2">{project.description}</p>
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground font-medium"
        >
          View Project
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3.5">
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
            className="h-10 rounded-lg px-5 text-base gap-1.5"
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
              className={`size-4 transition-transform ${showAll ? "rotate-180" : ""}`}
            >
              <path d="M7 17 17 7" />
              <path d="M7 7h10v10" />
            </svg>
          </Button>
        </div>
      )}
    </div>
  );
}
