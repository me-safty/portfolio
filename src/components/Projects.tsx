import { useState } from "react";
import { Badge } from "@/components/ui/badge";
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
  const statusColor = project.status === "Live" ? "bg-emerald-500" : "bg-amber-500";

  return (
    <div className="group dashed-border-section overflow-hidden">
      {/* Header with label and pin */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-dashed border-border">
        <span className="text-sm text-muted-foreground">{project.label}</span>
        {project.featured && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-4 text-muted-foreground"
          >
            <path d="M12 17v5" />
            <path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z" />
          </svg>
        )}
      </div>

      {/* Image */}
      <div className="aspect-video bg-muted overflow-hidden">
        <img
          src={project.image}
          alt={project.name}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.parentElement!.innerHTML = `
              <div class="size-full flex items-center justify-center bg-gradient-to-br from-zinc-900 to-zinc-800">
                <div class="text-center text-white">
                  <p class="text-xs uppercase tracking-wider opacity-60 mb-1">Stay Tuned</p>
                  <p class="text-2xl font-bold tracking-tight">COMING SOON</p>
                </div>
              </div>
            `;
          }}
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold">{project.name}</h3>
          <div className="flex items-center gap-1.5">
            <span className={`size-2 rounded-full ${statusColor}`} />
            <span className="text-sm text-muted-foreground">{project.status}</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {project.description}
        </p>
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm font-medium hover:underline underline-offset-4"
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
            className="size-3"
          >
            <path d="M7 7h10v10" />
            <path d="M7 17 17 7" />
          </svg>
        </a>
      </div>
    </div>
  );
}

export function Projects({ projects }: ProjectsProps) {
  const [showAll, setShowAll] = useState(false);
  const displayedProjects = showAll ? projects : projects.slice(0, 4);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        {displayedProjects.map((project, index) => (
          <div
            key={project.id}
            className={`
              ${index % 2 === 0 ? "md:border-r-0" : ""}
              ${index < displayedProjects.length - 2 ? "md:border-b-0" : ""}
              ${index < displayedProjects.length - 1 ? "border-b-0 md:border-b" : ""}
            `}
          >
            <ProjectCard project={project} />
          </div>
        ))}
      </div>

      {projects.length > 4 && (
        <div className="flex justify-center py-6 border-t border-dashed border-border">
          <Button
            variant="default"
            onClick={() => setShowAll(!showAll)}
            className="gap-2"
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
