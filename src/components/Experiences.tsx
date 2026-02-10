import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface Experience {
  id: string;
  company: string;
  logo: string;
  role: string;
  type: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string[];
  technologies: string[];
}

interface ExperiencesProps {
  experiences: Experience[];
}

function ExperienceCard({
  experience,
  defaultOpen = false,
}: {
  experience: Experience;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className="border-b border-border/50 last:border-b-0">
        <CollapsibleTrigger asChild>
          <button className="w-full py-4 flex items-start gap-4 text-left hover:opacity-80 transition-opacity">
            <div className="size-10 rounded-lg bg-muted/60 shrink-0 overflow-hidden flex items-center justify-center">
              <img
                src={experience.logo}
                alt={experience.company}
                className="size-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                  target.parentElement!.innerHTML = `
                    <span class="text-sm font-medium text-muted-foreground">
                      ${experience.company.charAt(0)}
                    </span>
                  `;
                }}
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-baseline gap-2">
                <span className="text-base font-medium">{experience.company}</span>
                <span className="text-xs text-muted-foreground">{experience.type}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-0.5">{experience.role}</p>
            </div>

            <div className="text-right shrink-0 hidden sm:block">
              <p className="text-xs text-muted-foreground">
                {experience.startDate} – {experience.endDate}
              </p>
              <p className="text-xs text-muted-foreground/80 mt-0.5">{experience.location}</p>
            </div>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`size-4 shrink-0 text-muted-foreground transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="pb-4 pl-14 sm:pl-0">
            <p className="text-xs text-muted-foreground mb-3 sm:hidden">
              {experience.startDate} – {experience.endDate} · {experience.location}
            </p>

            <ul className="space-y-2 mb-4">
              {experience.description.map((item, i) => (
                <li key={i} className="flex gap-2 text-sm leading-relaxed text-foreground/85">
                  <span className="text-muted-foreground">·</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-1.5">
              {experience.technologies.map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-2 py-0.5 rounded bg-muted/60 text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}

export function Experiences({ experiences }: ExperiencesProps) {
  const [showAll, setShowAll] = useState(false);
  const displayedExperiences = showAll ? experiences : experiences.slice(0, 3);

  return (
    <div>
      {displayedExperiences.map((exp, index) => (
        <ExperienceCard key={exp.id} experience={exp} defaultOpen={index === 0} />
      ))}

      {experiences.length > 3 && (
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
